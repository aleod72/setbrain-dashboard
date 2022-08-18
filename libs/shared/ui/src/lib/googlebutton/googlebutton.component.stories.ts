import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { GooglebuttonComponent } from './googlebutton.component';

export default {
  title: 'GooglebuttonComponent',
  component: GooglebuttonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<GooglebuttonComponent>;

const Template: Story<GooglebuttonComponent> = (args: GooglebuttonComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
};
