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
  field: string = "";
  data: string[] = [];
  displayed_data: string = "";
  index: number = 0;
  max: number = 0;
  display: boolean = false;
  constructor(private route: ActivatedRoute, private http: HttpClient){}

  ngOnInit(): void {
      this.field = this.route.snapshot.paramMap.get('field') || "";
      this.http.get('http://localhost:3000/api/get/'+this.field).subscribe(async(x:any)=>{
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
  

}
