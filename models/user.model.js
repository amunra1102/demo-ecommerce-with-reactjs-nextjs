import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  root: {
    type: Boolean,
    default: false
  },
  avatar: {
    type: String,
    default: 'http://diembaoaz.com/wp-content/uploads/2018/11/anh-girl-xinh-9-1.jpg'
  }
}, {
  timestamps: true
});

const Dataset = mongoose.models.user || mongoose.model('user', userSchema);
export default Dataset;
