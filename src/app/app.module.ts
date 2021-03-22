import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'login',
    pathMatch: 'full',
    loadChildren: () => import('./views/login-page/login-page.module').then(mod => mod.LoginPageModule)
  },
  {
    path: '',
    canActivate: [AuthGuard],
    loadChildren: () => import('./views/campaigns-page/campaigns-page.module').then(mod => mod.CampaignsPageModule)
  },
  {
    path: '**',
    redirectTo: ''
  }
];

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
