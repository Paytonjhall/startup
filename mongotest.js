const { MongoClient } = require('mongodb');
const DB = require('./database.js');

// Read the credentials from environment variables so that you do not accidentally check in your credentials
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;
// const client = new MongoClient(url);
// const collection = client.db('Pantry').collection('recipes');
// const url = `mongodb+srv://${userName}:${password}@${hostname}`;


async function main() {
    const url = `mongodb+srv://${userName}:${password}@${hostname}`;
    const client = new MongoClient(url);
    const collection = client.db('Pantry').collection('recipes');
    //const url = `mongodb+srv://${userName}:${password}@${hostname}`;
    //const url = `mongodb+srv://${userName}:${password}@${hostname}`;
    //const client = new MongoClient(url);
    //const collection = client.db('Pantry').collection('recipes');

    //likes: 0,
//             name: name,
//             instructions: instructions,
//             author: getUserName()
    // Insert a document
    const PantryItem = {
            likes: 24,
            name: 'Hot Cereal',
            instructions: 'Put in bowl, add milk, microwave for 2 minutes',
            author: 'Payton'
    };
   // await collection.insertOne(PantryItem);

    // Query the documents
    const query = {};
    const options = {
        limit: 25
    };

    const cursor = collection.find(query, options);
    const recipes = await cursor.toArray();
    recipes.forEach((i) => console.log(i));
    console.log(await getAllRecipes());
}

async function getAllRecipes() {
    const url = `mongodb+srv://${userName}:${password}@${hostname}`;
    const client = new MongoClient(url);
    const collection = client.db('Pantry').collection('recipes');

    const query = {};
    const options = {

        limit: 75,
    };
    const cursor = collection.find(query, options);
    return cursor.toArray();
    console.log("DB")
    await DB.getAllRecipes().then((recipes) => {
        console.log(recipes);
    })
}

async function testDatabase() {
    const response = await fetch('/api/allrecipes');
    console.log(response)


}

testDatabase();

