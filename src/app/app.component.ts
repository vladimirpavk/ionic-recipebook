import { Component, OnInit, OnDestroy } from '@angular/core';
import { Platform, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import firebase from 'firebase';

//pages
import { TabsPage } from '../pages/tabs/tabs';
import { SignupPage } from '../pages/signup/signup';
import { SigninPage } from '../pages/signin/signin';
import { AuthService } from '../services/auth';
import { Subscription } from 'rxjs';

@Component({
  templateUrl: 'app.html'
})
export class MyApp implements OnInit, OnDestroy{
  rootPage:any = TabsPage;

  private authServiceSubscription:Subscription;
  private isAuth:boolean;

  constructor(
    platform: Platform,
    statusBar: StatusBar,
    splashScreen: SplashScreen,
    private menuCtrl:MenuController,
    private authService:AuthService
  ) {
    
    firebase.initializeApp({
      apiKey: "AIzaSyDdljJg_KMseY6HsvDQkBEt-8eCEc7b07o",
      authDomain: "ionic-recipebook-89e07.firebaseapp.com",
      databaseURL: "https://ionic-recipebook-89e07.firebaseio.com",
      projectId: "ionic-recipebook-89e07",
      storageBucket: "ionic-recipebook-89e07.appspot.com",
      messagingSenderId: "1009069268785"
    });

    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();
    });
  }

  ngOnInit(){
    this.authServiceSubscription = this.authService.isAuthChanged.subscribe(
      (isAuth:boolean)=>{
        if(isAuth){
          this.rootPage = TabsPage;
          this.isAuth = isAuth;
        }
        else{
          this.rootPage = SigninPage;
          this.isAuth = isAuth;
        }
      }
    )
  }

  ngOnDestroy(){
    this.authServiceSubscription.unsubscribe();
  }

  private onSignUp():void{
    this.rootPage = SignupPage;
    this.menuCtrl.close();
  }

  private onSignIn():void{
    this.rootPage = SigninPage;
    this.menuCtrl.close();
  }
  
  private onLogout():void{
    this.authService.logout();
    this.menuCtrl.close();
  }

  private onRecipeBook():void{
    this.rootPage = TabsPage;
    this.menuCtrl.close();
  }
  
}

