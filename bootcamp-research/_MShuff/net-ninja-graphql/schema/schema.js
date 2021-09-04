const graphql = require('graphql');
const _ = require('lodash');
// Our schema describes the data of the graph(relationshions and whatnot)
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLID,
  GraphQLInt,
  GraphQLList,
} = graphql;

// dummy data
const books = [
  { name: 'Gerrymandering Pisses Me Off', id: '1', authorId: "3" },
  { name: 'The Suffix in the Wind', id: '2', authorId: "2" },
  { name: 'Winnie the Pooh', id: '3', authorId: "1" },
  { name: 'Gerrymandering Makes Me Happy', id: '4', authorId: "1" },
  { name: 'Johnny Come Home...', id: '5', authorId: "2" },
  { name: 'Winnie the Jacked Monkey', id: '6', authorId: "3" },
];

const authors = [
  { name: 'Cole McCoy', age: 500, id: '1' },
  { name: 'Michael Shuff', age: 34, id: '2' },
  { name: 'Mark McClatchy', age: 18, id: '3' },
];

// Every Book has an Author, Every Author has a Collection of Books

const BookType = new GraphQLObjectType({
  name: 'Book',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    genre: { type: GraphQLString },
    author: {
      type: AuthorType,
      resolve(parent, args) {
        console.log(parent);
        return _.find(authors, { id: parent.authorId });
      }
    }
  }),
});

const AuthorType = new GraphQLObjectType({
  name: 'Author',
  fields: () => ({
    id: { type: GraphQLID },
    name: { type: GraphQLString },
    age: { type: GraphQLInt },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return _.filter(books, { authorId: parent.id });
      }
    }
  }),
});


const RootQuery = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    /* book(id: '123') {
        name
        genre
      } */
    book: {
      type: BookType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        // code to get data from db / other source (i.e. args.id)
        return _.find(books, { id: args.id });
      }
    },
    author: {
      type: AuthorType,
      args: { id: { type: GraphQLID } },
      resolve(parent, args) {
        return _.find(authors, { id: args.id });
      }
    },
    books: {
      type: new GraphQLList(BookType),
      resolve(parent, args) {
        return books;
      }
    },
    authors: {
      type: new GraphQLList(AuthorType),
      resolve(parent, args) {
        return authors;
      }
    }
  }
});

module.exports = new GraphQLSchema({
  query: RootQuery,
});
