const fs = require('fs');
const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'loincDB';
const collectionName = 'loincCodes';
const jsonFilePath = 'loinc.json';

async function importData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const jsonData = JSON.parse(fs.readFileSync(jsonFilePath, 'utf8'));

    const result = await collection.insertMany(jsonData);
    console.log(`${result.insertedCount} documentos insertados en '${collectionName}'`);
  } catch (err) {
    console.error('Error al importar los datos:', err);
  } finally {
    await client.close();
  }
}

importData().catch(console.error);
