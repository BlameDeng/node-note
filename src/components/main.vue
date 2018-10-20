<template>
    <div class="main">
        <x-waterfall :width="200" :source="allNotes" ref="waterfall" v-if="allNotes&&allNotes.length">
            <div slot-scope="slotProps" class="note" draggable="true" :style="{background:colors[random()]}" @dragend="dragEnd">
                <div class="time">
                    {{slotProps.prop.createdAt|time}}
                    <x-icon name="x" class="icon" title="删除" @click="onDelete(slotProps.prop)"></x-icon>
                </div>
                <div class="content">{{slotProps.prop.content}}</div>
            </div>
        </x-waterfall>
    </div>
</template>

<script>
    import xWaterfall from './waterfall.vue'
    import xIcon from './icon.vue'
    import { mapState, mapActions } from 'vuex'
    export default {
        name: "Main",
        components: { xWaterfall, xIcon },
        data() {
            return { colors: ['#ff9900', '#19be6b', '#ed4014', '#5cadff', '#f2eb67', '#dcdee2'] }
        },
        filters: {
            time(val) {
                let temp = new Date(val);
                let hour = temp.getHours();
                let min = temp.getMinutes();
                hour < 10 ? hour = '0' + hour : '';
                min < 10 ? min = '0' + min : '';
                return `${temp.getFullYear()}-${temp.getMonth()+1}-${temp.getDate()} ${hour}:${min}`;
            }
        },
        computed: {
            ...mapState({
                allNotes: state => state.note.allNotes
            })
        },
        mounted() {},
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
            random() {
                return Math.floor(Math.random() * 6);
            },
            onDelete(note) {
                this.destroyNote(note.id);
            },
            dragEnd(e) {
                let el = e.target;
                let { x: ox, y: oy } = el.getBoundingClientRect();
                let { x: nx, y: ny } = e;
                let deltaX = nx - ox;
                let deltaY = ny - oy;
                el.style.transform = `translateX(${deltaX}px) translateY(${deltaY}px)`;
            }
        },
    }
</script>

<style scoped lang="scss">
    @import '@/assets/base.scss';
    .main {
        width: 100%;
        .note {
            margin: 10px 0;
            >.time {
                color: $content;
                font-size: 12px;
                padding: 0 .5em;
                border-bottom: .5px solid rgba(0, 0, 0, 0.2);
                position: relative;
                >.icon {
                    width: 10px;
                    height: 10px;
                    display: none;
                    position: absolute;
                    top: 50%;
                    right: 5px;
                    transform: translateY(-50%);
                }
                &:hover {
                    >.icon {
                        display: inline;
                        cursor: pointer;
                    }
                }
            }
            >.content {
                color: $title;
                padding: 0 .5em;
            }
        }
    }
</style>