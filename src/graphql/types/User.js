const graphql = require('graphql');
const BoardType = require('./Board');

const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLList,
  GraphQLID,
} = graphql;

const UserType = new GraphQLObjectType({
  name: 'User',
  fields: () => ({
    id: GraphQLID,
    email: GraphQLString,
    password: GraphQLString,
    boards: {
      type: new GraphQLList(BoardType),
      resolve(parent, args) {

      },
    },
  }),
});

module.exports = UserType;
