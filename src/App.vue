<template>
    <div id="app">
        <router-view />
    </div>
</template>

<script>
    import { mapActions } from 'vuex'
    export default {
        name: "App",
        methods: {
            ...mapActions(['check'])
        },
        created() {
            this.check();
        }
    }
</script>

<style lang="scss">
    #app {
        width: 100%;
        height: 100%;
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 14px;
        line-height: 1.8em;
        background-image: url('./assets/banner.jpg');
        background-position: center center;
        background-size: cover;
    }
    html, body {
        width: 100%;
        height: 100%;
    }
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>