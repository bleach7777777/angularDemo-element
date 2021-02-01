let router = require('express').Router();
let Mock = require('mockjs');
// 获取搜索框提示
router.get('/index/getSearchTip', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            tip: '觅姐可以喝的麻辣烫 25-15'
        }
    }))
});
// 获取搜索历史关键词
router.get('/index/getSearchTagList', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            list: ['炸鸡', '波霸奶茶', '汉堡', '烤鱼', '拌粉']
        }
    }))
});
// 获取广告轮播图
router.get('/index/getAds', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            list: [
                { img: '../../../assets/images/ad1.jpg', link: '/other/ad' },
                { img: '../../../assets/images/ad2.jpg', link: '/other/ad' },
                { img: '../../../assets/images/ad3.jpg', link: '/other/ad' },
                { img: '../../../assets/images/ad4.jpg', link: '/other/ad' },
                { img: '../../../assets/images/ad5.jpg', link: '/other/ad' },
            ]
        }
    }))
});
// 获取商家分类菜单
router.get('/index/getStoreTab', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            list: [
                { code: 1, name: '美食外卖', img: '../../../assets/images/tab.jpg' },
                { code: 2, name: '超市便利', img: '../../../assets/images/tab.jpg' },
                { code: 3, name: '团购优惠', img: '../../../assets/images/tab.jpg' },
                { code: 4, name: '快速自取', img: '../../../assets/images/tab.jpg' },
                { code: 5, name: '休闲玩乐', img: '../../../assets/images/tab.jpg' },
                { code: 6, name: '午餐', img: '../../../assets/images/tab.jpg' },
                { code: 7, name: '水果', img: '../../../assets/images/tab.jpg' },
                { code: 8, name: '送药上门', img: '../../../assets/images/tab.jpg' },
                { code: 9, name: '买菜', img: '../../../assets/images/tab.jpg' },
                { code: 10, name: '天天赚现金', img: '../../../assets/images/tab.jpg' },
                { code: 11, name: '丽人/医保', img: '../../../assets/images/tab.jpg' },
                { code: 12, name: '甜品饮品', img: '../../../assets/images/tab.jpg' },
                { code: 13, name: '0元领水果', img: '../../../assets/images/tab.jpg' },
                { code: 14, name: '鲜花绿植', img: '../../../assets/images/tab.jpg' },
                { code: 15, name: '省钱好券', img: '../../../assets/images/tab.jpg' },
                { code: 16, name: '测试', img: '../../../assets/images/tab.jpg' },
                { code: 17, name: '测试', img: '../../../assets/images/tab.jpg' },
                { code: 18, name: '测试', img: '../../../assets/images/tab.jpg' },
                { code: 19, name: '测试', img: '../../../assets/images/tab.jpg' },
                { code: 20, name: '测试', img: '../../../assets/images/tab.jpg' },
                { code: 21, name: '测试', img: '../../../assets/images/tab.jpg' },
            ]
        },
    }))
});
// 获取商家列表一级菜单列表
router.get('/index/getListTab', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            list: [
                { code: '1', name: '附近推荐' },
                { code: '2', name: '发现好菜' },
                { code: '3', name: '超市' },
                { code: '4', name: '到店吃' },
                { code: '5', name: '丽人医美' },
                { code: '6', name: '医药' },
                { code: '7', name: '百货' },
                { code: '8', name: '鲜花' },
                { code: '9', name: '水果' },
            ]
        }
    }))
});
// 商家列表三级菜单列表
router.get('/index/getThirdListTab', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            list: [
                { code: '1', name: '百亿补贴' },
                { code: '2', name: '吃货联盟' },
                { code: '3', name: '30分钟达' },
                { code: '4', name: '无门槛红包' },
            ]
        }
    }))
});
// 商家列表
router.get('/index/getStore', (req, res) => {
    res.json(Mock.mock({
        status: 200,
        data: {
            "list|100": [{
                code: '1', // 下标
                "name|1": ['淳百味', '三米粥铺'], // 商家名
                "img|1": ['../../../assets/images/store.jpg', '../../../assets/images/store1.jpg'], // 商家图标
                "rate|1": [4.8, 3.3], // 评分
                "sales|1": [2618, 1314], // 销量
                "reachTime|1": [30, 35], // 送达时间，单位min
                "distance|1": ['247m', '333m'], // 距离
                "lowestCarryPrice|1": [20, 15], // 起送价
                "deliverFee|1": [0, 1], // 配送费
                "deliverWay|1": ['蓝骑士专送', ''], // 配送方式
                ad: '经典霸王扁肉包装好味道好', // 广告
                activity: ['百亿补贴 2元', '28减12', '40减18', '51减22', '70减27', '1元特价', '吃货联盟', '赠'], // 活动
                redPaper: ['8元红包', '10元红包'], // 红包
                service: ['支持自取', '食无忧'] // 服务
            }]
        }
    }))
})
module.exports = router
