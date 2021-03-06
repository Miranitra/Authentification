import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable} from 'rxjs';
import { map } from 'rxjs/operators';
import { User } from '../models/user';


@Injectable({
  providedIn: 'root'
})
export class AuthentificationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;
  httpOptions = {
    headers: new HttpHeaders({'content-type': 'application/json'})
  };

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
   }

   public get currentUserValue(): User{
     return this.currentUserSubject.value;
   }

   addUser(user : User){
     return this.http.post<User>('http://localhost:3000/auth/signup', user, this.httpOptions)
   }

   login(user : User){
     return this.http.post<User>('http://localhost:30000/auth/signin', user, this.httpOptions)
              .pipe(map(user => {
                localStorage.setItem('currentUser', JSON.stringify(user));
                this.currentUserSubject.next(user);
                return user;
              }))
   }

   logout() : void{
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
   }
}
