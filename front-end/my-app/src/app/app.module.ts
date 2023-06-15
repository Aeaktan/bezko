import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';

import { AppComponent } from './app.component';
import { StudentListComponent } from './components/student-list/student-list.component';
import { AddFormComponent } from './components/addformapp/add-form.component';
import { DeleteAppComponent } from './components/deleteapp/delete-app.component';
import { StudentService } from './services/student.service';
import { UpdateGradesComponent } from './components/updategrades/update-grades.component';

const routes: Routes = [
  { path: 'students', component: StudentListComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    DeleteAppComponent,
    AddFormComponent,
    UpdateGradesComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [
    StudentService
  ],
  bootstrap: [AppComponent],
  exports: [
    RouterModule,
    DeleteAppComponent
  ]
})
export class AppModule { }
