import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ButtonIconComponent } from './button-icon.component';

export default {
  title: 'ButtonIconComponent',
  component: ButtonIconComponent,
  decorators: [
    moduleMetadata({
      imports: []
    })
  ]
} as Meta<ButtonIconComponent>;

const Template: Story<ButtonIconComponent> = (args: ButtonIconComponent) => ({
  props: args
});

export const Primary = Template.bind({});
Primary.args = {
  label: 'Button',
  icon: 'square',
  disabled: false
};
