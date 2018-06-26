import { NgModule } from '@angular/core';
import { CustomHeaderComponent } from './custom-header/custom-header.component';
import { CustomLegendaComponent } from './custom-legenda/custom-legenda.component';
@NgModule({
	declarations: [CustomHeaderComponent,
    CustomLegendaComponent],
	imports: [],
	exports: [CustomHeaderComponent,
    CustomLegendaComponent]
})
export class ComponentsModule {}
