const gql = require("graphql-tag");

const courseType = gql`
  type Course {
    id: ID!
    title: String!
    description: String!
    category: String!
    user: ID!
  }
  input CreateCourseInput {
    title: String!
    description: String!
    category: String!
    user: ID!
  }

  type Query {
    getCourse(id: ID!): Course
    getCourses: [Course]
    searchCourses(title: String!): [Course]
  }

  type Mutation {
    createCourse(input: CreateCourseInput!): Course
    updateCourse(id: ID!, input: CreateCourseInput!): Course
    deleteCourse(id: ID!): Course
  }
`;

module.exports = courseType;
