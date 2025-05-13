const { MongoClient } = require('mongodb');

const uri = 'mongodb://localhost:27017';
const dbName = 'loincDB';
const collectionName = 'loincCodes';

async function queryData() {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    console.log('Conexión exitosa a MongoDB');

    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    // Ejemplo: Encontrar un código específico
    const loincCode = '12345-6'; // Reemplaza con un código LOINC real
    const result = await collection.findOne({ LOINC_NUM: loincCode });

    if (result) {
      console.log('Documento encontrado:', result);
    } else {
      console.log(`No se encontró el código LOINC: ${loincCode}`);
    }
  } catch (err) {
    console.error('Error al consultar los datos:', err);
  } finally {
    await client.close();
  }
}

queryData().catch(console.error);
