import Message from './message.vue'

export default {
    install(Vue, options) {
        Vue.prototype.$message = function(options = {
            type: 'success',
            message: '',
            duration: 2000
        }, closable = false) {
            const Constructor = Vue.extend(Message);
            const div = document.createElement('div');
            document.body.appendChild(div);
            const vm = new Constructor({
                propsData: {
                    options,
                    closable
                }
            }).$mount(div);
            vm.visible = true;
        }
    }
}