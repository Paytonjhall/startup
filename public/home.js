function getUserName() {
    return localStorage.getItem('username') ?? 'Mystery User';
}

class homePage {
    constructor() {
        const userName = document.querySelector('.user-name');
        userName.textContent = getUserName();
    }

    async loadRecipes() {
        const response = await fetch('/api/recipes', getUserName());
        const allrecipes = await response.json();
        localStorage.setItem('recipes', JSON.stringify(allrecipes));
        let recipes
        console.log("loading recipes");
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
                const likeButton = document.createElement('button');

                nameTdEl.textContent = recipe.name;
                instructionTdEl.textContent = recipe.instructions;
                likesTdEl.textContent = recipe.likes;
                authorTdEl.textContent = recipe.author;
                likeButton.textContent = "Like";
                likeButton.onclick = () => this.likeRecipe(recipe);

                const rowEl = document.createElement('tr');
                    rowEl.appendChild(nameTdEl);
                    rowEl.appendChild(instructionTdEl);
                    rowEl.appendChild(authorTdEl);
                    rowEl.appendChild(likesTdEl);
                    rowEl.appendChild(likeButton);

                tableBodyEl.appendChild(rowEl);
            }
        } else {
            tableBodyEl.innerHTML = '<tr><td colSpan=4>Add a recipe!</td></tr>';
        }

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
}

const home = new homePage();
home.loadRecipes();