import mongoose from 'mongoose';

const dateSchema = new mongoose.Schema({
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const Date = mongoose.model('Date', dateSchema);
export default Date;
