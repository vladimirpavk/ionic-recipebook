import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import firebase from 'firebase';
import { AuthService } from '../../services/auth';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService
  ) {
  }

  private onSubmit(f:NgForm){
      this.authService.signup(f.value['email'], f.value['password']);
      f.reset();
  }
}
