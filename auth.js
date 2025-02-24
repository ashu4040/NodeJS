const passport = require("passport");
const localStrategy = require("passport-local").Strategy;
const Person = require("./modules/Person");

passport.use(
  new localStrategy(async (USERNAME, PASSWORD, done) => {
    // authentication logic here
    try {
      const user = await Person.findOne({ username: USERNAME });
      if (!user) return done(null, false, { message: "incorect user" });

      const isPasswordMatch = user.comparePassword(PASSWORD);
      if (isPasswordMatch) {
        return done(null, user);
      } else {
        return done(null, false, { message: "incorect pass" });
      }
    } catch (error) {
      return done(error);
    }
  })
);

module.exports = passport;
