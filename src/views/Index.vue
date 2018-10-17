<template>
    <div class="index">
        <n-header></n-header>
        <n-main></n-main>
    </div>
</template>

<script>
    import nHeader from '@/components/header'
    import nMain from '@/components/main'
    export default {
        name: "Index",
        components: { nHeader, nMain },
        data() {
            return {}
        },
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .index {
        width: 100%;
        height: 100%;
    }
</style>