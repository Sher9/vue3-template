export default [
    {
        type: "get",
        url: "/schedulejobinfo/list",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "data": {
                    "records": [{
                        "id": "1725731910266769410",
                        "jobName": "job1",
                        "jobBeanName": "job1",
                        "jobDesc": "job1",
                        "jobGroup": "job1",
                        "triggerName": "job1",
                        "triggerGroup": "job1",
                        "cronExpression": "* * 9 * * ? *",
                        "v1": "暂停中",
                        "v2": "",
                        "v3": "",
                        "jobParams": "{\"schema\":\"iris_ods\"}",
                        "jobDataMap": null
                    }, {
                        "id": "1725734233441423361",
                        "jobName": "job2",
                        "jobBeanName": "job2",
                        "jobDesc": "job2",
                        "jobGroup": "job2",
                        "triggerName": "job2",
                        "triggerGroup": "job2",
                        "cronExpression": "10/5 * * * * ? *",
                        "v1": "暂停中",
                        "v2": "",
                        "v3": "",
                        "jobDataMap": null
                    }, {
                        "id": "1726500698675257346",
                        "jobName": "job3",
                        "jobBeanName": "job3",
                        "jobDesc": "job3",
                        "jobGroup": "job3",
                        "triggerName": "job3",
                        "triggerGroup": "job3",
                        "cronExpression": "3/5 * * * * ? *",
                        "v1": "暂停中",
                        "v2": "",
                        "v3": "",
                        "jobParams": "{\"id\":\"1b43542f61fb4fd4b2f2be08e8d9052b\"}",
                        "jobDataMap": null
                    }],
                    "total": 3,
                    "size": 20,
                    "current": 1,
                    "orders": [],
                    "optimizeCountSql": true,
                    "hitCount": false,
                    "countId": null,
                    "maxLimit": null,
                    "searchCount": true,
                    "pages": 1
                },
                "msg": "操作成功",
                "traceId": null
            }
        },
    },
    {
        type: "post",
        url: "/schedulejobinfo/save",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/schedulejobinfo/update'",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/schedulejobinfo/removeJobs",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/schedulejobinfo/pauseJobs",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/schedulejobinfo/resumeJobs",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "get",
        url: "/schedulejobinfo/nextTriggerTime",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
                "data":["2024-06-13 09:00:00"]
            };
        },
    }

]