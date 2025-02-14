import { ref } from 'vue';

const zIndex = ref(0);

const useZIndex = (initialValue = 2000) => {
  const initialZIndex = ref(initialValue);
  const currentZIndex = ref(0);
  const nextZIndex = () => {
    zIndex.value++;
    currentZIndex.value = zIndex.value + initialZIndex.value;
    return currentZIndex.value;
  };
  return {
    initialValue,
    currentZIndex,
    nextZIndex
  };
};
export default useZIndex;
