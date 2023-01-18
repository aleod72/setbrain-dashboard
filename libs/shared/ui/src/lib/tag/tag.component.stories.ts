import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TagComponent } from './tag.component';

export default {
  title: 'TagComponent',
  component: TagComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TagComponent>;

const Template: Story<TagComponent> = (args: TagComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  tagType: 'FEAT.'
};
