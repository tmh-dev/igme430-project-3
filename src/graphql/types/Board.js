const graphql = require('graphql');
const StoryType = require('./Story');
const Story = require('../models');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = graphql;

const BoardType = new GraphQLObjectType({
  name: 'Board',
  fields: () => ({
    id: { type: GraphQLID },
    title: { type: GraphQLString },
    stories: {
      type: new GraphQLList(StoryType),
      resolve(parent, args) {
        return Story.find({ boardId: parent.id });
      },
    },
    ownerId: { type: GraphQLID },
  }),
});

module.exports = BoardType;
