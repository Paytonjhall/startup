function getUserName() {
    return localStorage.getItem('username') ?? 'Mystery User';
}

class userProfile {
constructor(){
    let usersRecipes = [];
    const userName = document.querySelector('.user-name');
    userName.textContent = getUserName();
    const recipeCount = document.querySelector('.recipe-count');
    recipeCount.textContent = usersRecipes.length;

}

addRecipe(recipe){
    usersRecipes.push(recipe);
    loadRecipes();
    recipeList = usersRecipes.length;
}

makeRecipe(){
    const name = document.querySelector('.recipeName');
    const instructions = document.querySelector('.recipeInstructions');
    this.addRecipe({
        likes: 0,
        like: function(){
            this.likes++;
        },
        name: name,
        instructions: instructions
        })
    console.log("added recipe: " + name);
    }

        likeRecipe(recipe){
        recipe.like();
        updateCount();
    }

    updateCount(){
        const recipeCount = document.querySelector('.recipe-count');
        recipeCount.textContent = usersRecipes.length;
        }

    loadRecipes(){
       for (const [i, recipe] of usersRecipes.entries()){
           console.log(recipe);
           const recipeCard = document.createElement('div');
           recipeCard.classList.add('recipe-card');
           recipeCard.setAttribute('data-index', i);
           recipeCard.innerHTML = `
           <div class="recipe-card">
           <h2>${recipe.name}</h2>
           <p>${recipe.instructions}</p>
           <p>Likes: ${recipe.likes}</p>
           <button class="like-btn">Like</button>
           </div>
           `;
           const likeBtn = recipeCard.querySelector('.like-btn');
           likeBtn.addEventListener('click', function(){
               recipe.like();
               likeBtn.previousElementSibling.textContent = `Likes: ${recipe.likes}`;
           })
           document.querySelector('.recipe-list').appendChild(recipeCard);
       }
    }
}

const user = new userProfile();



