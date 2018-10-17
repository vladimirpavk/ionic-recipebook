import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';
import { RecipeService } from '../../services/recipe';
import { Recipe } from '../../models/recipe';
import { ShoppingListService } from '../../services/shopping-list';
import { Ingridient } from '../../models/ingridient';

@IonicPage()
@Component({
  selector: 'page-edit-recipe',
  templateUrl: 'edit-recipe.html',
})
export class EditRecipePage implements OnInit {

  private mode:string = 'New';
  private recipeForm:FormGroup;
  private selectedOptions:string[] = ['Easy', 'Medium', 'Hard'];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private actionsheetCtrl: ActionSheetController,
    private alertCtrl:AlertController,
    private recipeService: RecipeService,
    private shoppingListService: ShoppingListService
  ) {
  }

  ngOnInit(){
    this.mode = this.navParams.data['mode'];

    let titleTemp:string = null;
    let descriptionTemp:string = null;
    let difficultyTemp:string = 'Easy';
    let ingridientsTemp = new FormArray([]);

    if(this.mode==='New'){

    }
    else
    {
      //this.mode==='Edit'
      //this.navParams.data['recipe']:Recipe
      let recipeTemp:Recipe = this.navParams.data['recipe'];
      titleTemp=recipeTemp.title;
      descriptionTemp=recipeTemp.description;
      difficultyTemp=recipeTemp.difficulty;
      
      if(recipeTemp.ingridients){
        for(let ing of recipeTemp.ingridients){
          ingridientsTemp.push(
            new FormGroup({
              'ingridient': new FormControl(ing.name, Validators.required) ,
              'qty': new FormControl(ing.amount, Validators.required) 
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      'title': new FormControl(titleTemp, Validators.compose([Validators.required, Validators.minLength(3)])),
      'description': new FormControl(descriptionTemp, Validators.compose([Validators.required, Validators.minLength(3)])),
      'difficulty': new FormControl(difficultyTemp, Validators.compose([Validators.required])),
      'ingridients': ingridientsTemp
    });   
  }
  
  private formSubmit(){
    this.recipeService.setRecipe(this.recipeForm.value);
    this.recipeForm.reset();
  }

  private presentAlert(){
    let alert=this.alertCtrl.create({
      title :'Add ingridient',
      inputs:[
        {
          name: 'ingridient',
          placeholder: 'Milk',
          type: 'text'
        },
        {
          name: 'qty',
          placeholder: '1',
          type: 'number'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          handler: (data)=>{
            
          }
        },
        {
          text: 'Add',
          handler: (data)=>{         
            if(data['ingridient'].length!=0 && data['qty'].length!=0){              
              (<FormArray>this.recipeForm.get('ingridients')).push(
                new FormGroup({
                  'ingridient':new FormControl(data['ingridient']),
                  'qty':new FormControl(data['qty'])
                })
              )
            }           
          }
        }
      ]
    }).present();    
  }

  private onManageIngridients():void{
    this.actionsheetCtrl.create({
      title: 'What do you want to do?',
      buttons:[
        {
          text: 'Add Ingridient',
          handler: ()=>{
            this.presentAlert();
          }
        },
        {
          text:'Add to Shopping list',
          handler:()=>{
            //this.shoppingListService.pushIngridient
            let ingFormArray:FormArray = <FormArray>(this.recipeForm.get('ingridients'));
            if(ingFormArray){
              ingFormArray.controls.forEach(
                (x)=>{
                  this.shoppingListService.pushIngridient(new Ingridient(
                    x.value['ingridient'],
                    x.value['qty']
                  ))
                }
              )
            }
          }
        },
        {
          text: 'Remove all Ingridients',
          role: 'destructive',
          handler: ()=>{
            (<FormArray>this.recipeForm.get('ingridients')).controls = [];
          }
        },
        {
          text: 'Cancel',
          role: 'cancel',
          handler: ()=>{

          }
        }
      ]     
    }).present();    
  }

  private onTrashIngridientClicked(formControlIndex:number):void{
    (<FormArray>this.recipeForm.get('ingridients')).removeAt(formControlIndex);
  }

}
