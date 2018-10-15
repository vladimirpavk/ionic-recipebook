import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import { IonicPage, NavController, NavParams, ActionSheetController } from 'ionic-angular';

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
    private actionsheetCtrl: ActionSheetController
  ) {
  }

  ngOnInit(){
    //console.log(this.navParams.data);
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
      'description': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
      'difficulty': new FormControl('Easy', Validators.compose([Validators.required]))
    });   
  }
  
  private formSubmit(){
    console.log(this.recipeForm.value);
  }

  private onManageIngridients():void{
    this.actionsheetCtrl.create({
      title: 'What do you want to do?',
      buttons:[
        {
          text: 'Add Ingridient',
          handler: ()=>{

          }
        },
        {
          text: 'Remove all Ingridients',
          role: 'destructive',
          handler: ()=>{

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

}
