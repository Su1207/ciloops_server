const express = require("express");
const {
  createJobsPostings,
  fetchAllPosts,
  fetchPostById,
  updatePosts,
  deletePosts,
} = require("../controller/careerController");

const router = express.Router();

router.post("/create", createJobsPostings);
router.get("/getAll", fetchAllPosts); //fetch all job posts
router.get("/get/:id", fetchPostById); //fetch post by id
router.put("/update/:id", updatePosts); //updating posts
router.delete("/delete/:id", deletePosts);

module.exports = router;
