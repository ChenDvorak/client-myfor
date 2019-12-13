import { Component, OnInit } from '@angular/core';
import { ThemesService, ThemeItem } from '../../../services/themes.service';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';

@Component({
  selector: 'app-themes-list',
  templateUrl: './themes-list.component.html',
  styleUrls: ['./themes-list.component.css']
})
export class ThemesListComponent implements OnInit {

  index = 1;
  search = '';
  state = '';

  detailId = 0;
  listHeight = window.innerHeight * 0.75 + 'px';
  themes: ThemeItem[] = [];

  totalRows = 0;

  constructor(
    private theme: ThemesService,
    private snack: MfSnackBarService
  ) { }

  ngOnInit() {
    this.getThemes();
  }

  private getThemes() {
    this.theme.getThemes(this.index, 20, this.search, this.state)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open(data.message);
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
      this.search = '';
    }
    this.index = 1;
    this.getThemes();
  }

  /**
   * 显示主题
   * @param id 主题 ID
   */
  showDetail(id: number) {
    this.detailId = id;
  }

  pageChange(index: number) {
    this.index = index;
    this.getThemes();
  }
}
