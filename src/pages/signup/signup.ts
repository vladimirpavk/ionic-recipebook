import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, AlertController, Alert } from 'ionic-angular';
import { Subscription } from 'rxjs';

//services
import { AuthService } from '../../services/auth';

@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage implements OnInit, OnDestroy{

  private _loadingSubscription:Subscription;
  private _isErrorSubscription:Subscription;

  private _alertBox:Alert;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
  }

  private _alertFactory(title:string, errorMessage:string):void{
      this._alertBox = this.alertCtrl.create({
        title: title,
        message: errorMessage,
        buttons:[{
          text: 'Ok',
          role: 'cancel'
        }]
      })
  }

  ngOnInit(){
    let loading = this.loadingCtrl.create({
      content: 'Please wait...'
    });

    this._loadingSubscription = this.authService.isLoading.subscribe(
      (data:boolean)=>{
        if(data){
          loading.present();
        }
        else{
          loading.dismiss();
        }
      }
    );   

    this._isErrorSubscription = this.authService.isError.subscribe(
      (data:{title:string, errorMessage:string})=>
      {        
          this._alertFactory(data.title, data.errorMessage);
          this._alertBox.present().then(()=>{
            this._alertBox.dismiss();
          })
      }
    );

  }

  ngOnDestroy(){
    this._loadingSubscription.unsubscribe();
    this._isErrorSubscription.unsubscribe();
  }

  private onSubmit(f:NgForm){
      this.authService.signup(f.value['email'], f.value['password']);    
  }
}
