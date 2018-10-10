import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { ValueTransformer } from '@angular/compiler/src/util';

import { ShoppingListService } from '../../services/shopping-list';

import { Ingridient } from '../../models/ingridient';

@IonicPage()
@Component({
  selector: 'page-shopping-list',
  templateUrl: 'shopping-list.html',
})
export class ShoppingListPage implements OnInit {

  private shoppingItemForm:FormGroup;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private shoppingListService:ShoppingListService
  ) {
  }
  
  ngOnInit(){
    this.shoppingItemForm=new FormGroup({
      "ingridientName": new FormControl('', Validators.compose([Validators.required, Validators.minLength(3)])),
      "ingridientAmount": new FormControl('', Validators.compose([Validators.required]))
    });
  }

  private formSubmit(){
    this.shoppingListService.pushIngridient(
      {
        name: this.shoppingItemForm.value['ingridientName'],
        amount: Number(this.shoppingItemForm.value['ingridientAmount'])
      }
    );
    this.shoppingItemForm.reset();
  }

}