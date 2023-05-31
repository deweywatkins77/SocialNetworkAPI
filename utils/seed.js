const connection = require('../config/connection')
const { Users, Thoughts } = require('../models')
const { usernames, userEmail } = require('./seedData')

connection.on('error', (err) => err)

connection.once('open', async () => {
  console.log('connected');

// Drop existing users
await Users.deleteMany({});

// Drop existing thoughts
await Thoughts.deleteMany({});

const users = []
for (i=0; i < usernames.length; i++){
    users.push({username:usernames[i], email:userEmail[i] });
}

//insert user data into collection
await Users.collection.insertMany(users);

// Log out the seed data to indicate what should appear in the database
console.table(users)
console.info('Seeding complete!')
process.exit(0)
})