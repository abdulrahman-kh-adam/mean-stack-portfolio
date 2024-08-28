import { Component, inject } from '@angular/core';
import { IAbout } from './about.models';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AboutService } from './about.service';
import { Router } from '@angular/router';
import { env } from '../../../../environment';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrl: './about.component.css',
})
export class AboutComponent {
  editMode = false;
  myForm!: FormGroup;
  aboutService = inject(AboutService);
  aboutInfo!: IAbout;
  router = inject(Router);
  imgUrl = env.SERVER_URL;
  failMessage = false;
  errorMessage = '';

  constructor() {
    this.myForm = new FormGroup({});
  }

  ngOnInit() {
    this.aboutService.getAboutInfo().subscribe((res) => {
      if (res.status === 'fail') {
        this.router.navigate(['/error']);
      } else {
        this.aboutInfo = res.data.aboutInfo[0];
        this.myForm = new FormGroup({
          description: new FormControl(
            this.aboutInfo.description,
            Validators.required
          ),
          image: new FormControl(),
        });
        console.log('ngOnInit done');
      }
    });
  }

  submitForm() {
    const newDesc = this.myForm.value.description;
    const newImag = this.myForm.value.image;
    this.aboutInfo.description = newDesc;
    if (newImag) {
      const fileInput = document.getElementById(
        'imageInput'
      ) as HTMLInputElement;
      const file = fileInput.files ? fileInput.files[0] : null;
      const formData = new FormData();
      if (file) {
        formData.append('file', file);
      }
      this.aboutService.uploadFile(formData).subscribe((res) => {
        if (res.status === 'success') {
          this.aboutInfo.image = `${res.filepath}`;
          this.uploadData();
        } else {
          this.router.navigate(['/error']);
        }
      });
    } else {
      this.uploadData();
    }
  }

  uploadData() {
    this.aboutService.updateAboutInfo(this.aboutInfo).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.toggleEditMode();
          this.failMessage = false;
        } else {
          this.failMessage = true;
          this.errorMessage = res.message;
        }
      },
      (error) => {
        this.failMessage = true;
        this.errorMessage = 'Server error';
      }
    );
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
