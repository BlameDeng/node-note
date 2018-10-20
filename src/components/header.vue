<template>
    <div class="header" :class="{['is-login']:isLogin}">
        <div class="add" v-show="isLogin">
            <x-icon name="note" class="icon" @click="onCreateNote"></x-icon>
            <transition name="fade">
                <div class="note" v-show="createVisible">
                    <input type="text" v-model.trim="content">
                    <div>
                        <button @click="onCancle">取消</button>
                        <button @click="createNoteSave">添加</button>
                    </div>
                </div>
            </transition>
        </div>
        <div class="login" v-show="!isLogin">
            <div class="user">
                <span>用户名</span>
                <input type="text" name="username" v-model.trim="username">
                <span>密码</span>
                <input type="password" name="password" v-model.trim="password" @keyup.enter="onLogin">
                <button @click="onLogin">登录</button>
                <button @click="onRegister">注册</button>
                <transition name="fade">
                    <div class="register-layer" v-show="registerVisible">
                        <div class="register">
                            <div>
                                <span>用户名</span>
                                <input type="text" name="username" v-model.trim="formData.username">
                            </div>
                            <div>
                                <span>密码</span>
                                <input type="password" name="password" v-model.trim="formData.password">
                            </div>
                            <div>
                                <button @click="onCancle">取消</button>
                                <button @click="onSaveRegister">注册</button>
                            </div>
                        </div>
                    </div>
                </transition>
            </div>
        </div>
        <div class="user-info" v-show="isLogin">
            <div class="username">
                <div class="name">
                    <x-icon name="person" class="icon"></x-icon>
                    <span>{{user&&user.username}}</span>
                </div>
                <div class="action">
                    <span @click="onChange">[修改密码]</span>
                    <span @click="onLogout">[注销登录]</span>
                    <transition name="fade">
                        <div class="change-layer" v-show="changeVisible" v-if="user">
                            <div class="change-password">
                                <div>
                                    <span>用户名</span>
                                    <input type="text" name="username" v-model.trim="user.username" readonly>
                                </div>
                                <div>
                                    <span>新密码</span>
                                    <input type="password" name="password" v-model.trim="newPassword">
                                </div>
                                <div> <span>确认密码</span>
                                    <input type="password" name="password" v-model.trim="confirmPassword">
                                </div>
                                <div>
                                    <button @click="onCancle">取消</button>
                                    <button @click="onSaveChange">确定</button>
                                </div>
                            </div>
                        </div>
                    </transition>
                </div>
            </div>
            <div class="time">
                <span>{{formatDate().date}} {{formatDate().day}}</span>
                <span>{{city}} 多云</span>
            </div>
        </div>
    </div>
</template>
<script>
    import xIcon from './icon.vue'
    import { mapState, mapActions } from 'vuex'
    import jsonp from '@/helpers/jsonp.js'
    export default {
        name: 'Header',
        components: { xIcon },
        data() {
            return {
                username: '',
                password: '',
                city: '',
                changeVisible: false,
                newPassword: '',
                confirmPassword: '',
                registerVisible: false,
                formData: { username: '', password: '' },
                content: '',
                createVisible: false
            };
        },
        computed: {
            ...mapState({
                user: state => state.auth.user,
                isLogin: state => state.auth.isLogin
            })
        },
        created() {
            jsonp('https://api.map.baidu.com/location/ip', {
                ak: '3oZjGfC42rDxKbv7tH3zXEXOvozafX20',
                coor: 'bd09ll'
            }).then(res => {
                this.city = res.content.address_detail.city;
            });
        },
        mounted() {
            this.isLogin ? this.findAllNotes() : '';
        },
        methods: {
            ...mapActions([
                'createNote',
                'findAllNotes',
                'patchNote',
                'destroyNote',
                'login',
                'register',
                'logout',
                'changePassword'
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
                this.createVisible = true;

            },
            createNoteSave() {
                if (!this.content) { return }
                this.createNote({ content: this.content }).then(res => {
                    this.createVisible = false;
                    this.content = '';
                })
            },
            validate(username, password) {
                let pattern1 = /^[\w\u4e00-\u9fa5]{1,15}$/;
                let pattern2 = /^.{6,15}$/;
                return pattern1.test(username) && pattern2.test(password);
            },
            onLogin() {
                if (!this.username || !this.password) {
                    return;
                }
                let result = this.validate(this.username, this.password);
                if (!result) {
                    this.$message({
                        type: 'warning',
                        message: '格式不正确！用户名为1到15个字符，密码为6到15个字符',
                        duration: 2000
                    });
                    return;
                }
                this.login({ username: this.username, password: this.password }).catch(
                    err => {
                        this.$message({ type: 'error', message: err.msg, duration: 2000 });
                    }
                );
            },
            onRegister() {
                this.registerVisible = true;
                this.formData.username = '';
                this.formData.password = '';
            },
            onSaveRegister() {
                if (!this.formData.username || !this.formData.password) {
                    return;
                }
                let result = this.validate(
                    this.formData.username,
                    this.formData.password
                );
                if (!result) {
                    this.$message({
                        type: 'warning',
                        message: '格式不正确！用户名为1到15个字符，密码为6到15个字符',
                        duration: 2000
                    });
                    return;
                }
                this.register({
                        username: this.formData.username,
                        password: this.formData.password
                    })
                    .then(res => {
                        this.$message({ type: 'success', message: res.msg, duration: 2000 });
                        this.registerVisible = false;
                    })
                    .catch(err => {
                        this.$message({ type: 'error', message: err.msg, duration: 2000 });
                    });
            },
            onLogout() {
                this.logout();
                this.password = '';
            },
            onChange() {
                this.changeVisible = true;
                this.newPassword = '';
                this.confirmPassword = '';
            },
            onCancle() {
                this.changeVisible = false;
                this.registerVisible = false;
                this.createVisible = false;
            },
            onSaveChange() {
                if (!this.newPassword || !this.confirmPassword) {
                    this.$message({
                        type: 'warning',
                        message: '密码不能为空',
                        duration: 2000
                    });
                    return;
                }
                if (this.newPassword !== this.confirmPassword) {
                    this.$message({
                        type: 'warning',
                        message: '两次输入密码不一致',
                        duration: 2000
                    });
                    return;
                }
                if (!/^.{6,15}$/.test(this.newPassword)) {
                    this.$message({
                        type: 'warning',
                        message: '格式不正确！密码为6到15个字符',
                        duration: 2000
                    });
                    return;
                }
                this.changePassword({
                        username: this.user.username,
                        password: this.newPassword
                    })
                    .then(res => {
                        this.$message({ type: 'success', message: res.msg, duration: 2000 });
                        this.changeVisible = false;
                    })
                    .catch(err => {
                        this.$message({ type: 'error', message: err.msg, duration: 2000 });
                    });
            }
        }
    };
</script>
<style scoped lang="scss">
    @import '@/assets/base.scss';
    @mixin form {
        width: 400px;
        height: 200px;
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translateX(-50%) translateY(-50%);
        background: $bg;
        border-radius: 4px;
        color: $content;
        display: flex;
        flex-direction: column;
        justify-content: space-evenly;
        align-items: center;
        >div {
            >span {
                display: inline-flex;
                justify-content: flex-end;
                width: 80px;
                margin-right: 10px;
            }
            >input {
                width: 200px;
                padding-left: 0.5em;
            }
            >button {
                padding: 4px 15px;
                background: none;
                box-shadow: none;
                border: 0.5px solid $border;
                margin: 0 10px;
                cursor: pointer;
                border-radius: 4px;
                &:focus {
                    border: 0.5px solid $p;
                    outline: none;
                    box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
                }
            }
        }
    }
    @mixin user-flex {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .header {
        width: 100%;
        height: 60px;
        display: flex;
        justify-content: flex-end;
        align-items: center;
        padding: 0 40px;
        color: #fff;
        &.is-login {
            justify-content: space-between;
        }
        >.add {
            >.icon {
                width: 30px;
                height: 30px;
                cursor: pointer;
            }
            >.note {
                background: #fff;
                position: fixed;
                top: 40%;
                left: 50%;
                transform: translateX(-50%) translateY(-50%);
                width: 250px;
                border-radius: 4px;
                @include user-flex;
                flex-direction: column;
                padding: 10px;
                z-index: 10;
                >input {
                    margin: 5px;
                    padding: .5em;
                    border-radius: 4px;
                    box-shadow: none;
                    border: .5px solid $border;
                    width: 100%;
                    &:focus {
                        outline: none;
                    }
                }
                >div {
                    align-self: flex-end;
                    margin-top: 10px;
                    >button {
                        padding: 2px 8px;
                        font-size: 12px;
                        background: none;
                        box-shadow: none;
                        border: 0.5px solid $border;
                        cursor: pointer;
                        border-radius: 4px;
                        &:focus {
                            border: 0.5px solid $p;
                            outline: none;
                            box-shadow: 0 0 6px rgba(0, 0, 0, .2);
                        }
                    }
                }
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
                >.register-layer {
                    position: fixed;
                    top: 0;
                    left: 0;
                    width: 100%;
                    height: 100%;
                    background: rgba(0, 0, 0, .5);
                    z-index: 10;
                    >.register {
                        @include form;
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
            @include user-flex;
            user-select: none;
            >.username {
                font-size: 14px;
                cursor: pointer;
                text-align: center;
                line-height: 1.4em;
                @include user-flex;
                >.name {
                    @include user-flex;
                    font-size: 18px;
                    margin-right: 13px;
                    >.icon {
                        width: 15px;
                        height: 15px;
                        margin-right: 5px;
                    }
                }
                >.action {
                    >.change-layer {
                        position: fixed;
                        top: 0;
                        left: 0;
                        width: 100%;
                        height: 100%;
                        background: rgba(0, 0, 0, 0.5);
                        z-index: 10;
                        >.change-password {
                            @include form;
                        }
                    }
                    >span {
                        font-size: 12px;
                        color: $sub;
                        @include user-flex;
                    }
                }
            }
            >.time {
                display: flex;
                flex-direction: column;
                justify-content: center;
                align-items: center;
                margin-left: 20px;
                font-size: 12px;
                color: $sub;
                cursor: default;
                line-height: 1.4em;
            }
        }
    }
    .fade-enter-active,
    .fade-leave-active {
        transition: opacity 0.3s linear;
    }
    .fade-enter,
    .fade-leave-to {
        opacity: 0;
    }
</style>