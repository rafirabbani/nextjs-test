import { google } from "googleapis";
import fs from 'fs'

async function readCredentials() {
    const credentialFile =  fs.readFileSync('credentials-path');
}

export default function handler(req, res) {
    res.status(200).json({ token: 'abc' });
};