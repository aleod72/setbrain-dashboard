import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UserTagComponent } from './user-tag.component';

export default {
  title: 'UserTagComponent',
  component: UserTagComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UserTagComponent>;

const Template: Story<UserTagComponent> = (args: UserTagComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  profile: {
    id: '61b14ff4-32d3-4cad-ba8f-8f7fde7616a4',
    firstname: 'Emmanuel',
    lastname: 'Linguet',
    avatar_url: 'https://placeimg.com/640/640/people',
    email: 'emmanuel.linguet@setbrain.fr',
    updated_at: 'EF'
  }
};
