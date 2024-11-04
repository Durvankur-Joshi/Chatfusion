// import jwt from "jsonwebtoken";

// export const verifyToken = (req, res, next) => {
//   console.log("verifyToken Middleware");
//   const token = req.cookies.jwt;

//   if (!token) return res.status(401).send("You are not authenticated");

//   jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
//     if (err) {
//       console.error("Token verification error:", err);
//       return res.status(403).send("Token is not valid");
//     }

//     console.log("Decoded Payload:", payload);
//     req.userID = payload.userId; // Change this to match the token key
//     console.log("UserID from Token:", req.userID);
//     next();
//   });
// };

import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  console.log("verifyToken Middleware");
  const token = req.cookies.jwt;

  if (!token) return res.status(401).send("You are not authenticated");

  jwt.verify(token, process.env.JWT_KEY, (err, payload) => {
    if (err) {
      console.error("Token verification error:", err);
      return res.status(403).send("Token is not valid");
    }

    console.log("Decoded Payload:", payload);
    req.userID = payload.userId; 
    console.log("UserID from Token:", req.userID);
    next();
  });
};

