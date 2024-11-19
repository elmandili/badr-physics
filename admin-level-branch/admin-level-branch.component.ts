import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-level-branch',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-level-branch.component.html',
  styleUrl: './admin-level-branch.component.css'
})
export class AdminLevelBranchComponent {
  constructor(public router: Router){}
  level_selected: boolean = false;
  level: string = '';
  branch: string = '';

  SetLevel(_level: string){
    this.level = _level;
    this.level_selected = true;
  }

  SetBranch(_branch: string){
    this.branch = _branch;
    this.router.navigate(['/admin/' + this.level + '/' + this.branch]);
  }
}
