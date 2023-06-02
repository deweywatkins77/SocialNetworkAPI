const connection = require('../config/connection')
const { Users, Thoughts } = require('../models')
const { usernames, userEmail, thoughtData, reactionData } = require('./seedData')

connection.on('error', (err) => err)

connection.once('open', async () => {
  console.log('connected')

// Drop existing users and thoughts
await Users.deleteMany({})
await Thoughts.deleteMany({})

//create random function for generating random data, our seed data vars are all arrays so we just need this
function rand(data){
  return data[Math.floor(Math.random()*(data.length))]
}

//build user records
let users = []
for (i=0; i < usernames.length; i++){
  users.push({username:usernames[i], email:userEmail[i] })
}

//build thought and reaction records
let thoughtsArr = []
let reactionsArr = []

for (i=0; i < thoughtData.length; i++){
  thoughtsArr.push({
    thoughtText:thoughtData[i], 
    username:rand(usernames)
  })

  reactionsArr.push({
    reactionBody:reactionData[i], 
    username:rand(usernames)
  })
}

//insert data into collections
await Users.insertMany(users)

let randNum = Math.floor(Math.random()*4+2)
for (i=1; i <= randNum; i++){
  let friend = await Users.findOne({username:rand(usernames)})
  await Users.updateOne({username:usernames[i-1]},{$push :{friends:friend._id}})
}

for (const elem of thoughtsArr){
  let newRecord = await Thoughts.create(elem)
  await Users.updateOne({username:newRecord.username},{$push :{thoughts:newRecord._id}})
  await Thoughts.updateOne({_id:newRecord._id}, {$push:{reactions:reactionsArr[thoughtsArr.indexOf(elem)]}})
}

// Log out the seed data to indicate what should appear in the database
console.table(users)
console.table(thoughtsArr)
console.info('Seeding complete!')
process.exit(0)
})