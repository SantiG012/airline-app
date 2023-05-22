import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { User } from 'src/app/interfaces/user';

@Injectable()
export class FormToUserService {

  constructor() { }

  createUserFromForm(form: FormGroup): User {
    const names:string = form.get('namesControl')?.value;
    const lastNames:string = form.get('lastNamesControl')?.value;
    const email:string = form.get('emailControl')?.value;
    const id:string = form.get('idControl')?.value;

    let user!:User;

    user.nombre = names;
    user.apellido = lastNames;
    user.correo = email;
    user.id = id;

    return user;
  }

}
