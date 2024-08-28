import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorksService } from '../works/works.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ICategory } from '../works-categories/works-categories.models';

@Component({
  selector: 'app-edit-work-category',
  templateUrl: './edit-work-category.component.html',
  styleUrl: './edit-work-category.component.css',
})
export class EditWorkCategoryComponent {
  myForm!: FormGroup;
  worksService = inject(WorksService);
  router = inject(Router);
  currentId!: string | null;
  currentCategory!: ICategory;
  activatedRoute = inject(ActivatedRoute);
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.myForm = new FormGroup({
      categoryName: new FormControl('', Validators.required),
    });
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.worksService.getWorksCategory(this.currentId).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.currentCategory = res.data.worksCategory;
          this.myForm.patchValue({
            categoryName: this.currentCategory.name,
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

  submitWorksCategory() {
    const name = this.myForm.value.categoryName;
    this.worksService.updateWorksCategory(this.currentId, name).subscribe(
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
