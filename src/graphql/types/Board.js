const graphql = require('graphql');
const models = require('../models');

const { Story } = models;

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
      type: new GraphQLList(require('./Story')),
      resolve(parent, args) {
        console.log(args);
        return Story.find({ boardId: parent.id });
      },
    },
    ownerId: { type: GraphQLID },
  }),
});

module.exports = BoardType;
