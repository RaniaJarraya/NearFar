import { Component, OnInit } from '@angular/core';
import { SharedService } from 'src/app/shared/shared.service';
import { UserService } from 'src/app/shared/user.service';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styleUrls: ['./select.component.css']
})
export class SelectComponent implements OnInit {
data1;
data;
  date;
  time;
  time1;
  time2;
  time3;
  time4;
  data2;
  sum=0;
  moy: number;
  starList: boolean[] = [true,true,true,true,true,true,true,true,true,true]; 
  constructor(public userService:UserService,private _sharedService: SharedService) { }

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


    this.data1 = this._sharedService.data1;
    console.log(this.data1);
    this.userService.getExpert(this.data1).subscribe(
      response1=> {console.log(response1);
      this.data=response1;
      console.log(this.data);
      }, 
      err=>{
        console.log(err);
      }
      
    )

    this.userService.getRate(this.data1).subscribe(
      response=> {console.log(response);
      this.data2=response;
      console.log(this.data2);
      for (let h=0; h<this.data2.length;h++){
        console.log(this.data2[h]['rate']);
        this.sum= Number(this.sum)+Number(this.data2[h]['rate']);
        console.log(this.sum);
      }
      this.moy=Math.trunc(this.sum/this.data2.length);
      console.log(this.moy);

      for (let i=0;i<10;i++){
        if (i === this.moy){
          console.log("rania");
          for(let j=0;j<i;j++){
            this.starList[j]= false;

          }
          console.log(this.starList);
        }
      }





      }, 
      err=>{
        console.log(err);
      }
      
    )



  }

}
