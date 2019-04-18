const models = require('../models');

const { Board } = models;

const makeBoard = (req, res) => {
  if (!req.body.title) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  const boardData = {
    id: req.body.title,
    owner: req.session.account._id,
  };

  const newBoard = new Board.BoardModel(boardData);

  const boardPromise = newBoard.save();

  boardPromise.then(() => res.json({ redirect: '/storyboard' }));

  boardPromise.catch((err) => {
    console.log(err);
    if (err.code === 11000) {
      return res.status(400).json({ error: 'Board already exists.' });
    }

    return res.status(400).json({ error: 'An error occurred' });
  });

  return boardPromise;
};

const getBoards = (request, response) => {
  const req = request;
  const res = response;

  return Board.BoardModel.findByOwner(req.session.account._id, (err, docs) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ boards: docs });
  });
};

const deleteBoard = (request, response) => {
  const req = request;
  const res = response;

  if (!req.body.title) {
    return res.status(400).json({ error: 'A title is required for deletion.' });
  }

  return Board.BoardModel.deleteById(req.session.account._id, req.body.title, (err, doc) => {
    if (err) {
      console.log(err);
      return res.status(400).json({ error: 'An error occurred' });
    }

    return res.json({ board: doc, message: `Board with title ${doc.name} was successfully deleted.` });
  });
};

module.exports = {
  makeBoard,
  getBoards,
  deleteBoard,
};
