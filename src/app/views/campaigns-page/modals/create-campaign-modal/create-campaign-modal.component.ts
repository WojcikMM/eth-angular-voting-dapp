import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-create-campaign-dialog',
  templateUrl: './create-campaign-modal.component.html',
  styleUrls: ['./create-campaign-modal.component.scss']
})
export class CreateCampaignModalComponent {

  campaignName: FormControl = new FormControl('', Validators.required);

}
