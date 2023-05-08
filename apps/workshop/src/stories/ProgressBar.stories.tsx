import type { Meta, StoryFn } from '@storybook/react';
import { ProgressBar } from 'ui/components/progress-bar/ProgressBar';

const Story: Meta<typeof ProgressBar> = {
  component: ProgressBar,
  title: 'Progress Bar',
};
export default Story;

const Template: StoryFn<typeof ProgressBar> = (args) => (
  <ProgressBar {...args} />
);

export const Primary = Template.bind({});
Primary.args = {
    progress: 50,
    max: 100,
    intent: 'green'
};