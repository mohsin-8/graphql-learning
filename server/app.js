require("dotenv").config();
const express = require("express");
const { graphqlHTTP } = require("express-graphql");
const schema = require("./schema/schema");
const ConnectingDB = require("./config/database");

const app = express();
const PORT = process.env.PORT || 8000;

//Middleware
app.use("/graphql", graphqlHTTP({
    schema,
    graphiql: true
}));

//Connecting to mongodb database
ConnectingDB();

app.listen(PORT, () => console.log(`server is running on port: ${PORT}`));