const db = require("../config/db");

exports.createApplication = async (req, res) => {
  try {
    const { jobId, name, email, coverLetter } = req.body;
    const resumeData = req.file.buffer; // Binary data of the uploaded file

    if (!jobId || !name || !email || !resumeData) {
      return res.status(400).json({ message: "Please provide all data" });
    }

    const data = await db.query(
      `INSERT INTO applications (jobId,name,email,resume,coverLetter) VALUES (?,?,?,?,?)`,
      [jobId, name, email, resumeData, coverLetter]
    );

    if (!data) {
      return res
        .status(400)
        .json({ error: "Error occured in Inserting elements" });
    }

    res.status(200).json({
      success: true,
      message: "Profile uploaded successfully",
    });
  } catch (err) {
    res.status(500).json(err);
  }
};

exports.getApplicationsOfAPosts = async (req, res) => {
  try {
    const jobId = req.params.id;
    if (!jobId) {
      return res.status(400).json({ message: "Please provide all details" });
    }

    const data = await db.query(`SELECT * FROM applications where jobId=?`, [
      jobId,
    ]);
    if (!data || data.length === 0) {
      return res.status(404).json({ message: "Data not found" });
    }
    const applications = data[0].map((app) => ({
      id: app.id,
      jobId: app.jobId,
      name: app.name,
      email: app.email,
      coverLetter: app.coverLetter,
      status: app.status,
      resume: app.resume ? Buffer.from(app.resume).toString("base64") : null, // Convert binary data to base64
    }));

    res.status(200).json({ data: applications });
  } catch (err) {
    res.status(200).json(err);
  }
};
