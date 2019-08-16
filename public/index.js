 const fileUploadForm = document.getElementById("fileUpload");
// fileUploadForm.addEventListener("submit", function(event) {
//   const formData = new FormData();

//   const fileField = document.querySelector('input[type="file"]');
//   formData.append("avatar", fileField.files[0]);

//   uploadFile("/upload",fileField);

//   event.preventDefault();
//   event.stopPropagation();
// });

// async function uploadFile(url, file) {
//   const response = await fetch(url, {
//     method: "POST",
//     body: file
//   });
//   const utf8Decoder = new TextDecoder("utf-8");
//   const reader = response.body.getReader();

//   let { value: chunk, done: readerDone } = await reader.read();
//   chunk = chunk ? utf8Decoder.decode(chunk) : "";
//   console.log(chunk);
// }

const sendFile = file => {
  const uri = "/saveImage";
  const xhr = new XMLHttpRequest();
  const fd = new FormData();

  xhr.open("POST", uri, true);
  xhr.onreadystatechange = () => {
    if (xhr.readyState == 4 && xhr.status == 200) {
      const imageName = xhr.responseText;
      //do what you want with the image name returned
      //e.g update the interface
    }
  };
  fd.append("myFile", file);
  xhr.send(fd);
};

const handleImageUpload = event => {
  const files = event.target.files;
  sendFile(files[0]);
};

fileUploadForm.addEventListener("change", event => {
  handleImageUpload(event);
  
  event.preventDefault();
  event.stopPropagation();
});
