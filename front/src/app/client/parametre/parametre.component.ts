import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-parametre',
  templateUrl: './parametre.component.html',
  styleUrls: ['./parametre.component.css']
})
export class ParametreComponent implements OnInit {
  userDetails: any;
  email: any;
  domaine: any;
  name: any;
  opened=0;
  opened2=0;
 
  opened4=0;
  opened5=0;
newName;
newPass;

  constructor(public userService:UserService, private toastr:ToastrService) { }

  ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email;
        this.domaine=this.userDetails.domaine;
        this.name=this.userDetails.firstName;
        console.log(this.userDetails);
      },
      err => { 
        console.log(err);
      }
    );
  }
  open(){
    this.opened=1;
  }
  open1(){
    this.opened2=1;
  }

  open3(){
    this.opened4=1;
  }
  open4(){
    this.opened5=1;
  }
  modifierName(newName){
    this.userService.ModifierName(this.email,newName).subscribe(
      res => {
        this.toastr.info('First Name Modified ' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );

  }

  modifierLastName(newLastName){
    this.userService.ModifierLastName(this.email,newLastName).subscribe(
      res => {
        this.toastr.info('Last Name Modified ' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );

  }
  
  modifierEmail(newEmail){
    this.userService.ModifierEmail(this.email,newEmail).subscribe(
      res => {
        this.toastr.info('Email Modified ' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );

  }
  

  modifierPass(newPass){
    this.userService.ModifierPass(this.email,newPass).subscribe(
      res => {
        this.toastr.info('Password Modified' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );

  }

  /*modifierDomaine(newDomaine){
    this.userService.ModifierDomaine(this.email,newDomaine).subscribe(
      res => {
        this.toastr.success('Saved' , 'Success!');

      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.toastr.error('Faled' , 'Enable!');
          
        }
        else
        this.toastr.warning('Faled' , 'Something went wrong!');
      }
    );

  }*/


}
