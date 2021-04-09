import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PageTitleBarComponent } from './page-title-bar/page-title-bar.component';
import { MatButtonModule } from '@angular/material/button';


@NgModule({
  declarations: [
    PageTitleBarComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule
  ],
  exports: [
    PageTitleBarComponent
  ]
})
export class ComponentsModule {
}
