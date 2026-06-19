const User = require("../models/User");
const Parent = require("../models/Parent");
const Student = require("../models/Student");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const { sendEmail } = require("../utils/emailService");

// Register Parent
const registerParent = async (req, res) => {
  try {
    const { fullName, email, mobile, address, childName, childRollNumber, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      role: "parent",
      isVerified: false,
      isApproved: "pending",
      verificationToken,
      verificationExpiry
    });

    const parent = await Parent.create({
      userId: user._id,
      fullName,
      email,
      mobile,
      address,
      childName,
      childRollNumber
    });

    user.parentId = parent._id;
    await user.save();

    const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Verify Your Email - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Welcome to Bright Future School Portal!</h2>
          <p>Please verify your email address to complete your Parent registration.</p>
          <p>This link is valid for 24 hours.</p>
          <br/>
          <a href="${verificationLink}" style="background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email</a>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">If the button doesn't work, copy and paste this URL into your browser: <br/> ${verificationLink}</p>
        </div>
      `
    });

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Register Student
const registerStudent = async (req, res) => {
  try {
    const { fullName, email, rollNo, className, section, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const verificationToken = crypto.randomBytes(20).toString("hex");
    const verificationExpiry = Date.now() + 24 * 60 * 60 * 1000; // 24 hours

    // Look for existing student record added by Admin to link
    // Standardize matching on rollNo and className containing className/section
    let student = await Student.findOne({
      rollNo: rollNo,
      className: { $regex: new RegExp(className, "i") }
    });

    if (!student) {
      student = await Student.create({
        fullName,
        email,
        className: `${className} ${section}`.trim(),
        section,
        rollNo,
        parentName: "",
        mobile: "",
        totalFees: 0,
        paidFees: 0
      });
    } else {
      // Update email on the existing record if not set
      if (!student.email) {
        student.email = email;
        await student.save();
      }
    }

    const user = await User.create({
      name: fullName,
      email,
      password: hashedPassword,
      role: "student",
      isVerified: false,
      isApproved: "pending",
      verificationToken,
      verificationExpiry,
      studentId: student._id
    });

    const verificationLink = `http://localhost:5173/verify-email/${verificationToken}`;
    await sendEmail({
      to: email,
      subject: "Verify Your Email - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Welcome to Bright Future School Portal!</h2>
          <p>Please verify your email address to complete your Student registration.</p>
          <p>This link is valid for 24 hours.</p>
          <br/>
          <a href="${verificationLink}" style="background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Verify Email</a>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">If the button doesn't work, copy and paste this URL into your browser: <br/> ${verificationLink}</p>
        </div>
      `
    });

    res.status(201).json({
      message: "Registration successful. Please check your email to verify your account."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Verify Email
const verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const user = await User.findOne({
      verificationToken: token,
      verificationExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired email verification link"
      });
    }

    user.isVerified = true;
    user.verificationToken = null;
    user.verificationExpiry = null;
    
    // Auto approve Admin accounts, parents and students go to pending approval
    if (user.role === "admin") {
      user.isApproved = "approved";
    } else {
      user.isApproved = "pending";
    }

    await user.save();

    res.json({
      message: "Email verified successfully! Your account is now pending admin approval."
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Login User
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({
        message: "Invalid credentials"
      });
    }

    // Admins bypass verification/approval checks
    if (user.role !== "admin") {
      if (!user.isVerified) {
        return res.status(400).json({
          message: "Email not verified"
        });
      }

      if (user.isApproved === "pending") {
        return res.status(400).json({
          message: "Waiting for admin approval"
        });
      }

      if (user.isApproved === "rejected") {
        return res.status(400).json({
          message: "Account rejected"
        });
      }
    }

    const token = jwt.sign(
      {
        id: user._id,
        role: user.role
      },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login Successful",
      token,
      role: user.role,
      name: user.name
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Forgot Password
const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "No user found with that email address" });
    }

    const resetToken = crypto.randomBytes(20).toString("hex");
    const resetTokenExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

    user.resetToken = resetToken;
    user.resetTokenExpiry = resetTokenExpiry;
    await user.save();

    const resetLink = `http://localhost:5173/reset-password/${resetToken}`;
    await sendEmail({
      to: email,
      subject: "Password Reset Request - Bright Future School",
      html: `
        <div style="font-family: sans-serif; padding: 20px; color: #1e293b;">
          <h2>Password Reset Request</h2>
          <p>You requested a password reset for your School Portal account.</p>
          <p>Please click the button below to reset your password. This link is valid for 15 minutes.</p>
          <br/>
          <a href="${resetLink}" style="background-color: #2563eb; color: white; padding: 12px 20px; text-decoration: none; border-radius: 8px; font-weight: bold; display: inline-block;">Reset Password</a>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">If the button doesn't work, copy and paste this URL into your browser: <br/> ${resetLink}</p>
          <p style="margin-top: 20px; font-size: 12px; color: #64748b;">If you didn't request a password reset, you can safely ignore this email.</p>
        </div>
      `
    });

    res.json({ message: "Password reset link sent to your email address" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Reset Password
const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;

    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiry: { $gt: Date.now() }
    });

    if (!user) {
      return res.status(400).json({
        message: "Invalid or expired password reset link"
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    user.resetToken = null;
    user.resetTokenExpiry = null;
    await user.save();

    res.json({ message: "Password reset successful. You can now log in with your new password." });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get Profile
const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id)
      .select("-password")
      .populate("parentId")
      .populate("studentId");

    res.json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  registerParent,
  registerStudent,
  verifyEmail,
  loginUser,
  forgotPassword,
  resetPassword,
  getProfile
};
