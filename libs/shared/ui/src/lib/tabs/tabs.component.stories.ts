import { moduleMetadata, Story, Meta } from '@storybook/angular';
import { TabsComponent } from './tabs.component';

export default {
  title: 'TabsComponent',
  component: TabsComponent,
  decorators: [
    moduleMetadata({
      imports: [],
    })
  ],
} as Meta<TabsComponent>;

const Template: Story<TabsComponent> = (args: TabsComponent) => ({
  props: args,
});


export const Primary = Template.bind({});
Primary.args = {
  tabs: [{name: "Tab 1", id: 0}, {name: "Tab 2", id: 1}, {name: "Tab 3", id: 2}]
};