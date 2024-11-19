import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { ApiService } from '../api_service/api.service';

@Component({
  selector: 'app-admin-courses',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-courses.component.html',
  styleUrl: './admin-courses.component.css'
})
export class AdminCoursesComponent implements OnInit {
  constructor(private router: Router, private activated_route: ActivatedRoute, private api_service: ApiService){}
  level: string = '';
  branch: string = '';
  course: string = '';
  courses_disabled: any;
  courses_models: string[] = [];
  editing: boolean = false;

  courses: string[] = [];
  ngOnInit(): void {
    this.level = this.activated_route.snapshot.paramMap.get('level') || "";
    this.branch = this.activated_route.snapshot.paramMap.get('branch') || "";
    this.api_service.GetCourses(this.level, this.branch, (res: string[])=>{
      this.courses = res;
      this.courses_disabled = Object.keys(this.courses).map(() => true);
      this.courses_models = Object.keys(this.courses).filter((key:any) => Array.isArray(this.courses[key]));
    })
  }


  Edit(index: number){
    if(!this.editing){
      this.courses_disabled[index] = !this.courses_disabled[index];
      this.editing = !this.editing;
    }
    
  }


  FinishEditing(index: number){
    this.courses_disabled[index] = !this.courses_disabled[index];
    this.editing = !this.editing;
  }

}
