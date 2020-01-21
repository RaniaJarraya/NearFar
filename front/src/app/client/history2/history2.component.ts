import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-history2',
  templateUrl: './history2.component.html',
  styleUrls: ['./history2.component.css']
})
export class History2Component implements OnInit {
  userDetails;
  firstname;
  lastname;
  email;
  
 Expert_email='';
 currentRate;
  constructor(public userService: UserService, private router: Router, private toastr:ToastrService) { }

  ngOnInit() {
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.firstname=this.userDetails['firstName'];
        this.lastname=this.userDetails['lastName'];
        this.email=this.userDetails['email'];
        console.log(this.userDetails);
      },
      err => { 
        console.log(err);
        
      }
    );
  }


  send(){
    this.userService.rate(this.email,this.Expert_email,this.currentRate).subscribe(
      res => {
        this.toastr.success('send' , 'Success!');

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


}
