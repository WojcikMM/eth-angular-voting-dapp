import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-add-candidate-modal',
  templateUrl: './add-candidate-modal.component.html',
  styleUrls: ['./add-candidate-modal.component.scss']
})
export class AddCandidateModalComponent {

  candidateName: FormControl = new FormControl('', Validators.required);

}
