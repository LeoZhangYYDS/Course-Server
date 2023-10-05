const { GraphQLError } = require("graphql");
const { isAuthenticated, courseIsAithorized } = require("../../helpers/auth");
const { Course, validateCourse } = require("../../models/course");

const courseResolver = {
  Query: {
    getCourse: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        isAuthenticated(context);
        // Find the journal entry to delete by its ID
        let course = await Course.findById(args.id);
        if (!course) {
          // If the journal entry doesn't exist, throw an Error
          throw new Error("Course not found");
        }
        // Check if the user is authorized to delete the journal entry
        courseIsAithorized(course, context);

        return course;
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "GET_COURSE_ERROR",
          },
        });
      }
    },
    getCourses: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        isAuthenticated(context);
        // Find all journal entries
        return await Course.find({ user: context.user._id });
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "GET_COURSES_ERROR",
          },
        });
      }
    },

    searchCourses: async (parent, args) => {
      try {
        // Find all journal entries that match the title provided in the query arguments
        return await Course.find({
          title: new RegExp("^" + args.title + "$", "i"),
        });
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "SEARCH_COURSES_ERROR",
          },
        });
      }
    },
  },
  Mutation: {
    createCourse: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        isAuthenticated(context);
        // Validate the input data using the validateJournalEntry function
        const { error } = validateCourse(args.input);
        if (error) {
          // If the input data is invalid, throw an Error
          throw new Error("Invalid input data");
        }
        // Create a new journal entry using the input data
        const course = new Course({
          title: args.input.title,
          description: args.input.description,
          category: args.input.category,
          user: context.user._id,
          price: args.input.price,
        });

        // Save the new journal entry to the database
        await course.save();
        // Return the new journal entry
        return course;
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "CREATE_COURSE_ERROR",
          },
        });
      }
    },

    updateCourse: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        isAuthenticated(context);
        // Find the journal entry to update by its ID
        let course = await Course.findById(args.id);
        if (!course) {
          // If the journal entry doesn't exist, throw an Error
          throw new Error("Course not found");
        }
        // Check if the user is authorized to edit the journal entry
        courseIsAithorized(course, context);
        // Update the journal entry with the input data
        course.title = args.input.title;
        course.description = args.input.description;
        course.category = args.input.category;
        course.price = args.input.price;
        // Save the updated journal entry to the database
        return await course.save();
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "UPDATE_COURSE_ERROR",
          },
        });
      }
    },

    deleteCourse: async (parent, args, context) => {
      try {
        // Check if the user is authenticated
        isAuthenticated(context);

        // Find the journal entry to delete by its ID
        let course = await Course.findById(args.id);
        if (!course) {
          // If the journal entry doesn't exist, throw an Error
          throw new Error("Course not found");
        }
        // Check if the user is authorized to delete the journal entry
        courseIsAithorized(course, context);
        // Delete the journal entry from the database
        await Course.deleteOne({ _id: args.id });
        // Return a success message and the deleted journal entry
        course.id = args.id;
        return course;
      } catch (error) {
        // If there was an error, throw an ApolloError with a custom error code
        throw new GraphQLError(error, {
          extensions: {
            code: "DELETE_COURSE_ERROR",
          },
        });
      }
    },
  },
};

// Export the resolvers
module.exports = courseResolver;
