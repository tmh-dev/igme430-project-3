const mongoose = require('mongoose');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  ownerId: {
    type: String,
    required: true,
  },
});

const BoardModel = mongoose.model('Board', BoardSchema);

module.exports = BoardModel;
