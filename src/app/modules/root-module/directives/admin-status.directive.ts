import { AuthorizationService } from 'src/app/root-level-services/authorization.service';
import { Directive, ElementRef, HostListener} from '@angular/core';
import { AdminLogInStatusDTO } from 'src/app/DTOs/adminDTOs/adminLogInStatusDTO';
import { Router } from '@angular/router';

@Directive({
  selector: '[appAdminStatus]'
})
export class AdminStatusDirective {

  isAdminLogIn: boolean = false;

  constructor(
    private authorizationService: AuthorizationService,
    private elementRef: ElementRef,
    private router: Router
  ) { }

  private changeAnchorText(): void {
    if (this.isAdminLogIn) {
      this.elementRef.nativeElement.innerText = 'Cerrar Sesión';
      return;
    }

    this.elementRef.nativeElement.innerText = 'Administrador';
  }

  ngOnInit() {
    this.authorizationService.getAdminLogInStatus().subscribe(
      (adminLogInStatus:AdminLogInStatusDTO) => {
        console.log(adminLogInStatus);
        this.isAdminLogIn = adminLogInStatus.status;
        this.changeAnchorText();
      }
    );
  }

  private changeAnchorLink(): void {
    if (this.isAdminLogIn) {
      this.authorizationService.logOut();
      this.authorizationService.setAdminLogInStatus(false, 'You are logged out');
      this.router.navigate(['']);
      return;
    }

    this.router.navigate(['administrador/login']);
  }

  @HostListener('click') onClick() {
    this.changeAnchorLink();
  }

}
