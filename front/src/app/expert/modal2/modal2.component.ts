
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { DeletetData } from '../../delete_modal';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-modal2',
  templateUrl: './modal2.component.html',
  styleUrls: ['./modal2.component.css']
})
export class Modal2Component implements OnInit {

    expert={ heure_dep:'',heure_ter:''}
     constructor(
       private userService:UserService, private toastr:ToastrService,
       public dialogRef: MatDialogRef<Modal2Component>,
       @Inject(MAT_DIALOG_DATA) public data: DeletetData) {}
   
     onNoClick(): void {
       this.dialogRef.close();
     }
   
     ngOnInit() {
       
     }
     delete(){
      console.log(this.data.day);
      this.userService.delete(this.data.email,this.data.day).subscribe(
        res => {
          this.dialogRef.close();
          this.toastr.success('deleted' , 'Success!');
  
        },
        err => {//error due to validation
          if (err.status == 422 ) {
            this.toastr.error('Faled' , 'Enable!');
            
          }
          else
          console.log(err);
          this.toastr.warning('Faled' , 'Something went wrong!');
        }
      );
  
  
    }
   save(){
       this.userService.delete(this.data.email,this.data.day).subscribe(
          res => {
            this.toastr.success('changed' , 'Success!');
    
          },
          err => {//error due to validation
            if (err.status == 422 ) {
              this.toastr.error('Faled' , 'Enable!');
              
            }
            else
            console.log(err);
            this.toastr.warning('Faled' , 'Something went wrong!');
          }
        );
        this.dialogRef.close();
    
      }
      
   
   }

