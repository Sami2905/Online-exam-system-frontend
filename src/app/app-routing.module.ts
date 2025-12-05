import { ManageExamsComponent } from './manage-exams/manage-exams.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ExamsComponent } from './exams/exams.component';
import { ResultsComponent } from './results/results.component';
import { ContactComponent } from './contact/contact.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { QuestionsComponent } from './questions/questions.component';
import { UpdateExamComponent } from './update-exam/update-exam.component';
import { UnsavedChangesGuard } from './guards/unsaved-changes.guard';
import { DeleteExamComponent } from './delete-exam/delete-exam.component';
import {InsertExamComponent} from './insert-exam/insert-exam.component';
import { AboutComponent } from './about/about.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { AdminresultpageComponent } from './adminresultpage/adminresultpage.component'; 
const routes: Routes = [
  { path: '', redirectTo: '/adminresultpage', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'exams', component: ExamsComponent },
  { path: 'results', component: ResultsComponent },
  //{ path: 'contact', component: ContactComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'questions/:examId', component: QuestionsComponent },
  {path: 'update-exam',component:UpdateExamComponent},
  {path: 'delete-exam',component:DeleteExamComponent},
  { path: 'contact', component: ContactComponent, canDeactivate: [UnsavedChangesGuard] },
  {path:'insert-exam',component:InsertExamComponent},
  {path:'manage-exams',component:ManageExamsComponent},
  {path:'about',component:AboutComponent},
  {path:'forgot-password',component:ForgotPasswordComponent},
  {path:'reset-password',component:ResetPasswordComponent},
  {path: 'adminresultpage',component:AdminresultpageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
