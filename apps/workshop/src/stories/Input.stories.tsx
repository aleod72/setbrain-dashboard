import type { Meta, StoryFn } from '@storybook/react';
import { Input } from 'ui/components/input/Input';

const Story: Meta<typeof Input> = {
  component: Input,
  title: 'Input',
};
export default Story;

const Template: StoryFn<typeof Input> = (arguments_) => (
  <Input {...arguments_} />
);

export const Primary = Template.bind({});
Primary.args = {
  label: 'Input',
  placeholder: 'Input',
  errorMessage: undefined,
  disabled: false,
  state: 'normal',
  id: 'input',
};