require('dotenv').config();
const mongoose = require('mongoose');

mongoose.set('debug', true);
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DATABASE);

const db = require('./models');

const users = [
    { username: 'username', password: 'password' },
    { username: 'shailesh', password: 'password' },
];

const polls = [
    {
        question: 'Which is the your favourite leader?',
        options: ['Narendra Modi', 'Rahul Gandhi', 'Arvind Kejriwal'],
    },
    { question: 'Who is the best prime minister?', options: ['Dark Knight', 'Titanic'] },
    { question: 'Which parties do you support in India?', options: ['BJP', 'Congress', 'AAP'] },
    { question: 'Do you support right wing parties?', options: ['True', 'False'] },
    { question: 'Right or Left parties?', options: ['Right', 'Left'] },
];

const seed = async () => {
    try {
        await db.User.remove();
        console.log('DROP ALL USERS');

        await db.Poll.remove();
        console.log('DROP ALL POLLS');

        await Promise.all(
            users.map(async user => {
                const data = await db.User.create(user);
                await data.save();
            }),
        );
        console.log('CREATED USERS', JSON.stringify(users));

        await Promise.all(
            polls.map(async poll => {
                poll.options = poll.options.map(option => ({ option, votes: 0 }));
                const data = await db.Poll.create(poll);
                const user = await db.User.findOne({ username: 'username' });
                data.user = user;
                user.polls.push(data._id);
                await user.save();
                await data.save();
            }),
        );
        console.log('CREATED POLLS', JSON.stringify(polls));
    } catch (err) {
        console.error(err);
    }
};

seed();