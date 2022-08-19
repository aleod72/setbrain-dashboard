import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { BackbuttonComponent } from './backbutton.component';

export default {
  title: 'BackbuttonComponent',
  component: BackbuttonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<BackbuttonComponent>;

const Template: Story<BackbuttonComponent> = (args: BackbuttonComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
};
