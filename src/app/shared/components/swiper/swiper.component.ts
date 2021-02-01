/**
 * 轮播图组件
 */
import {Component, Input, Renderer2, ViewChild, ElementRef, OnInit, OnChanges, SimpleChanges} from '@angular/core';
@Component({
  selector: 'app-swiper',
  templateUrl: './swiper.component.html',
  styleUrls: [ './swiper.component.scss']
})
export class SwiperComponent implements OnInit, OnChanges{

  @Input() showContainerHeight: string; // 展示容器高度，比如'80px'
  startX: number; // 手势滑动开始位置
  endX: number; // 手势滑动结束位置
  @Input() contentList: any; // 内容容器的内容列表
  currContentIndex = 0; // 内容容器当前内容下标
  @ViewChild('contentBox') contentBoxEle: ElementRef; // 内容容器元素对象
  @Input() autoPlay = false; // 是否开启自动播放
  @Input() filterList: any; // 处理后的内容列表，若有开启自动播放，需传入过滤后的内容列表，处理成伪链表，即3-1-2-3-1；若无，传入原列表
  isTransition = true; // 是否开启过渡动画

  ngOnInit(): void { }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.filterList && this.filterList.length > 0) {
      if (this.autoPlay) {
        this.renderer2.setStyle(this.contentBoxEle.nativeElement, 'width', this.filterList.length * 375 + 'px');
        // 初始化第一张图片
        this.changeStyle(false, 1);
        // 开启自动播放
        this.changeStyleOnTime(4);
      }
    }
  }

  constructor(
    private renderer2: Renderer2,
  ){}

  /**
   * 触摸开始
   * @param  {any} e
   * @returns void
   */
  touchStart(e: any): void {
    this.startX = e.touches[0].clientX;
  }

  /**
   * 触摸移动
   * @param  {any} e
   * @returns void
   */
  touchMove(e: any): void {
    this.endX = e.touches[0].clientX;
  }

  /**
   * 触摸结束
   * @param  {any} e
   * @returns void
   */
  touchEnd(e: any): void {
    const distance = this.endX - this.startX;
    if (distance > 0) { // 左滑
      this.touchLeft();
    } else if (distance < 0) { // 右滑
      this.touchRight();
    }
  }

  /**
   * 左滑
   * @returns void
   */
  touchLeft(): void {
    if (this.autoPlay) {
      this.changeStyle(true, this.currContentIndex - 1);
      if (this.currContentIndex === 0) {
          setTimeout(() => {
            this.changeStyle(false, this.filterList.length - 2);
          }, 1000);
      }
    } else {
      if (this.currContentIndex === 0) {
        return ;
      } else {
        this.changeStyle(true, this.currContentIndex - 1);
      }
    }
  }

  /**
   * 右滑
   * @returns void
   */
  touchRight(): void {
    if (this.autoPlay) {
      /**
       * 到达链表最后一张（实际上是第一张），不开启动画，默默重置为链表第二张（实际上也是第一张），
       * 视觉上就是从最后一张有动画的切到第一张；左滑右滑类似
       */
      this.changeStyle(true, this.currContentIndex + 1);
      if (this.currContentIndex === this.filterList.length - 1) {
          setTimeout(() => {
            this.changeStyle(false, 1);
          }, 1000);
      }
    } else {
      if (this.currContentIndex === this.filterList.length - 1) {
        return ;
      } else {
        this.changeStyle(true, this.currContentIndex + 1);
      }
    }
  }

  /**
   * 改变内容容器样式
   * @param  {boolean} isTransition 是否开启动画
   * @param  {number} currIndex 当前内容元素下标
   * @returns void
   */
  changeStyle(isTransition: boolean, currIndex: number): void {
    this.isTransition = isTransition;
    this.currContentIndex = currIndex;
    this.renderer2.setStyle(this.contentBoxEle.nativeElement, 'margin-left', -(currIndex * 375) + 'px');
  }

  /**
   * 自动播放
   * @param  {number} time 间隔时间
   * @returns void
   */
  changeStyleOnTime(time: number): void {
    setInterval(() => {
      this.touchRight();
    }, time * 1000);
  }
}
