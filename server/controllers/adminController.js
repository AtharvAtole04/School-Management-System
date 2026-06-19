const User = require("../models/User");
const { sendEmail } = require("../utils/emailService");

const getPendingParents = async (req, res) => {
  try {
    const parents = await User.find({
      role: "parent",
      isVerified: true,
      isApproved: "pending"
    }).populate("parentId");

    res.json(parents);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getPendingStudents = async (req, res) => {
  try {
    const students = await User.find({
      role: "student",
      isVerified: true,
      isApproved: "pending"
    }).populate("studentId");

    res.json(students);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveParent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = "approved";
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Account Approved - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Congratulations ${user.name}!</h2>
          <p>Your parent portal account has been approved by the Administrator.</p>
          <p>You can now log in to the Parent Portal using your email address and password.</p>
          <br/>
          <a href="http://localhost:5173/login" style="background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Log In Now</a>
        </div>
      `
    });

    res.json({ message: "Parent approved successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const approveStudent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = "approved";
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Account Approved - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Congratulations ${user.name}!</h2>
          <p>Your student portal account has been approved by the Administrator.</p>
          <p>You can now log in to the Student Portal using your email address and password.</p>
          <br/>
          <a href="http://localhost:5173/login" style="background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Log In Now</a>
        </div>
      `
    });

    res.json({ message: "Student approved successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectParent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = "rejected";
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Account Update - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Hello ${user.name},</h2>
          <p>Unfortunately, your request for a Parent Portal account has been rejected by the Administrator.</p>
          <p>Please contact the school administration office if you believe this is an error.</p>
        </div>
      `
    });

    res.json({ message: "Parent rejected successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const rejectStudent = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isApproved = "rejected";
    await user.save();

    await sendEmail({
      to: user.email,
      subject: "Account Update - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Hello ${user.name},</h2>
          <p>Unfortunately, your request for a Student Portal account has been rejected by the Administrator.</p>
          <p>Please contact the school administration office if you believe this is an error.</p>
        </div>
      `
    });

    res.json({ message: "Student rejected successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getApprovedUsers = async (req, res) => {
  try {
    const { role, search } = req.query;
    let query = { isApproved: "approved" };

    if (role) {
      query.role = role;
    } else {
      query.role = { $in: ["parent", "student"] };
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } }
      ];
    }

    const users = await User.find(query)
      .populate("parentId")
      .populate("studentId");

    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getPendingParents,
  getPendingStudents,
  approveParent,
  approveStudent,
  rejectParent,
  rejectStudent,
  getApprovedUsers
};
