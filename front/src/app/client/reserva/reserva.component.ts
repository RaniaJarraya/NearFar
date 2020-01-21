import { Component, OnInit,Inject,Input, ViewChild } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import * as moment from 'moment';
import { ToastrService } from 'ngx-toastr';

import { DialogData } from '../../dialogData';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ModalComponent } from '../modal/modal.component';
import { CounterComponent } from './counter.component';
@Component({
  selector: 'app-reserva',
  templateUrl: './reserva.component.html',
  styleUrls: ['./reserva.component.css']
})
export class ReservaComponent implements OnInit {


  @ViewChild('counter', {read:CounterComponent, static: false})
  private counter: CounterComponent;

  counterState = 'counter is ticking ';




 
  sub;
  new=[];
  new2=[];
  new3=[];
  new4=[];
  id : number;
pro;
pro1=[];
data=[];
data2;
info=[];
color1=[];
color0=[];
color2=[];
reserved2=[];
reserved3=[];
noreserved=[];
noreserved2=[];
noreserved3=[];
duration_heures;
duration_minutes;
  value_end: any;
  value_start: any;
  cases;
  times=[];
  times2=[];
  times3=[];
  case2='';
  userDetails;
  email;
  er="NaN";
  name: string;
  timepage: any;
  wait="wait";
  pic: any;
  constructor(private route :ActivatedRoute , private userService: UserService, private router : Router, private toastr:ToastrService,public dialog: MatDialog) { }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
    this.id = params['_id'];
    console.log(this.id);

    this.userService.getUserProfile().subscribe(
      res => {
        this.userDetails = res['user'];
        this.email=this.userDetails.email; 
        this.name=this.userDetails.firstName; 
        this.pic=this.userDetails.url;    
        console.log(this.email);
      },
      err => { 
        console.log(err);
        
      }
    );

    this.userService.expertDetails(this.id).subscribe(
      response => {
        console.log(response) ;
            //this.data=response;
            this.data[2]= response["Expert_name"];
            this.data[1]= response["email"];
            this.data[4]= response["dispo_Info"]["dispo_day"];
            this.data[6]= response["dispo_Info"]["heure_dep"];
            this.data[7]= response["dispo_Info"]["heure_ter"];
            this.data[5]= response["picture"];
            this.data[10]=response["_id"];
            this.value_start=this.data[6].split(':'); 
            this.value_end=this.data[7].split(':');
            this.duration_heures=(this.value_end[0]-this.value_start[0])*60;
            this.duration_minutes=this.value_end[1]-this.value_start[1];
            this.cases= Math.abs((this.duration_heures+this.duration_minutes)/30);
            console.log(this.cases);
            this.times[0]=Number(this.value_start[0]*60)+Number(this.value_start[1]);
            this.times2[0]=Number(this.value_start[0]*60)+Number(this.value_start[1]);
            console.log(this.times[0]);
                for (let i = 0; i < this.cases-1; i++) {
                  this.times[i+1]=this.times[i]+30;
                  this.times2[i+1]=this.times2[i]+30;
                 // console.log(this.times[i+1]);
                  //console.log(this.times2[i+1]);
                }
                for (let i = 0; i <= this.cases-1; i++) {
                  this.times2[i]=Math.trunc(this.times2[i]/60)
                 // console.log(this.times[i+1]);
                  console.log(this.times2[i]);
                }
                for (let i = 0; i <= this.cases-1; i++) {
                  this.times3[i]=this.times2[i]+':'+this.times[i]%60;
                 // console.log(this.times[i+1]);
                  //console.log(this.times3[i]);
                }

                console.log(this.times);
                //console.log(this.times2);
                console.log(this.times3);
                this.userService.getcolor(this.data[2],this.data[4]).subscribe(
                  response => {

                    this.data2=response;
                    console.log(response) ;
                    for (let i = 0; i < this.data2.length; i++) {
                      this.info[i]=this.data2[i]['consult_Info']['time'];
                    } 
                    console.log(this.info)   ;


                    for (let i = 0; i < this.data2.length; i++) {
                      this.color1[i]=this.info[i].split(':')[1];
                      this.color0[i]=this.info[i].split(':')[0];
                    } 
                    for (let i = 0; i < this.data2.length; i++) {
                      this.color2[i]=Number(this.color0[i]*60)+Number(this.color1[i]);
                    } 
                    console.log(this.color2);

                    for (let i =0 ;i<=this.times.length;i++){
                      for (let j=0;j<=this.color2.length;j++){
                        if (this.times[i]===this.color2[j]){break;}
                        if (j==this.color2.length){ this.noreserved[i]=this.times[i];}
                      }
                      continue;
                      
                    }
                    console.log( this.noreserved);


                    for (let i = 0; i <= this.noreserved.length-1; i++) {
                      this.noreserved2[i]=Math.trunc(this.noreserved[i]/60)
                     // console.log(this.times[i+1]);
                     // console.log(this.noreserved2[i]);
                    }
                    //console.log(this.noreserved2);
                    for (let i = 0; i <= this.noreserved.length-1; i++) {
                      this.noreserved3[i]=this.noreserved2[i]+':'+this.noreserved[i]%60;
                     // console.log(this.times[i+1]);
                      //console.log(this.times3[i]);
                    }
                    console.log(this.noreserved3)





                    for (let i = 0; i <= this.color2.length-1; i++) {
                      this.reserved2[i]=Math.trunc(this.color2[i]/60)
                     // console.log(this.times[i+1]);
                     // console.log(this.noreserved2[i]);
                    }
                    //console.log(this.reserved2);
                    for (let i = 0; i <= this.color2.length-1; i++) {
                      this.reserved3[i]=this.reserved2[i]+':'+this.color2[i]%60;
                     // console.log(this.times[i+1]);
                      //console.log(this.times3[i]);
                    }
                    console.log(this.reserved3);

                    this.userService.getProcess(this.data[1],this.data[4]).subscribe(
                      response => {
                        this.pro=response;
                        console.log(this.pro);       
                        for (let h=0; h<this.pro.length;h++){
                          this.pro1[h]=this.pro[h]['time'];
                        }
                        console.log(this.pro1);
    
    
                        for (let i =0 ;i<=this.noreserved3.length;i++){
                          for (let j=0;j<=this.pro1.length;j++){
                            if (this.noreserved3[i]===this.pro1[j]){break;}
                            if (j==this.pro1.length){ this.new[i]=this.noreserved3[i];}
                          }
                          continue;
                          
                        }
                        console.log( this.new);
    
    
                        /*for(let j=0;j<this.new.length;j++){
                          if (this.new[j]==="empty"){
                            continue;
                           
                          }
                          this.new2[j]=this.new[j];
                        }
                        console.log( this.new2);*/
    
                        
                        for(let j=0;j<this.new.length;j++){
                          if (this.new[j]=== "NaN:NaN"){
                            this.new3[j]="reserved";
                            continue;
                           
                          }
                          this.new3[j]=this.new[j];
                        }
                        console.log( this.new3);
    
    
    
                        for (let i =0 ;i<=this.new3.length;i++){
                          for (let j=0;j<=this.pro1.length;j++){
                            if (this.new3[i]===this.pro1[j]){break;}
                            if (j==this.pro1.length){ this.new4[i]=this.new3[i];}
                          }
                          continue;
                          
                        }
                        console.log( this.new4);
    
    
    
    
    
                        
                      },
                      err => {//error due to validation
                          console.log(err);}
                    );

                   
                   
                  }    
                );
                
               
            
            

            
      }    
     );

    


  })

}
/*reserve(cas){
  this.userService.reserve(this.data[1],this.data[4],cas,this.email).subscribe(
    res => {
      this.toastr.success('Saved' , 'Success!');
      console.log(cas);
    },
    err => {//error due to validation
      if (err.status == 422 ) {
        this.toastr.error('Faled' , 'Enable!');
        
      }
      else
      this.toastr.warning('Faled' , 'Something went wrong!');
    }
  );
};*/

openDialog(cas) {
  this.counter.startAt = 60;
  this.counter.counterState.subscribe((msg)=>{
    if(msg==='COMPLETE') {
      this.counterState = 'counter has stopped';
    }
  });
  this.counter.start();
  this.userService.startProcess(cas,this.data[1],this.data[4]).subscribe(
    res => {
     this.timepage=cas;
      console.log(cas);
    },
    err => {//error due to validation
        console.log(err);}
  );

  const dialogRef = this.dialog.open(ModalComponent, {

    width: '250px',
    data: {Client_name: this.name,
           Expert_name: this.data[2],
           Client_picture: this.pic,
           Expert_picture: this.data[5],
           case:cas,
           Expert_email:this.data[1],
           dispo_day:this.data[4],
           Client_email:this.email}
  } );
  setTimeout(() => {
    this.dialog.closeAll()
  }, 60000);

  dialogRef.afterClosed().subscribe( res => {
    this.userService.deleteProcess(cas,this.data[1],this.data[4]).subscribe(
      res => {
        console.log(cas);
      },
      err => {//error due to validation
          console.log(err);}
    );
    

  },
  err => {//error due to validation
    if (err.status == 422 ) {
      this.toastr.error('Faled' , 'Enable!');
      
    }
    else
    console.log(err);
    this.toastr.warning('Faled' , 'Something went wrong!');
  });

 
  }
  ngOnDestroy() {
    this.userService.deleteProcess(this.timepage,this.data[1],this.data[4]).subscribe(
      res => {
        console.log(this.timepage);
      },
      err => {//error due to validation
          console.log(err);}
    );
    
  }



}



