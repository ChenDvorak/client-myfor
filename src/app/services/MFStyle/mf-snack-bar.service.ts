/**
 * 快餐提示框
 */

import { Injectable } from '@angular/core';
import { timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MfSnackBarService {

  /*
  position: fixed;
top: 40%;
left: 50%;
padding: 6px 20px;
background-color:
#000;
opacity: .8;
color:
white;
box-shadow: 0px 5px 4px -2px #666;
  */

  constructor() { }

  /**
   * 弹出一个提示
   * @param msg 提示信息
   * @param duration 持续时间
   */
  open(msg: string, duration: number = 2000) {
    const tipID = 'd08bf33c-8d0d-4ddf-b566-9016060f8275';
    const body = document.getElementsByTagName('body')[0];
    const tip = document.createElement('div');
    tip.setAttribute('id', tipID);
    tip.setAttribute('class', 'mf-tip');
    tip.innerHTML = msg;

    body.appendChild(tip);

    timer(duration).subscribe(() => {
      body.removeChild(tip);
    });
  }
}
