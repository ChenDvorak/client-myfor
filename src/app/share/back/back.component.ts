import { Component, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-back',
  templateUrl: './back.component.html',
  styleUrls: ['./back.component.css']
})
export class BackComponent {

  @Input() value = '返回';
  @Input() link = '';

  constructor(
    private location: Location,
    private router: Router
  ) { }

  back() {
    if (this.link) {
      this.router.navigateByUrl(this.link);
    } else {
      this.location.back();
    }
  }
}
