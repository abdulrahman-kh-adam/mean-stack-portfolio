import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorksService } from '../works/works.service';
import { Router } from '@angular/router';
import { IWork } from '../works/works.models';
import { ICategory } from '../works-categories/works-categories.models';

@Component({
  selector: 'app-add-work',
  templateUrl: './add-work.component.html',
  styleUrl: './add-work.component.css',
})
export class AddWorkComponent {
  myForm!: FormGroup;
  worksService = inject(WorksService);
  router = inject(Router);
  categories!: ICategory[];
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.worksService.getWorksCategories().subscribe(
      (res) => {
        if (res.status === 'success') {
          this.categories = res.data.worksCategories;
          this.fail = false;
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
    this.myForm = new FormGroup({
      workName: new FormControl('', Validators.required),
      workDescription: new FormControl('', Validators.required),
      workImage: new FormControl('', Validators.required),
      workGithub: new FormControl('', Validators.required),
      workPreview: new FormControl('', Validators.required),
      workCategory: new FormControl('', Validators.required),
    });
  }

  addSkill() {
    let imgElement = document.getElementById('workImage') as HTMLInputElement;
    let img = imgElement.files ? imgElement.files[0] : null;
    let formData = new FormData();
    if (img) {
      formData.append('file', img);
    }
    this.worksService.uploadImage(formData).subscribe(
      (res) => {
        if (res.status === 'success') {
          const newWork: IWork = {
            name: this.myForm.value.workName,
            image: res.filepath,
            category: this.myForm.value.workCategory,
            description: this.myForm.value.workDescription,
            github: this.myForm.value.workGithub,
            preview: this.myForm.value.workPreview,
          };
          this.fail = false;
          this.uploadSkill(newWork);
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

  uploadSkill(work: IWork): void {
    this.worksService.addWork(work).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.router.navigate(['/works']);
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
