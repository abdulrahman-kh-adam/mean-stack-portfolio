import { SkillsService } from './../skills/skills.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ISkill } from '../skills/skills.models';

@Component({
  selector: 'app-edit-skill',
  templateUrl: './edit-skill.component.html',
  styleUrl: './edit-skill.component.css',
})
export class EditSkillComponent {
  myForm!: FormGroup;
  skillsService = inject(SkillsService);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  currentId!: string | null;
  currentSkill!: ISkill;
  fail = false;
  failMessage = '';

  constructor() {
    this.myForm = new FormGroup({
      skillName: new FormControl('', Validators.required),
      skillImage: new FormControl(),
      skillCategory: new FormControl('', Validators.required),
    });
  }

  ngOnInit() {
    this.currentId = this.activatedRoute.snapshot.paramMap.get('id');
    this.skillsService.getSkillById(this.currentId).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.currentSkill = res.data.skill;
          this.myForm.patchValue({
            skillName: this.currentSkill.name,
            skillCategory: this.currentSkill.category,
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

  submitSkill() {
    this.currentSkill.name = this.myForm.value.skillName;
    this.currentSkill.category = this.myForm.value.skillCategory;
    if (this.myForm.value.skillImage) {
      let imgElement = document.getElementById(
        'skillImage'
      ) as HTMLInputElement;
      let img = imgElement.files ? imgElement.files[0] : null;
      let formData = new FormData();
      if (img) {
        formData.append('file', img);
      }
      this.skillsService.uploadImage(formData).subscribe(
        (res) => {
          if (res.status === 'success') {
            this.fail = false;
            this.currentSkill.image = res.filepath;
            this.uploadSkill();
          } else {
            this.fail = true;
            this.failMessage = res.message;
          }
        },
        (error) => {
          this.fail = true;
          this.failMessage = error.message;
        }
      );
    } else {
      this.uploadSkill();
    }
  }

  uploadSkill(): void {
    this.skillsService.editSkill(this.currentId, this.currentSkill).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.router.navigate(['/skills']);
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
