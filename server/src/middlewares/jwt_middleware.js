import jwt from "jsonwebtoken";
const projectName = process.env.PROJECT_NAME || "Hangouts";
const jwtSecret = process.env.JWT_SECRET || "xyz"

// verify jwt token from cookie
export const jwtAuth = (req, res, next) => {
    const token = req.cookies[projectName];
    try{
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload
        next();
    }
    catch(err){
        res.status(401).json({ message: "Unauthorised" });
    }
}

export default jwtAuth

