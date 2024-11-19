import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { ApiService } from '../api_service/api.service';



@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private http:HttpClient, public api_service: ApiService){
    
    
    
  }
  ngOnInit(): void {
    
  }

  jsonData: any;
  choosed_data: any;

  api_data: {level:string, branch:string,course: string} = {'level':'','branch':'','course':''};

  
  
  



  level_selected: boolean = false;
  branch_selected: boolean = false;
  course_selected: boolean = false;
  max_number: number  = 0;
  choosed_number: number = 0;
  choosedQuestion: string = "";
  course:string[] = [];
  

  
  
  
  

  SelectLevel(x:string){
    this.level_selected = true;
    this.api_data.level = x;
  }

  SelectBranch(x:string){
    this.branch_selected = true;
    this.api_data.branch = x;
    this.GetCourses();
  }

  SelectCourse(x:string){
    this.course_selected = true;
    this.api_data.course = x;
  }

  GetCourses(){
    this.http.get('http://localhost:3000/api/get-courses/' + this.api_data.level +'/' + this.api_data.branch).subscribe((x:any)=>{
      this.jsonData = x;
      
    })
  }
}
