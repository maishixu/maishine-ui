import { mount } from '@vue/test-utils';
import { describe, expect, it } from 'vitest';
import Input from './Input.vue';

describe('Input', () => {
  it('基本展示', () => {
    const wrapper = mount(Input, {
      props: { size: 'small', type: 'text', modelValue: '' },
      slots: { prepend: 'prepend content', prefix: 'prefix content' }
    });
    // 类名
    expect(wrapper.classes()).toContain('mx-input--small');
    expect(wrapper.classes()).toContain('is-prepend');
    // 输入框
    expect(wrapper.find('input').exists()).toBeTruthy();
    expect(wrapper.get('input').attributes('type')).toBe('text');
    // 插槽
    expect(wrapper.find('.mx-input__prepend').exists()).toBeTruthy();
    expect(wrapper.get('.mx-input__prepend').text()).toBe('prepend content');
    // textarea 文本域
    const wrapper2 = mount(Input, {
      props: { type: 'textarea', modelValue: '' }
    });
    expect(wrapper2.find('textarea').exists()).toBeTruthy();
  });
  it('支持 v-model', async () => {
    const wrapper = mount(Input, {
      props: {
        modelValue: 'test modelValue',
        'onUpdate:modelValue': (e: any) => wrapper.setProps({ modelValue: e })
      }
    });
    // 初始值
    const input = wrapper.get('input');
    expect(input.element.value).toBe('test modelValue');
    // 更新值
    await input.setValue('update modelValue'); /* setValue 会同时触发 input 和 change */
    expect(input.element.value).toBe('update modelValue');
    expect(wrapper.props('modelValue')).toBe('update modelValue');
    // 更新值后正确触发相应事件
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()).toHaveProperty('change');
    const inputEvent = wrapper.emitted('input');
    const changeEvent = wrapper.emitted('change');
    expect(inputEvent![0]).toEqual(['update modelValue']);
    expect(changeEvent![0]).toEqual(['update modelValue']);
    // modelValue 异步更新
    await wrapper.setProps({ modelValue: 'async modelValue' });
    expect(input.element.value).toBe('async modelValue');
  });
  it('支持一键清空', async () => {
    const wrapper = mount(Input, {
      props: { clearable: true, modelValue: 'clearable', type: 'text' },
      global: {
        stubs: ['Icon']
      }
    });
    // 失去焦点隐藏图标
    expect(wrapper.find('.mx-input__clear').exists()).toBeFalsy();
    // 获取焦点显示图标
    const input = wrapper.get('input');
    await input.trigger('click');
    expect(wrapper.find('.mx-input__clear').exists()).toBeTruthy();
    // 点击图标一键清空
    await wrapper.get('.mx-input__clear').trigger('click');
    expect(wrapper.find('.mx-input__clear').exists()).toBeFalsy();
    expect(input.element.value).toBe('');

    expect(wrapper.emitted()).toHaveProperty('clear');
    expect(wrapper.emitted()).toHaveProperty('input');
    expect(wrapper.emitted()).toHaveProperty('change');
    expect(wrapper.emitted('input')![0]).toEqual(['']);
    expect(wrapper.emitted('change')![0]).toEqual(['']);

    await input.trigger('blur');
    expect(wrapper.emitted()).toHaveProperty('blur');
  });
  it('显示隐藏密码', async () => {
    const wrapper = mount(Input, {
      props: {
        type: 'text',
        showPassword: true,
        modelValue: ''
      },
      global: {
        stubs: ['Icon']
      }
    });
    // 起初 input 值为空，不出现图标且模式为隐藏
    expect(wrapper.find('.mx-input__password').exists()).toBeFalsy();
    const input = wrapper.get('input');
    expect(input.element.type).toBe('password');
    // 输入 input，出现正确图标
    await input.setValue('test');
    expect(wrapper.find('.mx-input__password').exists()).toBeTruthy();
    expect(wrapper.get('.mx-input__password').attributes('icon')).toBe('eye-slash');
    // 点击图标，切换显示模式
    const eyeIcon = wrapper.get('.mx-input__password');
    await eyeIcon.trigger('click');
    expect(wrapper.get('.mx-input__password').attributes('icon')).toBe('eye');
    expect(wrapper.get('input').element.type).toBe('text');
  });
});
