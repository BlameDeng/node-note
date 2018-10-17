<template>
    <div class="main">
        <x-waterfall :width="200" :source="source" ref="waterfall" @scroll-bottom="xxx">
            <div slot-scope="slotProps" class="info" :class="`age-${slotProps.prop.age}`" draggable="true">
                <div class="name">{{slotProps.prop.name}}</div>
                <div class="age">{{slotProps.prop.age}}</div>
            </div>
        </x-waterfall>
    </div>
</template>

<script>
    import xWaterfall from './waterfall.vue'
    export default {
        name: "Main",
        components: { xWaterfall },
        data() {
            return {
                source: [
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 2 },
                    { name: 'xm', age: 3 },
                    { name: 'xm', age: 4 },
                    { name: 'xm', age: 5 },
                    { name: 'xm', age: 6 }
                ]
            }
        },
        mounted() {},
        methods: {
            xxx() {
                // console.log('爸爸知道了，马上处理');
                // setTimeout(() => {
                //     [
                //         { name: 'xm', age: 16 },
                //         { name: 'xm', age: 11 },
                //         { name: 'xm', age: 12 },
                //         { name: 'xm', age: 13 },
                //         { name: 'xm', age: 14 },
                //         { name: 'xm', age: 15 },
                //         { name: 'xm', age: 16 }
                //     ].forEach(ele => {
                //         this.source.push(ele)
                //     });
                // }, 1000)

            }
        }

    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .main {
        width: 100%;
        color: #fff;
        .info {
            border: .5px solid green;
            margin: 10px 0;
            @for $i from 1 through 20 {
                &.age-#{$i} {
                    height: 40px * $i;
                }
            }
        }
    }
</style>