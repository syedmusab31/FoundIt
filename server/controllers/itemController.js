import itemModel from "../models/itemModel.js";
import multer from "multer";

// Configure multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/"); // Save files in the 'uploads' directory
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`); // Add timestamp to file name
  },
});
//const upload = multer({ storage });

// @desc    Get all active lost items
// @route   GET /api/items/lost
// @access  Public
export const getLostItems = async (req, res) => {
  try {
    const items = await itemModel.find({ type: "lost", status: "active" });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get all active found items
// @route   GET /api/items/found
// @access  Public
export const getFoundItems = async (req, res) => {
  try {
    const items = await itemModel.find({ type: "found", status: "active" });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new lost item
// @route   POST /api/items/lost/new
// @access  Private
export const createLostItem = async (req, res) => {
  const { title, description, category, province, phone } = req.body;
  const userId = req.user.id;

  // Validate request data
  if (!title || !description || !category || !province || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newItem = new itemModel({
      title,
      description,
      image: req.file?.path, // Save the file path
      province,
      category,
      type: "lost",
      userId,
      phone,
    });

    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Create a new found item
// @route   POST /api/items/found/new
// @access  Private
export const createFoundItem = async (req, res) => {
  const { title, description, category, province, phone } = req.body;
  const userId = req.user.id;

  // Validate request data
  if (!title || !description || !category || !province || !phone) {
    return res.status(400).json({ success: false, message: "All fields are required" });
  }

  try {
    const newItem = new itemModel({
      title,
      description,
      image: req.file?.path, // Save the file path
      province,
      category,
      type: "found",
      userId,
      phone,
    });

    await newItem.save();
    res.status(201).json({ success: true, data: newItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Update item status (e.g., mark as found)
// @route   PATCH /api/items/:id/status
// @access  Private (only owner can update)
export const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await itemModel.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Check if the user is the owner of the item
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    item.status = status;
    const updatedItem = await item.save();
    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (only owner can delete)
export const deleteItem = async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ success: false, message: "Item not found" });
    }

    // Check if the user is the owner of the item
    if (item.userId.toString() !== req.user.id) {
      return res.status(403).json({ success: false, message: "Not authorized" });
    }

    await item.remove();
    res.json({ success: true, message: "Item removed" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get active items listed by the logged-in user
// @route   GET /api/items/my/active
// @access  Private
export const getMyActiveItems = async (req, res) => {
  try {
    const items = await itemModel.find({
      userId: req.user.id,
      status: "active",
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// @desc    Get resolved items listed by the logged-in user
// @route   GET /api/items/my/resolved
// @access  Private
export const getMyResolvedItems = async (req, res) => {
  try {
    const items = await itemModel.find({
      userId: req.user.id,
      status: "resolved",
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
