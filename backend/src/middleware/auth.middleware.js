import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

export const protectRoute = async (req, res, next) => {
  try {
    // 1️⃣ Get token from cookie
    const token = req.cookies?.token;

    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 2️⃣ Verify & decode token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    // decoded = { id, iat, exp }

    // 3️⃣ Find user from DB
    const user = await User.findById(decoded.id).select('-password');

    if (!user) {
      return res.status(401).json({ message: "Not authorized, user not found" });
    }

    // 4️⃣ Attach user to request
    req.user = user;

    // 5️⃣ Continue
    next();

  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};