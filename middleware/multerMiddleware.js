import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    var uploadCat = "";
    var uploadTypeCat = "";
    var uploadPath = "client/src/assets/images/Uploads/";

    var uploadType = req.body.type.toUpperCase();
    if (uploadType == "PRODUCTS") {
      uploadCat = req.body.category.toUpperCase().replace(/\s/g, "_");
      uploadTypeCat = uploadType + "/" + uploadCat;
    } else if (uploadType == "BRANDS") {
      uploadTypeCat = uploadCat;
    }
    var uploadFolderName = req.body.imgID;
    uploadPath += uploadType + "/" + uploadCat + "/" + uploadFolderName;
    if (uploadTypeCat && uploadFolderName != "") {
      return cb(null, uploadPath);
    } else {
      return "error";
    }
  },
  filename: (req, file, cb) => {
    const fileName = file.originalname;
    // set the name of the uploaded file
    cb(null, fileName);
  },
});
const upload = multer({ storage });

export default upload;
