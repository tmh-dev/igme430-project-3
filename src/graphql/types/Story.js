const graphql = require('graphql');
const BoardType = require('./Board');
const Board = require('../../models');

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
    board: {
      type: BoardType,
      resolve(parent, args) {
        // return _.find(boards, { id: parent.boardId })
        return Board.findById(parent.boardId);
      },
    },
  }),
});

module.exports = StoryType;
