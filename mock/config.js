export default [
    {
        type: "get",
        url: "/wfjobInfo/listAll",
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
        url: "/wfjobInfo/configuration",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/wfjobInfo/updateWorkGroup'",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/wfjobInfo/addWorkGroup",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/wfjobInfo/deleteWorkGroup",
        response: () => {
            return {
                "code": 200,
                "msg": "操作成功",
            };
        },
    },
    {
        type: "post",
        url: "/wfjobInfo/workflowDetails",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "data": {
                    "id": "1782392661552095233",
                    "jobGroup": null,
                    "jobDesc": "T_1_1任务组",
                    "belongTable": null,
                    "jobType": null,
                    "jobParam": null,
                    "addTime": "2024-04-22T12:55:00.000+00:00",
                    "updateTime": "2024-04-22T12:55:00.000+00:00",
                    "author": null,
                    "alarmEmail": null,
                    "scheduleType": "NONE",
                    "scheduleConf": null,
                    "misfireStrategy": "DO_NOTHING",
                    "executorRouteStrategy": null,
                    "executorHandler": "workflowHandler",
                    "executorParam": null,
                    "executorBlockStrategy": null,
                    "executorTimeout": 0,
                    "executorFailRetryCount": 0,
                    "glueType": null,
                    "glueSource": null,
                    "glueRemark": null,
                    "glueUpdatetime": "2024-04-22T12:55:00.000+00:00",
                    "childJobId": null,
                    "triggerStatus": 0,
                    "triggerLastTime": 0,
                    "triggerNextTime": 0,
                    "executorMuti": false,
                    "code": null,
                    "workflowData": {
                        "nodes": [{
                            "id": "0384f95d-a6c2-41d8-9d35-5c6f4a7d8138",
                            "wfId": "1782392661552095233",
                            "jobId": "1736713613110501377",
                            "jobName": "任务1",
                            "executorParam": "{\"dataDate\":\"${DATA_DATE_today2}\",\"orgNo\":[\"1001\"],\"tableName\":\"T_1_1\"}",
                            "positionX": -360,
                            "positionY": -110,
                            "exStatus": null,
                            "executorHandler": "任务1",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "0384f95d-a6c2-41d8-9d35-5c6f4a7d8138",
                            "position": {
                                "x": -360,
                                "y": -110
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${DATA_DATE_today2}\",\"orgNo\":[\"1001\"],\"tableName\":\"T_1_1\"}",
                                "jobGroupName": null,
                                "name": "任务1",
                                "executorHandler": "dvJobHandler",
                                "belongTable": "T_1_1",
                                "id": "1736713613110501377"
                            }
                        }, {
                            "id": "11408ac3-7165-433e-b5a8-cbc774d6bd45",
                            "wfId": "1782392661552095233",
                            "jobId": "1736713757977567233",
                            "jobName": "任务2",
                            "executorParam": "{\"dataDate\":\"${DATA_DATE_today2}\",\"orgNo\":[\"1001\"],\"tableName\":\"T_1_1\"}",
                            "positionX": -80,
                            "positionY": -110,
                            "exStatus": null,
                            "executorHandler": "任务2",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "11408ac3-7165-433e-b5a8-cbc774d6bd45",
                            "position": {
                                "x": -80,
                                "y": -110
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${DATA_DATE_today2}\",\"orgNo\":[\"1001\"],\"tableName\":\"T_1_1\"}",
                                "jobGroupName": null,
                                "name": "任务2",
                                "executorHandler": "dvStatusJobHandler",
                                "belongTable": "T_1_1",
                                "id": "1736713757977567233"
                            }
                        }, {
                            "id": "22992a1c-020e-4e19-8a7a-f69e5c004950",
                            "wfId": "1782392661552095233",
                            "jobId": "1736755554681266177",
                            "jobName": "任务3",
                            "executorParam": "{\"dataDate\":\"${DATA_DATE_TODAY}\",\"orgNo\":\"1001\",\"tableName\":\"T_JC_JYJG\",\"fields\":\"DATA_DATE, ORG_NO, CHECK_OBJ, ORG_NAME, RULE_VERSION, RULE_NO, CHECK_PROP, CHECK_TOTAL_NUM, CHECK_PASS_NUM, CHECK_PASS_PER, CHECK_RESULT, CHECK_RESULT_VAL, CHECK_PASS_RESULT, CHECK_TS\"}",
                            "positionX": 220,
                            "positionY": -110,
                            "exStatus": null,
                            "executorHandler": "任务3",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "22992a1c-020e-4e19-8a7a-f69e5c004950",
                            "position": {
                                "x": 220,
                                "y": -110
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${DATA_DATE_TODAY}\",\"orgNo\":\"1001\",\"tableName\":\"T_JC_JYJG\",\"fields\":\"DATA_DATE, ORG_NO, CHECK_OBJ, ORG_NAME, RULE_VERSION, RULE_NO, CHECK_PROP, CHECK_TOTAL_NUM, CHECK_PASS_NUM, CHECK_PASS_PER, CHECK_RESULT, CHECK_RESULT_VAL, CHECK_PASS_RESULT, CHECK_TS\"}",
                                "jobGroupName": null,
                                "name": "T_JC_JYJG",
                                "executorHandler": "dataReportHandler",
                                "belongTable": "T_JC_JYJG",
                                "id": "1736755554681266177"
                            }
                        }, {
                            "id": "096287ef-9a31-4301-b3b4-f78e0def01e9",
                            "wfId": "1782392661552095233",
                            "jobId": "1736773877850652674",
                            "jobName": "任务4",
                            "executorParam": "{\"dataDate\":\"${today}\",\"orgNo\":\"1001\",\"tableName\":\"T_1_1\",\"fields\":\"\"}",
                            "positionX": -360,
                            "positionY": 40,
                            "exStatus": null,
                            "executorHandler": "任务4",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "096287ef-9a31-4301-b3b4-f78e0def01e9",
                            "position": {
                                "x": -360,
                                "y": 40
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${today}\",\"orgNo\":\"1001\",\"tableName\":\"T_1_1\",\"fields\":\"\"}",
                                "jobGroupName": null,
                                "name": "T_1_1",
                                "executorHandler": "dataReportHandler",
                                "belongTable": "T_1_1",
                                "id": "1736773877850652674"
                            }
                        }, {
                            "id": "ba32f03a-f372-4194-9154-2d3e9d84605a",
                            "wfId": "1782392661552095233",
                            "jobId": "1736773980330082305",
                            "jobName": "任务5",
                            "executorParam": "{\"dataDate\":\"${today}\",\"orgNo\":\"1001\",\"tableName\":\"T_INDX_SRS_IPTT_IDX\"}",
                            "positionX": 230,
                            "positionY": 40,
                            "exStatus": null,
                            "executorHandler": "任务5",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "ba32f03a-f372-4194-9154-2d3e9d84605a",
                            "position": {
                                "x": 230,
                                "y": 40
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${today}\",\"orgNo\":\"1001\",\"tableName\":\"T_INDX_SRS_IPTT_IDX\"}",
                                "jobGroupName": null,
                                "name": "T_INDX_SRS_IPTT_IDX",
                                "executorHandler": "dataReportHandler",
                                "belongTable": "T_INDX_SRS_IPTT_IDX",
                                "id": "1736773980330082305"
                            }
                        }, {
                            "id": "8ebdf896-19d5-4b5c-bd75-db302f237786",
                            "wfId": "1782392661552095233",
                            "jobId": "1765261986495606786",
                            "jobName": "1111",
                            "executorParam": "{\"dataDate\":\"${LAST_MONTH_BEGIN}\",\"metricsCode\":\"1\"}",
                            "positionX": -70,
                            "positionY": 40,
                            "exStatus": null,
                            "executorHandler": "任务6",
                            "jobGroupName": null,
                            "field4": null,
                            "field5": null,
                            "dataId": "8ebdf896-19d5-4b5c-bd75-db302f237786",
                            "position": {
                                "x": -70,
                                "y": 40
                            },
                            "data": {
                                "exStatus": null,
                                "executorParam": "{\"dataDate\":\"${LAST_MONTH_BEGIN}\",\"metricsCode\":\"1\"}",
                                "jobGroupName": null,
                                "name": "任务6",
                                "executorHandler": "idxJobHandler",
                                "belongTable": null,
                                "id": "1765261986495606786"
                            }
                        }],
                        "edges": [{
                            "id": "22622832-c15b-4499-99b5-e4e7b4c81e64",
                            "wfId": "1782392661552095233",
                            "sourceCell": "096287ef-9a31-4301-b3b4-f78e0def01e9",
                            "sourcePort": "port4",
                            "targetCell": "8ebdf896-19d5-4b5c-bd75-db302f237786",
                            "targetPort": "port3",
                            "lineType": 0,
                            "field2": null,
                            "field3": null,
                            "field4": null,
                            "field5": null,
                            "chartId": "22622832-c15b-4499-99b5-e4e7b4c81e64",
                            "source": {
                                "port": "port4",
                                "cell": "096287ef-9a31-4301-b3b4-f78e0def01e9"
                            },
                            "target": {
                                "port": "port3",
                                "cell": "8ebdf896-19d5-4b5c-bd75-db302f237786"
                            }
                        }, {
                            "id": "7f899062-c93e-4300-a9c3-694757c56c0f",
                            "wfId": "1782392661552095233",
                            "sourceCell": "0384f95d-a6c2-41d8-9d35-5c6f4a7d8138",
                            "sourcePort": "port4",
                            "targetCell": "11408ac3-7165-433e-b5a8-cbc774d6bd45",
                            "targetPort": "port3",
                            "lineType": 0,
                            "field2": null,
                            "field3": null,
                            "field4": null,
                            "field5": null,
                            "chartId": "7f899062-c93e-4300-a9c3-694757c56c0f",
                            "source": {
                                "port": "port4",
                                "cell": "0384f95d-a6c2-41d8-9d35-5c6f4a7d8138"
                            },
                            "target": {
                                "port": "port3",
                                "cell": "11408ac3-7165-433e-b5a8-cbc774d6bd45"
                            }
                        }, {
                            "id": "84e2aa54-395f-41ea-9792-e73e9df72214",
                            "wfId": "1782392661552095233",
                            "sourceCell": "8ebdf896-19d5-4b5c-bd75-db302f237786",
                            "sourcePort": "port4",
                            "targetCell": "ba32f03a-f372-4194-9154-2d3e9d84605a",
                            "targetPort": "port3",
                            "lineType": 0,
                            "field2": null,
                            "field3": null,
                            "field4": null,
                            "field5": null,
                            "chartId": "84e2aa54-395f-41ea-9792-e73e9df72214",
                            "source": {
                                "port": "port4",
                                "cell": "8ebdf896-19d5-4b5c-bd75-db302f237786"
                            },
                            "target": {
                                "port": "port3",
                                "cell": "ba32f03a-f372-4194-9154-2d3e9d84605a"
                            }
                        }, {
                            "id": "bb9938d2-2f11-4b00-983e-f2db0c22b0f7",
                            "wfId": "1782392661552095233",
                            "sourceCell": "11408ac3-7165-433e-b5a8-cbc774d6bd45",
                            "sourcePort": "port4",
                            "targetCell": "22992a1c-020e-4e19-8a7a-f69e5c004950",
                            "targetPort": "port3",
                            "lineType": 0,
                            "field2": null,
                            "field3": null,
                            "field4": null,
                            "field5": null,
                            "chartId": "bb9938d2-2f11-4b00-983e-f2db0c22b0f7",
                            "source": {
                                "port": "port4",
                                "cell": "11408ac3-7165-433e-b5a8-cbc774d6bd45"
                            },
                            "target": {
                                "port": "port3",
                                "cell": "22992a1c-020e-4e19-8a7a-f69e5c004950"
                            }
                        }]
                    },
                    "executorParams": null,
                    "executorParamValues": null,
                    "jobLogIdsMap": null
                },
                "msg": "操作成功",
                "traceId": null
            };
        },
    },
    {
        type: "get",
        url: "/wfjobInfo/getWorkGroupList",
        response: () => {
            return {
                "code": 200,
                "success": true,
                "data": {
                    "records": [{
                        "id": "1727897532282306562",
                        "jobGroup": null,
                        "jobDesc": "任务组1",
                        "belongTable": null,
                        "jobType": null,
                        "jobParam": null,
                        "addTime": "2023-11-24T03:50:49.000+00:00",
                        "updateTime": "2023-11-27T09:09:52.000+00:00",
                        "author": "张三",
                        "alarmEmail": null,
                        "scheduleType": "NONE",
                        "scheduleConf": null,
                        "misfireStrategy": "DO_NOTHING",
                        "executorRouteStrategy": null,
                        "executorHandler": "workflowHandler",
                        "executorParam": null,
                        "executorBlockStrategy": null,
                        "executorTimeout": 0,
                        "executorFailRetryCount": 0,
                        "glueType": null,
                        "glueSource": null,
                        "glueRemark": null,
                        "glueUpdatetime": "2023-11-24T03:50:49.000+00:00",
                        "childJobId": null,
                        "triggerStatus": 0,
                        "triggerLastTime": 0,
                        "triggerNextTime": 0,
                        "executorMuti": false
                    }, {
                        "id": "1729061165448200194",
                        "jobGroup": null,
                        "jobDesc": "任务2",
                        "belongTable": null,
                        "jobType": null,
                        "jobParam": null,
                        "addTime": "2023-11-27T08:54:41.000+00:00",
                        "updateTime": "2023-11-27T09:02:22.000+00:00",
                        "author": "李四",
                        "alarmEmail": null,
                        "scheduleType": "NONE",
                        "scheduleConf": null,
                        "misfireStrategy": "DO_NOTHING",
                        "executorRouteStrategy": null,
                        "executorHandler": "workflowHandler",
                        "executorParam": null,
                        "executorBlockStrategy": null,
                        "executorTimeout": 0,
                        "executorFailRetryCount": 0,
                        "glueType": null,
                        "glueSource": null,
                        "glueRemark": null,
                        "glueUpdatetime": "2023-11-27T08:54:41.000+00:00",
                        "childJobId": null,
                        "triggerStatus": 0,
                        "triggerLastTime": 0,
                        "triggerNextTime": 0,
                        "executorMuti": false
                    }],
                    "total": 14,
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
            };
        },
    }

]