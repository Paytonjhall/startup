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