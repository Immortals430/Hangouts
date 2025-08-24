import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET || "xyz";


export const createToken = (obj) => {
    return jwt.sign(obj, jwtSecret, { expiresIn: "2 days" });
}


