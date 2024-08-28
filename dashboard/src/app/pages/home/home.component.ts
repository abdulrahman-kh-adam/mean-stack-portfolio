import { ChangeDetectorRef, Component, inject } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { IHome } from './home.models';
import { HomeService } from './home.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  editMode = false;
  myForm!: FormGroup;
  homeService = inject(HomeService);
  homeInfo!: IHome;
  router = inject(Router);
  err = false;
  failMessage = '';

  ngOnInit() {
    this.myForm = new FormGroup({});
    this.homeService.getHomeInfo().subscribe(
      (data) => {
        if (data.status === 'fail') {
          this.router.navigate(['/error']);
        } else {
          this.homeInfo = data.data.homeInfo[0];
          this.myForm = new FormGroup({
            mainTitle: new FormControl(this.homeInfo.mainTitle, [
              Validators.required,
            ]),
            name: new FormControl(this.homeInfo.name, [Validators.required]),
            email: new FormControl(this.homeInfo.email, [Validators.required]),
            location: new FormControl(this.homeInfo.location, [
              Validators.required,
            ]),
            job: new FormControl(this.homeInfo.job, [Validators.required]),
            desc: new FormControl(this.homeInfo.desc, [Validators.required]),
            langs: new FormControl(this.homeInfo.langs, [Validators.required]),
            tools: new FormControl(this.homeInfo.tools, [Validators.required]),
            years: new FormControl(this.homeInfo.years, [Validators.required]),
          });
        }
      },
      (error) => {
        this.err = true;
        this.failMessage = 'Server Error';
      }
    );
  }

  submitForm() {
    this.homeInfo.mainTitle = this.myForm.value.mainTitle;
    this.homeInfo.name = this.myForm.value.name;
    this.homeInfo.email = this.myForm.value.email;
    this.homeInfo.location = this.myForm.value.location;
    this.homeInfo.job = this.myForm.value.job;
    this.homeInfo.desc = this.myForm.value.desc;
    this.homeInfo.langs = this.myForm.value.langs;
    this.homeInfo.tools = this.myForm.value.tools;
    this.homeInfo.years = this.myForm.value.years;
    this.uploadData();
  }

  uploadData() {
    this.homeService.uploadHomeInfo(this.homeInfo).subscribe((response) => {
      if (response.status === 'success') {
        this.err = false;
        this.toggleEditMode();
      } else {
        this.err = true;
      }
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }
}
