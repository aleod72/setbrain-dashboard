import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ButtonwithoutfillComponent } from './buttonwithoutfill.component';

export default {
  title: 'ButtonwithoutfillComponent',
  component: ButtonwithoutfillComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ButtonwithoutfillComponent>;

const Template: Story<ButtonwithoutfillComponent> = (args: ButtonwithoutfillComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
};
