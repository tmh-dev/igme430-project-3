const mongoose = require('mongoose');
const Story = require('./Story');

const { Schema } = mongoose;

const BoardSchema = new Schema({
  title: {
    type: String,
    required: true,
  },

  stories: [Story.StorySchema],

  ownerId: {
    type: String,
    required: true,
  },
});

const BoardModel = mongoose.model('Board', BoardSchema);

module.exports = BoardModel;
