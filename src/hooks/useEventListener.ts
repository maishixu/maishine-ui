import { isRef, onMounted, onUnmounted, unref, watch, type Ref } from 'vue';

export default function useEventListener(
  target: Ref<EventTarget | null> | EventTarget,
  event: string,
  handler: (e: Event) => void
) {
  if (isRef(target)) {
    watch(target, (newValue, oldValue) => {
      oldValue?.removeEventListener(event, handler);
      newValue?.addEventListener(event, handler);
    });
  } else {
    onMounted(() => {
      target.addEventListener(event, handler);
    });
  }
  onUnmounted(() => {
    unref(target)?.removeEventListener(event, handler);
  });
}
