import mongoose from 'mongoose';

const music = new mongoose.Schema({
  author: {
    type: mongoose.Schema.ObjectId,
    require: true,
  },
  name: {
    type: String,
    require: true,
  },
  music: {
    type: String,
    require: true,
  },
  image: {
    type: String,
    default: 'https://firebasestorage.googleapis.com/v0/b/rahul-30102.appspot.com/o/music%2Fdefault%2Fdownload.jpeg?alt=media&token=445c7f1e-9ab0-4328-80be-717ca699c59d'
  },
  posted: {
    default: Date.now,
    type: Date,
  },
  active: {
    type: Boolean,
    default: true
  }
});
mongoose.models = {};
const x= mongoose.model('music', music);
export default x;