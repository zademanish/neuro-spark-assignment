import jwt from "jsonwebtoken";
import { User } from "../models/user.js";

// Middleware to protect routes
const isAuthenticate = async (req, res, next) => {
    let token;
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            console.log("Received Token:", token); // Debugging line

            if (!token) {
                return res.status(401).json({ message: "Not authorized, token missing" });
            }

            const decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("Decoded Token:", decoded); // Debugging line

            req.user = await User.findById(decoded.user.id).select("-password"); // Exclude password
            if (!req.user) {
                return res.status(401).json({ message: "User not found" });
            }

            next();
        } catch (error) {
            console.error("Token verification failed:", error.message);
            return res.status(401).json({ message: "Not authorized, token failed" });
        }
    } else {
        return res.status(401).json({ message: "Not authorized, no token provided" });
    }
};

export default isAuthenticate;
