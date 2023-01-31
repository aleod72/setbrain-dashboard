import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ActivityComponent } from './activity.component';
import {SharedUiModule} from "../shared-ui.module";

export default {
  title: 'ActivityComponent',
  component: ActivityComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedUiModule],
    })
  ],
} as Meta<ActivityComponent>;

const Template: Story<ActivityComponent> = (args: ActivityComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  activity: {
    id: 18,
    title: 'Figma',
    users_id: ["61b14ff4-32d3-4cad-ba8f-8f7fde7616a4","13a70dbd-6d41-4944-8d24-8fa6fb6e03e8"],
    project_id: '4b2577c2-d24d-41d7-8719-d7d64dc30fc4',
    software: 'FIGMA',
    created_at: '2023-01-27 13:56:06+01',
    share_links: ["google"],
    task: {
      id: '1',
      end_at: new Date(),
      progress: 0.5,
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
      sub_tasks: {
        id: '1',
        title: 'some task',
        finished: false
      },
      title: 'Animation d’interaction avec les textes du footer',
      created_at: new Date(),
      description: {'description': 'no description'},
      comments: ['1', '1'],
      project: 'Wiclass'
    }
  }
};
