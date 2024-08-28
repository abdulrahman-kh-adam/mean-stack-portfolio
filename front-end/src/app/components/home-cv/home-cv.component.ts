import { Component, Input } from '@angular/core';
import { env } from '../../../../environments';

@Component({
  selector: 'app-home-cv',
  templateUrl: './home-cv.component.html',
  styleUrl: './home-cv.component.css',
})
export class HomeCvComponent {
  @Input({ required: true }) name!: string;
  @Input({ required: true }) title!: string;
  @Input({ required: true }) email!: string;
  @Input({ required: true }) location!: string;
  @Input({ required: true }) work!: string;
  cv = env.SERVER_URL + '/uploads/cv.pdf';
}
