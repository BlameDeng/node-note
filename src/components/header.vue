<template>
    <div class="header">
        <div class="add">
            <x-icon name="note" class="icon"></x-icon>
        </div>
        <div class="login" v-show="loginVisible">
            <div class="user">
                <span>用户名</span>
                <input type="text" name="username">
                <span>密码</span>
                <input type="password" name="password">
                <button>登录</button>
                <button>注册</button>
            </div>
            <div class="github">
                <x-icon name="github" class="icon" title="GitHub登录"></x-icon>
            </div>
        </div>
        <div class="user-info" v-show="!loginVisible">
            <div class="username">
                <x-icon name="person" class="icon"></x-icon>
                <span>饥人谷</span>
            </div>
            <div class="time">
                <span>2018-10-17</span>
                <span>星期五</span>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from './icon.vue'
    export default {
        name: "Header",
        components: { xIcon },
        data() {
            return { loginVisible: false }
        },
        created() {
            setInterval(()=>{
                this.loginVisible=!this.loginVisible;
            },3000)
        },
        methods:{

        }
    }
</script>
<style scoped lang="scss">
    @import '@/assets/base.scss';
    .header {
        width: 100%;
        height: 60px;
        border: 1px solid red;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 100px;
        color: #fff;
        >.add {
            >.icon {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
        }
        >.login {
            height: 100%;
            display: flex;
            justify-content: flex-start;
            align-items: center;
            >.user {
                margin-right: 10px;
                >input {
                    margin: 0 5px;
                    padding-left: .5em;
                    border-radius: 4px;
                    width: 120px;
                    &:focus {
                        outline: none;
                    }
                }
                >button {
                    padding: 2px 6px;
                    background: none;
                    box-shadow: none;
                    border: none;
                    cursor: pointer;
                    color: #fff;
                    &:focus {
                        outline: none;
                    }
                }
            }
            >.github {
                >.icon {
                    width: 25px;
                    height: 25px;
                    cursor: pointer;
                }
            }
        }
        >.user-info {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            user-select: none;
            >.username {
                font-size: 16px;
                display: flex;
                justify-content: center;
                align-items: center;
                cursor: pointer;
                >.icon {
                    width: 15px;
                    height: 15px;
                    margin-right: 5px;
                }
            }
            >.time {
                color: 12px;
                cursor: default;
            }
        }
    }
</style>