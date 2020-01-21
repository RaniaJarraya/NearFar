import { Component, OnInit } from '@angular/core';
import { UserService } from '../shared/user.service';
import { Router } from '@angular/router';
import { DomSanitizer } from '@angular/platform-browser';
import { NotifierService } from 'angular-notifier';
import {ToastrService} from 'ngx-toastr';
import { SharedService } from '../shared/shared.service';
@Component({
  selector: 'app-expert',
  templateUrl: './expert.component.html',
  styleUrls: ['./expert.component.css']
})
export class ExpertComponent implements OnInit {

  userDetails;
  firstname: any;
  lastname: any;
  email: any;
  domaine;
  picture;
  picture1;
  date;
  time;
  time1;
  time2;
  time3;
  time4;
  data;
  data2=[];
  data3=[];
  h=0;
  public visited=false;
  constructor(public userService: UserService, private router: Router,private sanitizer:DomSanitizer,notifierService: NotifierService, private toastr:ToastrService,public share:SharedService) { }
role;

  ngOnInit() {
    //this.router.navigate(['/expert_home']);
    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.firstname=this.userDetails['firstName'];
        this.lastname=this.userDetails['lastName'];
        this.email=this.userDetails['email'];
        this.role=this.userDetails['role'];
        this.domaine=this.userDetails['domaine'];
        this.picture=this.userDetails['url'];
        //console.log(this.picture);
        this.picture1="data:image/png;base64,"+this.picture;
        console.log(this.userDetails);
        if (this.role=="Client"){
          this.router.navigate(['/login']);
        }
      },
      err => { 
        console.log(err);
        
      }
    );
    this.date = new Date().toISOString().slice(0,10); 
   // this.time= new Date().toISOString().slice(11,16);
   // this.time1=this.time.split(':');
  //this.time2=this.time1[0];
  //this.time3=this.time1[1];
  // this.time4=Number(this.time2)+1;
  console.log(this.date);
  this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['user'];
      console.log(this.userDetails.email);
      this.userService.consult(this.userDetails.email).subscribe(
        response => {console.log(response) ;
          this.data=response;
          //this.searchedConsult[0]= response[0]["Expert_email"];
          //this.searchedConsult[1]= response["Expert_email"];
          //this.searchedConsult[2]= response["consult_Info"]["time"];
          //this.searchedConsult[3]= response["dateActual"];
          //this.searchedConsult[4]= response["consult_Info"]["day"];
          
          for (let i =0;i<this.data.length;i++){
            this.data2[i]=this.data[i]['dateActual'];
          }
          console.log(this.data2);


          for (let i =0;i<this.data2.length;i++){
            this.data3[i]=this.data2[i].slice(0,10);
          }
          console.log(this.data3);

          var yesterday=this.date.slice(8,10)-1;
          console.log(yesterday);
          for (let j=0;j<this.data3.length;j++){
            if (this.data3[j].slice(8,10)===this.date.slice(8,10) || this.data3[j].slice(8,10)==yesterday ){this.h++}
            continue;
          }
          console.log(this.h);

       

         
          
          

        
        }    
      );

    },
    err => { 
      console.log(err);
      
    }

    
  );
  
  }
 


  show(id){
   
    var msg = 'you have   '+ this.h  +' New reservations since yesterday  ';
    this.toastr.warning(msg, ' NOTIF');
    document.getElementById(id).style.display = 'none';
    this.h=0;
  }


  transform(){
    return this.sanitizer.bypassSecurityTrustResourceUrl(this.picture1);
}


  onLogout(){
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
}
