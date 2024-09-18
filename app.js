
require("dotenv").config();
const express = require("express");
const multer = require("multer");
const { downloadBlob } = require("./helpers/blobStorage");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


const PORT = process.env.PORT || 3000;
// Set up storage engine
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

// Initialize upload variable
const upload = multer({ storage: storage });

app.get('/', (req, res) => {
    res.send('Hello World!')
});

app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;
    
    const streamBuffer = await downloadBlob(filename, `uploads/${filename}`);

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', `attachment; filename=${filename}`);
    streamBuffer.pipe(res); 
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

