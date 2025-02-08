import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';

declare module 'express' {
  export interface Request {
    user?: any;
  }
}

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  const token = req.header('Authorization')?.split(' ')[1];
  if (!token) return res.status(401).json({ error: 'Access denied' });
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).json({ error: 'Invalid token' });
  }
};

export default authMiddleware;
