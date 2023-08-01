import  jwt  from "jsonwebtoken";
import { User } from "../models/user.js";

export const isAuthenticated = async(req, res, next) => {
  // Check if the token cookie is present in the request
  const{ token }= req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Token missing",
    });
  }

  try {
    // Verify the token using your JWT secret
    const decodedData = jwt.verify(token, process.env.JWT_SECRET);
    
    // Attach the decoded user data to the request object for future use
    req.user = await User.findById(decodedData._id)

    // Proceed to the next middleware or route handler
    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized: Invalid token",
    });
  }
};

