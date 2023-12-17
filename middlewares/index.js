import * as auth from "./auth.js";
import * as challenges from "./challenges.js";
import * as exercises from "./exercises.js";
import * as homeR from "./home.js";
import * as workouts from "./workouts.js";

const configMiddlewares = (app) => {
  app.use(auth.rewriteUnsupportedBrowserMethods);

  app.use("/", auth.root);
  app.use("/login", auth.login);
  app.use("/register", auth.register);
  app.use("/logout", auth.logout);

  app.use("/home", homeR.home);

  app.use("/workouts", workouts.workouts);
  app.use("/workouts/workout", workouts.workout);

  app.use("/exercises", exercises.exercises);

  app.use("/challenges", challenges.challenges);
  app.use("/challenges/challenge/submit", challenges.submission);
  app.use("/challenges/challenge", challenges.challenge);
};

export default configMiddlewares;