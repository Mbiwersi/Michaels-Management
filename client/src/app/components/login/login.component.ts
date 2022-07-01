import { Component, OnInit } from '@angular/core';
import * as $ from "jquery";
import { Router } from '@angular/router';
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  user: Object = {};

  constructor(private authService: AuthenticationService, private router: Router) { }


  ngOnInit(): void {
    $('#success-alert').hide();
    $('#failed-alert').hide();
    $('#username').val('');
    $('#password').val('');
    this.createAdmin();
  }

  login(): void {
    // console.log("TRYING TO LOG IN")
    let username: any = $(`#username`).val();
    let password: any = $(`#password`).val();
    // console.log(`username: ${username}, password: ${password}`)
    this.authService.login(username, password).subscribe((user) => {
      if(JSON.stringify(user) != '{}'){
        this.user = user;
        $('#success-alert').fadeTo(1000, 500).slideUp(500, function() {
          $('#success-alert').slideUp(500);
        })
        // Check to see if its not empty
        // if so change the page
        setTimeout(() => {
          this.router.navigateByUrl('/MichaelsManagement/home');
        }, 1000)
      } else{
        $('#failed-alert').fadeTo(2000, 500).slideUp(500, function() {
          $('#failed-alert').slideUp(500);
        })
      }

      // if user is empty do not allow change page
    })
  }

  getUser(): Object {
    return this.user;
  }

  //create admin on log in
  createAdmin(): void {
    this.authService.createAdmin().subscribe(() =>{
    })
  }
}
