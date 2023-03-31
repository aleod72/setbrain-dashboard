import { TooltipProps, Tooltip } from 'ui';
import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof Tooltip> = {
  component: Tooltip,
  title: 'Tooltip',
};
export default Story;

const Template: StoryFn<typeof Tooltip> = (arguments_: TooltipProps) => (
  <Tooltip {...arguments_} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: <div className='text-white-100'>Tooltip</div>,
  content: 'Tooltip',
};