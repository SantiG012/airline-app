import { Component,Input} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import{ FormsStateTransferService } from '../../services/forms-state-transfer.service';
import { IdPassengerTransferService } from '../../services/id-passenger-transfer.service';
import { UserPostService } from 'src/app/modules/data-bases-services/posts/user-post.service';
import { FormToUserService } from '../../services/form-to-user.service';

@Component({
  selector: 'app-passenger-forum',
  templateUrl: './passenger-forum.component.html',
  styleUrls: ['./passenger-forum.component.css']
})
export class PassengerForumComponent {
  @Input() index!: number;
  passengerForm!: FormGroup;
  formCompleted!: boolean;
  wrongForm!: boolean;

  constructor(private formsStateTransferService: FormsStateTransferService,
              private idPassengerTransferService:IdPassengerTransferService,
              private formToUserService:FormToUserService,
              private userPostService:UserPostService) { }
  
  ngOnInit() {
    this.passengerForm = new FormGroup({
      namesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      lastNamesControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[A-zÀ-ú ]+$')
        ]
      ),
      emailControl: new FormControl(
        null,[
          Validators.required,
          Validators.email,
          Validators.pattern('^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$')
        ]
      ),
      idControl: new FormControl(
        null,[
          Validators.required,
          Validators.pattern('^[0-9]{7,10}$')
        ]
      ),
    });

    this.formCompleted = false;
    this.wrongForm = false;
  }

  private checkFormsCompletion() {
    if (!this.passengerForm.valid){this.formCompleted = false; return;};
    this.formCompleted = true;
  }

  private disableForm() {
    this.passengerForm.disable();
  }

  private displayWrongForm() {
    this.wrongForm = true;

    setTimeout(() => {
      this.wrongForm = false;
    }
    , 5000);
  }

  onSubmit() {
    this.checkFormsCompletion();
    
    if (!this.formCompleted){this.displayWrongForm(); return;};

    this.disableForm();
    this.formsStateTransferService.setFormState(this.index, true);
    this.idPassengerTransferService.setPassengerId(this.index, this.idControl!.value);
    this.userPostService.postUser(this.formToUserService.createUserFromForm(this.passengerForm)).
    subscribe();
  }

  get namesControl() { return this.passengerForm.get('namesControl'); }
  get lastNamesControl() { return this.passengerForm.get('lastNamesControl'); }
  get emailControl() { return this.passengerForm.get('emailControl'); }
  get idControl() { return this.passengerForm.get('idControl'); }

}
