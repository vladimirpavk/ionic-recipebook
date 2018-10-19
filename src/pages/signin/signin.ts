import { Component, OnInit, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { IonicPage, NavController, NavParams, LoadingController, AlertController } from 'ionic-angular';
import { Subscription } from 'rxjs';

//services
import { AuthService } from '../../services/auth';

@IonicPage()
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
})
export class SigninPage implements OnInit, OnDestroy{

  private _loadingSubscription:Subscription;
  private _isErrorSubscription:Subscription;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authService: AuthService,
    private loadingCtrl: LoadingController,
    private alertCtrl: AlertController
  ) {
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
        let alert = this.alertCtrl.create({
          title: data.title,
          message: data.errorMessage,
          buttons:[{
            text: 'Ok',
            role: 'cancel'
          }]
        }).present();        
      }
    )

  }

  ngOnDestroy(){
    this._loadingSubscription.unsubscribe();
    this._isErrorSubscription.unsubscribe();
  }

  private onSubmit(f:NgForm){
    //console.log(f);
    this.authService.signin(f.value['email'], f.value['password']);
    f.reset();
  }

}
