---
title: Input
description: Input 组件的文档
---

# Input 输入框

通过鼠标或键盘输入字符

> [!TIP]
>
> `Input` 是受控组件，他必须绑定 `v-model` ，才能获取输入框的值，不然输入框的值不会改变。

## 1. 基础文本框

<preview path="../demo/Input/Basic.vue" title="基础文本框" description="Input 基础文本框"></preview>

## 2. 禁用文本框

通过 **`disabled`** 属性指定是否禁用 input 组件

<preview path="../demo/Input/Disable.vue" title="禁用文本框" description="Input 禁用文本框"></preview>

## 3. 密码文本框

使用 **`show-password`** 属性即可得到一个可切换显示隐藏的密码框

<preview path="../demo/Input/Password.vue" title="密码文本框" description="Input 密码文本框"></preview>

## 4. 清空文本框

使用 **`clearable`** 属性即可得到一个可一键清空的输入框

<preview path="../demo/Input/Clear.vue" title="清空文本框" description="Input 清空文本框"></preview>

## 5. 不同尺寸的文本框

使用 size 属性改变输入框大小。 除了默认大小外，还有另外两个选项： `large`，`small`。

<preview path="../demo/Input/Size.vue" title="不同尺寸文本框" description="不同尺寸文本框"></preview>

## 6. 复合型输入框

可以在输入框前置或后置一个元素，通常是标签或按钮。可以使用 **prepend** 和 **append** 插槽。
要在输入框中添加前后元素，可以使用 **prefix** 和 **suffix** 插槽。

<preview path="../demo/Input/Combo.vue" title="复合型输入框" description="Input 复合型输入框"></preview>

## 7. Textarea 文本域

用于输入多行文本信息可缩放的输入框。 添加 `type="textarea"` 属性来将 input 元素转换为原生的 textarea 元素。可以通过拖拽调整文本域的高度。

<preview path="../demo/Input/Textarea.vue" title="Textarea" description="Textarea"></preview>

## 8. Input API

### 8.1 属性

| 属性名                | 说明                                         | 类型                 | 默认值 |
| --------------------- | -------------------------------------------- | -------------------- | ------ |
| type                  | input 原生类型                               | `'string'`           | text   |
| model-value / v-model | 绑定值                                       | `'string'`           |        |
| disabled              | 是否禁用                                     | `boolean`            | false  |
| placeholder           | 输入框占位文本                               | `string`             |        |
| size                  | 输入框尺寸，只在 type 不为 'textarea' 时有效 | `'large' \| 'small'` |        |
| placeholder           | 输入框占位文本                               | `string`             |        |
| show-password         | 是否显示切换密码图标                         | `boolean`            | false  |
| clearable             | 是否显示清除按钮                             | `boolean`            | false  |
| readonly              | 原生 readonly 属性，是否只读                 | `boolean`            | false  |
| autofocus             | 原生属性，自动获取焦点                       | `boolean`            | false  |
| autocomplete          | 原生 autocomplete 属性                       | `string`             | off    |

### 8.2 事件

| 事件名 | 说明                                        | 类型                      |
| ------ | ------------------------------------------- | ------------------------- |
| blur   | 当选择器的输入框失去焦点时触发              | `(e: FocusEvent) => void` |
| focus  | 当选择器的输入框获得焦点时触发              | `(e: FocusEvent) => void` |
| change | 当选择器的输入框失去焦点时触发              | `(e: string) => void`     |
| input  | 当选择器的输入框获得焦点时触发              | `(e: string) => void`     |
| clear  | 在点击由 clearable 属性生成的清空按钮时触发 | `()=>void`                |

### 8.3 插槽

| 插槽名  | 说明           |
| ------- | -------------- |
| prefix  | 输入框头部内容 |
| suffix  | 输入框尾部内容 |
| prepend | 输入框前置内容 |
| append  | 输入框后置内容 |

### 8.4 Exposes

| 名称 | 说明                       | 类型                                           |
| ---- | -------------------------- | ---------------------------------------------- |
| ref  | HTML元素 input 或 textarea | `Ref<HTMLInputElement \| HTMLTextAreaElement>` |
