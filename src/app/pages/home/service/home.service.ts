import { Injectable } from '@angular/core';
import { HttpService } from '../../../shared/service/http.service';
import { Observable } from 'rxjs';
@Injectable()
export class HomeService {
  constructor(
    private http: HttpService,
  ) { }

  /**
   * 获取搜索框提示
   * @returns Observable
   */
  getSearchTip(): Observable<any> {
    return this.http.get('/api/index/getSearchTip');
  }

  /**
   * 返回搜索历史关键词
   * @returns Observable
   */
  getSearchTagList(): Observable<any> {
    return this.http.get('/api/index/getSearchTagList');
  }

  /**
   * 获取广告轮播图
   * @returns Observable
   */
  getAds(): Observable<any> {
    return this.http.get('/api/index/getAds');
  }

  /**
   * 获取首页商家分类菜单
   * @returns void
   */
  getStoreTab(): Observable<any> {
    return this.http.get('/api/index/getStoreTab');
  }

  /**
   * 获取商家列表一级菜单列表
   * @returns Observable
   */
  getListTab(): Observable<any> {
    return this.http.get('/api/index/getListTab');
  }

  /**
   * 商家列表三级菜单列表
   * @returns Observable
   */
  getThirdListTab(): Observable<any> {
    return this.http.get('/api/index/getThirdListTab');
  }

  /**
   * 获取商家列表
   * @param  {{storeCode1:string} obj 商家一级类别
   * @param  {string} storeCode2? 商家二级类别
   * @param  {string} sortCode? 排序字段
   * @param  {string} rateCode? 速度字段
   * @param  {} }
   * @returns Observable
   */
  getStore(obj: {
    storeCode1: string,
    storeCode2?: string,
    sortCode?: string,
    rateCode?: string,
  }): Observable<any> {
    return this.http.get('/api/index/getStore', obj);
  }
}
