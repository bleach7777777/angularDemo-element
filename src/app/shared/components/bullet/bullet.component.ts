import {Component, Input, Output, EventEmitter, HostBinding, OnInit, OnChanges, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-bullet',
  templateUrl: './bullet.component.html',
  styleUrls: ['./bullet.component.scss']
})
export class BulletComponent implements OnInit, OnChanges {

  @Input() param: {
    isSecond: boolean,
    type: number,
    list: any[],
    otherList: any[],
    currFirstIndex: number,
    currSecondIndex: number,
    currOtherIndex: number[],

  };

  @HostBinding('style.display') display = 'none'; // 是否展示
  // @Input() type = 1; // 1-排序/分类样式，2-速度/筛选样式
  type: number;
  @Output()  clickBullet = new EventEmitter(); // 列表项点击输出表

  // 排序/分类
  // @Input() list: any; // 列表
  // @Input() currFirstIndex: number; // 一级列表当前下标
  // @Input() currSecondIndex: number; // 二级列表当前下标
  // @Input() isSecond = false; // 是否有二级列表
  list: any;
  currFirstIndex: number;
  currSecondIndex: number;
  isSecond: boolean;

  // 速度/筛选
  // @Input() otherList: any; // 列表
  isClear = true; // 清空按钮是否不可点击
  // @Input() currOtherIndex: number[] = <number[]>[]; // 当前选择项下标
  otherList: any;
  currOtherIndex: number[] = <number[]>[];

  ngOnInit(): void {}

  ngOnChanges(changes: SimpleChanges): void {
    const param = changes['param'];
    if (param && param.currentValue !== param.previousValue) {
      this.type = this.param.type;
      this.list = this.param.list;
      this.currFirstIndex = this.param.currFirstIndex;
      this.currSecondIndex = this.param.currSecondIndex;
      this.isSecond = this.param.isSecond;
      this.otherList = this.param.otherList;
      this.currOtherIndex = this.param.currOtherIndex;
    }
  }

  constructor() {}

  /**
   * 打开
   * @returns void
   */
  open(): void {
    this.display = 'block';
  }

  /**
   * 关闭
   * @returns void
   */
  close(): void {
    this.display = 'none';
  }

  /**
   * 列表点击事件（排序/分类一级）
   * @param  {any} item 点击项
   * @param  {number} i 点击项下标
   * @returns void
   */
  clickFirst(item: any, i: number): void {
      this.currFirstIndex = i;
      this.currSecondIndex = -1;
      if (!this.isSecond) { // 一级列表点击有改变外面值
        this.clickBullet.emit({
          type:  'first',
          index1: i,
          index2: null,
        });
        this.close();
      }
  }

  /**
   * 列表点击事件（排序/分类二级）
   * @param  {any} item 点击项
   * @param  {number} i 点击项下标
   * @returns void
   */
  clickSecond(item: any, i: number): void {
      this.currSecondIndex = i;
      this.clickBullet.emit({
        type: 'second',
        index1: this.currFirstIndex,
        index2: this.currSecondIndex
      });
      this.close();
  }

  /**
   * 列表点击事件（速度/筛选）
   * @param  {any} item  点击项
   * @param  {number} i 点击项所属列表下标
   * @param  {number} j 点击项下标
   * @returns void
   */
  clickOther(item: any, i: number, j: number): void {
    this.currOtherIndex[i] = this.currOtherIndex[i] === j ? -1 : j;
    this.isClear = true;
    this.currOtherIndex.every((ele, index, arr): boolean => {
      if (arr[index] !== -1) {
        this.isClear = false;
        return false;
      } else {
        return true;
      }
    });
  }

  /**
   * 清空按钮（速度/筛选）
   * @returns void
   */
  clearOther(): void {
    this.currOtherIndex.forEach((element, i) => {
      this.currOtherIndex[i] = -1;
    });
    this.isClear = true;
  }

  /**
   * 筛选按钮（速度/筛选）
   * @returns void
   */
  clickOtherEmit(): void {
    this.clickBullet.emit({
      type: this.otherList.length === 1 ? 'third' : 'four',
      noSelectFlag: this.isClear,
      selectList: this.currOtherIndex
    });
    this.close();
  }
}
