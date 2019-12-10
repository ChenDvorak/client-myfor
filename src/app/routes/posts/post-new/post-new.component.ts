import { Component, OnInit, ElementRef, ViewChild } from '@angular/core';
import { KeyValue } from '@angular/common';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { timer, Observable, Subject, of } from 'rxjs';
import { PostsService, NewPost } from '../../../services/posts.service';
import { ThemesService } from '../../../services/themes.service';
import { Result } from '../../../services/common';
import { MfSnackBarService } from '../../../services/MFStyle/mf-snack-bar.service';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

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
  submitDisabled = false;
  /**
   * 提示的主题名
   */
  themeName$: Observable<string>;
  private searchText$ = new Subject<string>();

  /**
   * 提交的内容里要上传的图片
   * ![图片名](图片临时链接)
   * 此时的图片未上传, 上传到服务器后会替换未正确的链接
   *
   * 泛型中 string 为图片的临时链接, 用于和内容中的图片对应
   * 泛型中 any 为对应的图片
   */
  contentFiles: KeyValue<string, any>[] = [];

  @ViewChild('fle_img', {static: false}) file: ElementRef;

  newPostForm = this.fb.group({
    title: ['', [Validators.required]],
    theme: [''],
    content: ['', [Validators.required]]
  });

  get isFormInvalid() {
    return this.submitDisabled
      ||
      (this.newPostForm.get('title').dirty && this.newPostForm.get('title').invalid)
      ||
      (this.newPostForm.get('content').dirty && this.newPostForm.get('content').invalid);
  }

  constructor(
    private fb: FormBuilder,
    private snack: MfSnackBarService,
    private theme: ThemesService,
    private post: PostsService,
    private router: Router
  ) { }

  ngOnInit() {
    this.textareaHeight = window.innerHeight * 0.75 + `px`;

    this.resetThemeNameEvent();
  }
  /**
   * 重置主题的输入建议
   */
  private resetThemeNameEvent() {
    this.themeName$ = of();
    this.themeName$ = this.searchText$.pipe(
      debounceTime(500),
      distinctUntilChanged(),
      switchMap(segment => this.theme.getThemeNameTypeAhead(segment))
    );
  }

  /**
   * 主题输入建议
   */
  themeTypeAhead(value: string) {
    if (value.trim() === '') {
      this.resetThemeNameEvent();
    }
    this.searchText$.next(value);
  }

  selectType(value: string) {
    this.newPostForm.get('theme').setValue(value);
    this.resetThemeNameEvent();
  }

  /**
   * 发帖子
   */
  publish() {
    if (this.newPostForm.get('title').invalid) {
      this.snack.open('要标题');
      return;
    }
    if (this.newPostForm.get('content').invalid) {
      this.snack.open('要内容');
      return;
    }
    this.submitDisabled = true;
    const info: NewPost = {
      title: this.newPostForm.get('title').value,
      theme: this.newPostForm.get('theme').value,
      content: this.newPostForm.get('content').value,
      files: this.contentFiles
    };

    this.post.newPost(info)
      .subscribe((data) => {
        if (Result.isFault(data)) {
          this.snack.open(this.post.getFaultMessageOfRandom());
          timer(2000).subscribe(() => {
            this.submitDisabled = false;
          });
        } else {
          this.snack.open('发布成功, 等待审核');
          timer(2000).subscribe(() => {
            this.submitDisabled = false;
            this.router.navigateByUrl('/posts');
          });
        }
      });
  }

  /**
   * 插入图片
   */
  insertImg() {
    const eleFiles = this.file.nativeElement.files;
    if (!eleFiles.length) {
      return;
    }
    const img = eleFiles[0];
    const name = img.name;
    const link = window.URL.createObjectURL(img);

    const file: KeyValue<string, any> = {
      key: link,
      value: img
    };

    this.contentFiles.push(file);

    //  使用的双引号, 要注意, 后台要解析, 所以要一致
    this.newPostForm.get('content').setValue(
      `${this.newPostForm.get('content').value}
      <a href="${link}" target="_blank">[查看原图]<a>
      ![图片](${link} "${name}")`
    );
  }
}
