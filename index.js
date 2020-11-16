const { ApolloServer, PubSub } = require('apollo-server');
const mongoose = require('mongoose');
const {MONGOURL} = require('./config')


const typeDefs = require('./GraphQl/TypeDefs')
const resolvers = require('./GraphQl/resolvers')

const pubsub = new PubSub();

const PORT = process.env.port || 5500;

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })
});

mongoose
  .connect(MONGOURL, { useNewUrlParser: true })
  .then(() => {
    console.log('MongoDB Connected');
    return server.listen({ port: PORT });
  })
  .then((res) => {
    console.log(`Server running at ${res.url}`);
  })
  .catch(err => {
    console.error(err)
  })
