const express = require("express");
const xml2js = require("xml2js");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.text({ type: "text/xml" }));

app.post("/convert", (req, res) => {
  const xml = req.body;

  xml2js.parseString(xml, { explicitArray: false }, (err, result) => {
    if (err) {
      console.error(err);
      res.status(400).json({ error: "Invalid XML" });
    } else {
      const json = JSON.stringify(result, null, 2);
      res.setHeader("Content-Type", "application/json"); // Define o header para indicar o tipo de conteúdo como JSON
      res.send(json); // Retorna o JSON diretamente no response
    }
  });
});

const port = 3333;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
