import { onMounted, onUnmounted, type Ref } from 'vue';
const useClickOutside = (
  elementRef: Ref<HTMLElement | undefined>,
  callback: (e: MouseEvent) => void
) => {
  const handler = (e: MouseEvent) => {
    if (elementRef.value && e.target) {
      // 当点击的区域不在 DOM 元素内，执行回调
      if (!elementRef.value.contains(e.target as HTMLElement)) {
        callback(e);
      }
    }
  };
  onMounted(() => {
    document.addEventListener('click', handler);
  });
  onUnmounted(() => {
    document.removeEventListener('click', handler);
  });
};
export default useClickOutside;
