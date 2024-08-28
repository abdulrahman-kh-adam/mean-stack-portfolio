import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent {
  @Input({ required: true }) title!: string;
  @Input({ required: true }) img!: string;
  @Input({ required: true }) github!: string;
  @Input({ required: true }) preview!: string;
}
