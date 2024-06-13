export default [
    {
        type: "get",
        url: "/dsUser/authMenu",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "data": {
                    "auth_menu": [{
                        "id": "1",
                        "parentId": "1",
                        "code": "screen",
                        "name": "首页",
                        "alias": null,
                        "path": "/screen",
                        "sort": 1,
                        "category": "1",
                        "icon": "Histogram"
                    }, {
                        "id": "2",
                        "parentId": "1",
                        "code": "dv",
                        "name": "系统管理",
                        "path": "/system",
                        "sort": 2,
                        "category": "1",
                        "icon": "Setting",
                        "children": [{
                            "id": "21",
                            "parentId": "2",
                            "code": "menuManage",
                            "name": "菜单管理",
                            "alias": null,
                            "path": "/system/menuManage",
                            "sort": 1,
                            "category": "1",
                            "icon": "Menu"
                        }, {
                            "id": "22",
                            "parentId": "2",
                            "code": "user",
                            "name": "用户管理",
                            "alias": null,
                            "path": "/system/user",
                            "sort": 2,
                            "category": "1",
                            "icon": "User"
                        }]
                    }, {
                        "id": "3",
                        "parentId": "1",
                        "code": "flow",
                        "name": "流程管理",
                        "alias": null,
                        "path": "/flowManage",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 4,
                        "category": "1",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "SetUp",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "children": [{
                            "id": "31",
                            "parentId": "3",
                            "code": "task",
                            "name": "任务管理",
                            "path": "/flow/task",
                            "sort": 0,
                            "category": "1",
                            "icon": "Calendar",
                            "isDeleted": 0
                        }, {
                            "id": "32",
                            "parentId": "3",
                            "code": "taskLog",
                            "name": "流程配置",
                            "alias": null,
                            "path": "/flow/config",
                            "sort": 1,
                            "category": "1",
                            "icon": "Platform",
                            "isDeleted": 0,
                            "isStandard": null,
                            "nodeId": null,
                            "parentName": null,
                            "categoryName": null,
                            "actionName": null,
                            "isOpenName": null
                        }]
                    },
                    {
                        "id": "4",
                        "parentId": "1",
                        "code": "service",
                        "name": "数据服务",
                        "alias": null,
                        "path": "http://www.baidu.com",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 5,
                        "category": "3",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "Mouse",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "parentName": null,
                        "categoryName": null,
                        "actionName": null,
                        "isOpenName": null
                    }
                    ],
                    "auth_button": [{
                        "id": "1690899713367769089",
                        "parentId": "22",
                        "code": "user_del",
                        "name": "删除",
                        "alias": null,
                        "path": "",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 4,
                        "category": "2",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "parentName": null,
                        "categoryName": null,
                        "actionName": null,
                        "isOpenName": null
                    }, {
                        "id": "1690899477505277953",
                        "parentId": "22",
                        "code": "user_add",
                        "name": "新增",
                        "alias": null,
                        "path": "",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 1,
                        "category": "2",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "parentName": null,
                        "categoryName": null,
                        "actionName": null,
                        "isOpenName": null
                    }, {
                        "id": "1690899648041484289",
                        "parentId": "22",
                        "code": "user_auth",
                        "name": "权限",
                        "alias": null,
                        "path": "",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 3,
                        "category": "2",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "parentName": null,
                        "categoryName": null,
                        "actionName": null,
                        "isOpenName": null
                    }, {
                        "id": "1690899566638432257",
                        "parentId": "1690898988625592322",
                        "code": "user_update",
                        "name": "修改",
                        "alias": null,
                        "path": "",
                        "source": null,
                        "extendParam": null,
                        "ancestors": null,
                        "sort": 2,
                        "category": "2",
                        "action": null,
                        "isOpen": null,
                        "remark": null,
                        "icon": "",
                        "isDeleted": 0,
                        "isStandard": null,
                        "nodeId": null,
                        "parentName": null,
                        "categoryName": null,
                        "actionName": null,
                        "isOpenName": null
                    }]
                },
                "msg": "操作成功",
                "traceId": null
            }


        },
    },
    {
        type: "get",
        url: "/dsUser/page",
        response: () => {
            return { "code": 200, "success": true, "data": { "records": [{ "id": "123", "account": "admin", "password": "04AA272A268B0E1D1836C33FCA87C139B4270F39BF1E51EC9B5E105427D3CD17741F2FA3ECEA3B8416C2AB822D7347AA787C9BECD00F27592CD5CF4D689D6701A8BB394AA5C31512F28D00C439589F2D46FCE26032A40510B877FC962CB8CDDDF3E88F5C816A27", "name": "admin", "realName": "admin", "avatar": null, "email": "122", "phone": "11", "birthday": null, "sex": null, "deptId": "1", "deptName": "无锡农商", "createUser": null, "createDept": null, "createTime": null, "updateUser": null, "updateTime": null, "status": null, "isDeleted": null, "effectiveTime": null, "pwdUpdateTime": null, "hisPwd": null, "pwdResetTime": null, "failNum": null, "failTime": null }], "total": 1, "size": 10, "current": 1, "orders": [], "optimizeCountSql": true, "hitCount": false, "countId": null, "maxLimit": null, "searchCount": true, "pages": 1 }, "msg": "操作成功", "traceId": null };
        },
    },
    {
        type: "get",
        url: "/dsDept/tree",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "msg": "操作成功",
                "data": [{
                    "id": "1",
                    "deptId": "1",
                    "parentId": "0",
                    "deptName": "总机构",
                    "fullName": "总机构",
                    "ancestors": null,
                    "deptCategory": 1,
                    "sort": 1,
                    "remark": null,
                    "isDeleted": 0,
                    "orgNo": "1001",
                    "nodeId": "1",
                    "children": [{
                        "id": "2",
                        "deptId": "1001",
                        "parentId": "1",
                        "deptName": "机构1",
                        "fullName": "机构1",
                        "ancestors": null,
                        "deptCategory": 1,
                        "sort": 1,
                        "remark": null,
                        "isDeleted": 0,
                        "orgNo": "B234192045812812",
                        "nodeId": "2",
                        "parentName": "总机构",
                        "deptCategoryName": null,
                        "title": "机构1",
                        "key": null,
                        "value": null
                    }, {
                        "id": "1798281609780387842",
                        "deptId": "1002",
                        "parentId": "1",
                        "deptName": "机构2",
                        "fullName": null,
                        "ancestors": null,
                        "deptCategory": 1,
                        "sort": 2,
                        "remark": "",
                        "isDeleted": 0,
                        "orgNo": "1003",
                        "nodeId": "1798281609780387842",
                        "parentName": "总机构",
                        "deptCategoryName": null,
                        "title": "机构2",
                        "key": null,
                        "value": null
                    }],
                    "parentName": null,
                    "deptCategoryName": null,
                    "title": "总行",
                    "key": null,
                    "value": null
                }]
            }
        }
    },
    {
        type: "get",
        url: "/dsUser/queryUserMenu",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
                "data": ['1', '21', '22', '31', '32', '4', '1690899477505277953', '1690899566638432257', '1690899648041484289', '1690899713367769089', '1690899807567642625']
            };
        },
    },
    {
        type: "post",
        url: "/dsUser/reset-password",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/dsUser/add",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/dsUser/update",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/dsUser/remove",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    }
];

