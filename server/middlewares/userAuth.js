import jwt from 'jsonwebtoken';

const userAuth = async (req, res, next) => {
    try {
        // Get token from cookies or Authorization header
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        
        if (!token) {
            return res.status(401).json({ 
                success: false, 
                message: "Authorization token required" 
            });
        }

        // Verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        
        // Attach user to request
        req.user = { id: decoded.id };
        next();
    } catch (error) {
        console.error("JWT verification failed:", error);
        
        let message = "Invalid token";
        if (error.name === 'TokenExpiredError') {
            message = "Token expired";
        }

        return res.status(401).json({ 
            success: false, 
            message 
        });
    }
};

export default userAuth;