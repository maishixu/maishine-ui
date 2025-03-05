import { describe, expect, test } from 'vitest';
import { nextTick } from 'vue';
import { createMessage } from './method';

export const rAF = async () => {
  return new Promise((res) => {
    requestAnimationFrame(() => {
      requestAnimationFrame(async () => {
        res(null);
        await nextTick();
      });
    });
  });
};
const getTopOffset = (element: Element) => {
  const styles = window.getComputedStyle(element);
  const topValue = styles.getPropertyValue('top');
  return Number.parseFloat(topValue);
};
describe('createMessage', () => {
  test('调用方法创建 Message 组件', async () => {
    const instance = createMessage({ message: 'hello message 1', duration: 0 });
    await rAF();
    expect(document.querySelector('.mx-message')).toBeTruthy();
    instance.close();
    await rAF();
    expect(document.querySelector('.mx-message')).toBeFalsy();
  });
  test('创建多个 Message 实例', async () => {
    const instance1 = createMessage({ message: 'hello message 1', duration: 0 });
    const instance2 = createMessage({ message: 'hello message 2', duration: 0 });
    await rAF();
    const instances = document.querySelectorAll('.mx-message');
    expect(instances.length).toBe(2);
    instance1.close();
    await rAF();
    instance2.close();
    await rAF();
    expect(document.querySelector('.mx-message')).toBeFalsy();
  });
  test('设置正确的 offset', async () => {
    createMessage({ message: 'hello message 1', duration: 0, offset: 100 });
    createMessage({ message: 'hello message 2', duration: 0, offset: 50 });
    await rAF();
    const instances = document.querySelectorAll('.mx-message');
    expect(getTopOffset(instances[0])).toBe(100);
    expect(getTopOffset(instances[1])).toBe(150);
  });
});
