const multer = require("multer");
const path = require("path");
const fs = require("fs");

// upload images not more than 2MB in size
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
    console.log(oldFileName);
    cb(null, Date.now() + "-" + oldFileName.replace(/\s+/g, '_'));
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
