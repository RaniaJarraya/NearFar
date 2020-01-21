import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {
role;
  userDetails;
  firstname;
  lastname;
  email;
  picture;
  picture1;
  constructor(public userService: UserService, private router: Router,private sanitizer:DomSanitizer) { }
  
  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.firstname=this.userDetails['firstName'];
        this.lastname=this.userDetails['lastName'];
        this.email=this.userDetails['email'];
        this.role=this.userDetails['role'];
        this.picture=this.userDetails['url'];
        console.log(this.picture);
        this.picture1="data:image/png;base64,"+this.picture;
        console.log(this.userDetails);
        if (this.role=="Expert"){
          this.router.navigate(['/login']);}
      },
      err => { 
        console.log(err);
        
      }
    );
  }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.picture1);
}
  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
