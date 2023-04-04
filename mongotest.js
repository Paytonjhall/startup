const { MongoClient } = require('mongodb');

// Read the credentials from environment variables so that you do not accidentally check in your credentials
const userName = process.env.MONGOUSER;
const password = process.env.MONGOPASSWORD;
const hostname = process.env.MONGOHOSTNAME;

async function main() {
    const url = `mongodb+srv://${userName}:${password}@${hostname}`;
    const client = new MongoClient(url);
    const collection = client.db('Pantry').collection('recipes');

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
    await collection.insertOne(PantryItem);

    // Query the documents
    const query = {};
    const options = {
        limit: 25
    };

    const cursor = collection.find(query, options);
    const recipes = await cursor.toArray();
    recipes.forEach((i) => console.log(i));
}

main().catch(console.error);