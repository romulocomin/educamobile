import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { AcademicoPage } from './academico';

@NgModule({
  declarations: [
    AcademicoPage,
  ],
  imports: [
    IonicPageModule.forChild(AcademicoPage),
  ],
})
export class AcademicoPageModule {}
