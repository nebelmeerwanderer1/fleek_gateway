const express = require("express")
const cors = require('cors')
const multer = require("multer")
const path = require("path")
const fleekStorage = require('@fleekhq/fleek-storage-js')
require('dotenv').config();

const app = express()

// const storage = multer.diskStorage({
//     destination: "./upload/images",
//     filename: (req, file, cb) => {
//         return cb(null,  `${file.fieldname}_${Date.now()}_${file.originalname}`)
//         // ${path.extname(file.originalname)}
//     }
// })

// const upload = multer({
//     storage: storage, 
//     limits: {fileSize: 100000000000000}
// })

const storage = multer.memoryStorage()
const upload = multer({ storage: storage })

app.use(cors({
    origin: 'http://localhost:3000',
}))

app.use("/profile", express.static("upload/images"))

app.get("/upload", (req,res) => {
    res.send("HALLLOOOOO!!!")
})



app.post("/upload", upload.single("profile"), async (req,res) => {
    
    console.log(req.file)
    
    let uploadedFile

    try {
      uploadedFile = await fleekStorage.upload({
      apiKey: process.env.FLEEK_KEY,
      apiSecret: process.env.FLEEK_SECRET,
      key: `${req.file.fieldname}_${Date.now()}_${req.file.originalname}`,
      data: req.file.buffer,
      bucket:'d134e9df-8e89-44e3-8632-20922d73b6ed-bucket/inheritance',
      httpUploadProgressCallback: (event) => {
        console.log(Math.round(event.loaded/event.total*100)+ '% done');
            }
        }); 

        console.log(`inside: ${uploadedFile.publicUrl}`)
    } catch (error) { console.error(error)}

    console.log(`outside: ${uploadedFile.publicUrl}`)

    console.log(req.file)

    res.json({
        success: 1,
        //profile_url: `http://localhost:4000/profile/${req.file.filename}`,
        profile_url: uploadedFile.hash,
    })

    console.log(res.json)
})

function errHandler(err, req, res, next) {
    if (err instanceof multer.MulterError) {
        res.json({
            success: 0, 
            message: err.message
        })
    }
}

app.use(errHandler)

app.listen(4000, () => {
    console.log("Server up and running")
})