import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true, select: false },
    phone: { type: String, required: true, unique: true, trim: true },
    isAdmin: { type: Boolean, default: false },
    isVerified: { type: Boolean, default: false },
    verifyOtp: { type: String, default: '', select: false },
    verifyOtpExpireAt: { type: Number, default: 0, select: false },
    resetOtp: { type: String, default: '', select: false },
    resetOtpExpireAt: { type: Number, default: 0, select: false },
  },
  { timestamps: true },
);

userSchema.set('toJSON', {
  versionKey: false,
  transform: (_document, record) => {
    record.id = record._id.toString();
    delete record._id;
    delete record.password;
    delete record.verifyOtp;
    delete record.verifyOtpExpireAt;
    delete record.resetOtp;
    delete record.resetOtpExpireAt;
    return record;
  },
});

export const User = mongoose.models.User ?? mongoose.model('User', userSchema);
