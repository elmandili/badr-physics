import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { item } from './item.model';
import { ApiService } from '../api_service/api.service';



@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})




export class AdminComponent implements OnInit {
  constructor(private http: HttpClient, private api_service: ApiService){
    this.api_service.GetJsonData().subscribe(()=>{
      console.log(this.api_service.json_data);
    })
    
    
  }
  data:any;
  ngOnInit(): void {
    
  }

  field: string = '';
  level_selected: boolean = false;
  is_editing: boolean = false;
  branch_selected: boolean = false;
  branch: string = '';
  course_selected: boolean = false;
  course: string = '';
  courses: string[] = [];
  course_to_add: string = '';
  course_to_edit: string = '';
  courses_disabled: boolean[] = [];
  courses_models:any;
  editing_courses: boolean = false;

  api_data = {
    level: '',
    branch: '',
    course: '',
    question: ''
  }
  

  SetField(s: string)
  {
    this.field = s;
    this.level_selected = true;

    //this.GetData();
  }


  SetBranch(s: string){
    this.branch = s;
    this.branch_selected = true;
    this.GetCourses();
  }

  GetCourses(){
    this.http.get('http://localhost:3000/api/get-courses/' + this.field +'/' + this.branch).subscribe((x:any)=>{
      this.courses = x;
      console.log(this.courses);
      this.courses_disabled = Object.keys(this.courses).map(() => true);
      this.courses_models = Object.keys(this.courses).filter((key:any) => Array.isArray(this.courses[key]));
      console.log(this.courses_models);
    })
  }

  SetCourse(s: string){
    this.course = s;
    this.course_selected = true;
  }

  GetData()
  {
    this.http.get('http://localhost:3000/api/get/' + this.field).subscribe((x:any)=>{
      this.courses = x;
      
      console.log(this.courses);
      console.log(x);

      this.courses_models = this.courses;
      
    })
  }

  Edit(x:item){
    
    this.is_editing = true;
    x.is_editable = true;
    
  }

  test: item[] = [];
  

  Finish(x:item)
  {
    console.log('http://localhost:3000/api/edit/' + this.field + '/' + x.index + '/' + x.text);
    this.is_editing = false;
    x.is_editable = false;
    console.log(this.field);
    this.http.get('http://localhost:3000/api/edit/' + this.field + '/' + x.index + '/' + x.text).subscribe((x:any)=>{
      console.log(x);
    });
  }

  Cancel(x: item){
    
    this.is_editing = false;
    x.is_editable = false;
    
    this.GetData();
  }


  Plus(x: item)
  {
    
    this.http.get('http://localhost:3000/api/add/' + this.field + '/question ' + this.data.length).subscribe(x =>{
      this.GetData();
    });
    
  }

  OnAddCourse(){
    console.log("course added");
    this.http.get('http://localhost:3000/api/add-course/' + this.field + '/' + this.branch + '/' + this.course_to_add).subscribe(x =>{
      this.GetCourses();
    });
  }

  ToggleEditCourse(index:number){
    this.courses_disabled[index] = !this.courses_disabled[index];
    this.editing_courses = !this.editing_courses;
  }

  FinishUpdatingCourse(index: number){
    let courses = Object.keys(this.courses).filter((key:any) => Array.isArray(this.courses[key]));
    if(courses[index] != this.courses_models[index]){
        this.http.get('http://localhost:3000/api/edit-course/'+ this.field +'/'+ this.branch +'/' + courses[index] + '/' + this.courses_models[index]).subscribe(x =>{
        this.GetCourses();
        });
    }
    
  }


  DeleteCourse(index: number){
    console.log('delete course is clicked');
    console.log(index);
    let courses = Object.keys(this.courses).filter((key:any) => Array.isArray(this.courses[key]));
    console.log(courses);

    this.http.delete('http://localhost:3000/api/remove-course/' + this.field + '/' + this.branch + '/'+ courses[index]).subscribe((x:any)=>{
      
    });

    this.GetCourses();
  }
  
  
  
}
