import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { ProjectCardComponent } from './project-card.component';

export default {
  title: 'ProjectCardComponent',
  component: ProjectCardComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<ProjectCardComponent>;

const Template: Story<ProjectCardComponent> = (args: ProjectCardComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  project: {
    name: 'Wiclass',
    created_at: new Date(),
    end_date: new Date(),
    project_icon_url: 'https://res.cloudinary.com/ddwjzushk/image/upload/v1673965906/stream-assistant/Logo_glyph_yqxcqh.png',
    id: '1'
  },
  pageLinks: [
    {name: 'Général', link: '#', icon: 'apps',id: 1},
    {name: 'Tâches', link: '#', icon: 'list-check',id: 2},
    {name: 'Administration', link: '#', icon: 'edit',id: 3},
    {name: 'Statistiques', link: '#', icon: 'stats',id: 4},
    {name: 'Fichiers', link: '#', icon: 'folder',id: 4},
  ],
  active: false
};
