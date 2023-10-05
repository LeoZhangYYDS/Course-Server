function isAuthenticated(context) {
  console.log(context);
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}
function isAuthorized(user, context) {
  if (user._id.toString() !== context.user._id.toString()) {
    throw new Error("Not authorized", "FORBIDDEN", {
      httpStatusCode: 403,
    });
  }
}

function courseIsAithorized(course, context) {
  if (course.user.toString() !== context.user._id) {
    throw new ApolloError(
      "User is not authorized to edit this course",
      "FORBIDDEN",
      {
        httpStatusCode: 403,
      }
    );
  }
}
module.exports.isAuthenticated = isAuthenticated;
module.exports.isAuthorized = isAuthorized;
module.exports.courseIsAithorized = courseIsAithorized;
