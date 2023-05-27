import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthorizationService } from '../root-level-services/authorization.service';

@Injectable({
  providedIn: 'root'
})
export class AdminAuthenticationGuard  {

  constructor(
    private authorizationService: AuthorizationService
  ) { }

  canActivate(
    childRoute: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authorizationService.isLogIn();
  }
  
}
