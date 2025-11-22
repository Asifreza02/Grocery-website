import jwt from 'jsonwebtoken';

export const verifyToken = (token) => {
    if (!token) return null;
    try {
        return jwt.verify(token, process.env.JWT_SECRET);
    } catch (err) {
        return null;
    }
};

export const getUserIdFromRequest = (req) => {
    const authHeader = req.headers.get('authorization');
    if (!authHeader) return null;

    const token = authHeader.split(' ')[1];
    return verifyToken(token);
};
