import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {

  @Input()
  value = '返回';

  constructor(
    private location: Location
  ) { }

  back() {
    this.location.back();
  }
}
