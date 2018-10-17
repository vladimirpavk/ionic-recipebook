import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { EditRecipePage } from '../edit-recipe/edit-recipe';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';

@IonicPage()
@Component({
  selector: 'page-recipes',
  templateUrl: 'recipes.html',
})
export class RecipesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private recipeService: RecipeService
  ) {
  }

  private onNewrecipe(){
    this.navCtrl.push(EditRecipePage, { 'mode' : 'New' });
  }

  private onTrashRecipeClicked(recipeIndex:number):void{
    this.recipeService.clearRecipe(recipeIndex);
  }

  private onRecipeItemClicked(recipe:Recipe):void{
    console.log('recipeitem clicked');
    this.navCtrl.push(EditRecipePage, {
      'mode' : 'Edit',
      'recipe' : recipe
    })
  }
}
