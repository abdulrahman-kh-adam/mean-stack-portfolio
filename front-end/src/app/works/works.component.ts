import { Component, inject } from '@angular/core';
import { ICategory, IWork } from './works.models';
import { WorksService } from './works.service';
import { env } from '../../../environments';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  works: Array<ICategory> = [];
  worksService = inject(WorksService);
  fail = false;
  failMessage!: string;
  url = env.SERVER_URL;

  ngOnInit() {
    this.worksService.getCategories().subscribe((res) => {
      if (res.status === 'success') {
        this.works = res.data.worksCategories;
        this.works = res.data.worksCategories.map((category: ICategory) => ({
          ...category,
          worksMap: new Map<string, IWork>(),
        }));
        this.worksService.getWorks().subscribe((res) => {
          if (res.status === 'success') {
            res.data.works.forEach((work: IWork) => {
              this.works.forEach((category: ICategory) => {
                if (work.category === category.name) {
                  category.worksMap.set(work._id, work);
                }
              });
            });
            this.works.forEach((category) => {
              category.worksArray = Array.from(category.worksMap.values());
            });
          } else {
            this.fail = true;
          }
        });
      } else {
        this.fail = true;
      }
    });
  }
}
