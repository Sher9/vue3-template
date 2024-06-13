export default [
    {
        type: "get",
        url: "/moduleConfig/getIndexmoduleData",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "data": [
                    {
                        "id": null,
                        "moduleId": "1670704079613120514",
                        "type": "timeline",
                        "title": "计划",
                        "url": "",
                        "dataStructure": "{\"summaryChart\":[{\"name\":\"数据\",\"value\":\"值\"}]}",
                        "requestParam": null,
                        "extV1": null,
                        "isDefault": 1,
                        "position": null,
                        "sort": null,
                        "data": {
                            "summaryChart": [{
                                "topath": "",
                                "name": "202401",
                                "topmenuid": "",
                                "value": "节点1"
                            }, {
                                "topath": "",
                                "name": "202402",
                                "topmenuid": "",
                                "value": "节点2"
                            }, {
                                "topath": "",
                                "name": "202403",
                                "topmenuid": "",
                                "value": "节点3"
                            }, {
                                "topath": "",
                                "name": "202404",
                                "topmenuid": "",
                                "value": "节点4"
                            }, {
                                "topath": "",
                                "name": "202405",
                                "topmenuid": "",
                                "value": "节点5"
                            }, {
                                "topath": "",
                                "name": "202406",
                                "topmenuid": "",
                                "value": "节点6"
                            }, {
                                "topath": "",
                                "name": "202407",
                                "topmenuid": "",
                                "value": "节点7"
                            }]
                        },
                        "moduleRow": 0,
                        "moduleColumn": 5,
                        "moduleWidth": 24,
                        "moduleHeight": 5
                    }, {
                        "id": null,
                        "moduleId": "1670705578057584642",
                        "type": "progressComponent",
                        "title": "问题展示 ",
                        "description": "问题展示",
                        "url": "",
                        "dataStructure": "{\"summaryChart\":[{\"name\":\"数据\",\"value\":\"值\",\"color\":\"环形进度颜色\",\"type\":\"warning/normal\",\"toPath\":\"跳转页面路由地址(为空即不跳转)\",\"topMenuId\":\"左侧菜单的父id(菜单为top模式，跳转到不同系统必须要配置)\"}]}",
                        "requestParam": null,
                        "extV1": null,
                        "isDefault": 1,
                        "position": null,
                        "sort": null,
                        "data": {
                            "summaryChart": [{
                                "color": "",
                                "topath": "",
                                "name": "偏差率",
                                "topmenuid": "",
                                "type": "normal",
                                "value": "72"
                            }, {
                                "color": "",
                                "topath": "",
                                "name": "问题分析",
                                "topmenuid": "",
                                "type": "normal",
                                "value": "50"
                            }]
                        },
                        "moduleRow": 0,
                        "moduleColumn": 10,
                        "moduleWidth": 7,
                        "moduleHeight": 7
                    }, {
                        "id": null,
                        "moduleId": "1670706227994349569",
                        "type": "lineComponent",
                        "title": "趋势图",
                        "description": "趋势图",
                        "url": "",
                        "dataStructure": "{\"xdata\":[\"data1\"],\"data\":[{\"name\":\"\",\"color\":\"颜色\",\"areaStyle\":\"是否显示阴影,值为Y或N\",\"smooth\":\"折线是否平滑,值为Y或N\",\"needPer\":\"是否给tooltip数值加上百分号,值为1或空\",\"data\":[\"值\"]}]}",
                        "requestParam": null,
                        "extV1": null,
                        "isDefault": 1,
                        "position": null,
                        "sort": null,
                        "data": {
                            "data": [{
                                "yunit": "",
                                "areastyle": "Y",
                                "smooth": "Y",
                                "color": "#4070FF",
                                "name": "数据",
                                "data": ["68", "55", "78", "66", "95", "82", "68", "84", "73", "64", "98", "91"]
                            }],
                            "xdata": ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月", "11月", "12月"]
                        },
                        "moduleRow": 7,
                        "moduleColumn": 10,
                        "moduleWidth": 17,
                        "moduleHeight": 7
                    }],
                "msg": "操作成功"
            }
        }


    }
]