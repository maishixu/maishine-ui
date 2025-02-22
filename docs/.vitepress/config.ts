import { defineConfig } from 'vitepress';
import { fileURLToPath, URL } from 'node:url';
import { containerPreview, componentPreview } from '@vitepress-demo-preview/plugin';
// https://vitepress.dev/reference/site-config
export default defineConfig({
  base: '/mx-element/',
  title: 'X-Element',
  description: 'A VitePress Site',
  vite: {
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('../../src', import.meta.url))
      }
    }
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '主页', link: '/' },
      { text: '指南', link: '/get-start' },
      { text: '组件', link: '/components/alert' }
    ],

    sidebar: [
      {
        text: '组件列表',
        items: [
          { text: 'Alert 警告', link: '/components/alert' },
          { text: 'Button 按钮', link: '/components/button' },
          { text: 'Collapse 折叠面板', link: '/components/collapse' },
          { text: 'Input 输入框', link: '/components/input' },
          { text: 'Select 选择器', link: '/components/select' },
          { text: 'Switch 开关', link: '/components/switch' }
        ]
      }
    ],

    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }]
  },
  markdown: {
    config(md) {
      md.use(containerPreview);
      md.use(componentPreview);
    }
  }
});
