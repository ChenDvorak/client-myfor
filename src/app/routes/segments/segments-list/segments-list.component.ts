import { Component, OnInit } from '@angular/core';
import { SegmentsService, SegmentItem, NewSegment } from '../../../services/segments.service';
import { Result } from '../../../services/common';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';
import { ActivatedRoute, Router } from '@angular/router';
import { timer } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-segments-list',
  templateUrl: './segments-list.component.html',
  styleUrls: ['./segments-list.component.css']
})
export class SegmentsListComponent implements OnInit {

  totalRows = 0;
  segments: SegmentItem[] = [];
  writeSegment = false;

  newSegmentForm = this.fb.group({
    nickName: ['', [Validators.required, Validators.minLength(2)]],
    content: ['', [Validators.required, Validators.minLength(2)]]
  });

  /**
   * 昵称是否无效
   */
  get isNickNameInvalid() {
    return this.newSegmentForm.get('nickName').dirty && this.newSegmentForm.get('nickName').invalid;
  }
  /**
   * 内容是否无效
   */
  get isContentInvalid() {
    return this.newSegmentForm.get('content').dirty && this.newSegmentForm.get('content').invalid;
  }

  constructor(
    private segment: SegmentsService,
    private route: ActivatedRoute,
    private router: Router,
    private snack: MfSnackBarService,
    private fb: FormBuilder
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
        if (Result.isFault(data)) {
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

  /**
   * 提交新段子
   */
  submitSegment() {
    if (this.newSegmentForm.get('nickName').invalid) {
      this.snack.open('昵称最短两位');
      return;
    }
    if (this.newSegmentForm.get('content').invalid) {
      this.snack.open('内容太短');
      return;
    }
    const info: NewSegment = {
      nickName: this.newSegmentForm.get('nickName').value,
      content: this.newSegmentForm.get('content').value
    };
    this.segment.newSegment(info)
      .subscribe((data) => {
        if (Result.isFault(data)) {
          this.snack.open('提交失败, 请重试');
        } else {
          this.snack.open('提交成功');
        }
      });
  }
}
