import { Component, OnInit } from '@angular/core';
import { SegmentsService, SegmentItem } from '../../../services/segments.service';
import { MfSnackBarService } from '../../../services/mf-snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';

@Component({
  selector: 'app-segments-list',
  templateUrl: './segments-list.component.html',
  styleUrls: ['./segments-list.component.css']
})
export class SegmentsListComponent implements OnInit {

  totalRows = 0;
  segments: SegmentItem[] = [];
  writeSegment = false;

  constructor(
    private segment: SegmentsService,
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

    this.getSegments(index);
  }

  private getSegments(index: number) {
    this.segment.getSegments(index, 20)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open('获取失败, 请重试');
        } else {
          this.totalRows = data.data.totalRows;
          this.segments = data.data.list;
        }
      });
  }

  writeNewSegment() {
    this.writeSegment = !this.writeSegment;
  }

  pageChange(index: number) {
    const newParams = {
      ...this.route.snapshot.params,
      index
    };
    this.router.navigate(['/segments', newParams]);
  }

  like(id: number) {
    const btn = document.getElementById(`btn_${id}`);
    btn.classList.add('btn-disabled');
    btn.setAttribute('disabled', 'disabled');
    timer(5000).subscribe(() => {
      btn.classList.remove('btn-disabled');
      btn.removeAttribute('disabled');
    });
  }
}
