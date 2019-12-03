import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit {

  private currentId = 0;
  showBack = false;

  // tslint:disable-next-line: variable-name
  @Input() set id(_id: number) {
    console.log('detail: ' + _id);
    if (this.currentId === _id) {
      return;
    }
    this.currentId = _id;
  }

  constructor(
    private route: ActivatedRoute
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.showBack = true;
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.getThemeDetail();
    }
  }

  getThemeDetail() {

  }
}
