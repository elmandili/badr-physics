import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [HttpClientModule,CommonModule,FormsModule],
  templateUrl: './questions.component.html',
  styleUrl: './questions.component.css'
})
export class QuestionsComponent implements OnInit {
  level: string = "";
  branch: string = "";
  course: string  = "";

  number_of_students: number = 0;
  choosed_student: number = 0;
  
  data: string[] = [];
  displayed_data: string = "";
  index: number = 0;
  max: number = 0;
  display: boolean = false;
  level_selected: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
      this.level = this.route.snapshot.paramMap.get('level') || "";
      this.branch = this.route.snapshot.paramMap.get('branch') || "";
      this.course = this.route.snapshot.paramMap.get('course') || "";
      this.GetCourses(this.level, this.branch, this.course);
  }

  GetCourses(_level:string, _branch: string, _course: string){
    this.http.get('http://localhost:3000/api/get-questions/' + _level + '/'+ _branch +'/'+ _course).subscribe(async(x:any)=>{
      this.data = x;
      this.max = x.length;
      console.log(this.data);
    })
  }


  DisplayQuestion(){
    this.displayed_data = this.data[this.index -1];
    this.display = true;
    if((this.index - 1) < 0 || (this.index - 1) > this.data.length)
    {
      alert("Out Of Range");
    }
  }

  OnValueChange(){
    this.display = false;
  }
  

  Shuffle()
  {
    this.choosed_student = Math.floor(Math.random() * (this.number_of_students - 1 + 1)) + 1;
    const temp = this.choosed_student;

    let i = 0;
    const interval = setInterval(() => 
      {
        this.choosed_student = i;
        console.log(i); // This will be updated and logged visibly each time

        i++;
        if (i >= temp) {
          this.choosed_student = temp;
          clearInterval(interval); // Stop the loop once it reaches `temp`
        }
      }, 100);
  }

}
