---
title: Button
description: Button 组件的文档
---

# Button 按钮

常用的操作按钮。

## 基础用法

使用 `type`、`plain`、`round` 和 `circle` 来定义按钮的样式。

<preview path="../demo/Button/Basic.vue" title="基础用法" description="Button 组件的基础用法"></preview>

## 禁用状态

使用 `disabled` 属性来定义按钮是否被禁用

<preview path="../demo/Button/Disabled.vue" title="禁用状态" description="Button 组件的禁用状态"></preview>

## 图标按钮

使用 `icon` 属性来为按钮添加图标。图标名称请看 fontawesome 官网 [https://fontawesome.com/icons](https://fontawesome.com/icons)

<preview path="../demo/Button/Icon.vue" title="图标按钮" description="Button 组件的图标按钮"></preview>

## 加载状态按钮

通过设置 `loading` 属性为 true 来显示正在加载的状态。

<preview path="../demo/Button/Loading.vue" title="加载状态按钮" description="Button 组件的加载状态按钮"></preview>

## 不同大小的按钮

通过设置 `size` 属性为 `small` | `large` 来调整图标的大小。

<preview path="../demo/Button/Size.vue" title="不同大小的按钮" description="Button 组件的不同大小的按钮"></preview>

## Button 属性

| Name        | Description           | Type                                                             | Default |
| ----------- | --------------------- | ---------------------------------------------------------------- | ------- |
| size        | 按钮尺寸              | `enum` - `'large'\| 'small'`                                     | —       |
| type        | 按钮主题              | `enum` - `'primary'\| 'success'\| 'warning'\| 'danger'\| 'info'` | —       |
| plain       | 朴素类型              | `boolean`                                                        | false   |
| round       | 圆角按钮              | `boolean`                                                        | false   |
| circle      | 圆形按钮              | `boolean`                                                        | false   |
| loading     | 加载状态              | `boolean`                                                        | false   |
| disabled    | 禁用状态              | `boolean`                                                        | false   |
| icon        | 图标组件              | `string`                                                         | —       |
| autofocus   | 原生 `autofocus` 属性 | `boolean`                                                        | false   |
| native-type | 原生 `type` 属性      | `enum` - `'button'\| 'submit'\| 'reset'`                         | button  |
