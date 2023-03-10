function getUserName() {
    return localStorage.getItem('username') ?? 'Mystery User';
}

class userProfile {
    usersRecipes = [];
    constructor() {

        this.usersRecipes = localStorage.getItem('recipes') ?? [];
        console.log("user profile loaded");
        const userName = document.querySelector('.user-name');
        userName.textContent = getUserName();
        // localStorage.clear(); // reset local storage
        const recipeCount = document.querySelector('.recipe-count');
        const count = localStorage.getItem('count') ?? 0;
        recipeCount.textContent = count + "";
    }

    addRecipe(recipe) {
        console.log("adding recipe");
        let recipes
        const recipesText = localStorage.getItem('recipes');
        if (recipesText) {
            console.log("recipes text: " + recipesText);
            try {
                recipes = JSON.parse(recipesText);
            } catch (e) {
                recipes = [];
            }
            console.log("recipes: " + recipes);
        }
        console.log(typeof recipes);
        console.log("recipes type")
        recipes.push(recipe);
        //this.usersRecipes.push(recipe);
        let recipesCounter = recipes.length;
        const recipeCount = document.querySelector('.recipe-count');
        recipeCount.textContent = recipesCounter + "";
        localStorage.setItem('recipes', JSON.stringify(recipes));
        this.loadRecipes();
        // recipeCount = usersRecipes.length; //Not sure what this is for
    }

    makeRecipe() {
        console.log("making recipe");
        let name = document.querySelector("#recipeName").value;
        let instructions = document.querySelector("#recipeInstructions").value;
        //document.querySelector("#recipeName").value = "";
        //document.querySelector("#recipeInstructions").value = "";

        this.addRecipe({
            likes: 0,
            name: name,
            instructions: instructions,
            author: getUserName()
        })
        console.log("added recipe: " + name);
    }

    likeRecipe(recipe) {
        //This will run when the like button is pressed
        console.log("liked recipe: " + recipe.name);
        recipe.likes ++
        let allRecipes = localStorage.getItem('recipes');
        allRecipes = JSON.parse(allRecipes);
        for (let i = 0; i < allRecipes.length; i++) {
            if (allRecipes[i].name === recipe.name) {
                allRecipes[i].likes = recipe.likes;
            }
        }
        localStorage.setItem('recipes', JSON.stringify(allRecipes));
        location.reload()

    }


    loadRecipes() {
        console.log("loading recipes");
        let recipes = []
        const recipesText = localStorage.getItem('recipes');
        if (recipesText) {
            console.log("recipes text: " + recipesText);
            try {
                recipes = JSON.parse(recipesText);
            } catch (e) {
                recipes = []
                console.log(e);
            }
            console.log("recipes: " + recipes);
        }


        const tableBodyEl = document.querySelector('#recipeList');
        let j = 0;
        if (recipes && recipes.length) {
            for (const [i, recipe] of recipes.entries()) {
                j++;
                const nameTdEl = document.createElement('td');
                const instructionTdEl = document.createElement('td');
                const authorTdEl = document.createElement('td');
                const likesTdEl = document.createElement('td');
                const likeButton = document.createElement('button');

                nameTdEl.textContent = recipe.name;
                instructionTdEl.textContent = recipe.instructions;
                likesTdEl.textContent = recipe.likes;
                authorTdEl.textContent = recipe.author;
                likeButton.textContent = "Like";
                likeButton.onclick = () => this.likeRecipe(recipe);
                if(recipe.author === getUserName()) {
                    const rowEl = document.createElement('tr');
                    rowEl.appendChild(nameTdEl);
                    rowEl.appendChild(instructionTdEl);
                    rowEl.appendChild(authorTdEl);
                    rowEl.appendChild(likesTdEl);
                    rowEl.appendChild(likeButton);
                    tableBodyEl.appendChild(rowEl);
                }
            }
        } else {
            tableBodyEl.innerHTML = '<tr><td colSpan=4>Add a recipe!</td></tr>';
        }
        localStorage.setItem('count', j);
    }
}
const user = new userProfile();

user.loadRecipes();
