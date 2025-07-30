import mongoose from "mongoose";

const boardSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    message:{
        type: String,
        required: false,
    },
    pdf:{
     type: String,
        required: false,
    },
    photo:{
        type: String,
        required: true,
    }
},
{
  timestamps: true 
});

export default mongoose.model("Board", boardSchema);