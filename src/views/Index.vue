<template>
    <div class="index">
        <n-main></n-main>
    </div>
</template>

<script>
    import nMain from '@/components/main'
    export default {
        name: "Index",
        components: { nMain },
        data() {
            return {}
        },
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .index {width: 100%;height: 100%;}
</style>