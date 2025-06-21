const mongoose = require('mongoose');
const TeamSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  adminId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
});
module.exports = mongoose.model('Team', TeamSchema);
