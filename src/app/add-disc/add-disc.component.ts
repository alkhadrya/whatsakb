import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/users.service';
import { User } from 'src/app/models/users.model';
import { map } from 'rxjs/operators';
import { MessagesService } from 'src/app/services/messages.service';
import { Messages } from 'src/app/models/messages.model'
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-add-disc',
  templateUrl: './add-disc.component.html',
  styleUrls: ['./add-disc.component.css'],
})
export class AddDiscComponent implements OnInit {
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
    currentUser: User={ 
      nom:"dkd",
      photo:'',
    };
users:any;
  constructor(private userService: UserService,private messageService: MessagesService,private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit() {
    this.id=this.route.snapshot.params["id"];
    this.retrieveUsers(this.id);
    this.retrieveMessages();
  }
 

  retrieveUsers(id:any): void {
    this.userService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.users = data;
      for (let i = 0; i <this.users.length; i++){
      if(this.users[i].key==id){
        this.currentUser=this.users[i];
      }
    }
    });
  }
  retrieveMessages(): void {
    this.messageService.getAll().snapshotChanges().pipe(
      map(changes =>
        changes.map(c =>
          ({ key: c.payload.key, ...c.payload.val() })
        )
      )
    ).subscribe(data => {
      this.messages = data;
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
}
