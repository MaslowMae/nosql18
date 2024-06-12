const connection = require('../config/connection');
const { User, Thought } = require('../models');
const { getRandomName, getRandomUserName, genRandomIndex, thoughtTitles, thoughts } = require('./data');

// Start the seeding runtime timer
console.time('seeding');

// Creates a connection to mongodb
connection.once('open', async () => {
  // Delete the collections if they exist
  let userCheck = await connection.db.listCollections({ name: 'users' }).toArray();
  if (userCheck.length) {
    await connection.dropCollection('users');
  }

  let thoughtCheck = await connection.db.listCollections({ name: 'thoughts' }).toArray();
  if (thoughtCheck.length) {
    await connection.dropCollection('thoughts');
  }

  // Empty arrays for randomly generated users and thoughts
  const users = [];
  const thoughtsData = [];

  // Generate random users
  for (let i = 0; i < 10; i++) {
    const username = getRandomUserName();
    const name = getRandomName();
    const newUser = {
      username,
      name,
      thoughts: [],
    };
    users.push(newUser);
  }

  // Generate random thoughts and associate with users
  for (let i = 0; i < 10; i++) {
    const thoughtTitle = thoughtTitles[genRandomIndex(thoughtTitles)];
    const thoughtText = thoughts[genRandomIndex(thoughts)];
    const user = users[genRandomIndex(users)];

    const thought = {
      thoughtTitle,
      thoughtText,
      username: user.username,
    };

    thoughtsData.push(thought);
    user.thoughts.push(thought);
  }

  // Insert users and thoughts into the database
  await User.collection.insertMany(users);
  await Thought.collection.insertMany(thoughtsData);

  console.table(users);
  console.table(thoughtsData);
  console.timeEnd('seeding');
  process.exit(0);
});