import axios from 'axios'
import { ElMessage, ElLoading } from 'element-plus'
import { getToken } from '@/util/auth'
import useUserStore from '@/store/modules/user'
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

// NProgress 配置
NProgress.configure({
    showSpinner: false
});

let downloadLoadingInstance;
axios.defaults.timeout = 600000
axios.interceptors.request.use(config => {
    //开启 progress bar
    NProgress.start();
    // 是否需要设置 token
    const isToken = (config.headers || {}).isToken === false
    // // 是否需要防止数据重复提交
    // const isRepeatSubmit = (config.headers || {}).repeatSubmit === false
    if (getToken() && !isToken) {
        config.headers['bdaptoken'] = getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
    }
    //为get请求添加时间戳，防止IE下服务端数据缓存
    if (config.method === 'get') {
        config.url = encodeURI(config.url)
        config.params = {
            ...config.params,
            _t: new Date().getTime(),
        }
    }
    //前后端合并部署，后端启用context-path时，前端需要在请求后端的url前缀中拼接后台程序的context-path
    if (CONTEXT_PATH) {
        config.url = `${CONTEXT_PATH}${config.url}`
    }
    return config
}, error => {
    console.log(error)
    Promise.reject(error)
})


axios.interceptors.response.use(res => {
    //关闭 progress bar
    NProgress.done();
    //获取状态码
    const status = res.data.code || res.status;
    const message = res.data.msg || res.data.error_description || '未知错误';
    const notification = document.getElementsByClassName('el-message')
    // 如果请求为非200否者默认统一处理
    if (status !== 200) {
        if (notification.length) return res
        ElMessage({
            dangerouslyUseHTMLString: true,
            message: message.split('\n').join('<br />'),
            type: 'error'
        });
        return Promise.reject(new Error(message))
    }
    return res;
}, error => {
    const status = error.response.status;
    //如果是401则跳转到登录页面
    if (status === 401) {
        useUserStore().logOut()
        ElMessage({
            message: "验证过期，请重新登录",
            type: 'error'
        });
        return Promise.reject(new Error("验证过期，请重新登录"))
    }

    const message = error.response.data.msg || '未知错误';
    ElMessage({
        message: message,
        type: 'error'
    });
    return Promise.reject(new Error(error));
});

// 通用下载方法
export function downloadFile(url, params, filename, config) {
    downloadLoadingInstance = ElLoading.service({ text: "正在下载数据，请稍候", background: "rgba(0, 0, 0, 0.7)", })
    return axios.get(url, {
        params: params,
        dataType: 'json',
        responseType: 'blob',
        ...config
    }).then(async (res) => {

        const content = res.data;
        if (content.status === "failure") {
            ElMessage({
                message: content.message,
                type: 'error'
            });
        } else {
            const blob = new Blob([content]);
            const reader = new FileReader();
            reader.readAsText(blob);
            reader.onload = () => {
                //获取heads中的filename文件名
                let temp = res.headers["content-disposition"]
                    .split(";")[1]
                    .split("filename=")[1];
                // 对文件名乱码转义--【Node.js】使用iconv-lite解决中文乱码
                let iconv = require("iconv-lite");
                iconv.skipDecodeWarning = true; //忽略警告
                let fileName = iconv.decode(temp, "UTF-8");
                if ("download" in document.createElement("a")) {
                    const elink = document.createElement("a");
                    elink.download = fileName;
                    elink.style.display = "none";
                    elink.href = URL.createObjectURL(blob);
                    document.body.appendChild(elink);
                    elink.click();
                    URL.revokeObjectURL(elink.href);
                    document.body.removeChild(elink);
                } else {
                    navigator.msSaveBlob(blob, fileName); // IE10+下载
                }
            };
        }

        downloadLoadingInstance.close();
    }).catch((r) => {
        console.error(r)
        ElMessage.error('下载文件出现错误，请联系管理员！')
        downloadLoadingInstance.close();
    })
}

export default axios