const LocalStrategy = require("passport-local").Strategy;
const bcrypt = require("bcrypt");

const initialize = (passport, getUserByEmail) => {
  const authenticateUser = async (email, password, done) => {
    const user = getUserByEmail(email);
    if (user == null) {
      return done(null, false, { message: "No user with that email" });
    }
    try {
      if (await bcrypt.compare(password, user.password)) {
        return done(null, user);
      }
      return done(null, false, { message: "Incorrect password" });
    } catch (error) {
      console.error(error);
      return done(error);
    }
  };

  passport.use(new LocalStrategy({ usernameField: "email" }), authenticateUser);
  passport.serializeUser((user, done) => {
    // done(null, user.id);
  });
  passport.deserializeUser((id, done) => {
    // find user in db by id
    // done(null, user)
  });
};

module.exports = initialize;
