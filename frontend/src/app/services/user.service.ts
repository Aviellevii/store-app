import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { User } from '../shared/models/User';
import {IUserLogin} from '../shared/interfaces/IUserLogin'
import { HttpClient } from '@angular/common/http';
import { AlertifyService } from './alertify.service';
import { LOGIN_USER_URL, USER_REGISTER_URL } from '../shared/constants/urls';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
const USER_KEY = 'User';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private userSubject:BehaviorSubject<User> = new BehaviorSubject(this.GetUserFromLocalStorage());
  public  userObservable:Observable<User>;
  constructor(private http:HttpClient, private alertify:AlertifyService) { 
    this.userObservable = this.userSubject.asObservable();
  } 
  Login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(LOGIN_USER_URL, userLogin).pipe(
      tap({
        next:(user)=>{
          this.SetUserToLocalStorage(user)
          this.userSubject.next(user);
          this.alertify.success(`Welcome ${user.name}`)
        },
        error:(errorResponse)=>{
          this.alertify.error(errorResponse.error,'Login Failed');   
        }
      })
    )
  }
  Register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      
      tap({
        next:(user)=>{
         
          this.SetUserToLocalStorage(user);
          this.userSubject.next(user);
          this.alertify.success(`Welcome ${user.name} The Register Success`)

        },
        error:(errorResponse)=>{
          this.alertify.error(errorResponse.error,'Register Failed')
        }
      })
    )
  }
  public get currentUser():User{
    return this.userSubject.value;
  }
  logOut(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    location.reload();
  }

  private SetUserToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private GetUserFromLocalStorage():User{
    const userJson = localStorage.getItem(USER_KEY);
    if(userJson) return JSON.parse(userJson) as User
    return new User();
  }
}
