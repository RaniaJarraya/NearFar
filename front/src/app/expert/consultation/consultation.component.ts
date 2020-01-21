import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-consultation',
  templateUrl: './consultation.component.html',
  styleUrls: ['./consultation.component.css']
})
export class ConsultationComponent implements OnInit {
  userDetails;
  consultDetails;
  searchedConsult=[];
  data;
  date ;
  time ;
  time1;
  time2;
  time3;
  time4;
  displayImage: string;
  constructor(public userService: UserService) { }

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
        this.userService.consult(this.userDetails.email).subscribe(
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
