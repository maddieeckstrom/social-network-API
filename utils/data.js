const User = require('../models/User');
const Thought = require('../models/Thought');
const connection = require('../config/connection');

const users = [
    {
        username: 'Scrubs',
        email: 'scrubbles@email.com',
    },
    {
        username: 'X',
        email: 'willex@email.com',
    },
    {
        username: 'CC',
        email: 'CC@email.com'
    }
]

const thoughts = [
    {
        thoughtText: 'Congratulations to my brother for getting engaged',
        username: 'Scrubs',
        reactions: [{
            username: 'X',
            reactionBody: 'Woo!',
        }]
    },
    {
        thoughtText: 'Has anyone tried the new Avatar Pandora game on Steam?',
        username: 'X',
        reactions: [{
            username: 'Scrubs',
            reactionBody: 'So fun!',
        }]
    },
    {
        thoughtText: 'Tried the lasagna soup trend, it was delicious',
        username: 'CC',
    }
]

async function seedData() {
    await connection.dropCollection('users');
    await connection.dropCollection('thoughts');
    const newUsers = await User.insertMany(users);
    thoughts.forEach(async thoughtObject => {
        await seedThought(thoughtObject)
    });
}

async function seedThought(thoughtData) {
    const newThought = await Thought.create(thoughtData);
    const user = await User.findOneAndUpdate({ username: thoughtData.username },
    {
        $addToSet: {thoughts: newThought._id}
    },
    {
        new: true
    });

    console.log(user)
}

seedData();