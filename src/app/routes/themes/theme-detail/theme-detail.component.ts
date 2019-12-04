import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { ThemesService, ThemeDetail } from '../../../services/themes.service';

@Component({
  selector: 'app-theme-detail',
  templateUrl: './theme-detail.component.html',
  styleUrls: ['./theme-detail.component.css']
})
export class ThemeDetailComponent implements OnInit {

  private currentId = 0;
  detail: ThemeDetail;
  showBack = false;

  // tslint:disable-next-line: variable-name
  @Input() set id(_id: number) {
    if (this.currentId === _id) {
      return;
    }
    this.currentId = _id;
    this.getThemeDetail();
  }

  constructor(
    private route: ActivatedRoute,
    private theme: ThemesService
  ) { }

  ngOnInit() {
    if (this.route.snapshot.paramMap.has('id')) {
      this.showBack = true;
      this.currentId = +this.route.snapshot.paramMap.get('id');
      this.getThemeDetail();
    }
  }

  /**
   * 获取详情
   */
  private getThemeDetail() {
    if (!this.currentId) {
      return;
    }

    this.theme.getThemeDetail(this.currentId)
      .subscribe((data) => {
        this.detail = data.data;
      });
  }
}
