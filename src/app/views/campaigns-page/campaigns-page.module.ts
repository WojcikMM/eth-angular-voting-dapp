import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignPreviewComponent } from './campaign-preview/campaign-preview.component';
import { CreateCampaignModalComponent, AddCandidateModalComponent } from './modals';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFactoryContractBuilder } from '../../web3';
import { MatDialogModule } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CampaignListItemComponent } from './campaign-list/campaign-list-item/campaign-list-item.component';


const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'campaign/list'
  },
  {
    path: 'campaign/list',
    component: CampaignListComponent
  },
  {
    path: 'campaign/:id',
    component: CampaignPreviewComponent
  }
];


@NgModule({
  declarations: [
    CampaignListComponent,
    CampaignPreviewComponent,
    AddCandidateModalComponent,
    CreateCampaignModalComponent,
    CampaignListItemComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatInputModule,
    MatFormFieldModule,
    MatDialogModule,
    RouterModule.forChild(routes),
    ReactiveFormsModule
  ],
  providers: [
    CampaignFactoryContractBuilder
  ]

})
export class CampaignsPageModule {
}
