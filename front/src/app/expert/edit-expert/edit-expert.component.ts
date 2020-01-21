import { Component, OnInit, Inject } from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { UserService } from 'src/app/shared/user.service';
import { ActivatedRoute, Router } from '@angular/router';
@Component({
  selector: 'app-edit-expert',
  templateUrl: './edit-expert.component.html',
  styleUrls: ['./edit-expert.component.css']
})
export class EditExpertComponent implements OnInit {
 
  sub;
  id : number;
 // heure_dep:'';
 // heure_ter:'';
expert={ heure_dep:'',heure_ter:''}
  constructor(private route :ActivatedRoute , private userService: UserService, private router : Router, private toastr:ToastrService) {
  
   }

  ngOnInit() {
    this.sub = this.route.params.subscribe(params => {
      this.id = params['_id'];
      console.log(this.id);
      });
 
  }

  save(){
   this.userService.update(this.id,this.expert).subscribe(
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

  }

}
