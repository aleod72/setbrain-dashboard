import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { StrokebuttonComponent } from './strokebutton.component';

export default {
  title: 'StrokebuttonComponent',
  component: StrokebuttonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<StrokebuttonComponent>;

const Template: Story<StrokebuttonComponent> = (args: StrokebuttonComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
}