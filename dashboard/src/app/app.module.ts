import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SigninComponent } from './pages/signin/signin.component';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './pages/home/home.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { AboutComponent } from './pages/about/about.component';
import { SkillsComponent } from './pages/skills/skills.component';
import { AddSkillComponent } from './pages/add-skill/add-skill.component';
import { EditSkillComponent } from './pages/edit-skill/edit-skill.component';
import { WorksComponent } from './pages/works/works.component';
import { EditWorkComponent } from './pages/edit-work/edit-work.component';
import { AddWorkComponent } from './pages/add-work/add-work.component';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { ErrorComponent } from './pages/error/error.component';
import { MessagesComponent } from './pages/messages/messages.component';
import { WorksCategoriesComponent } from './pages/works-categories/works-categories.component';
import { AddWorksCategoryComponent } from './pages/add-works-category/add-works-category.component';
import { EditWorkCategoryComponent } from './pages/edit-work-category/edit-work-category.component';

@NgModule({
  declarations: [
    AppComponent,
    SigninComponent,
    HeaderComponent,
    HomeComponent,
    SectionTitleComponent,
    AboutComponent,
    SkillsComponent,
    AddSkillComponent,
    EditSkillComponent,
    WorksComponent,
    EditWorkComponent,
    AddWorkComponent,
    ErrorComponent,
    MessagesComponent,
    WorksCategoriesComponent,
    AddWorksCategoryComponent,
    EditWorkCategoryComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
