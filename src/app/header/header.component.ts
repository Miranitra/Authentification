import { Component, OnInit } from '@angular/core';
import { User } from '../models/user'
import { infoUser } from '../models/infoUser';
import { AuthentificationService } from '../services/authentification.service';
import { first } from 'rxjs/operators';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  user : User;
  infoUser : infoUser;
  constructor(private authentificationService : AuthentificationService,
              private route : ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.infoUser = new infoUser("");
    this.user = new User("","",this.infoUser,"");
    
  }

  addUser(): void{
    
    this.authentificationService.addUser(this.user)
        .subscribe(() => console.log("connecté"));
  }

  signin(): void{
    console.log("mail :" + this.user.mail);
    console.log("pwd :" + this.user.pwd);
    this.authentificationService.login(this.user)
      .pipe(first())
      .subscribe({
        next: () =>{ 
          console.log("connected");
          const returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
          this.router.navigate([returnUrl]);
        }
      })
  }
}
