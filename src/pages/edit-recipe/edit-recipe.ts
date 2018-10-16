import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray } from '@angular/forms';

import { IonicPage, NavController, NavParams, ActionSheetController, AlertController } from 'ionic-angular';

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
    private alertCtrl:AlertController
  ) {
  }

  ngOnInit(){
    //console.log(this.navParams.data);
    this.recipeForm = new FormGroup({
      'title': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
      'description': new FormControl(null, Validators.compose([Validators.required, Validators.minLength(3)])),
      'difficulty': new FormControl('Easy', Validators.compose([Validators.required])),
      'ingridients': new FormArray([])
    });   
  }
  
  private formSubmit(){
    console.log(this.recipeForm.value);
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
            console.log('Cancel clicked');
          }
        },
        {
          text: 'Add',
          handler: (data)=>{
            console.log('Add clicked');
            console.log(data);
            if(data['ingridient'].length!=0 && data['qty'].length!=0){
              console.log('in if');
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

  private onTrashIngridientClicked(formControlIndex:number):void{
    console.log(formControlIndex);
  }

}
