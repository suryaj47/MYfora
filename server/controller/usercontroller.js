import User from "../model/usermodel.js";
import { hashSync,compare } from "bcryptjs";
import nodemailer from "nodemailer";


export const registerUser = async (req, res) => {
  const newUser = new User(req.body);
  const { email } = newUser;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
    const savedata = await newUser.save();
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getuserbyemail = async (req, res) => {
  const { email } = req.params;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getnotapproval = async (req, res) => {
  try {
    const users = await User.find({ approval: false });
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const approveUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndUpdate(
      id,
      { approval: true },
      { new: true }
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User approved successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const user = await User.findByIdAndDelete(id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const sendPasswordEmail = async (email, password) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "suryaj4747@gmail.com",
        pass:"hptm nmve ryfn mdhz"
        // use app password if 2FA is enabled
      },
    });

    const mailOptions = {
      from: "suryaj4747@gmail.com",
      to: email,
      subject: "Your Account Has Been Approved",
      text: `Congratulations! Your account has been approved.\n\nYour login password is: ${password}\n\nPlease keep it safe.`,
    };

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully to:", email);
  } catch (err) {
    console.error("Failed to send email:", err);
  }
};

export const addPassword = async (req, res) => {
  const { id } = req.params;
  let { password } = req.body;
  const hpassword = hashSync(password, 10);
  try {
    const user = await User.findByIdAndUpdate(id, { password:hpassword , approval: true}, { new: true });
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
     await sendPasswordEmail(user.email, password);
     try{
    res.status(200).json({ message: "User approved and email sent", user });
  } catch (error) {
    console.error("Error approving user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
    
  } catch (error) {
    res.status(500).json({ message: error.message });
  }

    
};

export const authenticateUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const isMatch = await compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "User authenticated successfully", user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};





