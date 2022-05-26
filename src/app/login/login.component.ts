import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/users.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent{
  users:any;
  user:any={
    pseudo:'',
    mdp:'',
  };
  mess:any;
  currentIndex = -1;
  currentUser:any;
  logedIn=false;
  isAdmin=false;
  constructor(private userService: UserService,private router: Router) { }

  ngOnInit() {
    this.retrieveUsers();
  }
 
  retrieveUsers(): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
    });
  }
  comparaison(): void{
    for (let i = 0; i <this.users.length; i++)
    {
    if(this.user.pseudo==this.users[i].pseudo){

        if(this.user.mdp==this.users[i].mdp){
        window.localStorage.setItem('id', this.users[i].key);
        this.mess="Bienvenue"
        alert("salam")
        this.reloadCurrentRoute();
        break;
    }else{
      this.mess="Mot de passe incorrect"
      break;
    }
    }else{
      this.mess="Vous ne vous êtes pas inscrit"
      // this.NewUser();
    }
    
    };alert(this.mess)
    this.NewUser();
  }
  reloadCurrentRoute() {
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(["/tab1"]);
    });
  }
  NewUser():void{
     this.user = {
          pseudo: '',
          mdp:'',
    };
  }
}
