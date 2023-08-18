import fs from "fs";
import path from "path";

// get file list from google cloud storage
async function listFiles() {
  const filePath = path.join(process.cwd(), "/public/carousel");
  return new Promise((resolve, reject) => {
    return fs.readdir(filePath, (err, files) => {
      if (err) {
        console.log("err read file", err);
        return reject(err);
      }
      return resolve(
        files.map((f) => {
          return {
            fileName: f,
            filePath: `/carousel/${f}`,
          };
        })
      );
    });
  });
}

export default async function handler(req, res) {
  try {
    const files = await listFiles();
    return res.status(200).send({ files });
  } catch (err) {
    console.log("error api call", err);
    return res.status(500).json({ error: err });
  }
}
