import { Subject, BehaviorSubject } from 'rxjs';
import firebase from 'firebase';

export class AuthService{

    private _isAuth:boolean = false;
    public isAuth(){
        return this._isAuth;
    }
    private _userCredentials:firebase.auth.UserCredential = null;
    public getUserCredentials():firebase.auth.UserCredential{
        return this._userCredentials;
    }

    public isLoading:Subject<boolean> = new Subject<boolean>();
    public isError:Subject<{title:string, errorMessage:string}> = new Subject<{title:string, errorMessage:string}>();
    public isAuthChanged:BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

    public signup(email:string, password:string){  
        this.isLoading.next(true);
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user:firebase.auth.UserCredential)=>{                
                this._isAuth = true;
                this.isAuthChanged.next(true);

                this._userCredentials = user;
                this.isLoading.next(false);
                this.isError.next({
                    title: 'Information',
                    errorMessage: 'User successfully created.'
                });
             })
            .catch((error)=>{                
                this.isLoading.next(false);
                this.isError.next({
                    title: 'Something wrong happened.',
                    errorMessage: error
                });           
            });
    }

    public signin(email:string, password:string){ 
        this.isLoading.next(true);       
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user:firebase.auth.UserCredential)=>{                
                this._isAuth = true;
                this.isAuthChanged.next(true);

                this._userCredentials = user;
                this.isLoading.next(false);               
            })
            .catch((error)=>{
                console.log('Something wrong happend - '+error);
                this.isLoading.next(false);              
                this.isError.next({
                    title: 'Something wrong happened.',
                    errorMessage: error
                });              
            });
    }

    public logout():void{
        firebase.auth().signOut();
        this._userCredentials = null;
        this._isAuth = false;
        this.isAuthChanged.next(false);
    }
}