const gql = require("graphql-tag");

const courseType = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    category: String!
    price: Int!
    user: ID!
  }
  input CreateCourseInput {
    title: String!
    description: String!
    category: String!
    price: Int!
    user: ID!
  }

  input updateCourseInput {
    title: String!
    description: String!
    category: String!
    price: Int!
  }

  type Query {
    getCourse(id: ID!): Course
    getCourses: [Course]
    searchCourses(title: String!): [Course]
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course
    updateCourse(id: ID!, input: updateCourseInput!): Course
    deleteCourse(id: ID!): Course
  }
`;

module.exports = courseType;
