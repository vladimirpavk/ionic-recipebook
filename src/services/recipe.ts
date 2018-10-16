import { Recipe } from "../models/recipe";

export class RecipeService{
    private initialRecipes:Recipe[] = [
        {
            'title' : 'Orange and Milk-Braised Pork Carnitas',
            'description' : 'I must have been the subliminal beer and liquor advertising...',
            'difficulty' : 'Medium',
            'ingridients': [
                {
                    'name':'Milk',
                    'amount':1
                },
                {
                    'name':'Chicken meat',
                    'amount':2
                },
                {
                    'name':'Sauce',
                    'amount':5
                }
            ]
        },
        {
            'title' : 'Baked Ham',
            'description' : 'My family loves ham like this. Sweetly seasoned ham roasted with moist heat is a delicious way...',
            'difficulty' : 'Easy',
            'ingridients': [
                {
                    'name':'Ham',
                    'amount':1
                },
                {
                    'name':'Cheese',
                    'amount':5
                }
            ]
        }
    ];

    private Recipes:Recipe[];

    constructor()
    {
        this.Recipes=this.initialRecipes.slice();
    }

    public getRecipes():Recipe[]{
        return this.Recipes;
    }

    public setRecipe(recipe:Recipe):void{
        this.Recipes.push(recipe);
    }
}