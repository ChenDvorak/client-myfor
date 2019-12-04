# app-back 返回按钮
这只是一个返回的按钮, 相当与浏览器的后退按钮

## usage
```html
<app-back></app-back>
```

## 指令
value: 按钮显示的文本
```html
<app-back [value]="'显示的文本'"></app-back>
```

link: 返回的导航路由, 可以不赋值, 不赋值就执行浏览器的后退操作
```html
<app-back [value]="'显示的文本'" [link]="'/themes'"></app-back>
```