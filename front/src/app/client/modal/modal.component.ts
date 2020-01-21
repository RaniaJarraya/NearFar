import { Component, OnInit, Inject, Input, ViewChild } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DialogData } from '../../dialogData';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
import { CounterComponent } from '../reserva/counter.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent implements OnInit {
  @ViewChild('counter', {read:CounterComponent, static: false})
  private counter: CounterComponent;
info ={E_email:'',C_email:'',E_name:'',C_name:'', E_picture:'',C_picture:'', day:''}

  constructor(private userService:UserService, private toastr:ToastrService,
    public dialogRef: MatDialogRef<ModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  

  onNoClick(): void {
    this.dialogRef.close();
    this.counter.stop();
  }

  ngOnInit() {
    this.info.C_email=this.data.Client_email;
    this.info.E_email=this.data.Expert_email;
    this.info.C_picture=this.data.Client_picture;
    this.info.E_picture=this.data.Expert_picture;
    this.info.C_name=this.data.Client_name;
    this.info.E_name=this.data.Expert_name;
    this.info.day=this.data.dispo_day;

  }

  reserve(cas){
    this.userService.reserve(this.info,cas).subscribe(
      res => {
        //this.toastr.success('Saved' , 'Success!');
        console.log(cas);
      },
      err => {//error due to validation
        if (err.status == 422 ) {
         // this.toastr.error('Faled' , 'Enable!');
         console.log(err);
          
        }
        else
        //this.toastr.warning('Faled' , 'Something went wrong!');
        console.log(err);
      }
    );

    this.dialogRef.close();
  };

}