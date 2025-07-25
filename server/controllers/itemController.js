import itemModel from "../models/itemModel.js";

// @desc    Get all lost items
// @route   GET /api/items/lost
// @access  Public
export const getLostItems = async (req, res) => {
  try {
    const items = await itemModel.find({ type: 'lost', status: 'active' });
    res.json({ success: true, data: items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
// @desc    Get all lost items
// @route   GET /api/items/lost
// @access  Public
export const getFoundItems=async(req,res)=>{
    try{
        const items = await itemModel.find({ type: 'found', status: 'active' });
        res.json({ success: true, data: items });
    } catch (error) {
        res.json({ success: false, message: error.message });
    }
};

// @desc    Create a new lost item  
// @route   POST /api/items/lost/new
// @access  Private
export const createLostItem = async (req, res) => {
  const { title, description, image, category, province, phone } = req.body;
    const userId = req.user.id;
    const type = 'lost';
  try {
    const newItem = await itemModel({
      title,
      description,
      image,
      province,
      category,
      type: 'lost',
      userId: req.user.id,
      phone
    });
    await newItem.save();
    res.json({ success: true, data: newItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Create a new found item
// @route   POST /api/items/found/new
// @access  Private
export const createFoundItem = async (req, res) => {
  const { title, description, category, image, province, phone } = req.body;
    const userId = req.user.id;
    const type = 'found';
  try {
    const newItem = await itemModel({
      title,
      description,
      image,
      province,
      category, 
      type: 'found',
      userId: req.user.id,
      phone
    });
    await newItem.save();
    res.json({ success: true, data: newItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};


// @desc    Update item status
// @route   PATCH /api/items/:id/status
// @access  Private (only owner can update)
export const updateItemStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const item = await itemModel.findById(req.params.id);

    if (!item) {
      return res.json({ success: false, message: 'Item not found' });
    }

    // Check if the user is the owner of the item
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized' });
    }

    item.status = status;
    const updatedItem = await item.save();
    res.json({ success: true, data: updatedItem });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Delete an item
// @route   DELETE /api/items/:id
// @access  Private (only owner can delete)
export const deleteItem = async (req, res) => {
  try {
    const item = await itemModel.findById(req.params.id);

    if (!item) {
      return res.json({ success: false, message: 'Item not found' });
    }

    // Check if the user is the owner of the item
    if (item.userId.toString() !== req.user._id.toString()) {
      return res.json({ success: false, message: 'Not authorized' });
    }

    await item.remove();
    res.json({ success: true, message: 'Item removed' });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get active items listed by logged in user
// @route   GET /api/items/my/active
// @access  Private
export const getMyActiveItems = async (req, res) => {
  try {
    const items = await itemModel.find({ 
      userId: req.user._id,
      status: 'active'
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};

// @desc    Get resolved items listed by logged in user
// @route   GET /api/items/my/resolved
// @access  Private
export const getMyResolvedItems = async (req, res) => {
  try {
    const items = await itemModel.find({ 
      userId: req.user._id,
      status: 'resolved'
    });
    res.json({ success: true, data: items });
  } catch (error) {
    res.json({ success: false, message: error.message });
  }
};
