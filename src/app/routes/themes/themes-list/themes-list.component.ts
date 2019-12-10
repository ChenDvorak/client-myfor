import { Component, OnInit } from '@angular/core';
import { ThemesService, ThemeItem } from '../../../services/themes.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';
import { Result } from 'src/app/services/common';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css']
})
export class ThemesListComponent implements OnInit {

  detailId = 0;
  listHeight = '80%';
  themes: ThemeItem[] = [];

  totalRows = 0;

  constructor(
    private theme: ThemesService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MfSnackBarService
  ) { }

  ngOnInit() {
    let index = 1;
    const indexParam = this.route.snapshot.paramMap.get('index');
    if (indexParam) {
      index = +indexParam;
    }
    const search = this.route.snapshot.paramMap.get('search');
    this.getThemes(index, search);

    this.listHeight = window.innerHeight * 0.75 + 'px';
  }

  private getThemes(index: number, search: string) {
    this.theme.getThemes(index, 20, search)
      .subscribe((data) => {
        if (Result.isFault(data)) {
          this.snack.open('获取失败, 请重试');
        } else {
          this.totalRows = data.data.totalRows;
          this.themes = data.data.list;
        }
      });
  }

  /**
   * 搜索主题
   * @param search 搜索参数
   */
  searchThemes(search: string) {
    if (!search || search.trim() === '') {
      this.router.navigateByUrl('/themes');
      this.getThemes(1, '');
      return;
    }

    this.router.navigate(['/themes', {search}]);
    this.getThemes(1, search);
  }

  /**
   * 显示主题
   * @param id 主题 ID
   */
  showDetail(id: number) {
    this.detailId = id;
  }

  pageChange(index: number) {
    const newParams = {
      ...this.route.snapshot.params,
      index
    };
    this.router.navigate(['/themes', newParams]);
  }
}
