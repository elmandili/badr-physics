import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { item } from './item.model';


@Component({
  selector: 'app-admin',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule, FormsModule],
  templateUrl: './admin.component.html',
  styleUrl: './admin.component.css'
})




export class AdminComponent implements OnInit {
  constructor(private http: HttpClient){}
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
      this.data = this.data.map((text:any) => ({
        text,  // Spread the existing properties
        isEditable: false,
        index: x.indexOf(text)// Add the new property with a default value
      }));
      console.log(this.data);
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

  

  
  
  
}
