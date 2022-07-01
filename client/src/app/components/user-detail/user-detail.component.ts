import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';
import * as $ from "jquery";
import { Router } from '@angular/router';


@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {

  user: User = {_id: 0,first_name: "", last_name: "", email: "", password: "", admin: false}

  constructor(private router:Router, private authService: AuthenticationService) { }

  ngOnInit(): void {
    this.getUser();
    $('#user-form').hide()
  }

  getUser(): void {
    this.authService.getUser().subscribe((user) => {
      this.user = <User>JSON.parse(JSON.stringify(user));
    })
  }

  updateUser(uid: number, first: string, last: string, email:string): void {
    this.authService.updateUser(uid, first, last, email).subscribe((user) =>{
      this.user = <User>JSON.parse(JSON.stringify(user));
    })
  }

  showForm() {
    $('#user-form').show('slow')
    $('#edit').hide('slow');
  }

  hideForm() {
    $('#user-form').hide('slow')
    $('#edit').show('slow');
  }

}
