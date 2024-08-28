import { Component, inject } from '@angular/core';
import { IAbout } from './about.models';
import { AboutService } from './about.service';
import { env } from '../../../environments';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  aboutInfo!: IAbout;
  failMessage = false;
  aboutService = inject(AboutService);
  url = env.SERVER_URL;

  ngOnInit() {
    this.aboutService.getHomeInfo().subscribe((res) => {
      if (res.status === 'success') {
        this.aboutInfo = res.data.aboutInfo[0];
      } else {
        this.failMessage = true;
      }
    });
  }
}
