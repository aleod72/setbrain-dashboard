import { Button } from 'ui';
import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof Button> = {
  component: Button,
  title: 'Button',
};
export default Story;

const Template: StoryFn<typeof Button> = (arguments_) => (
  <Button {...arguments_} />
);

export const Primary = Template.bind({});
Primary.args = {
  children: 'Button',
};