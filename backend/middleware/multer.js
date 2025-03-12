import multer from "multer";

// we will create storage configuration
const storage = multer.diskStorage({
  // here we will pass a object where we will declare fileName property
  filename: function (req, file, callback) {
    callback(null, file.originalname);
  },
});

// now using this diskStorage we will now create Upload middleware

// simply provide the storage which we created above you should name the file as storage otherwise the middleware will not work
const upload = multer({ storage });

export default upload;
