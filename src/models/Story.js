const mongoose = require('mongoose');

const { Schema } = mongoose;
mongoose.Promise = global.Promise;
const _ = require('underscore');

let StoryModel = {};

const convertId = mongoose.Types.ObjectId;
const setName = name => _.escape(name).trim();

const StorySchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    set: setName,
  },

  status: {
    type: String,
    trim: true,
  },

  description: {
    type: String,
  },

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

StorySchema.statics.toAPI = doc => ({
  title: doc.title,
  description: doc.description,
});

StorySchema.statics.findByOwner = (ownerId, callback) => {
  const query = {
    owner: convertId(ownerId),
  };

  return StoryModel.find(query).select('title status description').exec(callback);
};

StorySchema.statics.deleteByTitle = (ownerId, title, callback) => {
  const query = {
    owner: convertId(ownerId),
    title,
  };

  return StoryModel.deleteOne(query, callback);
};

StoryModel = mongoose.model('StoryNew', StorySchema);

module.exports = {
  StoryModel,
  StorySchema,
};
