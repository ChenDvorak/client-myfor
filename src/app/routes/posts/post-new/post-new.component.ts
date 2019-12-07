import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-post-new',
  templateUrl: './post-new.component.html',
  styleUrls: ['./post-new.component.css']
})
export class PostNewComponent implements OnInit {

  /**
   * 内容框高度
   */
  textareaHeight = '200px';

  constructor() { }

  ngOnInit() {
    this.textareaHeight = window.innerHeight * 0.75 + `px`;
  }

}
