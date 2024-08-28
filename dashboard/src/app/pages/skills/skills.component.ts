import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { SkillsService } from './skills.service';
import { ISkill } from './skills.models';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { env } from '../../../../environment';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  skillsService = inject(SkillsService);
  router = inject(Router);
  skills: ISkill[] = [];
  url = env.SERVER_URL;
  deleteSkillId!: string;
  fail = false;
  failMessage = '';

  ngOnInit() {
    this.skillsService.getSkills().subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.skills = res.data.skills;
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

  registerSkillId(id: string | null) {
    if (id) {
      this.deleteSkillId = id;
    }
  }

  deleteSkill() {
    this.skillsService.deleteSkill(this.deleteSkillId).subscribe(
      (res) => {
        if (res.status === 'success') {
          this.fail = false;
          this.skillsService.getSkills().subscribe((res) => {
            if (res.status === 'success') {
              this.fail = false;
              this.skills = res.data.skills;
            } else {
              this.fail = true;
              this.failMessage = res.message;
            }
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
