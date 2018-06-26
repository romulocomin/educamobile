import { Component } from '@angular/core';

/**
 * Generated class for the CustomLegendaComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'custom-legenda',
  templateUrl: 'custom-legenda.component.html'
})
export class CustomLegendaComponent {

  text: string;

  constructor() {
    console.log('Hello CustomLegendaComponent Component');
    this.text = 'Hello World';
  }
  visible = false;
  toggle() {
    this.visible = !this.visible;
  }
}
