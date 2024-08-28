import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AddSkillComponent } from './pages/add-skill/add-skill.component';
import { EditSkillComponent } from './pages/edit-skill/edit-skill.component';
import { WorksComponent } from './pages/works/works.component';
import { AddWorkComponent } from './pages/add-work/add-work.component';
import { EditWorkComponent } from './pages/edit-work/edit-work.component';
import { SigninComponent } from './pages/signin/signin.component';
import { ErrorComponent } from './pages/error/error.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { WorksCategoriesComponent } from './pages/works-categories/works-categories.component';
import { AddWorksCategoryComponent } from './pages/add-works-category/add-works-category.component';
import { EditWorkCategoryComponent } from './pages/edit-work-category/edit-work-category.component';

const routes: Routes = [
  {
    path: '',
    component: SigninComponent,
  },
  {
    path: 'home',
    component: HomeComponent,
  },
  {
    path: 'about',
    component: AboutComponent,
  },
  {
    path: 'skills',
    component: SkillsComponent,
  },
  {
    path: 'skills/add',
    component: AddSkillComponent,
  },
  {
    path: 'skills/edit/:id',
    component: EditSkillComponent,
  },
  {
    path: 'works',
    component: WorksComponent,
  },
  {
    path: 'works/add',
    component: AddWorkComponent,
  },
  {
    path: 'works/edit/:id',
    component: EditWorkComponent,
  },
  {
    path: 'works/categories',
    component: WorksCategoriesComponent,
  },
  {
    path: 'works/categories/add',
    component: AddWorksCategoryComponent,
  },
  {
    path: 'works/categories/edit/:id',
    component: EditWorkCategoryComponent,
  },
  {
    path: 'error',
    component: ErrorComponent,
  },
  {
    path: 'messages',
    component: MessagesComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
