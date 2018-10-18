import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import { NgForm } from '@angular/forms';
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService
  ) {
  }

  private onSubmit(f:NgForm){
    //console.log(f);
    this.authService.signin(f.value['email'], f.value['password']);
    f.reset();
  }

}
