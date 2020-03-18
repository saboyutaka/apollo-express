const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');

const port = process.env.PORT || 4000;

const typeDefs = gql`
  type Query {
    hello: String @cacheControl(maxAge: 10)
    bye: String
  }
`;

const resolvers = {
  Query: {
    hello: async () => {
      return 'Hello world!'
    },
    bye: async () => {
      return 'Bye!'
    }
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  cacheControl: true,
  tracing: true,
  engine: false,
});

const app = express();
server.applyMiddleware({ app });


app.listen({ port: port }, () =>
  console.log(`🚀 Server ready at ${server.graphqlPath}`)
);
