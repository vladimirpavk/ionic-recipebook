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

    public signup(email:string, password:string){        
        firebase.auth().createUserWithEmailAndPassword(email, password)
            .then((user:firebase.auth.UserCredential)=>{                
                this._isAuth = true;
                this._userCredentials = user;
            })
            .catch((error)=>{
                console.log('Something wrong happend - '+error);
            });
    }

    public signin(email:string, password:string){        
        firebase.auth().signInWithEmailAndPassword(email, password)
            .then((user:firebase.auth.UserCredential)=>{                
                this._isAuth = true;
                this._userCredentials = user;
            })
            .catch((error)=>{
                console.log('Something wrong happend - '+error);
            });
    }

    public logout():void{
        firebase.auth().signOut();
        this._userCredentials = null;
        this._isAuth = false;
    }
}