import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../../shared/user.service';
import { Router } from '@angular/router';




@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.css']
})
export class SignInComponent implements OnInit {

  constructor(public userService: UserService,private router : Router) { }
  userDetails;
  model ={
    email :'',
    password :'',
    client:'',
    expert:''

  };
  client:'';
  expert:'';
domaine;

  emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  serverErrorMessages: string;

  ngOnInit() {
    if(this.userService.isLoggedIn())
    this.router.navigateByUrl('/login');
  }
  onSubmit(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.userService.getUserProfile().subscribe(
          res => {
            this.userDetails = res['user'];
            this.domaine=this.userDetails['domaine'];
            console.log(this.domaine);
            if (this.domaine==""){
              this.router.navigateByUrl('/clientprofile');
            }
            else if (this.domaine!=""){
              this.router.navigateByUrl('/expertprofile');
            }
          },
          err => { 
            console.log(err);
            
          }
        );
     },
      err => {
        this.serverErrorMessages = err.error.message;

      }
    );
  }

}
