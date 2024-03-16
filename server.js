const { NodeGem } = require("@venkadesh004/nodegem/dist/index");
const express = require("express");
const cors = require("cors");

const app = express();

app.use(express.json());
app.use(cors({ origin: "*" }));

const nodeGemApp = new NodeGem(
  "AIzaSyA2YzA1bJfwDwYDeCmBehGt5EXqzEWWytU",
  "gemini-pro-vision"
);

const pKey = require("./pKey.json");

nodeGemApp.connectServiceAccount(pKey.client_id, null, pKey.private_key, [
  "https://www.googleapis.com/auth/drive",
]);

var idList = [];

// async function uploadFile(filename) {
//   await nodeGemApp
//     .uploadFile(filename)
//     .then((result) => {
//       idList.push(result);
//       console.log(idList);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// async function listData() {
//   await nodeGemApp.listFiles(5);
// }

// async function downloadImage(filename, fileID) {
//   await nodeGemApp.downloadFile(filename, fileID, () => {
//     console.log("Done");
//   });
// }

// async function promptImage(prompt, filename, fileID) {
//   await nodeGemApp
//     .driveAndPrompt(prompt, filename, fileID)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

// async function returnImageBuffer(filename, fileID) {
//   await nodeGemApp
//     .returnImageBuffer(filename, fileID)
//     .then((result) => {
//       console.log(result);
//     })
//     .catch((err) => {
//       console.log(err);
//     });
// }

app.post("/returnImage", async (req, res) => {
  const { filename, fileID } = req.body;
  await nodeGemApp
    .returnImageBuffer(filename, fileID)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ err });
    });
});

app.post("/describe", async (req, res) => {
  const { prompt, filename, fileID } = req.body;
  await nodeGemApp
    .driveAndPrompt(prompt, filename, fileID)
    .then((result) => {
      res.status(200).json({ result });
    })
    .catch((err) => {
      res.status(400).json({ err });
    }); 
});

// uploadFile("prasanna.jpeg");
// listData();
// downloadImage("image.jpeg", "1Xg2vwSnT6LmYFuuqg-J-NFTBPQ9JhQEJ");
// promptImage("Describe the dress and generate keywords based on the description", "images.jpeg", "1Xg2vwSnT6LmYFuuqg-J-NFTBPQ9JhQEJ");
// returnImageBuffer("image.jpeg", "1Xg2vwSnT6LmYFuuqg-J-NFTBPQ9JhQEJ");

app.listen(3000, () => {
  console.log("Server started in port 3000");
});
