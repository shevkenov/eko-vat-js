const express = require("express");
//const fileUpload = require("express-fileupload");
const app = express();
const port = 3000;

app.use(express.static("public"));
//app.use(fileUpload());

app.get("/", (req, res) => {
    res.sendFile("index.html");
});

// app.post("/upload", function(req, res) {
//   if (!req.files) {
//     return res.status(400).send("No files were uploaded.");
//   }

//   let myFile = req.files.myFile;

//   myFile.mv("./upload/" + myFile.name, function(err) {
//     if (err) return res.status(500).send(err);

//     res.end();
//   });
// });

const fs = require("fs");

app.post("/saveImage", (req, res) => {
  console.log(req);
  
  const fileName = req.files.myFile.name;
  
  fs.readFile(req.files.myFile.path, (err, data) => {
    const newPath = __dirname + "/upload/" + fileName;
    fs.writeFile(newPath, data, error => {
      if (error) {
        console.error(error);
        res.end();
      } else {
        res.end(fileName);
        //here you can save the file name to db, if needed
      }
    });
  });
});

app.listen(port, () => console.log(`The server is listening on port ${port}!`));
