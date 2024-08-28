import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { WorksService } from '../works/works.service';
import { ActivatedRoute, Router } from '@angular/router';
import { IWork } from '../works/works.models';

@Component({
  selector: 'app-edit-work',
  templateUrl: './edit-work.component.html',
  styleUrl: './edit-work.component.css',
})
export class EditWorkComponent {
  myForm!: FormGroup;
  worksService = inject(WorksService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  currentId!: string | null;
  currentWork!: IWork;
  fail = false;
  failMessage = '';

  constructor() {
    this.myForm = new FormGroup({
      workName: new FormControl('', Validators.required),
      workImage: new FormControl(),
      workCategory: new FormControl('', Validators.required),
      workDescription: new FormControl('', Validators.required),
      workGithub: new FormControl('', Validators.required),
      workPreview: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.worksService
      .getWorkById(this.currentId ? this.currentId : null)
      .subscribe(
        (res) => {
          if (res.status === 'success') {
            this.fail = false;
            this.currentWork = res.data.work;
            this.myForm.patchValue({
              workName: this.currentWork.name,
              workCategory: this.currentWork.category,
              workDescription: this.currentWork.description,
              workGithub: this.currentWork.github,
              workPreview: this.currentWork.preview,
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

  submitWork() {
    this.currentWork.name = this.myForm.value.workName;
    this.currentWork.category = this.myForm.value.workCategory;
    this.currentWork.description = this.myForm.value.workDescription;
    this.currentWork.github = this.myForm.value.workGithub;
    this.currentWork.preview = this.myForm.value.workPreview;
    if (this.myForm.value.workImage) {
      let imgElement = document.getElementById('workImage') as HTMLInputElement;
      let img = imgElement.files ? imgElement.files[0] : null;
      let formData = new FormData();
      if (img) {
        formData.append('file', img);
      }
      this.worksService.uploadImage(formData).subscribe(
        (res) => {
          if (res.status === 'success') {
            this.fail = false;
            this.currentWork.image = res.filepath;
            this.uploadWork();
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
      this.uploadWork();
    }
  }

  uploadWork() {
    this.worksService
      .editWork(this.currentId ? this.currentId : null, this.currentWork)
      .subscribe(
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
