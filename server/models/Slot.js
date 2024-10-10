import mongoose from 'mongoose';

const slotSchema = new mongoose.Schema({
  // dateId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Date'
  // },
  // startTime: String,
  // endTime: String,
  // isBooked: Boolean,
  value: {
    type: String,
    required: true
  },
  label: {
    type: String,
    required: true
  }
});

const Slot = mongoose.model('Slot', slotSchema);
export default Slot;
