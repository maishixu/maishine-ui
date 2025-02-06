import { describe, expect, test } from 'vitest';
import Button from './Button.vue';
import { mount } from '@vue/test-utils';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Icon from '../Icon/Icon.vue';
describe('Button.vue', () => {
  test('basic button', () => {
    const wrapper = mount(Button, {
      props: {
        type: 'primary'
      },
      slots: {
        default: 'basic button vitest'
      }
    });
    // 1.测试是否有对应的类名
    expect(wrapper.classes()).toContain('mx-button--primary');
    // 2.测试插槽内容是否正确
    expect(wrapper.get('button').text()).toBe('basic button vitest');
    // 3.测试事件是否触发
    wrapper.get('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('click');
  });
  test('disabled button', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true
      },
      slots: {
        default: 'disabled button vitest'
      }
    });
    // 1.测试 DOM 节点上属性是否存在
    expect(wrapper.attributes('disabled')).toBeDefined();
    // 2.测试事件是否触发
    wrapper.get('button').trigger('click');
    expect(wrapper.emitted()).not.toHaveProperty('click');
  });
  test('icon', () => {
    const wrapper = mount(Button, {
      props: {
        icon: 'arrow-up'
      },
      slots: {
        default: 'button with icon'
      },
      global: {
        // 模拟第三方组件
        stubs: ['FontAwesomeIcon']
      }
    });
    // 1.测试图标组件是否存在
    const iconElement = wrapper.findComponent(FontAwesomeIcon);
    expect(iconElement.exists()).toBeTruthy();
    // 2.测试图标是否正确
    expect(iconElement.attributes('icon')).toBe('arrow-up');
  });
  test('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true
      },
      slots: {
        default: 'loading button'
      },
      global: {
        stubs: ['Icon']
      }
    });
    // 1.测试图标组件是否存在
    const iconElement = wrapper.findComponent(Icon);
    expect(iconElement.exists).toBeTruthy();
    // 2.测试图标是否正确
    expect(iconElement.attributes('icon')).toBe('spinner');
    // 3.测试按钮是否可用
    expect(wrapper.attributes('disabled')).toBeDefined();
  });
});
