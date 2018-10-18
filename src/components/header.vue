<template>
    <div class="header">
        <div class="add">
            <x-icon name="note" class="icon" @click="onCreateNote"></x-icon>
        </div>
        <div class="login" v-show="loginVisible">
            <div class="user">
                <span>用户名</span>
                <input type="text" name="username" v-model.trim="username">
                <span>密码</span>
                <input type="password" name="password" v-model.trim="password">
                <button @click="onLogin">登录</button>
                <button @click="onRegister">注册</button>
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
                <span>{{formatDate().date}}</span>
                <span>{{formatDate().day}}</span>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from './icon.vue';
    import { mapActions } from 'vuex';
    export default {
        name: 'Header',
        components: { xIcon },
        data() {
            return { loginVisible: true, username: '', password: '' };
        },
        created() {
            // this.findAllNotes();
            // this.destroyNote(18);
            // this.patchNote({ content: 'patch', id: 4 }).then(res => {
            //   this.findAllNotes();
            // });
        },
        methods: {
            ...mapActions([
                'createNote',
                'findAllNotes',
                'patchNote',
                'destroyNote',
                'login',
                'register'
            ]),
            formatDate() {
                let now = new Date();
                let day = now.getDay();
                let array = ['日', '一', '二', '三', '四', '五', '六'];
                return {
                    date: `${now.getFullYear()}-${now.getMonth() + 1}-${now.getDate()}`,
                    day: `星期${array[day]}`
                };
            },
            onCreateNote() {
                this.createNote({ content: 'hello world' });
            },
            onLogin() {
                if (!this.username || !this.password) {
                    return
                }
                this.login({ username: this.username, password: this.password }).then(
                    res => {
                        res.token ? localStorage.setItem('token', res.token) : '';
                    }
                );
            },
            onRegister() {
                if (!this.username || !this.password) {
                    return
                }
                this.register({ username: this.username, password: this.password });
            }
        }
    };
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
                    padding-left: 0.5em;
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