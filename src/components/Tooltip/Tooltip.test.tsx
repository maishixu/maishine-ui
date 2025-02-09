import { mount } from '@vue/test-utils';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Tooltip from './Tooltip.vue';

const onVisibleChange = vi.fn();
vi.mock('@popperjs/core');

describe('Tooltip.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });
  test('basic tooltip', async () => {
    const wrapper = mount(
      () => (
        <div>
          <div id="outside">
            <Tooltip content="hello tooltip" trigger="click" onVisible-change={onVisibleChange}>
              <button id="trigger">Trigger</button>
            </Tooltip>
          </div>
        </div>
      ),
      {
        attachTo: document.body
      }
    );
    // 静态测试
    const triggerBtn = wrapper.find('#trigger');
    expect(triggerBtn.exists).toBeTruthy();
    expect(wrapper.find('.mx-tooltip__popper').exists()).toBeFalsy();
    // 测试第一次点击
    triggerBtn.trigger('click');
    await vi.runAllTimers(); // 等待所有计时器
    expect(wrapper.find('.mx-tooltip__popper').exists()).toBeTruthy();
    expect(wrapper.get('.mx-tooltip__popper').text()).toBe('hello tooltip');
    expect(onVisibleChange).toHaveBeenCalledWith(true);
    // 测试第二次点击（外部）
    wrapper.get('#outside').trigger('click');
    await vi.runAllTimers();
    expect(wrapper.find('.mx-tooltip__popper').exists()).toBeFalsy();
    expect(onVisibleChange).toHaveBeenCalledWith(false);
  });
});
