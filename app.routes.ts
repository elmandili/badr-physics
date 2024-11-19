import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { QuestionsComponent } from './questions/questions.component';
import { AdminComponent } from './admin/admin.component';
import { AdminCoursesComponent } from './admin-courses/admin-courses.component';
import { AdminLevelBranchComponent } from './admin-level-branch/admin-level-branch.component';
import { AdminQuestionsComponent } from './admin-questions/admin-questions.component';

export const routes: Routes = [
    {path:'', redirectTo: '/home', pathMatch:'full'},
    {path: 'home', component: HomeComponent},
    {path: 'questions/:level/:branch/:course', component: QuestionsComponent},
    {path: 'admin', component: AdminComponent, children:[
        {path: '', component: AdminLevelBranchComponent},
        {path:':level/:branch', component: AdminCoursesComponent},
        {path: ':level/:branch/:course', component: AdminQuestionsComponent}
    ]}
];
