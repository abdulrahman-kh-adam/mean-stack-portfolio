import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { SkillsService } from '../skills/skills.service';
import { Router } from '@angular/router';
import { ISkill } from '../skills/skills.models';

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrl: './add-skill.component.css',
})
export class AddSkillComponent {
  addForm!: FormGroup;
  skillsService = inject(SkillsService);
  router = inject(Router);
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.addForm = new FormGroup({
      skillName: new FormControl('', Validators.required),
      skillImage: new FormControl('', Validators.required),
      skillCategory: new FormControl('FrontEnd', Validators.required),
    });
  }

  addSkill() {
    let imgElement = document.getElementById('skillImage') as HTMLInputElement;
    let img = imgElement.files ? imgElement.files[0] : null;
    let formData = new FormData();
    if (img) {
      formData.append('file', img);
    }
    this.skillsService.uploadImage(formData).subscribe(
      (res) => {
        if (res.status === 'success') {
          const newSkill: ISkill = {
            name: this.addForm.value.skillName,
            image: res.filepath,
            category: this.addForm.value.skillCategory,
          };
          this.fail = false;
          this.uploadSkill(newSkill);
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

  uploadSkill(skill: ISkill): void {
    this.skillsService.addSkill(skill).subscribe((res) => {
      if (res.status === 'success') {
        this.router.navigate(['/skills']);
      } else {
        this.router.navigate(['/error']);
      }
    });
  }
}
