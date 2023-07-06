const Vet = require('../models/Vets');

// exports.createVet = async (req, res) => {
//   try {
//     const vet = await Vet.create(req.body);
//     return res.status(201).json(vet);
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.createVet = async (req, res) => {
//   try {
//     // console.log('Getting here');
//     console.log(req.body.vetFiles);
//     let additionalDocuments = [];
//     if (req.files && req.files.length > 0) {
//       additionalDocuments = req.files.map((file) => file.filename);
//     }
//     const vet = await Vet.create({
//       ...req.body,
//       additionalDocuments
//     });
//     return res.status(201).json({status: "success", data: vet});
//   } catch (error) {
//     return res.status(500).json({status: "failed", message: 'Internal server error' });
//   }
// };

exports.createVet = async (req, res) => {
  try {
    const { vetLicense, additionalDocuments } = req.body.vetFiles;

    const vet = await Vet.create({
      ...req.body,
      vetLicense: vetLicense[0], 
      additionalDocuments,
    });

    return res.status(201).json({ status: "success", data: vet });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "failed", message: error.message });
  }
};


exports.getVets = async (req, res) => {
  try {
    const vets = await Vet.find();
    return res.status(200).json({ status: "success", data: vets});
  } catch (error) {
    return res.status(500).json({ status: "failed", message: 'Internal server error' });
  }
};

exports.getVet = async (req, res) => {
  try {
    const vet = await Vet.findById(req.params.id);
    if (!vet) {
      return res.status(404).json({ status: "failed", message: 'Vet not found' });
    }
    return res.status(200).json({status: "success", data: vet});
  } catch (error) {
    return res.status(500).json({status: "success", message: 'Internal server error' });
  }
};

// exports.updateVet = async (req, res) => {
//   try {
//     const vet = await Vet.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     if (!vet) {
//       return res.status(404).json({ message: 'Vet not found' });
//     }
//     return res.status(200).json(vet);
//   } catch (error) {
//     return res.status(500).json({ message: 'Internal server error' });
//   }
// };

// exports.updateVet = async (req, res) => {
//   try {
//     let additionalDocuments = [];
//     if (req.files && req.files.length > 0) {
//       additionalDocuments = req.files.map((file) => file.filename);
//     }
//     const vet = await Vet.findByIdAndUpdate(req.params.id, {
//       ...req.body,
//       additionalDocuments
//     }, { new: true });
//     if (!vet) {
//       return res.status(404).json({ status: "failed", message: 'Vet not found' });
//     }
//     return res.status(200).json({status: "success", data: vet});
//   } catch (error) {
//     return res.status(500).json({status: "failed", message: 'Internal server error' });
//   }
// };

exports.updateVet = async (req, res) => {
  try {
    const oldVet = await Vet.findById(req.params.id);
    if (!oldVet) {
      return res.status(404).json({ status: "failed", message: 'Vet not found' });
    }

    let updatedFields = {};

    for (const key in req.body) {
      if (req.body.hasOwnProperty(key)) {
        if (key === 'images') {
          if (req.files && req.files.length > 0) {
            updatedFields[key] = req.files.map((file) => file.filename);
          }
        } else {
          updatedFields[key] = req.body[key];
        }
      }
    }

    const vet = await Vet.findByIdAndUpdate(req.params.id, updatedFields, { new: true });
    return res.status(200).json({status: "success", data: vet});
  } catch (error) {
    return res.status(500).json({status: "failed", message: 'Internal server error' });
  }
};


exports.deleteVet = async (req, res) => {
  try {
    const vet = await Vet.findByIdAndDelete(req.params.id);
    if (!vet) {
      return res.status(404).json({status: "failed", message: 'Vet not found' });
    }
    return res.status(200).json({status: "success", message: 'Vet deleted successfully' });
  } catch (error) {
    return res.status(500).json({status: "failed", message: 'Internal server error' });
  }
};
