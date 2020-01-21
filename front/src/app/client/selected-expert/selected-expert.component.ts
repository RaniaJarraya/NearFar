import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/shared/user.service';
import { SharedService } from 'src/app/shared/shared.service';

@Component({
  selector: 'app-selected-expert',
  templateUrl: './selected-expert.component.html',
  styleUrls: ['./selected-expert.component.css']
})
export class SelectedExpertComponent implements OnInit {

  sub;
  id : number;
data=[];
  data1;
  constructor(private route :ActivatedRoute , private userService: UserService, private router : Router,private _sharedService: SharedService) { }

  ngOnInit() {
    this.data1 = this._sharedService.data1;
    console.log(this.data1);
    this.sub = this.route.params.subscribe(params => {
    this.id = params['_id'];
    console.log(this.id);
    this.userService.expertDetails(this.id).subscribe(
      response => {
        console.log(response) ;
            //this.data=response;
            this.data[1]= response["email"];
            this.data[2]= response["dispo_Info"]["client_number"];
            this.data[3]= response["dateActual"];
            this.data[4]= response["dispo_Info"]["dispo_day"];
            this.data[5]= response["dispo_Info"]["dure1"];
            this.data[11]= response["dispo_Info"]["dure30"];
            this.data[6]= response["dispo_Info"]["heure_dep"];
            this.data[7]= response["dispo_Info"]["heure_ter"];
            this.data[8]= response["Expert_name"];
            this.data[9]= response["domaine"];
            this.data[10]=response["_id"];
      
      }    
     );
  })

}
/*gotopage(){
  this.router.navigateByUrl('/reserve');
}*/}
