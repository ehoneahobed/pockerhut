const multer = require("multer");
const path = require("path");
const fs = require("fs");
const cloudinary = require("../utils/cloudinary");
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
    console.log(req.file);
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
};

// ******************* END OF FILE UPLOAD FROM LOCAL TO CLOUDINARY ****

// ********* START OF DIRECT UPLOAD TO CLOUDINARY THROUGH MEMORY *****
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

const imageUpload = multer({
  storage: imageStorage,
  fileFilter: fileFilterCloudinary,
});

exports.uploadSingleImage = imageUpload.single("featuredImage");

exports.uploadToCloudinary = async (req, res, next) => {
  try {
    // Check if there is a file uploaded by Multer
    if (!req.file) {
      return next();
    }

    console.log({ file: req.file });

    const result = await cloudinary.uploader
      .upload_stream(
        {
          folder: "porkerhut",
          allowed_formats: ["jpg", "jpeg", "png", "svg"],
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
      )
      .end(req.file.buffer);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ****************** END OF UPLOAD TO CLOUDINARY DIRECTLY **************

// ************* START OF MULTIPLE UPLOAD TO LOCAL STORAGE BY MULTER ************
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

// ******* UPLOAD MULTIPLE IMAGES TO CLOUDINARY ***********************

const cloudinaryStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "porkerhut/products",
    allowed_formats: ["jpg", "jpeg", "png", "svg"],
  },
});

// Configure Multer to accept only certain file types
const imageFilterCloudinary = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "image/svg+xml"];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type");
    cb(new Error("Invalid file type."), false);
  }
};

// Create the Multer instance with Cloudinary storage and file filter
const imageMultipleUpload = multer({
  storage: cloudinaryStorage,
  fileFilter: imageFilterCloudinary,
  limits: {
    fileSize: 5 * 1024 * 1024, // Increase the file size limit to 5 MB
  },
});

exports.uploadMultipleImages = imageMultipleUpload.array("productImages", 4);

exports.uploadMultiToCloudinary = async (req, res, next) => {
  try {
    // Check if there are files uploaded by Multer
    if (!req.files || req.files.length === 0) {
      throw new Error("No files uploaded");
    }

    urls = [];
    // Upload all files to Cloudinary in parallel
    await Promise.all(
      req.files.map(async (file) => {
        urls.push(file.path);
        if (file.size === 0) {
          console.log(`${file.filename} File is empty`);
          return;
        }

        await cloudinary.uploader.upload_stream(file.buffer);
        // console.log(urls);
        return urls;
      })
    );

    // Add the Cloudinary URLs to the request body
    req.body.productImages = urls;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// *** UPLOAD files/images for vendor registration

const vendorStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "porkerhut/vendor",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  },
});

const vendorFileFilterCloudinary = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type");
    cb(new Error("Invalid file type."), false);
  }
};

const vendorFileUpload = multer({
  storage: vendorStorage,
  fileFilter: vendorFileFilterCloudinary,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
}).fields([
  { name: "IDFile", maxCount: 1 },
  { name: "CACCertificateFile", maxCount: 1 },
  { name: "TINCertificateFile", maxCount: 1 },
  { name: "profilePhoto", maxCount: 1 },
]);

exports.uploadVendorFiles = vendorFileUpload;

exports.uploadVendorFilesToCloudinary = async (req, res, next) => {
  try {
    // Check if there are files uploaded by Multer
    if (!req.files) {
      throw new Error("No files uploaded");
    }

    const urls = {};

    // Upload all files to Cloudinary in parallel
    await Promise.all(
      Object.keys(req.files).map(async (fieldName) => {
        const file = req.files[fieldName][0];
        // console.log(file);
        if (file.size === 0) {
          console.log(`${file.filename} File is empty`);
          return;
        }

        const result = await cloudinary.uploader.upload_stream(file.buffer);
        // console.log(result);
        urls[fieldName] = file.path;
      })
    );

    // Add the Cloudinary URLs to the request body
    req.body.vendorFiles = urls;

    // console.log(urls);
    // console.log(req.body.vendorFiles);

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//  this new implementation allows us to proceed even if no files
// were provided (for cases like when updating a vendor)
// exports.uploadVendorFilesToCloudinary = async (req, res, next) => {
//   if (req.files && Object.keys(req.files).length) {
//     try {
//       const urls = {};

//       // Upload all files to Cloudinary in parallel
//       await Promise.all(
//         Object.keys(req.files).map(async (fieldName) => {
//           const file = req.files[fieldName][0];
//           if (file.size === 0) {
//             console.log(`${file.filename} File is empty`);
//             return;
//           }

//           const result = await cloudinary.uploader.upload_stream(file.buffer);
//           //         // console.log(result);
//           urls[fieldName] = file.path;
//         })
//       );

//       // Add the Cloudinary URLs to the request body
//       req.body.vendorFiles = urls;
//       next();
//     } catch (error) {
//       res.status(500).json({ error: error.message });
//     }
//   } else {
//     // Proceed if no files are uploaded
//     next();
//   }
// };

// *** UPLOAD files/images for vet registration

const vetStorage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "porkerhut/vets",
    allowed_formats: ["jpg", "jpeg", "png", "pdf", "doc", "docx"],
  },
});

const vetFileFilterCloudinary = (req, file, cb) => {
  const allowedFileTypes = [
    "image/jpeg",
    "image/png",
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];
  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    console.log("Invalid file type");
    cb(new Error("Invalid file type."), false);
  }
};

const vetFileUpload = multer({
  storage: vetStorage,
  fileFilter: vetFileFilterCloudinary,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5 MB file size limit
  },
}).fields([
  { name: "vetLicense", maxCount: 1 },
  { name: "additionalDocuments", maxCount: 5 }, // Update the maxCount value as per your requirements
]);

exports.uploadVetFiles = vetFileUpload;

exports.uploadVetFilesToCloudinary = async (req, res, next) => {
  try {
    // Check if there are files uploaded by Multer
    if (!req.files) {
      throw new Error("No files uploaded");
    }

    const urls = {};

    // Upload all files to Cloudinary in parallel
    await Promise.all(
      Object.keys(req.files).map(async (fieldName) => {
        const files = req.files[fieldName];
        if (files.length === 0) {
          console.log(`${fieldName} - No files uploaded`);
          return;
        }

        const fileUrls = [];
        for (const file of files) {
          if (file.size === 0) {
            console.log(`${file.filename} File is empty`);
            continue;
          }

          const result = await cloudinary.uploader.upload_stream(file.buffer);
          fileUrls.push(file.path);
        }

        urls[fieldName] = fileUrls;
      })
    );

    // Add the Cloudinary URLs to the request body
    req.body.vetFiles = urls;

    next();
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
