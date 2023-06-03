const User = require("../models/user");
const passport = require("passport");
//  const GoogleStrategy = require("passport-google-oauth20").Strategy;

//        ********** STRATEGIES ***********

// USER LOCAL STRATEGY
passport.use("user", User.createStrategy());

// PASSPORT SERIALIZE/DESERIALIZE USER (SESSION STORE etc)
passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    if (err) {
      return done(err);
    }
    return done(err, user);
  });
});

// USER GOOGLE STRATEGY
// passport.use(
//   "google-user",
//   new GoogleStrategy(
//     {
//       clientID: process.env.GOOGLE_CLIENT_ID,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//       callbackURL: "http://localhost:3000/user/auth/google/dashboard",
//     },
//     function (accessToken, refreshToken, profile, done) {
//       console.log(profile);
//       User.findOne({ googleId: profile.id }, function (err, user) {
//         if (err) {
//           return done(err);
//         } else {
//           if (!user) {
//             const newUser = new User({
//               googleId: profile.id,
//               name: profile.displayName,
//               email: profile.emails[0].value,
//               image: profile.photos[0].value,
//             });
//             newUser.save(function (err) {
//               if (err) {
//                 return done(err);
//               } else {
//                 console.log("New User");
//                 return done(null, newUser);
//               }
//             });
//           } else {
//             console.log("Already User");
//             return done(null, user);
//           }
//         }
//       });
//     }
//   )
// );

//        ********** FUNCTIONS ***********

// GET ALL USERS
const GetUsers = async (req, res) => {
  const data = await User.find();
  return res.send(data);
};

// GET SINGLE USER
const GetUserByID = (req, res) => {
  User.findById(req.params.id, function (err, user) {
    if (!err) {
      return res.send(user);
    } else {
      return res.send(err);
    }
  });
};

// CREATE NEW USER
const CreateUser = async (req, res) => {
  const user = new User(req.body);
  const data = await user.save();
  return res.json(user);
};

// UPDATE USER
const UpdateUser = (req, res) => {
  User.findByIdAndUpdate(
    req.params.id,
    req.body,
    { new: true },
    function (err, user) {
      if (err) {
        return res.send(err);
      }
      return res.json(user);
    }
  );
};

// DELETE USER
const DeleteUser = (req, res) => {
  User.findByIdAndDelete(req.params.id, function (err, user) {
    if (err) {
      return res.send(err);
    }
    return res.json(user);
  });
};

// AUTHENTICATE USER ON LOGIN
const AuthenticateUser = passport.authenticate("user");

// // RETURN RESPONSE AFTER USER AUTHENTICATED
const Authenticated = (req, res) => {
  // User is already authenticated in the AuthenticateUser middleware
  try {
    console.log("Login Successful");
    // return res.send("hello");
    return res.status(200).json(req.user);
  } catch (e) {
    res.status(401);
  }
};

// REGISTER USER ON SIGNUP
const RegisterUser = async (req, res) => {
  const { email, name, company, username, password } = req.body;
  console.log("email: " + email);

  try {
    const user = new User({
      email: email,
      name: name,
      company: company,
      username: email,
    });

    await User.register(user, password);

    passport.authenticate("user")(req, res, () => {
      console.log("Signup Successful");
      return res.status(200).json(user);
    });
  } catch (err) {
    console.log(err);
    return res.status(500).json(err);
  }
};

// const RegisterUser = (req, res) => {
//   const { email, name, company, username, password } = req.body;
//   console.log("email: " + email);
//   User.register(
//     new User({
//       email: email,
//       name: name,
//       company: company,
//       username: email,
//     }),
//     password,
//     (err, user) => {
//       if (err) {
//         console.log(err);
//         return res.status(500).json(err);
//       } else {
//         passport.authenticate("user")(req, res, () => {
//           console.log("Signup Successful");
//           return res.status(200).json(user);
//         });
//       }
//     }
//   );
// };

// // LOGOUT USER
// const LogoutUser = (req, res) => {
//   req.logout(function (err) {
//     if (err) {
//       return next(err);
//     } else {
//       console.log("Logged Out");
//       return res.clearCookie("connect.sid").status(200).json({ message: "Logout successful" });
//     }
//   });
// };

// // GOOGLE AUTHENTICATION
// const GoogleAuthenticate = passport.authenticate("google-user", {
//   scope: ["profile", "email"],
// });
// // GOOGLE AUTHENTICATION REDIRECT
// const GoogleAuthenticateRedirect = passport.authenticate("google-user", {
//   failureRedirect: "/",
//   successRedirect: "/user",
// });

exports.GetUsers = GetUsers;
exports.GetUserByID = GetUserByID;
exports.CreateUser = CreateUser;
exports.UpdateUser = UpdateUser;
exports.DeleteUser = DeleteUser;

exports.RegisterUser = RegisterUser;
exports.AuthenticateUser = AuthenticateUser;
exports.Authenticated = Authenticated;

// exports.GoogleAuthenticate = GoogleAuthenticate;
// exports.GoogleAuthenticateRedirect = GoogleAuthenticateRedirect;

// exports.LogoutUser = LogoutUser;
