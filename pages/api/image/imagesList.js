import { auth } from 'google-auth-library';
import { Storage } from '@google-cloud/storage';


// create google cloud auth client
function googleAuthClient() {
    const client = auth.fromJSON({
        type: process.env.TYPE,
        project_id: process.env.PROJECT_ID,
        private_key_id: process.env.PRIVATE_KEY_ID,
        private_key: process.env.PRIVATE_KEY,
        client_email: process.env.CLIENT_EMAIL,
        client_secret: process.env.CLIENT_SECRET
    });

    client.scopes = ['https://www.googleapis.com/auth/cloud-platform'];
    return client;
};

// get file list from google cloud storage
async function listFiles(client) {
    try {
        const response = [];
        // create storage client
        const storage = new Storage({authClient: client});

        // get file list from bucket
        const [storageResponse] = await storage.bucket(process.env.BUCKET_NAME).getFiles();
        
        // return parsed response 
        for (const data of storageResponse) {
            response.push({fileName: data.metadata.name, bucketName: process.env.BUCKET_NAME});
        }

        return response
    }
    catch (err) {
        console.log('error listFiles function', err);
        return err;
    }
};

export default async function handler(req, res) {
    try {
        const client = googleAuthClient()
        const files = await listFiles(client);
        return res.status(200).send({files});
    }
    catch (err) {
        console.log('error api call', err);
        return res.status(500).json({error: err});
    }
};