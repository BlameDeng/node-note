<template>
    <transition name="slide">
        <div class="x-message" :class="{[`${options.type}`]:true}" v-show="visible">
            <x-icon :name="options.type" class="x-icon"></x-icon>
            {{options.message}}
            <x-icon name="close" class="x-icon close" v-if="closable" @click="closeMessage"></x-icon>
        </div>
    </transition>
</template>
<script>
    import xIcon from './icon.vue'
    export default {
        name: "xMessage",
        components: { xIcon },
        props: {
            options: {
                type: Object,
                default: () => {
                    return {
                        type: 'success',
                        message: '',
                        duration: 2000
                    }
                }
            },
            closable: false
        },
        data() { return { visible: false } },
        methods: {
            closeMessage() {
                this.close();
            },
            autoClose() {
                if (this.closable) {
                    setTimeout(() => {
                        this.close();
                    }, 10000);
                } else {
                    setTimeout(() => {
                        this.close();
                    }, this.options.duration);
                }
            },
            close() {
                this.visible = false;
                this.$el.addEventListener('transitionend', this.destroyEle);
            },
            destroyEle() {
                this.$el.removeEventListener('transitionend', this.destroyEle);
                this.$destroy();
            }
        },
        mounted() {
            this.autoClose();
        },
        beforeDestroy() {
            this.$el.remove();
        }
    }
</script>
<style scoped lang="scss">
    $p:#2d8cf0;
    $lp:#5cadff;
    $dp:#2b85e4;
    $info:#2db7f5;
    $success:#19be6b;
    $warning:#ff9900;
    $error:#ed4014;
    $title:#17233d;
    $content:#515a6e;
    $sub:#808695;
    $disabled:#c5c8ce;
    $border:#dcdee2;
    $divider:#e8eaec;
    $bg:#f8f8f9;
    .x-message {
        position: fixed;
        z-index: 10;
        top: 50px;
        left: 50%;
        transform: translateX(-50%);
        display: flex;
        justify-content: flex-start;
        align-items: center;
        font-size: 16px;
        background: #fff;
        padding: .5em 1.2em;
        border-radius: 4px;
        box-shadow: 1px 0 4px rgba(0, 0, 0, 0.2);
        >.x-icon {
            margin-right: .4em;
            &.close {
                cursor: pointer;
                margin-left: 3em;
                margin-right: -.8em;
                color: $sub;
                &:hover {
                    color: $content;
                }
            }
        }
        &.success {
            color: $success;
        }
        &.error {
            color: $error;
        }
        &.info {
            color: $info;
        }
        &.warning {
            color: $warning;
        }
    }
    @keyframes slide-down {
        from {
            transform: translateY(-100%) translateX(-50%);
            opacity: 0;
        }
        to {
            transform: translateY(0) translateX(-50%);
            opacity: 1;
        }
    }
    .slide-enter-active,
    .slide-leave-active {
        transition: transform .3s ease-in-out, opacity .3s ease-in-out;
    }
    .slide-enter-to,
    .slide-leave {
        transform: translateY(0) translateX(-50%);
        opacity: 1;
    }
    .slide-enter,
    .slide-leave-to {
        transform: translateY(-100%) translateX(-50%);
        opacity: 0;
    }
</style>