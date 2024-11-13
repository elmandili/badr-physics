import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { HttpClient,HttpClientModule } from '@angular/common/http';
import data from '../../assets/data.json'


@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HttpClientModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  constructor(private http:HttpClient){}
  ngOnInit(): void {
      
      this.jsonData = data;
      let test: number[] = [1, 2, 3]
      this.http.get('http://localhost:3000/api/write/'+{name:"my name"});
      this.http.get('http://localhost:3000/api/add-course/TC/' + JSON.stringify(test)).subscribe();
  }

  jsonData: any;
  choosed_data: any;

  
  
  



  level_selected: boolean = true;
  max_number: number  = 0;
  choosed_number: number = 0;
  choosedQuestion: string = "";
  

  
  SelectLevel(choosed_level: any)
  {
    this.http.get('http://localhost:3000/api/greet').subscribe((x:any)=>{
      console.log(x);
    })
    this.level_selected = false;
    console.log(choosed_level);
    this.max_number = choosed_level.length;
    this.choosed_data = choosed_level;
    
  }
}
