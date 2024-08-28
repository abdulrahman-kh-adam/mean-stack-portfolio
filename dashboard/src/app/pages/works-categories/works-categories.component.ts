import { Component, inject } from '@angular/core';
import { WorksService } from '../works/works.service';
import { ICategory } from './works-categories.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-works-categories',
  templateUrl: './works-categories.component.html',
  styleUrl: './works-categories.component.css',
})
export class WorksCategoriesComponent {
  worksService = inject(WorksService);
  router = inject(Router);
  categories!: ICategory[];
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.worksService.getWorksCategories().subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.categories = res.data.worksCategories;
        } else {
          this.fail = true;
          this.failMessage = res.message;
        }
      },
      (error) => {
        this.fail = true;
        this.failMessage = 'Server Error';
      }
    );
  }

  deleteWorkCategory(_id: string | undefined) {
    if (_id) {
      this.worksService.deleteWorksCategory(_id).subscribe(
        (res) => {
          if (res.status === 'success') {
            this.fail = false;
            this.worksService.getWorksCategories().subscribe((res) => {
              this.categories = res.data.worksCategories;
            });
          } else {
            this.fail = true;
            this.failMessage = res.message;
          }
        },
        (error) => {
          this.fail = true;
          this.failMessage = 'Server Error';
        }
      );
    }
  }
}
