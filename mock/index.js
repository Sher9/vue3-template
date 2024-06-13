//公共请求方法
export default [
    {
        type: "post",
        url: "/login",
        response: () => {
            return { token: "token2019", user_name: "管理员", account: "admin", user_id: "101" };
        },
    },
    {
        type: "",
        url: "/dictData/list",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "msg": "操作成功",
                "data": {
                    "taskType": [{
                        "dictValue": "任务1",
                        "dictKey": "job1"
                    }, {
                        "dictValue": "任务2",
                        "dictKey": "job2"
                    }, {
                        "dictValue": "任务3",
                        "dictKey": "job3"
                    }],

                    "yes_no": [{
                        "dictValue": "是",
                        "dictKey": "1"
                    }, {
                        "dictValue": "否",
                        "dictKey": "0"
                    }]

                }

            }
        },
    },
];

