
import { setStore, getStore } from '@/util/store'
import { setToken, removeToken } from '../../util/auth';
import { getSm2DataHexByString } from "@/util/sm2";
import { diff } from '@/util/index'
import { loginByUsername, getDicData } from '@/api/login'

const useUserStore = defineStore(
    'user',
    {
        state: () => ({
            tagList: getStore({ name: 'tagList' }) || [],
            tag: getStore({ name: 'tag' }) || '',
            token: getStore({ name: 'token' }) || '',
            permission: getStore({ name: 'permission' }) || {},
            userInfo: getStore({ name: 'userInfo' }) || [],
            menuList: getStore({ name: 'menuList' }) || [],
            curNav: getStore({ name: 'curNav' }) || [],
            navList: getStore({ name: 'navList' }) || [],
            executorHandlerList: [
                { name: "demoJobHandler", label: "示例任务" },
                { name: "spJobHandler", label: "存储过程" },
                { name: "shellJobHandler", label: "Shell脚本" },
                { name: "httpJobHandler", label: "http任务" },
                { name: "sqlJobHandler", label: "SQL任务" },
                { name: "dvJobHandler", label: "数据校验" },
                { name: "dvStatusJobHandler", label: "校验状态" },
                { name: "fnJobHandler", label: "函数任务" },
                { name: "dataReportHandler", label: "数据报送" },
                { name: "ossJobHandler", label: "oss文件传输" },
                { name: "idxJobHandler", label: "指标脚本" },
            ],
            dicData: getStore({ name: 'dicData' }) || [],
        }),
        actions: {
            // 登录
            login(userInfo) {
                let password = getSm2DataHexByString(userInfo.password)
                let params = {
                    username: userInfo.username,
                    password: password
                }
                return new Promise((resolve, reject) => {
                    loginByUsername(params).then(res => {
                        const data = res.data;
                        setToken(data.token)
                        this.userInfo = { username: data.user_name, account: data.account, userId: data.user_id }
                        setStore({ name: 'userInfo', content: this.userInfo })
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            // 退出系统
            logOut() {
                this.tagList = []
                setStore({ name: 'tagList', content: this.tagList })
                this.tag = ''
                setStore({ name: 'tag', content: this.tag })
                this.menuList = []
                setStore({ name: 'menuList', content: this.menuList })
                this.token = ''
                removeToken()
                location.href = "./login.html";
            },
            addTag(action) {
                this.tag = action;
                setStore({ name: 'tag', content: this.tag })
                const index = this.tagList.length > 0 ? this.tagList.findIndex(ele => ele.path === action.path && ele.name === action.name) : -1
                //存在就更新数据，不存在直接插入
                if (index > -1) {
                    this.tagList[index] = action
                } else {
                    this.tagList.push(action)
                }
                setStore({ name: 'tagList', content: this.tagList })
            },
            delTag(action) {
                let index = this.tagList.findIndex(tag => tag.path === action.path)
                this.tag = this.tagList[index - 1];
                setStore({ name: 'tag', content: this.tagList[index - 1] })
                this.tagList = this.tagList.filter(item => {
                    return !diff(item, action);
                })
                setStore({ name: 'tagList', content: this.tagList })
            },
            delAllTag() {
                this.tag = this.tagList[0];
                setStore({ name: 'tag', content: this.tag })
                this.tagList = [this.tag];
                setStore({ name: 'tagList', content: this.tagList })
            },
            delTagOther(tagValue) {
                const fistPage = this.tagList[0]
                this.tagList = this.tagList.filter(item => item.path === fistPage.path || tagValue === item.path)
                setStore({ name: 'tagList', content: this.tagList })
            },
            setTag(tag) {
                this.tag = tag;
                setStore({ name: 'tag', content: this.tag })
            },
            setTagList(tagList) {
                this.tagList = tagList;
                setStore({ name: 'tagList', content: this.tagList })
            },
            //获取子系统所有菜单
            setMenuList(menuList) {
                this.menuList = menuList
                setStore({ name: 'menuList', content: this.menuList })
            },
            //设置子系统
            setNav(nav) {
                this.curNav = nav;
                setStore({ name: 'curNav', content: this.curNav })
            },
            //获取菜单数据
            setNavList(navList) {
                this.navList = navList
                setStore({ name: 'navList', content: this.navList })
            },
            //获取按钮权限
            setButtons(permissionList) {
                let result = [];
                permissionList.forEach(item => {
                    if (item.code) {
                        result.push(item.code)
                    }
                })
                this.permission = {};
                result.forEach(ele => {
                    this.permission[ele] = true;
                });
                setStore({ name: 'permission', content: this.permission })
            },
            //获取字典表数据
            getDicData() {
                return new Promise((resolve, reject) => {
                    getDicData().then(res => {
                        this.dicData = res.data.data
                        setStore({ name: 'dicData', content: this.dicData })
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            }
        }
    })

export default useUserStore
