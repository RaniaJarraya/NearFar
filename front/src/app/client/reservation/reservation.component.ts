import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  userDetails : any;
  data;
  date;
  time;
  time1 ;
  time2 ; 
  time3;
  time4;
  displayImage: string;
  constructor(public userService:UserService, private router:Router) { }

  ngOnInit() {
    
  this.date = new Date().toISOString().slice(0,10); 
  this.time= new Date().toISOString().slice(11,16);
  this.time1=this.time.split(':');
  this.time2=this.time1[0];
  this.time3=this.time1[1];
  this.time4=Number(this.time2)+1;
console.log(this.time4);

/*var date = (today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate());
var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
var dateTime = date+' '+time;*/
console.log(this.date);
console.log(this.time);
    
    this.userService.getUserProfile().subscribe(
    res => {
      this.userDetails = res['user'];
      console.log(this.userDetails.email);
      this.userService.getresev(this.userDetails.email).subscribe(
        response => {console.log(response) ;
          this.data=response;
          
          //this.searchedConsult[0]= response[0]["Expert_email"];
          //this.searchedConsult[1]= response["Expert_email"];
          //this.searchedConsult[2]= response["consult_Info"]["time"];
          //this.searchedConsult[3]= response["dateActual"];
          //this.searchedConsult[4]= response["consult_Info"]["day"];
        
        }    
       );

    },
    err => { 
      console.log(err);
      
    }

    
  );
  }


  transform(pic){
    console.log(pic);
    //var picc="data:image/png;base64,"+pic;
    this.displayImage ="data:Image/png;base64,"+pic;
  
  }
  
}



/*ngOnInit() {

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email;
        this.domaine=this.userDetails.domaine;

        console.log(this.email);
        console.log(this.domaine);

        console.log(this.userDetails.email);
      },
      err => { 
        console.log(err);
        
      }
    );
  
  }

  save(){
    this.userService.regInfo(this.expert,this.email,this.domaine).subscribe(
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
  }

}*/

