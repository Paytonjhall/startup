function getUserName() {
    return localStorage.getItem('username') ?? 'Mystery User';
}

function likeRecipe(recipeId) {

}

function makeRecipeObject(name, instructions){
    return {
        likes: 0,
        like: function(){
            this.likes++;
        },
        name: name,
        instructions: instructions
    }
}

class homePage {
    constructor() {
        const userName = document.querySelector('.user-name');
        userName.textContent = getUserName();
    }

    loadRecipes() {

        console.log("loading recipes");
        let recipes
        console.log(this.usersRecipes)
        const recipesText = localStorage.getItem('recipes');
        if (recipesText) {
            recipes = JSON.parse(recipesText);
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
                    const rowEl = document.createElement('tr');
                    rowEl.appendChild(nameTdEl);
                    rowEl.appendChild(instructionTdEl);
                    rowEl.appendChild(authorTdEl);
                    rowEl.appendChild(likesTdEl);
                    tableBodyEl.appendChild(rowEl);
            }
        } else {
            tableBodyEl.innerHTML = '<tr><td colSpan=4>Add a recipe!</td></tr>';
        }
    }
}

const home = new homePage();
home.loadRecipes();