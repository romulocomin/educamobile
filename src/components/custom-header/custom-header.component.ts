import { Component, Input } from '@angular/core';
@Component({
  selector: 'custom-header',
  templateUrl: 'custom-header.component.html'
})
export class CustomHeaderComponent {

  text: string;
  @Input() title: string;

  constructor() {
    console.log('Hello CustomHeaderComponent Component');
    this.text = 'Hello World';
  }

}
