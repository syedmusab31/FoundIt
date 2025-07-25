import mongoose from 'mongoose';


const itemSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    province: { type: String, required: true },
    type: { type: String, enum: ['lost', 'found'], required: true },
    category: { type: String, required: true },
    status: { type: String, enum: ['active', 'resolved'], default: 'active' },
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
    phone: { type: String, required: true },
},
{
    timestamps: true,
});
const itemModel = mongoose.models.item || mongoose.model("item", itemSchema);
export default itemModel;
