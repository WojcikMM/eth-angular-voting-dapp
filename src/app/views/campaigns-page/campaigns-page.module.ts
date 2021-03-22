import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignListComponent } from './campaign-list/campaign-list.component';
import { CampaignPreviewComponent } from './campaign-preview/campaign-preview.component';
import { CreateCampaignModalComponent } from './modals/create-campaign-modal/create-campaign-modal.component';
import { AddCandidateModalComponent } from './modals/add-candidate-modal/add-candidate-modal.component';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { CampaignFactoryContractBuilder } from '../../web3';


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
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    CampaignFactoryContractBuilder
  ]

})
export class CampaignsPageModule {
}
