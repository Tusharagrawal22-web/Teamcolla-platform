import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  uid: { type: String, required: true, unique: true },
  email: String,
  name: String,
  role: { type: String, default: 'member' },
  teamId: String,
});

export default mongoose.model('User', userSchema);
