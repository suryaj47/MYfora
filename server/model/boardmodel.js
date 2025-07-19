import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: true,
    },
    photo:{
        type: String,
        required: true,
    }
},
{
  timestamps: true // ✅ auto-adds createdAt & updatedAt
});

export default mongoose.model("Board", boardSchema);