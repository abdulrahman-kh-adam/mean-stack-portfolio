import { Component, inject } from '@angular/core';
import { ISkill } from './skills.models';
import { SkillsService } from './skills.service';
import { env } from '../../../environments';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrl: './skills.component.css',
})
export class SkillsComponent {
  frontEndSkills!: ISkill[];
  backEndSkills!: ISkill[];
  otherSkills!: ISkill[];
  skills!: ISkill[];
  skillsService = inject(SkillsService);
  fail = false;
  failMessage!: string;
  url = env.SERVER_URL;

  ngOnInit() {
    this.skillsService.getSkills().subscribe((res) => {
      if (res.status === 'success') {
        this.skills = res.data.skills;
        this.frontEndSkills = this.skills.filter(
          (skill) => skill.category === 'FrontEnd'
        );
        this.backEndSkills = this.skills.filter(
          (skill) => skill.category === 'BackEnd'
        );
        this.otherSkills = this.skills.filter(
          (skill) => skill.category === 'Other'
        );
      } else {
        this.fail = true;
        this.failMessage = res.message;
      }
    });
  }
}
