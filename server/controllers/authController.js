import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userModel from "../models/userModel.js";
import transporter from "../config/nodemailer.js";

// Helper function for OTP generation
const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();

// Registration Controller
export const register = async (req, res) => {
  try {
    const { name, email, password, phone } = req.body;

    // Validation
    if (!name || !email || !password || !phone) {
      return res.status(400).json({ success: false, message: 'All fields are required' });
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email format' });
    }
    if (password.length < 6) {
      return res.status(400).json({ success: false, message: 'Password must be at least 6 characters' });
    }
    if (!/^\d{10,15}$/.test(phone)) {
      return res.status(400).json({ success: false, message: 'Invalid phone number format' });
    }

    // Check existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ success: false, message: "Email already registered" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 30 * 60 * 1000; // 30 minutes

    // Create new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
      phone,
      verifyOtp: otp,
      verifyOtpExpireAt: otpExpiry
    });

    await newUser.save();

    // Send OTP email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Verify Your Email",
      html: `Your verification code is <b>${otp}</b>. Valid for 30 minutes.`
    });

    res.status(201).json({
      success: true,
      message: "Registration successful. OTP sent to email."
    });

  } catch (error) {
    console.error("Registration error:", error);
    res.status(500).json({ success: false, message: "Server error during registration" });
  }
};

// OTP Verification Controller
export const verifyemail = async (req, res) => {
  try {
    const { email, otp } = req.body;

    // Find user
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // OTP verification
    if (user.verifyOtp !== otp) {
      return res.status(400).json({ success: false, message: "Invalid OTP" });
    }

    if (Date.now() > user.verifyOtpExpireAt) {
      return res.status(400).json({ success: false, message: "OTP expired" });
    }

    // Mark as verified
    user.isVerified = true;
    user.verifyOtp = "";
    user.verifyOtpExpireAt = 0;
    await user.save();

    res.json({ 
      success: true, 
      message: "Email verified successfully" 
    });

  } catch (error) {
    console.error("Verification error:", error);
    res.status(500).json({ success: false, message: "Server error during verification" });
  }
};

// Login Controller
export const login = async (req, res) => {
  const { email, password } = req.body;
  
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      console.log('User not found');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }
    
    console.log('Login attempt:', email);
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      console.log('Password does not match');
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '7d' });
    console.log('Generated JWT token:', token);

    res.cookie('token', token, {
      httpOnly: true,
      secure: false, // for local dev
      sameSite: 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.json({ success: true, user: { id: user._id, email: user.email } });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ success: false, message: 'Server error during login' });
  }
};

// Resend OTP Controller
export const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    // Generate new OTP
    const otp = generateOTP();
    const otpExpiry = Date.now() + 30 * 60 * 1000;

    // Update user
    user.verifyOtp = otp;
    user.verifyOtpExpireAt = otpExpiry;
    await user.save();

    // Send email
    await transporter.sendMail({
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "New Verification Code",
      html: `Your new verification code is <b>${otp}</b>. Valid for 30 minutes.`
    });

    res.json({ success: true, message: "New OTP sent successfully" });

  } catch (error) {
    console.error("Resend OTP error:", error);
    res.status(500).json({ success: false, message: "Failed to resend OTP" });
  }
};

// Logout Controller
export const logout = (req, res) => {
  if (!req.cookies.token) {
    return res.status(401).json({ success: false, message: 'Not authenticated' });
  }

  res.clearCookie('token');
  res.json({ success: true, message: 'Logged out successfully' });
};

// Send Reset Password OTP
export const sendResetOtp = async (req, res) => {
    const { email } = req.body;
    
    if (!email) {
        return res.status(400).json({ 
            success: false, 
            message: "Email is required" 
        });
    }

    try {
        // 1. Find user by email
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "If this email exists, we've sent a reset code"
            });
        }

        // 2. Generate OTP (6 digits, 15 minute expiry)
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpExpiry = Date.now() + 15 * 60 * 1000; // 15 minutes

        // 3. Save OTP to user document
        user.resetOtp = otp;
        user.resetOtpExpireAt = otpExpiry;
        await user.save();

        // 4. Send email with OTP
        const mailOptions = {
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Reset Code",
            html: `
                <p>You requested to reset your password.</p>
                <p>Your reset code is: <strong>${otp}</strong></p>
                <p>This code expires in 15 minutes.</p>
                <p>If you didn't request this, please ignore this email.</p>
            `
        };

        await transporter.sendMail(mailOptions);

        // 5. Respond successfully (don't send OTP in response)
        res.json({ 
            success: true, 
            message: "Reset code sent to email"
        });

    } catch (error) {
        console.error("Reset OTP error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to send reset code" 
        });
    }
};

// Verify Reset OTP and Update Password
export const resetPassword = async (req, res) => {
    const { email, otp, newPassword } = req.body;

    // 1. Validate all fields
    if (!email || !otp || !newPassword) {
        return res.status(400).json({ 
            success: false, 
            message: "All fields are required" 
        });
    }

    try {
        // 2. Find user
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // 3. Verify OTP
        if (user.resetOtp !== otp) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid reset code" 
            });
        }

        // 4. Check expiry
        if (Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ 
                success: false, 
                message: "Reset code has expired" 
            });
        }

        // 5. Hash new password
        const hashedPassword = await bcrypt.hash(newPassword, 10);

        // 6. Update password and clear OTP fields
        user.password = hashedPassword;
        user.resetOtp = '';
        user.resetOtpExpireAt = null;
        await user.save();

        // 7. Optional: Send confirmation email
        await transporter.sendMail({
            from: process.env.SENDER_EMAIL,
            to: email,
            subject: "Password Changed Successfully",
            text: "Your password has been successfully updated."
        });

        res.json({ 
            success: true, 
            message: "Password reset successfully" 
        });

    } catch (error) {
        console.error("Password reset error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to reset password" 
        });
    }
};

// Verify Reset OTP (new controller)
export const verifyResetOtp = async (req, res) => {
    const { email, otp } = req.body;

    if (!email || !otp) {
        return res.status(400).json({ 
            success: false, 
            message: "Email and OTP are required" 
        });
    }

    try {
        const user = await userModel.findOne({ email });
        if (!user) {
            return res.status(404).json({ 
                success: false, 
                message: "User not found" 
            });
        }

        // Verify OTP matches and isn't expired
        if (user.resetOtp !== otp) {
            return res.status(400).json({ 
                success: false, 
                message: "Invalid OTP" 
            });
        }

        if (Date.now() > user.resetOtpExpireAt) {
            return res.status(400).json({ 
                success: false, 
                message: "OTP has expired" 
            });
        }

        res.json({ 
            success: true, 
            message: "OTP verified successfully" 
        });

    } catch (error) {
        console.error("OTP verification error:", error);
        res.status(500).json({ 
            success: false, 
            message: "Failed to verify OTP" 
        });
    }
};

// Get User Profile Controller
export const getUserProfile = async (req, res) => {
  try {
    const user = await userModel.findById(req.user.id).select('-password'); // Exclude password
    if (!user) {
      return res.status(404).json({ success: false, message: 'User not found' });
    }
    res.json({ success: true, user });
  } catch (error) {
    console.error('Error fetching user profile:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
};