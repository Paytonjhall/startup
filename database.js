const { MongoClient } = require('mongodb');
const bcrypt = require('bcrypt');
const uuid = require('uuid');

const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

if (!userName) {
    throw Error('Database not configured. Set environment variables');
}

const url = `mongodb+srv://${userName}:${password}@${hostname}`;

const client = new MongoClient(url);
const userCollection = client.db('pantry').collection('user');
const recipesCollection = client.db('pantry').collection('recipes');

function getUser(email) {
    return userCollection.findOne({ email: email });
}

function getUserByToken(token) {
    return userCollection.findOne({ token: token });
}

async function createUser(email, password) {
    // Hash the password before we insert it into the database
    const passwordHash = await bcrypt.hash(password, 10);

    const user = {
        email: email,
        password: passwordHash,
        token: uuid.v4(),
    };
    await userCollection.insertOne(user);

    return user;
}

function addRecipe(recipe) {
    recipesCollection.insertOne(recipe);
}

//likes: 0,
//             name: name,
//             instructions: instructions,
//             author: getUserName()

function getAllRecipes() {
    const query = {};
    const options = {

        limit: 75,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}

function getUserRecipes(user){
    const query = {};
    const options = {
        sort: { author: user },
        limit: 10,
    };
    const cursor = scoreCollection.find(query, options);
    return cursor.toArray();
}

module.exports = {
    getUser,
    getUserByToken,
    createUser,
    addRecipe,
    getAllRecipes,
    getUserRecipes,
};
