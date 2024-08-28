import { WorksService } from './../works/works.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ICategory } from '../works-categories/works-categories.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-works-category',
  templateUrl: './add-works-category.component.html',
  styleUrl: './add-works-category.component.css',
})
export class AddWorksCategoryComponent {
  myForm!: FormGroup;
  worksService = inject(WorksService);
  router = inject(Router);
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.myForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
    });
  }

  submitWorksCategory() {
    const name = this.myForm.value.categoryName;
    this.worksService.createWorksCategory(name).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.router.navigate(['/works/categories']);
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
