import { Component, OnInit } from '@angular/core';
import { UserService} from '../../shared/user.service'
import { NgForm } from '@angular/forms';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
  
})
export class SignUpComponent implements OnInit {
  emailRegex =/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  showSuccessMessage: boolean;
  serverErrorMessages: string;
  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    role:'',
    domaine:'',
    url:''

  };
  url='';
  url1='';
  base64textString: string;
  
  constructor(public userService: UserService,private sanitizer:DomSanitizer,private router : Router, private toastr:ToastrService) { }

  ngOnInit() {
  }
  onSubmit(form : NgForm){
    this.userService.postUser(this.user).subscribe(
      res => {

        //this.showSuccessMessage = true;
        //setTimeout(() => this.showSuccessMessage = false,4000);
        this.resetForm(form);
        this.router.navigateByUrl('/login');
        this.toastr.success('New user saved' , 'Success!');
      },
      err => {//error due to validation
        if (err.status == 422 ) {
          this.serverErrorMessages = err.error.join('<br/>');
          
        }
        else
          this.serverErrorMessages = 'Something went wrong.Please contact admin';


      }
    );
    

  }
  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.url1);
}
  //once registration is succeded we will rest fields to their initial values
  resetForm(form: NgForm) {
    /*this.userService.selectedUser = {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      role:'',
      domaine:''
      
    };*/
    this.user.firstName='';
    this.user.lastName='';
    this.user.email='';
    this.user.password='';
    this.user.role='';
    this.user.domaine='';
    this.user.url='';
  
    form.resetForm();
    this.serverErrorMessages = '' ;
  }

   readUrl(evt) {
    var files = evt.target.files;
    var file = files[0];

  if (files && file) {
      var reader = new FileReader();

      reader.onload = (event:any) => {
       
        var binaryString = event.target.result;
        this.url = event.target.result;
        this.base64textString= btoa(binaryString);
        console.log(btoa(binaryString));
        this.user.url=this.base64textString;
        this.url1="data:image/png;base64,"+this.base64textString;
        console.log(this.url1)
    }

      reader.readAsBinaryString(file);
  }
 }
 _handleReaderLoaded(readerEvt) {
  var binaryString = readerEvt.target.result;
         this.base64textString= btoa(binaryString);
         console.log(btoa(binaryString));
 }

}
