import { ApolloServer } from 'apollo-server-micro';
import schema from '../../graphql/schema';

const apolloServer = new ApolloServer({
  schema,
  subscriptions: false,
  introspection: true
});

export const config = {
  api: {
    bodyParser: false
  }
};

const startServer = apolloServer.start();

export default async function handler(req, res) {
  await startServer;
  await apolloServer.createHandler({
    path: '/api/graphql'
  })(req, res);
}
