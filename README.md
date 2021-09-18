# NgxCxlPopover


[![npm version](https://badge.fury.io/js/ngx-cxl-popover.svg)](https://badge.fury.io/js/ngx-cxl-popover)

The best popover package because it's easy to use and customizable .

## Installation

You can use either the npm command-line tool to install packages.

## NPM

> npm i ngx-cxl-popover

# Usage ⁉
```typescript
@NgModule({
  imports: [
   /* .... */
   NgxCxlPopoverModule
   /* .... */
  ],
})
```
- add directive `NgxCxlPopover` on the element.
- write your awesome title `popoverTitle`.
- write your awesome content `popoverContent`.

```html
<h1 NgxCxlPopover popoverTitle="Hello" popoverContent="👋">Hello</h1>
```

if you want use customized templates for the title and content then let's go to the next level 👍

# Advanced

## Custom Templates

```html
<h1
  NgxCxlPopover
  popoverTitle="Hello"
  popoverContent="👋"
  [titleTemplate]="titleTemplate"
  [contentTemplate]="contentTemplate"
>
  Hello
</h1>

<!-- Custom Templates -->
<ng-template #titleTemplate>
  <img src="..." alt="..." />
  <p>...</p>
</ng-template>

<ng-template #contentTemplate>
  <img src="..." alt="..." />
  <p>...</p>
</ng-template>
<!--  -->
```

## Options

| Attribute | Type | Description | Default |
| ---------------------- | -------------:| --------------------------------------------------:| -------:|
| `enableScroll` | boolean | enable scrolling into popover content | `true` |
| `scrollSpeed` | number | the speed of scrolling between 10 and 100 | 10 |
| `width` | number | set popover fixed width | 200px |
| `height` | number | set popover fixed height | 300px |
| `popoverTitle` | string | write the title phase | null |
| `popoverContent` | string | write the content phase | null |
| `titleTemplate` | TemplateRef | reference to the custom title template | null |
| `contentTemplate` | TemplateRef | reference to the custom content template | null |
| `placementHorizontal` | number | force popover to show in specific direction and has options 'right' , 'left' , null | null |
| `placementVertical` | number | force popover to show in specific direction and has options 'top' , 'bottom' , null; | null |

## Customize Style

```css
.ngx-cxl-popover-container {
}
.ngx-cxl-popover-container .ngx-cxl-popover-title {
}
.ngx-cxl-popover-container .ngx-cxl-popover-content {
}
```

Simplest and Easiest 👌💖👏

## Contribution

I welcome you to fork and add more features into it. If you have any bugs or feature request, please create an issue at [github repository](https://github.com/mahmoudshahin1111/ngx-cxl-popover/issues).

## License

MIT
