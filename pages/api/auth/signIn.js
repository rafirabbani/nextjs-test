export default function handler(req, res) {
    console.log(process.cwd());
    res.status(200).json({ token: 'abc' });
};