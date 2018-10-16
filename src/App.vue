<template>
    <div id="app">
        <form action="/api" method="post" @submit.prevent>
            <input type="text" name="username">
            <button type="submit">111</button>
        </form>
        <router-view />
    </div>
</template>

<script>
    export default {
        name: "App"
    };
</script>

<style lang="scss">
    #app {
        font-family: "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB", "Microsoft YaHei", "微软雅黑", Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        font-size: 14px;
        line-height: 1.8em;
    }
    *,
    *::before,
    *::after {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }
</style>