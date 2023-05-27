import { Injectable,} from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../root-level-services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationGuard  {

  constructor(
    private authorizationService: AuthorizationService,
    private router: Router
  ) { }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (!this.authorizationService.isLogIn()) this.router.navigate(['administrador/login']);

    return this.authorizationService.isLogIn();
  }
  
}
