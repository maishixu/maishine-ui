import type { Options, Placement } from '@popperjs/core';
// 属性
export interface TooltipProps {
  content?: string;
  trigger?: 'click' | 'hover';
  placement?: Placement;
  manual?: boolean;
  popperOptions?: Partial<Options>;
  transition?: string;
  openDelay?: number;
  closeDelay?: number;
}
// 事件
export interface TooltipEmit {
  (e: 'visible-change', value: boolean): void;
}
// 实例方法
export interface TooltipInstance {
  show: () => void;
  hide: () => void;
}
