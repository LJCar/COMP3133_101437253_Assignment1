const express = require('express')
const { graphqlHTTP } = require('express-graphql')
const  schema  = require('./src/graphql/schema');
const resolvers  = require('./src/graphql/resolvers');
const connectDB = require('./src/config/db');
require('dotenv').config();
const app = express()
const SERVER_PORT = process.env.PORT || 3000;

(async () => {
    try {
        await connectDB();
    } catch (err) {
        console.error('Failed to connect to database:', err);
        process.exit(1);
    }
})();

const graphqlHttp = graphqlHTTP({
    schema: schema,
    rootValue: resolvers,
    graphiql: true
})

app.use("/graphql", graphqlHttp)

app.listen(SERVER_PORT, () => {
    console.log(`Listening on port ${SERVER_PORT}`)
    console.log('http://localhost:3000/graphql')
})

