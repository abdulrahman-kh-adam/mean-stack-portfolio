import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-home-info2',
  templateUrl: './home-info2.component.html',
  styleUrl: './home-info2.component.css',
})
export class HomeInfo2Component {
  @Input({ required: true }) langs!: number;
  @Input({ required: true }) tools!: number;
  @Input({ required: true }) years!: number;
}
