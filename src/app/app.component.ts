import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/users.model';
import { map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from 'src/app/services/messages.service';
import { Messages } from 'src/app/models/messages.model'
import { distinct } from 'rxjs/operators';
import { Pipe, PipeTransform } from '@angular/core';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent{
  users:any;
  user:any={
    pseudo:'',
    mdp:'',
  };
  discussion=true;
  sign=false;
  contact=false;
  mess:any;
  currentIndex = -1;
  currentUser:any;
  logedIn=false;
  isAdmin=false;
   id_user:any=window.localStorage.getItem('id');
  messages:any;
  message: Messages = {
      contenu: '',
    vu: false,
    source: 0, 
    lu: false, 
    dest:0,
    date:new Date(),
  }; 
  mydate=new Date();
  id:any;
    images: any;
    currentUserr: User={
      nom:"dkd",
      photo:'',
    };
    userr: User = {
      key:'',
    nom: '',
    prenom: '',
    pseudo: '', 
    datenaiss:'',
    mail: '', 
    tel: '',
    photo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png"
  };
    read:any;
  constructor(private userService: UserService,private router: Router,private messageService: MessagesService,private route: ActivatedRoute) { }

  ngOnInit() {
    this.retrieveUsers();
     this.id=this.route.snapshot.params["id"];
    this.retrieveUserrs(this.id);
    this.retrieveMessages();
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
        this.logedIn=true;
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
 reloadCurrentRoute(route:any) {
    let currentUrl = route;
    this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
        this.router.navigate(["/disc/"+currentUrl]);
    });
}
  NewUser():void{
     this.user = {
          pseudo: '',
          mdp:'',
    };
  }
retrieveUserrs(id:any): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      this.read=data;
      for (let i = 0; i <this.users.length; i++){
        this.read[i].lu=false;
      if(this.users[i].key==id){
        this.currentUserr=this.users[i];
      }
    }
    });
  }
saveUser(): void {
  this.userr.key=this.users.length+1;
    this.userService.create(this.userr).then(() => {
      console.log('Created new item successfully!');
       this.NewUserr();
      this.reloadCurrentRoute("/")
    });
  }
ssign(): void {
    this.sign=true;
    this.logedIn=false;
  }
  NewUserr(): void {
    this.userr = {
            key:'',
            nom: '',
            prenom: '',
            pseudo: '',
            datenaiss:'',
            mail: '',
            tel: '',
            photo: "https://upload.wikimedia.org/wikipedia/commons/f/f4/User_Avatar_2.png",
    };  
}
  retrieveMessages(): void {
    this.messageService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.messages=data;
      this.read=data;
       for (let i = 0; i <this.users.length; i++){
        this.read[i].lu=false;
       }
     for(let i=data.length-1;i>= 0;i--)
      
     {
      if(data[i].dest==this.id_user || data[i].source==this.id_user){

      if(data[i].dest==this.id_user && !this.read[data[i].source -1].lu){
        this.messages[i].vu=true;
        this.read[data[i].source-1].lu=true;
      }else if (data[i].source==this.id_user && !this.read[data[i].dest -1].lu){
          this.messages[i].vu=true;
         this.read[data[i].dest -1].lu=true;
      }
}
}
    });
  }
saveMessage(): void {
    const data = {
          contenu: this.message.contenu,
          source: this.id_user,
    lu: this.message.lu,
    vu: this.message.vu,
    dest:this.route.snapshot.params["id"] ,
        date: this.mydate.toString(),
    };
    this.messageService.create(data).then(() => {
      console.log('Created new item successfully!');
       this.NewMessage();
       this.ngOnInit();
    });
  }
  NewMessage(): void {
    this.message = {
          contenu: '',
    vu: false,
    source: 0,
    lu: false,
    dest:0,
    date:new Date(),
    };  
}
mycontact():void{
  this.contact=true;
  this.discussion=false;
}
mycontact_close():void{
  this.contact=false;
  this.discussion=true;
}
}