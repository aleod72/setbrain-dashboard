import { DatePicker } from 'ui/components/date-picker/DatePicker';
import type { Meta, StoryFn } from '@storybook/react';

const Story: Meta<typeof DatePicker> = {
  component: DatePicker,
  title: 'Date Picker'
};
export default Story;

const Template: StoryFn<typeof DatePicker> = (arguments_) => (
    <DatePicker {...arguments_} />
);

export const Primary = Template.bind({});
Primary.args = {
};