import { Component, OnInit } from '@angular/core';
import { SegmentsService, SegmentItem, NewSegment } from '../../../services/segments.service';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';
import { timer } from 'rxjs';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-segments-list',
  templateUrl: './segments-list.component.html',
  styleUrls: ['./segments-list.component.css']
})
export class SegmentsListComponent implements OnInit {

  index = 1;
  order = '';
  totalRows = 0;
  segments: SegmentItem[] = [];
  writeSegment = false;
  isSubmitDisabled = false;

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
    private snack: MfSnackBarService,
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.getSegments();
  }

  private getSegments() {
    this.segment.getSegments(this.index, 20, this.order)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open(data.message);
        } else {
          this.totalRows = data.data.totalRows;
          this.segments = data.data.list;
        }
      });
  }

  writeNewSegment() {
    this.writeSegment = !this.writeSegment;
  }

  orderChange(order: string) {
    this.index = 1;
    this.order = order;
    this.getSegments();
  }

  pageChange(index: number) {
    this.index = index;
    this.getSegments();
  }

  like(id: number, index: number) {
    // console.log(`${id} -- ${index}`);
    //  some problom
    this.segment.liked(id)
      .subscribe(() => {
        this.segments[index].likes++;
      });

    const btn = document.getElementById(`btn_like_${id}`);
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
    this.isSubmitDisabled = true;
    const info: NewSegment = {
      nickName: this.newSegmentForm.get('nickName').value,
      content: this.newSegmentForm.get('content').value
    };
    this.segment.newSegment(info)
      .subscribe((data) => {
        if (data.isFault) {
          this.snack.open(data.message);
        } else {
          this.snack.open('提交成功');
          this.getSegments();
        }
        timer(3000).subscribe(() => {
          this.isSubmitDisabled = false;
        });
      });
  }
}
