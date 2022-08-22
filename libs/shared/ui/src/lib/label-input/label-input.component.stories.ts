import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { LabelInputComponent } from './label-input.component';

export default {
  title: 'LabelInputComponent',
  component: LabelInputComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<LabelInputComponent>;

const Template: Story<LabelInputComponent> = (args: LabelInputComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  label: "Label",
  placeholder: "Type text here",
  filename: "test.pdf",
  text: ''
};
