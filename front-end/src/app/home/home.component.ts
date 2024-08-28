import { Component, inject } from '@angular/core';
import { IHome } from './home.models';
import { HomeService } from './home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  homeService = inject(HomeService);
  homeInfo!: IHome;
  failMessage = false;

  ngOnInit() {
    this.homeService.getHomeInfo().subscribe((res) => {
      if (res.status === 'success') {
        this.homeInfo = res.data.homeInfo[0];
      }
    });
  }
}
