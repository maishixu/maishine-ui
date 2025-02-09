import { mount } from '@vue/test-utils';
import type { DOMWrapper, VueWrapper } from '@vue/test-utils';
import { beforeAll, describe, expect, test, vi } from 'vitest';
import Collapse from './Collapse.vue';
import CollapseItem from './CollapseItem.vue';
const onChange = vi.fn();
let wrapper: VueWrapper;
let headers: DOMWrapper<Element>[], contents: DOMWrapper<Element>[];
let header1: DOMWrapper<Element>, header2: DOMWrapper<Element>, header3: DOMWrapper<Element>;
let content1: DOMWrapper<Element>, content2: DOMWrapper<Element>, content3: DOMWrapper<Element>;
// 普通模式
describe('Collapse.vue', () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['1']} onChange={onChange}>
          <CollapseItem name="1" title="Collapse title 1">
            <span>第一个CollapseItem内容</span>
          </CollapseItem>
          <CollapseItem name="2" title="Collapse title 2">
            <span>第二个CollapseItem内容</span>
          </CollapseItem>
          <CollapseItem name="3" title="Collapse title 3" disabled>
            <span>第三个CollapseItem内容</span>
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body // 修复 bug: DOM 缓存
      }
    );
    // 获取标题和内容
    headers = wrapper.findAll('.mx-collapse-item__header');
    contents = wrapper.findAll('.mx-collapse-item__content');

    header1 = headers[0];
    header2 = headers[1];
    header3 = headers[2];
    content1 = contents[0];
    content2 = contents[1];
    content3 = contents[2];
  });
  test('测试结构及对应文本', async () => {
    // 长度
    expect(headers.length).toBe(3);
    expect(contents.length).toBe(3);
    // 文本
    expect(header1.text()).toBe('Collapse title 1');
    // 内容
    expect(content1.text()).toBe('第一个CollapseItem内容');
    expect(content1.isVisible()).toBeTruthy();
    expect(content2.isVisible()).toBeFalsy();
  });
  test('点击标题展开/关闭内容', async () => {
    // 行为
    await header1.trigger('click');
    expect(content1.isVisible()).toBeFalsy();
    await header2.trigger('click');
    expect(content2.isVisible()).toBeTruthy();
  });
  test('发送正确事件', () => {
    expect(onChange).toHaveBeenCalledWith([]);
    expect(onChange).toHaveBeenLastCalledWith(['2']);
  });
  test('测试 disabled 标题无法展开', async () => {
    onChange.mockClear(); // 清空 onChange 缓存
    expect(header3.classes()).toContain('is-disabled');
    await header3.trigger('click');
    expect(content3.isVisible()).toBeFalsy();
    expect(onChange).not.toHaveBeenCalled();
  });
});
// 手风琴模式
describe('Collapse_accordion.vue', () => {
  beforeAll(() => {
    wrapper = mount(
      () => (
        <Collapse modelValue={['1']} onChange={onChange} accordion>
          <CollapseItem name="1" title="Collapse title 1">
            <span>第一个CollapseItem内容</span>
          </CollapseItem>
          <CollapseItem name="2" title="Collapse title 2">
            <span>第二个CollapseItem内容</span>
          </CollapseItem>
        </Collapse>
      ),
      {
        global: {
          stubs: ['Icon']
        },
        attachTo: document.body // 修复 bug: DOM 缓存
      }
    );
    // 获取标题和内容
    headers = wrapper.findAll('.mx-collapse-item__header');
    contents = wrapper.findAll('.mx-collapse-item__content');

    header2 = headers[1];
    content1 = contents[0];
    content2 = contents[1];
  });
  test('点击标题展开/关闭内容', async () => {
    // 行为:第二个内容打开时，第一个应该关闭
    await header2.trigger('click');
    expect(content2.isVisible()).toBeTruthy();
    expect(content1.isVisible()).toBeFalsy();
  });
  test('发送正确事件', () => {
    expect(onChange).toHaveBeenLastCalledWith(['2']);
  });
});
