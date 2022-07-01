import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as $ from "jquery";
import { AuthenticationService } from 'src/app/services/authentication/authentication.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  constructor(private authService: AuthenticationService, private router: Router) { }

  ngOnInit(): void {
    $('#success-alert2').hide();
    $('#failed-alert2').hide();
  }

  register(): void {
    let first_name: any = $('#reg-first-name').val();
    let last_name: any = $('#reg-last-name').val();
    let username: any = $(`#reg-username`).val();
    let password: any = $(`#reg-password`).val();
    // console.log(`first_name: ${first_name}, last_name: ${last_name}, username: ${username}, password: ${password}`)
    this.authService.register(first_name, last_name, username, password).subscribe((user:any) =>{
      if(!user.errors){
        if(user.code == 11000){
          $('#failed-alert2').fadeTo(2000, 500).slideUp(500, function() {
            $('#failed-alert2').slideUp(500);
          })
        }
        else{
          $('#success-alert2').fadeTo(2000, 500).slideUp(500, function() {
            $('#success-alert2').slideUp(500);
          })
          setTimeout(() => {
            this.router.navigateByUrl('/MichaelsManagement/login');
          }, 2000)
        }
      }
      else{
        $('#failed-alert2').fadeTo(2000, 500).slideUp(500, function() {
          $('#failed-alert2').slideUp(500);
        })
      }
    })
  }

}
