<template>
    <div class="main">
        <template v-if="col">
            <div class="box" v-for="(n,index) in col" :key="index" ref="box">
            </div>
            <div v-for="(n,index) in 20" :key="`item-${index}`" :class="`item-${n}`" ref="item">{{n}}</div>
        </template>
    </div>
</template>

<script>
    export default {
        name: "Main",
        props: {
            width: {
                type: [Number, String],
                default: 200
            }
        },
        data() {
            return { col: 0, gutter: 0, heightArray: null }
        },
        mounted() {

            let { width: mainWidth } = this.$el.getBoundingClientRect();
            this.col = Math.floor(mainWidth / this.width);
            this.gutter = (mainWidth - (+this.width) * this.col) / (this.col - 1);
            this.heightArray = Array(this.col).fill(0);
            this.$nextTick(() => {
                this.$refs.box.forEach(ele => {
                    ele.style.width = this.width + 'px';
                });
                this.$refs.item.forEach(item => {
                    let minH = Math.min.apply(undefined, this.heightArray);
                    console.log(minH);

                    let index = this.heightArray.indexOf(minH);
                    let { height } = item.getBoundingClientRect();
                    item.style.top = minH + 'px';
                    item.style.left = this.gutter * index + (+this.width) * index + 'px';
                    this.$refs.box[index].style.height = (minH + height) + 'px';
                    this.$set(this.heightArray, index, minH + height);
                })

            })
        }
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .main {
        width: 70%;
        outline: 1px solid green;
        margin: 20px auto;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-items: flex-start;
        position: relative;
        >.box {
            flex-shrink: 0;
            height: 50px;
            border: .5px solid black;
        }
        @for $i from 1 through 30 {
            .item-#{$i} {
                width: 200px;
                height: 20px * $i;
                background: rgba(255,0,0,0.2);
                position: absolute;
                text-align: center;
            }
        }
    }
</style>