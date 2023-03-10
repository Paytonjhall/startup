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
        recipeCount.textContent = this.usersRecipes.length + "";
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
            like: function () {
                this.likes++;
            },
            name: name,
            instructions: instructions,
            author: getUserName()
        })
        console.log("added recipe: " + name);
    }

    likeRecipe(recipe) {
        //This will run when the like button is pressed
        recipe.like();
        this.updateCount();
    }

    updateCount() {
        const recipeCount = document.querySelector('.recipe-count');
        recipeCount.textContent = this.usersRecipes.length + "";
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

        if (recipes && recipes.length) {
            for (const [i, recipe] of recipes.entries()) {

                const nameTdEl = document.createElement('td');
                const instructionTdEl = document.createElement('td');
                const authorTdEl = document.createElement('td');
                const likesTdEl = document.createElement('td');

                nameTdEl.textContent = recipe.name;
                instructionTdEl.textContent = recipe.instructions;
                likesTdEl.textContent = recipe.likes;
                authorTdEl.textContent = recipe.author;
                if(recipe.author === getUserName()) {
                    const rowEl = document.createElement('tr');
                    rowEl.appendChild(nameTdEl);
                    rowEl.appendChild(instructionTdEl);
                    rowEl.appendChild(authorTdEl);
                    rowEl.appendChild(likesTdEl);
                    tableBodyEl.appendChild(rowEl);
                }
            }
        } else {
            tableBodyEl.innerHTML = '<tr><td colSpan=4>Add a recipe!</td></tr>';
        }
    }
}
const user = new userProfile();

user.loadRecipes();
