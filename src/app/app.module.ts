import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ExamsComponent } from './exams/exams.component';
import { ResultsComponent } from './results/results.component';
import { ContactComponent } from './contact/contact.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { QuestionsComponent } from './questions/questions.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { DeleteExamComponent } from './delete-exam/delete-exam.component';
import { InsertExamComponent } from './insert-exam/insert-exam.component';
import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { RouterModule } from '@angular/router';
import { AdminresultpageComponent } from './adminresultpage/adminresultpage.component'; // Added

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    ExamsComponent,
    ResultsComponent,
    ContactComponent,
    LoginComponent,
    RegisterComponent,
    QuestionsComponent,
    UpdateExamComponent,
    DeleteExamComponent,
    InsertExamComponent,
    ManageExamsComponent,
    AboutComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    AdminresultpageComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule // Added
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
