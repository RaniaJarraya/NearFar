
import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from '@angular/material';
import { ExpertData } from '../../expertData';
import { UserService } from 'src/app/shared/user.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css']
})
export class ModalComponent2 implements OnInit {
 expert={ heure_dep:'',heure_ter:''}
  constructor(
    private userService:UserService, private toastr:ToastrService,
    public dialogRef: MatDialogRef<ModalComponent2>,
    @Inject(MAT_DIALOG_DATA) public data: ExpertData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }

  ngOnInit() {
    console.log(this.data.id);
  }
save(){
    this.userService.update(this.data.id,this.expert).subscribe(
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