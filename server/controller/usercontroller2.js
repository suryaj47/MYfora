import Board from "../model/boardmodel.js";



export const addMessage = async (req, res) => {
  try {
    const { name, message, photo } = req.body;

    const pdfBase64 = req.file ? req.file.buffer.toString("base64") : null;

    const newBoard = new Board({
      name,
      message,
      photo,
      pdf: pdfBase64, // must exist in schema as optional
    });

    const savedBoard = await newBoard.save();
    res.status(201).json(savedBoard);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


export const getPDF = async (req, res) => {
  try {
    const fileDoc = await Board.findById(req.params.id);
    if (!fileDoc || !fileDoc.pdf) {
      return res.status(404).send("PDF not found");
    }

    const pdfBuffer = Buffer.from(fileDoc.pdf, "base64");
    res.set({
      "Content-Type": "application/pdf",
      "Content-Disposition": "inline; filename=file.pdf",
    });
    res.send(pdfBuffer);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch PDF" });
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
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


