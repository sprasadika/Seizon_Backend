'use strict';
const db = require('../config/db');
const Goals = require('../models/goals');

const addGoal = async (req, res, next) => {
    try {
        const goalData = req.body;
        // Create a new User instance using the data from the request body
        const goal = new Goals(
        goalData.goal_id,
        goalData.user_id,
        goalData.goal_basis,
        goalData.steps_per_day,
        goalData.steps_per_week,
        goalData.days,
        goalData.calories_to_burn,
        );
        const goalRef = await db.collection('Goals').add(JSON.parse(JSON.stringify(goal)));
        console.log(JSON.parse(JSON.stringify(goal)))
        res.send(`User record saved successfully with ID: ${goalRef.id}`);
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const getAllGoals = async (req, res, next) => {
    try {
        const users = await db.collection('Goals');
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

const getAllGoalsByUser = async (req, res, next) => {
    try {
        const userID = req.params.id;
        const userGoals= await db.collection('Goals').where('user_id', '==', userID).get();

        console.log('Number of Documents:', userGoals.docs.length);
        console.log('Document Data:', userGoals.docs.map(doc => doc.data()));

        if (userGoals.empty) {
            console.log(`No user record found with id: ${userID}`);
            return res.status(404).send('No user records found');
        }
        const usersArray = [];

        if (userGoals.empty) {
            res.status(404).send('No user records found');
        } else {
            userGoals.forEach(doc => {
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
};

const getGoalbyUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const g_id = req.params.g_id;
        console.log('g_id:', g_id);
        console.log('id:', id);
        
        const querySnapshot = await db.collection('Goals').where('user_id', '==', id).get(g_id);

        if (querySnapshot.empty) {
            res.status(404).send('User with the given ID and Goal ID not found');
        } else {
            const documentData = querySnapshot.docs[0].data();
            res.send(documentData);
        }
    } catch (error) {
        console.error('Error:', error.message);
        res.status(500).send('Internal Server Error');
    }
};

const updateGoal = async (req, res, next) => {
    try {
        const id = req.params.id;
        const data = req.body;
        const user =  await db.collection('Goals').doc(id);
        await user.update(data);
        res.send('User record updated successfuly');        
    } catch (error) {
        res.status(400).send(error.message);
    }
}

const deleteGoal = async (req, res, next) => {
    try {
        const id = req.params.id;
        await db.collection('Goals').doc(id).delete();
        res.send('Record deleted successfuly');
    } catch (error) {
        res.status(400).send(error.message);
    }
}

module.exports = {
    addGoal,
    getAllGoals,
    getAllGoalsByUser,
    getGoalbyUser,
    updateGoal,
    deleteGoal
}