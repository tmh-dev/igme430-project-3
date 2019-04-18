const mongoose = require('mongoose');

const { Schema } = mongoose;

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },

  status: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
    trim: true,
  },

  boardId: {
    type: String,
    required: true,
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

const StoryModel = mongoose.model('Story', StorySchema);

module.exports = StoryModel;
