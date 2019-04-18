const models = require('../models');

const { Story } = models;

const makeStory = (req, res) => {
  if (!req.body.title || !req.body.description || !req.body.status) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const storyData = {
    title: req.body.title,
    status: req.body.status,
    description: req.body.description,
    owner: req.session.account._id,
  };

  const newStory = new Story.StoryModel(storyData);

  const storyPromise = newStory.save();

  storyPromise.then(() => res.json({ redirect: '/storyboard' }));

  storyPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Story already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return storyPromise;
};

const getStories = (request, response) => {
  const req = request;
  const res = response;

  return Story.StoryModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ stories: docs });
  });
};

const deleteStory = (request, response) => {
  const req = request;
  const res = response;

  if (!req.body.title) {
    return res.status(400).json({ error: 'A title is required for deletion.' });
  }

  return Story.StoryModel.deleteByTitle(req.session.account._id, req.body.title, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ story: doc, message: `Story with title ${doc.name} was successfully deleted.` });
  });
};

module.exports = {
  makeStory,
  getStories,
  deleteStory,
};
