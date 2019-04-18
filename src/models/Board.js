const mongoose = require('mongoose');
const _ = require('underscore');
const Story = require('./Story');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;

let BoardModel = {};

// mongoose.Types.ObjectId is a function that
// converts string ID to real mongo ID
const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const BoardSchema = new Schema({
  // primary key
  id: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  stories: [Story.StorySchema],

  owner: {
    type: mongoose.Schema.ObjectId,
    required: true,
    ref: 'Account',
  },

  createdDate: {
    type: Date,
    default: Date.now,
  },
});

BoardSchema.statics.toAPI = doc => ({
  id: doc.id,
  stories: doc.stories,
});

BoardSchema.statics.findByOwner = (ownerId, callback) => {
  const query = {
    owner: convertId(ownerId),
  };

  return BoardModel.find(query).select('stories').exec(callback);
};

BoardSchema.statics.deleteById = (ownerId, boardId, callback) => {
  const query = {
    owner: convertId(ownerId),
    boardId,
  };

  return BoardModel.deleteOne(query, callback);
};

BoardModel = mongoose.model('Board', BoardSchema);

module.exports = BoardModel;
