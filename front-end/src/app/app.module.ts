import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { HomeCvComponent } from './components/home-cv/home-cv.component';
import { HomeInfo1Component } from './components/home-info1/home-info1.component';
import { HomeInfo2Component } from './components/home-info2/home-info2.component';
import { AboutComponent } from './about/about.component';
import { SkillsComponent } from './skills/skills.component';
import { SectionTitleComponent } from './components/section-title/section-title.component';
import { WorksComponent } from './works/works.component';
import { ProjectComponent } from './components/project/project.component';
import { ContactComponent } from './contact/contact.component';
import { provideHttpClient, withFetch } from '@angular/common/http';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    HomeComponent,
    HomeCvComponent,
    HomeInfo1Component,
    HomeInfo2Component,
    AboutComponent,
    SkillsComponent,
    SectionTitleComponent,
    WorksComponent,
    ProjectComponent,
    ContactComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, ReactiveFormsModule, FormsModule],
  providers: [provideClientHydration(), provideHttpClient(withFetch())],
  bootstrap: [AppComponent],
})
export class AppModule {}
