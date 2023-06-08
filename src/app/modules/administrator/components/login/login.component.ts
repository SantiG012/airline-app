import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/interfaces/Admin';
import { AuthorizationService } from 'src/app/root-level-services/authorization.service';
import { Router } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminForm!: FormGroup;
  adminLogInStatus!: boolean;
  failedLogInMessage!: string;

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) {}

  ngOnInit() {
    this.adminForm = new FormGroup({
      identificationControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      ),
      passwordControl: new FormControl(
        null,[
          Validators.required,
        ]
      ),
    });
  }

  private displayLogInStatus(): void {
    this.adminLogInStatus = true;

    setTimeout(() => {
      this.adminLogInStatus = false;
    }, 4000);
  }

  onSubmit() {
    if (this.adminForm.invalid) return;
    const admin: Admin = {
      adminId: this.identificationControl?.value,
      pass: this.passwordControl?.value
    };

    this.authorizationService.login(admin).subscribe({
      complete: () => {
        this.router.navigate(['/administrador/dashboard']);
      },
      error: (error:HttpErrorResponse): void => {
        if(error.status === 0){
          alert("Error de conexión con el servidor");
          return;
        }

        this.failedLogInMessage = error.error.mensaje;

        this.displayLogInStatus();
      }
    });

  }

  get identificationControl() { return this.adminForm.get('identificationControl'); }
  get passwordControl() { return this.adminForm.get('passwordControl'); }
}
