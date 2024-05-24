const graphql = require("graphql");
const { GraphQLObjectType, GraphQLString, GraphQLSchema, GraphQLID, GraphQLInt } = graphql;
const _ = require("lodash");

//dummy data
var bookData = [
    { name: "Name of the Wind", genre: "Fantasy", id: "1", authorId: "1" },
    { name: "The Final Empire", genre: "Fantasy", id: "2", authorId: "2" },
    { name: "The Long Earth", genre: "Sci-Fi", id: "3", authorId: "3" }
];

var authorsData = [
    { name: "Patrick Wilson", age: 44, id: "1" },
    { name: "Brandon Rogers", age: 26, id: "2" },
    { name: "Kyle Walker", age: 32, id: "3" }
];

const BookType = new GraphQLObjectType({
    name: "Book",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genre: { type: GraphQLString },
        author: {
            type: AuthorType,
            resolve(parent, args) {
                return _.find(authorsData, { id: parent.authorId })
            }
        }
    })
});

const AuthorType = new GraphQLObjectType({
    name: "Author",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {
        book: {
            type: BookType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db
                return _.find(bookData, { id: args.id });
            }
        },

        author: {
            type: AuthorType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                // code to get data from db
                return _.find(authorsData, { id: args.id });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});