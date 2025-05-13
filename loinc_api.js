const express = require('express');
const { MongoClient } = require('mongodb');

const app = express();
const port = 3000;

const uri = 'mongodb://localhost:27017';
const dbName = 'loincDB';
const collectionName = 'loincCodes';

// Middleware para parsear JSON
app.use(express.json());

// Endpoint: Mostrar todos los documentos
app.get('/loinc', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const results = await collection.find({}).toArray();
    res.json(results);
  } catch (err) {
    res.status(500).send('Error al obtener los datos: ' + err);
  } finally {
    await client.close();
  }
});

// Endpoint: Buscar por código
app.get('/loinc/:code', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const code = req.params.code;
    const result = await collection.findOne({ LOINC_NUM: code });

    if (result) {
      res.json(result);
    } else {
      res.status(404).send('Código LOINC no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error interno del servidor');
  } finally {
    await client.close();
  }
});

// Endpoint: Eliminar por código
app.delete('/loinc/:code', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const code = req.params.code;
    const result = await collection.deleteOne({ LOINC_NUM: code });

    if (result.deletedCount > 0) {
      res.send('Documento eliminado correctamente');
    } else {
      res.status(404).send('Código LOINC no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al eliminar el documento: ' + err);
  } finally {
    await client.close();
  }
});

// Endpoint: Agregar un nuevo documento
app.post('/loinc', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const newDocument = req.body;
    const result = await collection.insertOne(newDocument);

    res.status(201).send(`Documento añadido con ID: ${result.insertedId}`);
  } catch (err) {
    res.status(500).send('Error al añadir el documento: ' + err);
  } finally {
    await client.close();
  }
});

// Endpoint: Actualizar un documento por código
app.put('/loinc/:code', async (req, res) => {
  const client = new MongoClient(uri);

  try {
    await client.connect();
    const db = client.db(dbName);
    const collection = db.collection(collectionName);

    const code = req.params.code;
    const updateData = req.body;
    const result = await collection.updateOne({ LOINC_NUM: code }, { $set: updateData });

    if (result.matchedCount > 0) {
      res.send('Documento actualizado correctamente');
    } else {
      res.status(404).send('Código LOINC no encontrado');
    }
  } catch (err) {
    res.status(500).send('Error al actualizar el documento: ' + err);
  } finally {
    await client.close();
  }
});

app.listen(port, () => {
  console.log(`API ejecutándose en http://localhost:${port}`);
});
