const fs = require('fs');
const csv = require('csvtojson');

const inputFilePath = 'loinc.csv'; // Reemplaza con la ruta del archivo CSV
const outputFilePath = 'loinc.json';

csv()
  .fromFile(inputFilePath)
  .then((jsonArray) => {
    fs.writeFileSync(outputFilePath, JSON.stringify(jsonArray, null, 2), 'utf8');
    console.log('CSV convertido a JSON y guardado en', outputFilePath);
  })
  .catch((err) => console.error('Error al convertir:', err));
