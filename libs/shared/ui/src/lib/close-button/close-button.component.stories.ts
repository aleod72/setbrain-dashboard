import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { CloseButtonComponent } from './close-button.component';

export default {
  title: 'CloseButtonComponent',
  component: CloseButtonComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<CloseButtonComponent>;

const Template: Story<CloseButtonComponent> = (args: CloseButtonComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
};
