const express = require("express");
const router = express.Router();
const multer = require("multer");

const storage = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, "./uploadImages")
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + ".jpg")   //timestamp.jpg
    }
})


const upload = multer({
    storage: storage,
});

router.route("/addimage").post(upload.single("img"), (req, res) => {
    console.log("image uploaded");
    try {
        res.json({ path:req.file.filename });
    } catch (error) {
        return res.json({
            error: e
        });
    }
});

module.exports=router;