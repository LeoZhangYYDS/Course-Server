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

  input UpdateCourseInput {
    title: String!
    description: String!
    category: String!
    price: Int!
    user: ID!
  }

  type Query {
    getCourse(id: ID!): Course
    getCourses: [Course]
    searchCourses(title: String!): [Course]
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course
    updateCourse(id: ID!, input: UpdateCourseInput!): Course
    deleteCourse(id: ID!): Course
  }
`;

module.exports = courseType;
