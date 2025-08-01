import express from "express";
import {approveUser, registerUser,deleteUser,addPassword,getUsers,getnotapproval,authenticateUser, getuserbyemail} from "../controller/usercontroller.js";
import { addMessage,DeleteMessage, ShowMessages,getPDF } from "../controller/usercontroller2.js";
import { registerAdmin,loginAdmin, getadminbyemail, getAdmins,deleteAdmin } from "../controller/admincontroller.js";
import multer from "multer";
const storage = multer.memoryStorage();
const upload = multer({ storage });
const router = express.Router();

router.post("/register", registerUser);
router.get("/getusers", getUsers);
router.get("/getnotapproval", getnotapproval);
router.put("/approve/:id", approveUser);
router.delete("/delete/:id", deleteUser);   
router.put("/update/:id",addPassword);  
router.post("/authenticate",authenticateUser);
router.post("/addmessage",upload.single("pdf"), addMessage);
router.post("/addadmin", registerAdmin);
router.post("/loginadmin", loginAdmin);
router.delete("/deletemessage/:id",DeleteMessage);
router.get("/showmessage",ShowMessages);
router.post("/getuserbyemail/:email", getuserbyemail);
router.post("/getadminbyemail/:email", getadminbyemail);
router.get("/getadmins", getAdmins);
router.delete("/deleteadmin/:id", deleteAdmin);
router.get("/getpdf/:id", getPDF);

router.get('/ping', (req, res) => {
  res.send('pong');
});



export default router;
