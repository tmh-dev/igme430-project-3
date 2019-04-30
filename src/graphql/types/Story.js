const graphql = require('graphql');
const Board = require('../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} = graphql;

const StoryType = new GraphQLObjectType({
  name: 'Story',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    description: { type: GraphQLString },
    boardId: { type: GraphQLID },
    board: {
      type: require('./Board'),
      resolve(parent, args) {
        console.log(args);
        // return _.find(boards, { id: parent.boardId })
        return Board.findById(parent.boardId);
      },
    },

  }),
});

module.exports = StoryType;
