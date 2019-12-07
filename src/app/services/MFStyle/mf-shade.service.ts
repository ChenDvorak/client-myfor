/**
 * 遮罩层
 */

import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MfShadeService {

  constructor() { }

  open() {
    const id = '78e1975d-1a7c-4a28-aae5-3fd363460f35';
    const body = document.getElementsByTagName('body')[0];
    const shade = document.createElement('div');
    shade.setAttribute('id', id);
    shade.setAttribute('class', 'mf-shade');
    body.appendChild(shade);
    
    // timer(duration).subscribe(() => {
    //   body.removeChild(tip);
    // });
  }
}
