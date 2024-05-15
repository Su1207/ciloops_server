const db = require("../config/db");

//create jobs posts
exports.createJobsPostings = async (req, res) => {
  try {
    const { title, description, requirements } = req.body;

    if (!title || !description || !requirements) {
      return res.status(400).json({ message: "Please provide all data" });
    }

    const data = await db.query(
      `INSERT INTO job_postings (title,description,requirements) VALUES (?,?,?)`,
      [title, description, requirements]
    );

    if (!data) {
      return res
        .status(400)
        .json({ error: "Error occured in Inserting elements" });
    }

    res.status(200).json({
      success: true,
      message: "Data uploaded successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

//fetchAll Jobs posts
exports.fetchAllPosts = async (req, res) => {
  try {
    const data = await db.query("SELECT * FROM job_postings");
    if (!data) {
      return res.status(404).json({ message: "No data found" });
    }

    res.status(200).json({ data: data[0] });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.fetchPostById = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ error: "Please provide job id" });
    }

    const data = await db.query(`SELECT * FROM job_postings where id=?`, [
      jobId,
    ]);
    if (!data) {
      return res.status(404).json({ error: "No job found" });
    }

    res.status(200).json({ data: data[0] });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.updatePosts = async (req, res) => {
  try {
    const { title, description, requirements } = req.body;
    const jobId = req.params.id;

    if (!title || !description || !requirements || !jobId) {
      return res.status(400).json({ message: "Please provide all data" });
    }

    const data = await db.query(
      `UPDATE job_postings SET title=?,description=?,requirements=? where id=?`,
      [title, description, requirements, jobId]
    );

    if (!data) {
      return res.status(404).json({ error: "Error in updating post" });
    }

    res.status(200).json({ message: "Post successfully changed" });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.deletePosts = async (req, res) => {
  try {
    const jobId = req.params.id;

    if (!jobId) {
      return res.status(400).json({ error: "Please provide job id" });
    }

    await db.query(`DELETE FROM job_postings where id=?`, [jobId]);
    res.status(200).json({ message: "Post deleted successfully" });
  } catch (err) {
    res.status(500).json(err);
  }
};
