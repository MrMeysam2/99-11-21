import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { CheckValidation } from 'src/app/shared/variables/validation';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  checkoutFormLogin: FormGroup;
  res: any;
  errorLogin: string;
  checkvalid: CheckValidation;
  ss;
  username;
  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {
    this.checkoutFormLogin = this.formBuilder.group({
      UserName: ['', [Validators.required, Validators.minLength(5)]],
      Password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit() {
    const loginForm = this.checkoutFormLogin.value;
    this.checkLogin(loginForm);
  }

  checkLogin(loginForm: any) {
    this.authService.postLogin(loginForm).subscribe((result) => {
      
      this.authService.setBearer(result.body.Result.Token);
      this.authService.setUsername(result.body.Result.FullName);

      if (result.body.Result.Status === 1) {
        this.router.navigate(['shakhshaghighi']);
      }
      else if (result.body.Result.Status === 0) {
        this.errorLogin = result.body.Result.Message;
      }
    });
  }
}