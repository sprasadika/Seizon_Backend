'use strict';
const bcrypt = require('bcryptjs');
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

  
const userRegister = async (req, res, next) => {
    try {
        const userData = req.body;
        // Create a new User instance using the data from the request body
        const hashedPassword = await hashPassword(userData.password)
        const user = new User(
            userData.username,
            userData.firstName,
            userData.lastName,
            userData.email,
            userData.user_language,
            userData.height,
            userData.weight,
            userData.age,
            userData.gender,
            hashedPassword,
            userData.user_level,
            userData.total_steps
        );

        const usersCollection = await db.collection('Users'); // Replace 'users' with your actual collection name
        const querySnapshot = await usersCollection.where('email', '==', userData.email).get();
    
        if (querySnapshot.empty) {
            // User with the provided email exists
            const userResponse = await usersCollection.add(JSON.parse(JSON.stringify(user)));
        
            var token = jwt.sign({ id: userResponse.id }, process.env.ACCESS_TOKEN_SECRET);
            const userDoc = await userResponse.get();
            const data = userDoc.data();
            data.token = token
            
            res.status(200).send(data);
        } else {
            // User with the provided email does not exist
            res.status(400).send({error: 'User already exists'});
        }

        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

// Function to hash a password
async function hashPassword(password) {
    const saltRounds = 10;
    try {
        const salt = await bcrypt.genSalt(saltRounds);
        const hash = await bcrypt.hash(password, salt);
        return hash;
    } catch (error) {
        console.error('Error hashing password:', error);
        throw error;
    }
}

const getAllUsers = async (req, res, next) => {
    try {
        const users = await db.collection('Users');
        const data = await users.get();
        const usersArray = [];

        if (data.empty) {
            res.status(404).send('No user records found');
        } else {
            data.forEach(doc => {
                const userData = {};
                const docData = doc.data();
                
                for (const key in docData) {
                    if (docData.hasOwnProperty(key)) {
                        userData[key] = docData[key];
                    }
                }

                usersArray.push(userData);
            });

            res.send(usersArray);
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.collection('Users').doc(id);
        const data = await user.get();
        if(!data.exists) {
            res.status(404).send('User with the given ID not found');
        }else {
            res.send(data.data());
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const updateUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Users').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Users').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    userRegister,
    getAllUsers,
    getUser,
    updateUser,
    deleteUser
}