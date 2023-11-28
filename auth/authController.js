'use strict';
const db = require('../config/db');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const dotenv = require('dotenv');
dotenv.config();

const authenticate = (req, res, next) => {
    const token = req.header('Authorization');

    console.log('Received token:', token);

    if (!token) {
        console.log('Unauthorized: No token provided');
        return res.status(401).json({ message: 'Unauthorized' });
    }

    try {
        const decoded = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
        console.log('Decoded user:', decoded);
        req.user = decoded;
        next();
    } catch (error) {
        console.log('Forbidden: Invalid token');
        return res.status(403).json({ message: 'Forbidden' });
    }
};


