import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { UsersListComponent } from './users-list.component';

export default {
  title: 'UsersListComponent',
  component: UsersListComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<UsersListComponent>;

const Template: Story<UsersListComponent> = (args: UsersListComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  users: [
    {
      id: '0',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/any',
    },
    {
      id: '1',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/people',
    },
    {
      id: '2',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/people',
    },
    {
      id: '3',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/people',
    },
    {
      id: '4',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/people',
    },
    {
      id: '5',
      updated_at: 'updated_at',
      firstname: 'firstname',
      lastname: 'lastname',
      email: 'email',
      avatar_url: 'https://placeimg.com/640/640/people',
    },
  ],
  connectedUser: {
    id: '0',
    updated_at: 'updated_at',
    firstname: 'firstname',
    lastname: 'lastname',
    email: 'email',
    avatar_url: 'https://placeimg.com/640/640/any',
  },
};