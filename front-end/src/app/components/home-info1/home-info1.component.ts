import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-info1',
  templateUrl: './home-info1.component.html',
  styleUrl: './home-info1.component.css',
})
export class HomeInfo1Component {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) desc!: string;
}
