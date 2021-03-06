import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { infoUser } from '../models/infoUser';
import { AuthentificationService } from '../services/authentification.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : User;
  infoUser : infoUser;
  constructor(private authentificationService : AuthentificationService) { }

  ngOnInit(): void {
    this.infoUser = new infoUser("");
    this.user = new User("","",this.infoUser);
    
  }

  addUser(): void{
    this.authentificationService.addUser(this.user)
        .subscribe(() => console.log("connecté"));
  }
}
