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
    task: 'e78e2774-c9b6-4d6c-8649-1fb771f4e561'
  }
};
