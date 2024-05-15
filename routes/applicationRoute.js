const express = require("express");

const multer = require("multer");
const {
  createApplication,
  getApplicationsOfAPosts,
} = require("../controller/applicationController");

const router = express.Router();
const upload = multer();

router.post("/create", upload.single("resume"), createApplication);
router.get("/getApplications/:id", getApplicationsOfAPosts); //fetch all job posts
// router.get("/get/:id", fetchPostById); //fetch post by id
// router.put("/update/:id", updatePosts); //updating posts
// router.delete("/delete/:id", deletePosts);

module.exports = router;
