import Board from "../model/boardmodel.js";
export const addMessage = async (req, res) => {
  const newBoard = new Board(req.body);
  try {
    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const DeleteMessage = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedBoard = await Board.findByIdAndDelete(id);
    
    if (!deletedBoard) {
      return res.status(404).json({ message: "Message not found" });
    }

    res.status(200).json({ message: "Message deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const ShowMessages = async (req, res) => {
  try { 
    const messages = await Board.find().sort({ createdAt: 1 });
    // latest first
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


