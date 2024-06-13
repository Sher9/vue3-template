//连接桩配置
export const ports = {
    groups: {
        // 输入链接桩群组定义
        top: {
            position: 'top',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#2D8CF0',
                    strokeWidth: 1,
                    fill: '#fff',
                },
            },
        },
        // 输出链接桩群组定义
        bottom: {
            position: 'bottom',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#2D8CF0',
                    strokeWidth: 1,
                    fill: '#fff',
                },
            },
        },
        left: {
            position: 'left',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#2D8CF0',
                    strokeWidth: 1,
                    fill: '#fff',
                },
            },
        },
        right: {
            position: 'right',
            attrs: {
                circle: {
                    r: 4,
                    magnet: true,
                    stroke: '#2D8CF0',
                    strokeWidth: 1,
                    fill: '#fff',
                },
            },
        },
    },
    items: [
        {
            id: 'port1',
            group: 'top',
        },
        {
            id: 'port2',
            group: 'bottom',
        },
        {
            id: 'port3',
            group: 'left',
        },
        {
            id: 'port4',
            group: 'right',
        }
    ],
}
//节点配置
export const nodeAttr = {
    size: {
        width: 150,
        height: 80
    },
    view: "vue-shape-view",
    shape: "vue-shape",
    type: "taskNode",
    component: "task-node-component",
    ports: {
        groups: {
            top: {
                position: "top",
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#2D8CF0",
                        strokeWidth: 1,
                        fill: "#fff"
                    }
                }
            },
            bottom: {
                position: "bottom",
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#2D8CF0",
                        strokeWidth: 1,
                        fill: "#fff"
                    }
                }
            },
            left: {
                position: "left",
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#2D8CF0",
                        strokeWidth: 1,
                        fill: "#fff"
                    }
                }
            },
            right: {
                position: "right",
                attrs: {
                    circle: {
                        r: 4,
                        magnet: true,
                        stroke: "#2D8CF0",
                        strokeWidth: 1,
                        fill: "#fff"
                    }
                }
            }
        },
        items: [
            {
                id: "port1",
                group: "top"
            },
            {
                id: "port2",
                group: "bottom"
            },
            {
                id: "port3",
                group: "left"
            },
            {
                id: "port4",
                group: "right"
            }
        ]
    },
    zIndex: 1
}
//实线配置
export const edgeAttr = {
    shape: "edge",
    attrs: {
        line: {
            stroke: "#1890ff",
            strokeWidth: 1,
            targetMarker: {
                name: "classic",
                size: 8
            },
            strokeDasharray: 0,
            style: {
                animation: "ant-line 30s infinite linear"
            }
        }
    },
    connector: "normal",
    router: {
        name: "manhattan"
    },
    zIndex: 0,
    labels: [
    ],
}

//虚线配置
export const dottedEdgeAttr = {
    shape: "edge",
    attrs: {
        line: {
            stroke: "#1890ff",
            strokeWidth: 1,
            targetMarker: {
                name: "classic",
                size: 8
            },
            strokeDasharray: 5,
            style: {
                animation: "ant-line 30s infinite linear"
            }
        },
    },
    connector: "normal",
    router: {
        name: "manhattan"
    },
    zIndex: 0,
    labels: [
        {
            attrs: { label: { text: '弱依赖' } },
        },
    ],
}