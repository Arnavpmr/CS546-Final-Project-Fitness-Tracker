// This file will import both route files and export the constructor method as shown in the lecture code
import authRoutes from "./auth.js";
import challengesRoutes from "./challenges.js";
import aboutRoute from "./about.js";
import homeRoute from "./home.js";
import profileRoutes from "./profile.js";
import workoutsRoutes from "./workouts.js";
import exerciseRoutes from "./exercises.js";

const constructorMethod = (app) => {
  app.use("/", authRoutes);
  app.use("/about", aboutRoute);
  app.use("/home", homeRoute);
  app.use("/challenges", challengesRoutes);
  app.use("/user", profileRoutes);
  app.use("/workouts", workoutsRoutes);
  app.use("/exercises", exerciseRoutes);

  app.use("*", (req, res) => {
    return res.status(404).render("error", {
      error: "The page you requested does not exist",
    });
  });
};

export default constructorMethod;
