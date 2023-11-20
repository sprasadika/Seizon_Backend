'use strict';
const db = require('../config/db');
const User = require('../models/avatar');


const addAvatar = async (req, res, next) => {
    try {
        const AvatarData = req.body;
        // Create a new User instance using the data from the request body
        const avatar = new User(
        AvatarData.avatar_name,
        AvatarData.avatar_image_url
        );
        const userRef = await db.collection('Avatars').add(JSON.parse(JSON.stringify(avatar)));
    res.send(`User record saved successfully with ID: ${userRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllAvatars = async (req, res, next) => {
    try {
        const users = await db.collection('Avatars');
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

const getAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const user = await db.collection('Avatars').doc(id);
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

const updateAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Avatars').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteAvatar = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Avatars').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addAvatar,
    getAllAvatars,
    getAvatar,
    updateAvatar,
    deleteAvatar
}