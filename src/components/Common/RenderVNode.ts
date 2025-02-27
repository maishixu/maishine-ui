import { defineComponent } from 'vue';

export default defineComponent({
  props: {
    vNode: {
      type: [String, Object],
      required: true
    }
  },
  setup(props) {
    // 返回（执行）渲染函数
    // 渲染函数：返回虚拟 DOM(VNode) 的函数
    return () => props.vNode;
  }
});
