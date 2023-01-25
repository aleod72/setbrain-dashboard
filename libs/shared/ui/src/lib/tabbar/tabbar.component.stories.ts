import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TabbarComponent } from './tabbar.component';
import {SharedUiModule} from "../shared-ui.module";

export default {
  title: 'TabbarComponent',
  component: TabbarComponent,
  decorators: [
    moduleMetadata({
      imports: [SharedUiModule],
    })
  ],
} as Meta<TabbarComponent>;

const Template: Story<TabbarComponent> = (args: TabbarComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  connectedUser: {
    id: '61b14ff4-32d3-4cad-ba8f-8f7fde7616a4',
    updated_at: 'updated_at',
    firstname: 'Emmanuel',
    lastname: 'Linguet',
    email: 'email',
    avatar_url: 'https://placeimg.com/640/640/people',
  },
  connectedUserJobs: ['Frontend Developper'],
  projects: [
    {
      name: 'Wiclass',
      created_at: new Date(),
      end_date: new Date(),
      project_icon_url: 'https://res.cloudinary.com/ddwjzushk/image/upload/v1673965906/stream-assistant/Logo_glyph_yqxcqh.png',
      id: '1'
    },
    {
      name: 'Wiclass',
      created_at: new Date(),
      end_date: new Date(),
      project_icon_url: 'https://res.cloudinary.com/ddwjzushk/image/upload/v1673965906/stream-assistant/Logo_glyph_yqxcqh.png',
      id: '2'
    },
  ],
  pageLinks: [
    {name: 'Général', link: '#', icon: 'apps',id: '1'},
    {name: 'Tâches', link: '#', icon: 'list-check',id: '2'},
    {name: 'Administration', link: '#', icon: 'edit',id: '3'},
    {name: 'Statistiques', link: '#', icon: 'stats',id: '4'},
    {name: 'Fichiers', link: '#', icon: 'folder',id: '4'},
  ],
  activeProject: '1'
};
