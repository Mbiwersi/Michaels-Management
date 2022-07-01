import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  users: User[] = []


  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers(): void {
    this.authService.getUsers().subscribe((users) => {
      let unfilteredUsers = <User[]>JSON.parse(JSON.stringify(users));
      let result: User[] = []
      unfilteredUsers.forEach((user) => {
        if(user.email != 'admin'){
          result.push(user);
        }
      })
      this.users = result;
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401){
        this.failedAlert(["You are not Autherized to be on this page"])
        setTimeout(() => {
          this.router.navigateByUrl('/MichaelsManagement/home');

        }, 1000)
      }
    })
  }

  updateAdmin(user: User): void {
    this.authService.toggleAdmin(user).subscribe(() => {
      this.successAlert(user.admin ? [`Demoted ${user.email}`]: [`Promoted ${user.email} to an admin`])
      this.getUsers();
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401){
        this.failedAlert(["You are not Autherized to be on this page"])
        setTimeout(() => {
          this.router.navigateByUrl('/MichaelsManagement/home');

        }, 1000)
      }
    })
  }

  removeUser(user: User): void {
    this.authService.removeUser(user).subscribe(() =>{
      this.successAlert(["Removed User"])
      this.getUsers();
    },
    (error: HttpErrorResponse) => {
      if(error.status == 401){
        this.failedAlert(["You are not Autherized to be on this page"])
        setTimeout(() => {
          this.router.navigateByUrl('/MichaelsManagement/home');

        }, 1000)
      }
      if(error.status == 400){
        this.failedAlert(["You are not able to Remove yourself"])
      }
    }
    )
  }

  successAlert(messages:String[]){
    messages.forEach(m => {
      $('#success-alert').append(`<p id='message'>${m}</p>`)
    })
    $('#success-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#success-alert').slideUp(500);
      messages.forEach(m => {
        $('#message').remove();
      })
    })
  }

  failedAlert(messages:String[]) {
    messages.forEach(m => {
      $('#failed-alert').append(`<p id='fail-message'>${m}</p>`)
    })
    $('#failed-alert').fadeTo(2000, 500).slideUp(500, function() {
      $('#failed-alert').slideUp(500);
      messages.forEach(m => {
        $('#fail-message').remove();
      })
    })
  }

}
