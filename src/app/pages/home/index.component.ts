import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { HomeService } from './service/home.service';
import { Router, ActivatedRoute } from '@angular/router';
import { BulletComponent } from '../../shared/components/bullet/bullet.component';
import { SORTDATA } from './service/sort.model';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.scss']
})
export class IndexComponent implements OnInit {

  searchTip = ''; // 搜索框提示
  searchTagList = []; // 搜索历史标签
  ads: any; // 广告轮播图列表
  filterAds: any; // 过滤后的广告轮播图列表
  storeTabList: any; // 商家分类菜单列表
  filterStoreTabList: any[] = <any[]>[]; // 过滤成二维数组的商家分类菜单列表
  listTab: any; // 商家列表一级菜单列表
  currListTab = '1'; // 当前商家列表一级菜单
  // 商家列表二级菜单
  sortBulletList: any; // 弹框元素对象列表
  // 排序
  sortFirstList = SORTDATA.firstList; // 排序列表
  currFirstSortTab = 0; // 当前排序项下标
  @ViewChild('sortFirstBullet') sortFirstBulletEle: BulletComponent; // 排序弹框元素对象
  isClickFirstSort = false; // 是否点击过排序列表
  // 分类
  sortSecondList = SORTDATA.secondList; // 分类列表
  currSecondSortTab1 = 0; // 当前分类项下标1
  currSecondSortTab2 = 0; // 当前分类项下标2
  @ViewChild('sortSecondBullet') sortSecondBulletEle: BulletComponent; // 分类弹框元素对象
  isClickSecondSort = false; // 是否点击过分类列表
  // 速度
  sortThirdList = SORTDATA.thirdList; // 速度列表
  currThirdSortTab: number[] = <number[]>[]; // 当前速度项下标列表
  @ViewChild('sortThirdBullet') sortThirdBulletEle: BulletComponent; // 速度弹框元素对象
  isClickThirdSort = false; // 是否点击过速度列表
  // 筛选
  sortFourList = SORTDATA.fourList; // 筛选列表
  currFourSortTab: number[] = <number[]>[]; // 当前筛选项下标列表
  @ViewChild('sortFourBullet') sortFourBulletEle: BulletComponent; // 筛选弹框元素对象
  isClickFourSort = false; // 是否点击过筛选列表
  // 弹框
  sortParam: {
    isSecond: boolean,
    type: number,
    list: any[],
    otherList: any[],
    currFirstIndex: number,
    currSecondIndex: number,
    currOtherIndex: number[],
  }
  @ViewChild('sortBullet') sortBulletEle: BulletComponent;

  thirdListTab: any; // 商家列表三级菜单列表
  storeList: any; // 商家列表
  storeParam = {
    storeCode1: '1', // 商家类别1
    storeCode2: '', // 商家类别2
    sortCode: '', // 排序字段
    rateCode: '', // 速度字段
    filterCode1: '', // 筛选字段-活动红包
    filterCode2: '', // 筛选字段-商家服务
  }; // 商家列表请求参数
  loading = false; // 是否加载中



  ngOnInit(): void {
    this.getSearchTip();
    this.getSearchTagList();
    this.getAds();
    this.getStoreTab();
    this.getListTab();
    this.getThirdListTab();
    this.getStore(this.storeParam);
    // 初始化速度弹框当前选项下标
    this.sortThirdList.forEach((element, i) => {
      this.currThirdSortTab[i] = -1;
    });
    // 初始化速度弹框当前选项下标
    this.sortFourList.forEach((element, i) => {
      this.currFourSortTab[i] = -1;
    });
  }

  constructor(
    private homeService: HomeService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private cdr: ChangeDetectorRef,
  ) { }

  /**
   * 获取搜索框提示
   * @returns void
   */
  getSearchTip(): void {
    this.homeService.getSearchTip().subscribe(res => {
      this.searchTip = res.data.tip;
    });
  }

  /**
   * 跳转搜索页面
   * @param  {string} searchKey? 搜索关键词
   * @returns void
   */
  toSearch(searchKey?: string): void {
    if (searchKey) {
      this.router.navigate(['/other/search'], {
        queryParams: {
          key: searchKey
        }
      });
    } else {
      this.router.navigate(['/other/search']);
    }
  }

  /**
   * 获取搜索历史关键词
   * @returns void
   */
  getSearchTagList(): void {
    this.homeService.getSearchTagList().subscribe(res => {
      this.searchTagList = res.data.list;
    });
  }

  /**
   * 获取广告轮播图
   * @returns void
   */
  getAds(): void {
    this.homeService.getAds().subscribe(res => {
      this.ads = res.data.list;
      // 过滤成伪链表，即3-1-2-3-1的形式
      this.filterAds = this.ads.concat(this.ads[0]);
      this.filterAds.splice(0, 0, this.ads[this.ads.length - 1]);
    });
  }

  /**
   * 获取商家分类
   * @returns void
   */
  getStoreTab(): void {
    this.homeService.getStoreTab().subscribe(res => {
      this.storeTabList = res.data.list;
      // 把商家分类菜单列表过滤成二维数组
      const length = Math.ceil(this.storeTabList.length / 15);
      for (let i = 0; i < length; i++) {
        const tempList = this.storeTabList.slice(i * 15, (i + 1) * 15);
        this.filterStoreTabList[i] = tempList;
      }
    });
  }

  /**
   * 跳转到商家列表页
   * @returns void
   */
  toStoreList(): void {
    this.router.navigate(['/store/list']);
  }

  /**
   * 获取商家列表一级菜单列表
   * @returns void
   */
  getListTab(): void {
    this.homeService.getListTab().subscribe(res => {
      this.listTab = res.data.list;
    });
  }

  /**
   * 切换商家列表一级tab
   * @param  {any} tabItem tab对象
   * @returns void
   */
  clickTab(tabItem: any): void {
    if (tabItem.code !== this.currListTab) {
      this.currListTab = tabItem.code;
      this.storeParam.storeCode1 = tabItem.code;
      this.getStore(this.storeParam);
    }
  }

  /**
   * 获取商家列表三级菜单列表
   * @returns void
   */
  getThirdListTab(): void {
    this.homeService.getThirdListTab().subscribe(res => {
      this.thirdListTab = res.data.list;
    });
  }

  /**
   *
   * 获取商家列表
   * @param  {{storeCode1:string} obj 商家一级类别
   * @param  {string} storeCode2 商家二级类别
   * @param  {string} sortCode? 排序字段
   * @param  {string} rateCode? 分类字段
   * @param  {} }
   * @returns void
   */
  getStore(obj: {
    storeCode1: string,
    storeCode2?: string,
    sortCode?: string,
    rateCode?: string,
  }): void {
    this.loading = true;
    this.homeService.getStore(obj).subscribe(res => {
      this.storeList = res.data.list;
      this.loading = false;
    });
  }

  /**
   * 未开发提示
   * @returns void
   */
  unDevelop(): void {
    alert('该功能未开发！');
  }

  /**
   * 跳转链接
   * @param  {string} url 链接
   * @returns void
   */
  adToLink(url: string): void {
    this.router.navigate([url]);
  }

  /**
   * 打开商家列表二级菜单弹框
   * @param  {number} type 弹框类型，1-排序，2-分类，3-速度
   * @returns void
   */
  // openListTab(type: number): void {
  //   let ele;
  //   switch (type) {
  //     case 1: {
  //       ele = this.sortFirstBulletEle;
  //       break;
  //     }
  //     case 2: {
  //       ele = this.sortSecondBulletEle;
  //       break;
  //     }
  //     case 3: {
  //       ele = this.sortThirdBulletEle;
  //       break;
  //     }
  //     case 4: {
  //       ele = this.sortFourBulletEle;
  //       break;
  //     }
  //     default: {
  //       ele = this.sortFirstBulletEle;
  //       break;
  //     }
  //   }
  //   if (ele.display === 'none') {
  //     ele.open();
  //   } else {
  //     ele.close();
  //   }
  // }
  openListTab(type: number): void {
    switch (type) {
      case 1: {
        this.sortParam = {
          type: 1,
          isSecond: false,
          list: this.sortFirstList,
          otherList: [],
          currFirstIndex: this.currFirstSortTab,
          currSecondIndex: -1,
          currOtherIndex: []
        }
        break;
      }
      case 2: {
        this.sortParam = {
          type: 1,
          isSecond: true,
          list: this.sortSecondList,
          otherList: [],
          currFirstIndex: this.currSecondSortTab1,
          currSecondIndex: this.currSecondSortTab2,
          currOtherIndex: []
        }
        break;
      }
      case 3: {
        this.sortParam = {
          type: 2,
          isSecond: false,
          list: [],
          otherList: this.sortThirdList,
          currFirstIndex: -1,
          currSecondIndex: -1,
          currOtherIndex: this.currThirdSortTab
        }
        break;
      }
      case 4: {
        this.sortParam = {
          type: 2,
          isSecond: false,
          list: [],
          otherList: this.sortFirstList,
          currFirstIndex: -1,
          currSecondIndex: -1,
          currOtherIndex: this.currFourSortTab
        }
        break;
      }
      default: {
        break;
      }
    }
  }

  /**
   * 商家列表二级菜单弹框点击事件（排序/分类）
   * @param  {any} obj
   * @returns void
   */
  // clickBullet(obj: any): void {
  //   if (obj.type === 'first') { // 一级
  //     if (this.currFirstSortTab !== obj.index1) {
  //       this.currFirstSortTab = obj.index1;
  //       this.isClickFirstSort = true;
  //       this.storeParam.sortCode = this.sortFirstList[this.currFirstSortTab].code;
  //       this.getStore(this.storeParam);
  //     }
  //   } else { // 二级
  //     if (this.currSecondSortTab1 !== obj.index1 || this.currSecondSortTab2 !== obj.index2) {
  //       this.currSecondSortTab1 = obj.index1;
  //       this.currSecondSortTab2 = obj.index2;
  //       this.isClickSecondSort = true;
  //       this.storeParam.storeCode1 = this.sortSecondList[this.currSecondSortTab1].code;
  //       this.storeParam.storeCode2 = this.sortSecondList[this.currSecondSortTab1]['list'][this.currSecondSortTab2].code;
  //       this.getStore(this.storeParam);
  //     }
  //   }
  // }
  clickBullet(obj: any): void {
    switch (obj.type) {
      case 'first': {
        if (this.currFirstSortTab !== obj.index1) {
          this.currFirstSortTab = obj.index1;
          this.isClickFirstSort = true;
          this.storeParam.sortCode = this.sortFirstList[this.currFirstSortTab].code;
          this.getStore(this.storeParam);
        }
        break;
      }
      case 'second': {
        if (this.currSecondSortTab1 !== obj.index1 || this.currSecondSortTab2 !== obj.index2) {
          this.currSecondSortTab1 = obj.index1;
          this.currSecondSortTab2 = obj.index2;
          this.isClickSecondSort = true;
          this.storeParam.storeCode1 = this.sortSecondList[this.currSecondSortTab1].code;
          this.storeParam.storeCode2 = this.sortSecondList[this.currSecondSortTab1]['list'][this.currSecondSortTab2].code;
          this.getStore(this.storeParam);
        }
        break;
      }
      case 'third': {
        if (obj.noSelectFlag) {
          this.isClickThirdSort = false;
        } else {
          this.isClickThirdSort = true;
          this.currThirdSortTab = obj.selectList;
          this.storeParam.rateCode = this.sortThirdList[0]['list'][obj.selectList[0]].code;
          this.getStore(this.storeParam);
        }
        break;
      }
      case 'four': {
        if (obj.noSelectFlag) {
          this.isClickFourSort = false;
        } else {
          this.isClickFourSort = true;
          this.currFourSortTab = obj.selectList;
          this.storeParam.filterCode1 = obj.selectList[0] === -1 ? '' : this.sortFourList[0]['list'][obj.selectList[0]].code;
          this.storeParam.filterCode2 = obj.selectList[1] === -1 ? '' : this.sortFourList[1]['list'][obj.selectList[1]].code;
          this.getStore(this.storeParam);
        }
        break;
      }
      default: {
        break;
      }
    }
    this.sortBulletEle.open();
  }

  // clickOther(obj: any): void {
  //   if (obj.type === 'third') {
  //     if (obj.noSelectFlag) {
  //       this.isClickThirdSort = false;
  //     } else {
  //       this.isClickThirdSort = true;
  //       this.currThirdSortTab = obj.selectList;
  //       this.storeParam.rateCode = this.sortThirdList[0]['list'][obj.selectList[0]].code;
  //       this.getStore(this.storeParam);
  //     }
  //   } else {
  //     if (obj.noSelectFlag) {
  //       this.isClickFourSort = false;
  //     } else {
  //       this.isClickFourSort = true;
  //       this.currFourSortTab = obj.selectList;
  //       this.storeParam.filterCode1 = obj.selectList[0] === -1 ? '' : this.sortFourList[0]['list'][obj.selectList[0]].code;
  //       this.storeParam.filterCode2 = obj.selectList[1] === -1 ? '' : this.sortFourList[1]['list'][obj.selectList[1]].code;
  //       this.getStore(this.storeParam);
  //     }
  //   }
  // }

}
