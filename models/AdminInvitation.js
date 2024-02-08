const mongoose = require("mongoose");

const invitationSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  role: {
    type: String,
    enum: ['admin', 'superadmin'],
    required: true
  },
  token: { type: String, required: true, unique: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false }
});

module.exports = mongoose.model("Invitation", invitationSchema);
