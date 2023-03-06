function getUserName() {
    return localStorage.getItem('username') ?? 'Mystery User';
}

class userProfile {
constructor(){
    let usersRecipes = [];
    const userName = document.querySelector('.user-name');
    userName.textContent = getUserName();
}

addRecipe(recipe){
    usersRecipes.push(recipe);
}

makeRecipe(name, instructions){
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
        return recipe
    }
}

const user = new userProfile();
