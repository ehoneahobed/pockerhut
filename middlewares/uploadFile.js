const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require('../utils/cloudinary');
const { CloudinaryStorage } = require("multer-storage-cloudinary");


// upload images not more than 2MB in size (to local storage)
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

exports.uploadImage = upload.single("featuredImage");

// upload the image that multer uploaded locally to cloudinary
exports.uploadLoadedImage = async (req, res, next) => {
  try {
    console.log(req.file)
    // Upload image to Cloudinary
    const result = await cloudinary.uploader.upload(req.file.path, {
      folder: "porkerhut",
    });

    // Add Cloudinary URL to request object
    req.file.cloudinaryUrl = result.secure_url;
    console.log(result);

    // Call next middleware
    next();

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

// ******************* END OF FILE UPLOAD FROM LOCAL TO CLOUDINARY ****


// ********* START OF DIRECT UPLOAD TO CLOUDINARY THROUGH MEMORY *****

// upload single image to cloudinary
// const imageStorage = new CloudinaryStorage({
//   cloudinary: cloudinary,
//   params: {
//     folder: "porkerhut",
//     allowed_formats: ["jpg", "jpeg", "png", "svg"]
//   },
// });

// const imageUpload = multer({ storage: imageStorage  });

// exports.uploadSingleImage = imageUpload.single("featuredImage");

// // Middleware to upload the image to Cloudinary
// exports.uploadToCloudinary = async (req, res, next) => {
//   try {
//     // check if there is a file uploaded by Multer
//     if (!req.file) {
//       throw new Error("No file uploaded");
//     }

//     console.log(req.file);

//     // Upload the file to Cloudinary
//     const result = await cloudinary.uploader.upload_stream(
//       {
//         folder: "porkerhut",
//         allowed_formats: ["jpg", "jpeg", "png", "svg"]
//       },
//       (error, result) => {
//         if (error) {
//           throw new Error(error);
//         }

//         console.log(result);

//         // Add the Cloudinary URL to the request body
//         req.body.cloudinaryUrl = result.secure_url;
//         next();
//       }
//     ).end(req.file.buffer);
//   } catch (error) {
//     res.status(500).json({ error: error.message });
//   }
// };



// Configure Multer to store files in memory
const imageStorage = multer.memoryStorage();

// Configure Multer to accept only certain file types
const fileFilterCloudinary = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/svg+xml"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type");
    cb(new Error("Invalid file type."), false);
  }
};

const imageUpload = multer({ storage: imageStorage, fileFilter: fileFilterCloudinary });

exports.uploadSingleImage = imageUpload.single("featuredImage");

exports.uploadToCloudinary = async (req, res, next) => {
  try {
    // Check if there is a file uploaded by Multer
    if (!req.file) {
      throw new Error("No file uploaded");
    }

    console.log({ file: req.file})

    const result = await cloudinary.uploader.upload_stream(
            {
              folder: "porkerhut",
              allowed_formats: ["jpg", "jpeg", "png", "svg"]
            },
            (error, result) => {
              if (error) {
                throw new Error(error);
              }
      
              console.log(result);
      
              // Add the Cloudinary URL to the request body
              req.body.featuredImage = result.secure_url;
              next();
            }
          ).end(req.file.buffer);


  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

























// ****************** END OF UPLOAD TO CLOUDINARY DIRECTLY **************

// upload a maximum of 4 product images
const productImageStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/products");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname.replace(/\s+/g, "_"));
  },
});
const imageFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const ImageUpload = multer({
  storage: productImageStorage,
  fileFilter: imageFilter,
  limits: { fileSize: 2 * 1024 * 1024 },
});

exports.productImageUpload = ImageUpload.array("images", 4);

// upload any file [PDF, Image, Docx] less than 5MB in size
const storageFile = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const fileFilterFile = (req, file, cb) => {
  if (
    file.mimetype === "application/pdf" ||
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(null, false);
  }
};
const uploadFile = multer({
  storage: storageFile,
  fileFilter: fileFilterFile,
  limits: { fileSize: 5 * 1024 * 1024 },
});

exports.uploadFile = uploadFile.single("file");

// upload 4 different files during creation of vendor account
// const vendorStorage = multer.diskStorage({
//     destination: function(req, file, cb) {
//       const dir = 'uploads/vendor';
//       if (!fs.existsSync(dir)) {
//         fs.mkdirSync(dir);
//       }
//       cb(null, dir);
//     },
//     filename: function(req, file, cb) {
//       cb(null, new Date().toISOString() + file.originalname);
//     }
//   });

// const vendorFileFilter = (req, file, cb) => {
//   if (
//     file.mimetype === "image/jpeg" ||
//     file.mimetype === "image/jpg" ||
//     file.mimetype === "image/png" ||
//     file.mimetype === "application/pdf" ||
//     file.mimetype ===
//       "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
//   ) {
//     cb(null, true);
//   } else {
//     cb(null, false);
//   }
// };

// const uploadVendorFiles = multer({
//   storage: vendorStorage,
//   fileFilter: vendorFileFilter,
//   limits: {
//     fileSize: 1024 * 1024 * 5,
//   },
// });

// exports.uploadVendorFiles = uploadVendorFiles.fields([
//   { name: "IDFile", maxCount: 1 },
//   { name: "CACCertificateFile", maxCount: 1 },
//   { name: "TINCertificateFile", maxCount: 1 },
//   { name: "profilePhoto", maxCount: 1 },
// ]);

const vendorStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/vendor");
  },
  filename: function (req, file, cb) {
    oldFileName = file.originalname.trim();
    // console.log(oldFileName);
    cb(null, Date.now() + "-" + oldFileName.replace(/\s+/g, "_"));
  },
});

const vendorFileFilter = (req, file, cb) => {
  if (
    file.mimetype === "image/jpeg" ||
    file.mimetype === "image/png" ||
    file.mimetype === "application/pdf" ||
    file.mimetype === "application/msword" ||
    file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    cb(null, true);
  } else {
    cb(
      new Error(
        "Invalid file type, only JPEG, PNG, PDF, and Word files are allowed"
      ),
      false
    );
  }
};

exports.uploadVendorFiles = multer({
  storage: vendorStorage,
  fileFilter: vendorFileFilter,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).fields([
  { name: "IDFile", maxCount: 1 },
  { name: "CACCertificateFile", maxCount: 1 },
  { name: "TINCertificateFile", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);
