import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProgressbarComponent } from './progressbar.component';

export default {
  title: 'ProgressbarComponent',
  component: ProgressbarComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProgressbarComponent>;

const Template: Story<ProgressbarComponent> = (args: ProgressbarComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  progress: 1,
  endDate: new Date(),
};
