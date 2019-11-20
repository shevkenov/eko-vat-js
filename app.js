const express = require("express");
const formidable = require("formidable");
const iconv = require("iconv-lite");
const fs = require("fs");

const app = express();

let fileData = {
  fileName: "",
  data: []
};

const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

app.post("/upload", (req, res) => {
  
  const form = new formidable.IncomingForm();
  form.uploadDir = "upload";
  form.keepExtensions = true;
  
  form.parse(req);
  form.on("file", (name, file) => {
    
    const oldPath = file.path;
    const newPath = form.uploadDir + "/" + file.name;
    fileData.fileName = file.name;

    fs.renameSync(oldPath, newPath);

    const buffer = iconv.decode(fs.readFileSync(newPath), "win1251");
    const stringBuffer = buffer.toString();
    fileData.data = stringBuffer.split("\r\n").map(line => line.trim());

    fs.unlink(newPath, error => {
      if (error) throw error;
    });

    res.write('OK');
    res.end();

  });
});

app.get(
  "/download",
  (req, res) => {
    const file = __dirname + "/" + fileData.fileName;
    const stringData = iconv.encode(fileData.data.join("\r\n"), "win1251");

    fs.writeFileSync(file, stringData, error => {
      if (error) throw error;
    });

    res.download(file, error => {
      if (error) {
        throw error;
      }

      fs.unlink(file, err => {
        if (err) throw err;
      });
    });   
  }
);  

app.listen(port, () => console.log(`The server is listening on port ${port}!`));
