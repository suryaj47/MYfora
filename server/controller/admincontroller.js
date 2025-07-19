import mongoose from "mongoose";
import Admin from "../model/adminmodel.js";
import bcrypt from "bcryptjs";


export const registerAdmin = async (req, res) => {
  const { name, email, password ,photo} = req.body;
  try {
    const existingAdmin = await Admin.findOne({ email });
    if (existingAdmin) {
      return res.status(400).json({ message: "Admin already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newAdmin = new Admin({
      name,
      email,
      password: hashedPassword,
      photo
    });
    await newAdmin.save();
    res.status(201).json({ message: "Admin registered successfully" });
    } catch (error) {   
        res.status(500).json({ message: error.message });
    }
};

export const loginAdmin = async (req, res) => {
  const {email, password } = req.body;
  try {
    const admin = await Admin.findOne({email });
    if (!admin) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }
    res.status(200).json({ message: "Admin logged in successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getadminbyemail = async (req, res) => {
  const { email } = req.params;
  try {
    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json(admin);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getAdmins = async (req, res) => {  
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteAdmin = async (req, res) => {
  const { id } = req.params;
  try {
    const admin = await Admin.findByIdAndDelete(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }
    res.status(200).json({ message: "Admin deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
