import admin from 'firebase-admin';
import fs from 'fs';
import csv from 'csv-parser';
import path from 'path';

import serviceAccount from './serviceAccountKey.json' assert { type: 'json' };

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: 'parfumania-web-admini',
});
const db = admin.firestore();
const bucket = admin.storage().bucket();

const products = [];

const imagesDir = path.join(process.cwd(), 'images');
const imageFiles = fs.existsSync(imagesDir) ? fs.readdirSync(imagesDir) : [];

// Normalize product/image names for robust matching
function normalizeName(str) {
  return str
    .toLowerCase()
    .replace(/[\u2013\u2014–—]/g, '-') // replace en/em dashes with hyphen
    .replace(/[\(\)\[\]]/g, '')        // remove parentheses/brackets
    .replace(/[^a-z0-9\- ]/gi, '')     // remove non-alphanumeric except space and hyphen
    .replace(/[-\s]+/g, ' ')           // replace multiple spaces/hyphens with one space
    .trim();
}

async function uploadImageAndGetUrl(localPath, destFileName) {
  try {
    await bucket.upload(localPath, {
      destination: `products/${destFileName}`,
      public: true,
      metadata: {
        cacheControl: 'public, max-age=31536000',
      },
    });
    return `https://storage.googleapis.com/${bucket.name}/products/${encodeURIComponent(destFileName)}`;
  } catch (err) {
    console.error('Image upload failed:', err);
    return null;
  }
}

fs.createReadStream('parfumes.csv')
  .pipe(csv({ separator: ',', headers: ['Nr.', 'Emri i Parfumit', 'Qmimi', 'SASIA', 'vlera pa zbritje', 'vlera me zbritje', 'Category'] }))
  .on('data', (row) => {
    if (row['Nr.'] === 'Nr.') return;

    // Extract discount percentage if present
    let discount = 0;
    if (row['vlera me zbritje']) {
      const match = row['vlera me zbritje'].match(/(\d+)%/);
      if (match) {
        discount = parseInt(match[1], 10);
      }
    }

    // Robust image matching: allow product name to be a prefix of the image file name
    const productName = normalizeName(row['Emri i Parfumit']);
    let imageFile = null;
    let possibleMatches = imageFiles
      .map(file => ({
        file,
        norm: normalizeName(path.parse(file).name)
      }))
      .filter(({ norm }) => norm.startsWith(productName));

    if (possibleMatches.length > 0) {
      // Pick the shortest match (most likely the main product image)
      imageFile = possibleMatches.reduce((a, b) => a.norm.length <= b.norm.length ? a : b).file;
    }

    if (!imageFile) {
      console.warn(`No image found for product: "${row['Emri i Parfumit']}" (normalized: "${productName}")`);
    }

    products.push({
      title: row['Emri i Parfumit'],
      price: parseFloat(row['Qmimi']),
      quantity: row['SASIA'],
      originalPrice: parseFloat(row['vlera pa zbritje']),
      discountedPrice: row['vlera me zbritje'] && discount
        ? parseFloat(row['vlera pa zbritje']) * (1 - discount / 100)
        : null,
      discount: discount,
      imageFile: imageFile, // temporarily store file name
      category: row['Category'] || '',
      createdAt: admin.firestore.FieldValue.serverTimestamp(),
    });
  })
  .on('end', async () => {
    for (const product of products) {
      let imageUrl = null;
      if (product.imageFile) {
        const localPath = path.join(imagesDir, product.imageFile);
        imageUrl = await uploadImageAndGetUrl(localPath, product.imageFile);
      }
      delete product.imageFile;
      product.imageUrl = imageUrl;
      await db.collection('products').add(product);
    }
    process.exit(0);
  });
