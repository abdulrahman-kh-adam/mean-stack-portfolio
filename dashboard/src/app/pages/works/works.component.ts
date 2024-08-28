import { Component, inject } from '@angular/core';
import { WorksService } from './works.service';
import { IWork } from './works.models';
import { Router } from '@angular/router';
import { env } from '../../../../environment';

@Component({
  selector: 'app-works',
  templateUrl: './works.component.html',
  styleUrl: './works.component.css',
})
export class WorksComponent {
  worksService = inject(WorksService);
  router = inject(Router);
  works: IWork[] = [];
  url = env.SERVER_URL;
  deleteWorkId!: string;
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.worksService.getWorks().subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.works = res.data.works;
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

  registerWorkId(id: string | null) {
    if (id) {
      this.deleteWorkId = id;
    }
  }

  deleteWork() {
    this.worksService.deleteWork(this.deleteWorkId).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.worksService.getWorks().subscribe(
            (res) => {
              if (res.status === 'success') {
                this.fail = false;
                this.works = res.data.works;
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
