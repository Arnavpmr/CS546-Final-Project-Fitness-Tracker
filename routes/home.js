import { Router } from "express";
import {
  challengeData,
  userData,
  exerciseData,
  challengeObject,
} from "../data/index.js";
import { challengeQueue } from "../config/mongoCollections.js";

const router = Router();

router.route("/").get(async (req, res) => {
  const queueCollection = await challengeQueue();
  const challengesObject = (await queueCollection.find({}).toArray())[0];

  const curChallenge = await challengeData.getChallengeById(
    challengesObject.current,
  );
  const globalLeaderboard = challengesObject.leaderboard;
  const curUser = await userData.getUserByUsername(req.session.user.userName);
  const exercises = curChallenge.exercises;

  let newExercises = [];

  for (const exercise of curChallenge.exercises) {
    const fullExercise = await exerciseData.getExerciseById(exercise.id);
    newExercises.push({
      exercise: fullExercise,
      sets: exercise.sets,
      reps: exercise.reps,
    });
  }

  let submission = null;
  let workouts = [];

  try {
    submission = await challengeObject.getSubmissionByUserName(
      curUser.userName,
    );
  } catch (e) {
    submission = null;
  }

  try {
    workouts = await userData.getUserWorkoutDataDeep(curUser.userName);
  } catch (error) {
    console.log(error.toString());
    console.log("No workout data found");
  }

  curChallenge.exercises = newExercises;

  if (workouts.length > 5) {
    //Get random 5
    let copy = [...workouts];
    const temp = [];
    while (temp.length < 5) {
      const index = Math.floor(Math.random() * copy.length);
      temp.push(copy[index]);
      copy = copy.slice(0, index).concat(copy.slice(index + 1));
    }
    workouts = temp;
  }

  return res.status(200).render("home", {
    title: "Home",
    userData: curUser,
    user: req.session.user,
    workouts: workouts,
    submission: submission,
    currentChallenge: curChallenge,
    globalLeaderboard: globalLeaderboard,
  });
});

export default router;
