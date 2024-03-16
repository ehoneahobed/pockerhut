const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const announcementSchema = new Schema({
  subject: {
    type: String,
    required: true,
  },
  content: {
    type: String,
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    // required: true,
  },
});

announcementSchema.virtual('isActive').get(function () {
  return Date.now() >= this.startDate && Date.now() <= this.endDate;
});

module.exports = mongoose.model('Announcement', announcementSchema);
