const graphql = require('graphql');
// const jwt = require('jsonwebtoken');
const models = require('./models');
const types = require('./types');

const { Story, Board } = models;
const { StoryType, BoardType } = types;

// const secret = 'mysecretshhhh';

const {
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLID,
} = graphql;

const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: () => ({
    board: {
      type: BoardType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source
        return Board.findById(args.id);
      },
    },
    story: {
      type: StoryType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db /other source
        return Story.findById(args.id);
      },
    },
    boards: {
      type: new GraphQLList(BoardType),
      args: { ownerId: { type: GraphQLID } },
      resolve(parent, args) {
        // return _.filter(boards, userId)
        return Board.find({ ownerId: args.id });
      },
    },
  }),
});

const Mutation = new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    // signup: {
    //   type: UserType,
    //   args: {
    //     email: { type: GraphQLNonNull(GraphQLString) },
    //     password1: { type: GraphQLNonNull(GraphQLString) },
    //     password2: { type: GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(parent, args) {
    //     if (args.password1.trim() !== args.password2.trim()) {
    //       return {
    //         error: 'Passwords do not match.',
    //       };
    //     }

    //     return User.generateHash(args.password1, (salt, hash) => {
    //       const user = new User({
    //         email: args.email,
    //         salt,
    //         password: hash,
    //       });

    //       try {
    //         user.save();

    //         const payload = User.toAPI(user);
    //         const token = jwt.sign(payload, secret, {
    //           expiresIn: '2h',
    //         });

    //         return {
    //           success: true,
    //           message: 'Authentication Successful',
    //           token,
    //         };
    //       } catch (err) {
    //         if (err.code === 11000) {
    //           return {
    //             error: 'Email already in use.',
    //           };
    //         }
    //       }

    //       return {
    //         error: 'An error occurred',
    //       };
    //     });
    //   },
    // },
    // login: {
    //   type: UserType,
    //   args: {
    //     email: { type: GraphQLNonNull(GraphQLString) },
    //     password: { type: GraphQLNonNull(GraphQLString) },
    //   },
    //   resolve(parent, args) {
    //     return User.Authenticate(args.email, args.password, (err, user) => {
    //       if (err || !user) {
    //         return {
    //           error: 'Invalid username or password',
    //         };
    //       }

    //       const payload = User.toAPI(user);
    //       const token = jwt.sign(payload, secret, {
    //         expiresIn: '2h',
    //       });

    //       return {
    //         success: true,
    //         message: 'Authentication Successful',
    //         token,
    //       };
    //     });
    //   },
    // },
    addBoard: {
      type: BoardType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        // ownerId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const board = new Board({
          title: args.title,
          // ownerId: args.ownerId,
        });

        return board.save();
      },
    },
    addStory: {
      type: StoryType,
      args: {
        title: { type: GraphQLNonNull(GraphQLString) },
        status: { type: GraphQLString },
        description: { type: GraphQLString },
        boardId: { type: GraphQLNonNull(GraphQLID) },
      },
      resolve(parent, args) {
        const story = new Story({
          title: args.title,
          status: args.status,
          description: args.description,
          boardId: args.boardId,
        });

        return story.save();
      },
    },
  },
});

module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation: Mutation,
});
