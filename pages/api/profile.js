import fs from "fs";
import path from "path";

// get file list from google cloud storage
async function listProfiles(lang) {
  const filePath = path.join(process.cwd(), "/pages/api/profile-data");
  return new Promise((resolve, reject) => {
    return fs.readFile(path.join(filePath, `${lang}.json`), (err, file) => {
        if (err) {
            if (err.code === "ENOENT") {
                const defaultFile = fs.readFileSync(path.join(filePath, "eng.json"));
                const defaultJsonFile = JSON.parse(defaultFile);
                return resolve({"eng": defaultJsonFile});
            }
            return reject(err);
        }
        const jsonFile = JSON.parse(file)
        return resolve({[lang]: jsonFile})
    })
  });
}

export default async function handler(req, res) {
  try {
    const lang = req?.query?.lang;
    const profile = await listProfiles(lang);
    return res.status(200).send({ profile });
  } catch (err) {
    console.log("error api call", err);
    return res.status(500).json({ error: err });
  }
}
