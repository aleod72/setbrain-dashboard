import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TaskCardComponent } from './task-card.component';
import {SharedUiModule} from "../shared-ui.module";

export default {
  title: 'TaskCardComponent',
  component: TaskCardComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedUiModule],
    })
  ],
} as Meta<TaskCardComponent>;

const Template: Story<TaskCardComponent> = (args: TaskCardComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  task: {
    id: '1',
    end_at: new Date(),
    progess: 0.5,
    type: 'FEAT.',
    joined_files: ['1', '2'],
    assigned_users: [
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
    assigned_check: [
      {
        id: '0',
        updated_at: 'updated_at',
        firstname: 'firstname',
        lastname: 'lastname',
        email: 'email',
        avatar_url: 'https://placeimg.com/640/640/any',
      }
    ],
    sub_tasks: {'test': 'deg'},
    title: 'Animation d’interaction avec les textes du footer',
    created_at: new Date(),
    description: 'no description',
    comments: ['1', '1']
  }
};
