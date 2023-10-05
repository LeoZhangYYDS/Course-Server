function isAuthenticated(context) {
  console.log(context);
  if (!context.user) {
    throw new Error("Not authenticated");
  }
}
function isAuthorized(user, context) {
  if (user._id.toString() !== context.user._id.toString()) {
    throw new Error("Not authorized");
  }
}
module.exports.isAuthenticated = isAuthenticated;
module.exports.isAuthorized = isAuthorized;
