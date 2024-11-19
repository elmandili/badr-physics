import { Injectable } from '@angular/core';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { tap } from 'rxjs';
import { error } from 'console';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { 
    this.GetJsonData();
  }

  json_data: any;
  api_url: string = "http://localhost:3000/api/"

  GetJsonData() {
    return this.http.get(this.api_url + 'get-json-data').pipe(
      tap((x: any) => {
        this.json_data = x; // Store the data once it is loaded
      })
    );
    
  }
  

  UpdateJsonData(){
    if(this.json_data != undefined){
      console.log(this.json_data)
      this.http.post(this.api_url + 'update-json-data', this.json_data).subscribe((x:any)=>{
        
      })
    }
    else{
      console.log('error updating data json_data is undefined ');
    }
    
  }

  GetCourses(level: string, branch: string, callback: (courses:any)=>void){
    this.GetJsonData().subscribe(()=>{
      const courses = this.json_data[level][branch];
      callback(courses);
    })
    
  }

  AddCourse(level:string, branch: string, course: string){
    this.GetJsonData().subscribe(()=>{
      if(!this.json_data[level][branch][course]){
        this.json_data[level][branch][course] = [];
        this.UpdateJsonData();
      }
    })
    
  }


  RemoveCourse(level: string, branch: string, course: string){
    this.GetJsonData().subscribe(()=>{
      if(this.json_data[level][branch][course]){
        delete this.json_data[level][branch][course];
        this.UpdateJsonData();
      }
      else{
        console.log('coure doesnt exist ');
      }
      
    })
    
  }


  EditCourse(level: string, branch: string, course: string, new_value: string){
    this.GetJsonData().subscribe(()=>{
      console.log('exist');
      if(course != new_value){
        this.json_data[level][branch][new_value] = this.json_data[level][branch][course];
        delete this.json_data[level][branch][course];
        console.log('course delted')
      }
      else{
        console.log('no changes have been made');
      }
      
    })

    this.UpdateJsonData()
    
  }

  GetQuestions(level: string, branch: string, course: string, callback: (questions: any) => void) {
    this.GetJsonData().subscribe(() => {
      const questions = this.json_data[level][branch][course];
      callback(questions); // Pass the questions to the callback
    });
  }

  AddQuestion(level:string, branch: string, course: string, question: string, callback?: (res:any)=> void){
    let message = '';
    this.GetJsonData().subscribe(()=>{
      
    })
    
    if(Array.isArray(this.json_data[level][branch][course])){
      if(this.json_data[level][branch][course].includes(question)){
        message = 'Question Already Exist';
      }else{
        try{
          this.json_data[level][branch][course].push(question)
          message = 'Can t Added the Question';
        }catch(err){
          message = 'An error occured when adding question :' + err;
        }
        
        this.UpdateJsonData();
      }

      if(callback){
        callback(message)
      }
      
    }
    
    
  }

  RemoveQuestion(level: string, branch: string, course: string, question: string, callback?: (res: string) => void){
    
    this.GetJsonData().subscribe(()=>{
      let message = '';
      if(Array.isArray(this.json_data[level][branch][course])){
        this.json_data[level][branch][course] = this.json_data[level][branch][course].filter((q: string)=> q !== question);
        message = 'Question removed successfully';
       
        this.UpdateJsonData();
      }
      else{
        message = 'Can t remove question';
      }

      if(callback){
        callback(message);
      }
      
      
    })

    
  }

  EditQuestion(level: string, branch: string, course: string, question: string, new_value: string, callback?: (res:string) => void){
    
    this.GetJsonData().subscribe(()=>{
    })
    const index = this.json_data[level][branch][course].indexOf(question);
    let message = '';
    if(index != -1){
      this.json_data[level][branch][course][index] = new_value;
      console.log(this.json_data[level][branch][course]);
      this.UpdateJsonData();
      message = 'Question Edited Successfully';
    }else{
      message = 'Can t Edit Question';
    }

    if(callback){
      callback(message);
    }
    
  }
  

}
