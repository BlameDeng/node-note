<template>
    <div class="x-waterfall">
        <template v-if="col&&source&&source.length">
            <div class="box" v-for="(n,index) in col" :key="`box-${index}`" ref="box">
            </div>
            <div class="item" ref="item" v-for="(item,index) in source" :key="`item-${index}`">
                <slot :prop="item"></slot>
            </div>
        </template>
    </div>
</template>
<script>
    export default {
        name: "xWaterfall",
        props: {
            width: {
                type: Number,
                default: 200
            },
            source: { type: Array, required: true }
        },
        data() {
            return { col: 0, gutter: 0, heightArray: null }
        },
        mounted() {
            this.resize();
            window.addEventListener('scroll', this.listenScroll);
            this.$nextTick(() => {
                this.resize();
                window.addEventListener('resize', this.resize);
            })
        },
        methods: {
            listenScroll() {
                let scrollHeight = document.documentElement.scrollHeight;
                let scrollTop = document.documentElement.scrollTop;
                let clientHeight = document.documentElement.clientHeight;
                if (scrollHeight - scrollTop < clientHeight + 10) {
                    this.$emit('scroll-bottom');
                    window.removeEventListener('scroll', this.listenScroll);
                }
            },
            resize() {
                this.$el.style.width = 'auto';
                let { width: mainWidth } = this.$el.getBoundingClientRect();
                this.$el.style.width = mainWidth + 'px';
                this.col = Math.floor(mainWidth / this.width); //计算分多少列
                this.gutter = (mainWidth - this.width * this.col) / (this.col - 1); //空隙
                this.heightArray = Array(this.col).fill(0);
                this.$nextTick(() => {
                    this.$refs.box.forEach(ele => {
                        ele.style.width = this.width + 'px'; //设置每一列的宽度
                    });
                    this.$refs.item.forEach(item => {
                        item.style.width = this.width + 'px';
                        let minH = Math.min.apply(undefined, this.heightArray);
                        let index = this.heightArray.indexOf(minH);
                        let { height } = item.getBoundingClientRect();
                        item.style.top = minH + 'px';
                        item.style.left = this.gutter * index + this.width * index + 'px';
                        this.$refs.box[index].style.height = (minH + height) + 'px';
                        this.$set(this.heightArray, index, minH + height);
                    })
                })
            }
        },
        watch: {
            source: {
                handler: function(val) {
                    this.resize();
                    window.removeEventListener('scroll', this.listenScroll);
                    window.addEventListener('scroll', this.listenScroll);
                },
                deep: true
            }
        },
        beforeDestroy() {
            window.removeEventListener('scroll', this.listenScroll);
            window.removeEventListener('resize', this.resize);
        }
    }
</script>
<style scoped lang="scss">
    .x-waterfall {
        width: 100%;
        margin: 0 auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        >.box {
            flex-shrink: 0;
        }
        >.item {
            width: 200px;
            position: absolute;
        }
    }
</style>