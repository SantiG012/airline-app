import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Admin } from 'src/app/interfaces/Admin';
import { AuthorizationService } from 'src/app/root-level-services/authorization.service';
import { AdminLogInStatusDTO } from 'src/app/DTOs/adminDTOs/adminLogInStatusDTO';
import { Observable,tap} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  adminForm!: FormGroup;
  adminLogInStatus$!: Observable<AdminLogInStatusDTO>;
  requestStatusMessage!: string;

  constructor(
    private authorizationService: AuthorizationService
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

  onSubmit() {
    if (this.adminForm.invalid) return;
    const admin: Admin = {
      adminId: this.identificationControl?.value,
      pass: this.passwordControl?.value
    };

    this.authorizationService.login(admin).subscribe();

    this.adminLogInStatus$ = this.authorizationService.getAdminLogInStatus().pipe(
      tap((adminLogInStatusDTO: AdminLogInStatusDTO) => {
        adminLogInStatusDTO.status ? 
        this.requestStatusMessage = 'Log In Successful' 
        : this.requestStatusMessage = adminLogInStatusDTO.statusMessage;
      })
    );
  }

  get identificationControl() { return this.adminForm.get('identificationControl'); }
  get passwordControl() { return this.adminForm.get('passwordControl'); }
}
