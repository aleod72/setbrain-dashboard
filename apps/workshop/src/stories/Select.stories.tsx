import type { Meta, StoryFn } from '@storybook/react';
import { Select, SelectGroup, SelectItem } from 'ui';

const Story: Meta<typeof Select> = {
  component: Select,
  title: 'Select',
};
export default Story;

const Template: StoryFn<typeof Select> = (args) => <Select {...args} />;

export const Primary = Template.bind({});
Primary.args = {
  label: 'Select',
  placeholder: 'Select an item',
  children: (
    <>
      <SelectGroup label="Fruits">
        <SelectItem value="Banana">Banana</SelectItem>
        <SelectItem value="Apple">Apple</SelectItem>
        <SelectItem value="Orange">Orange</SelectItem>
        <SelectItem value="Pineaple">Pineaple</SelectItem>
      </SelectGroup>
      <SelectGroup label="Vegetables">
        <SelectItem value="Carrot">Carrot</SelectItem>
        <SelectItem value="Potato">Potato</SelectItem>
        <SelectItem value="Cucumber">Cucumber</SelectItem>
        <SelectItem value="Tomato">Tomato</SelectItem>
      </SelectGroup>
    </>
  ),
  fullWidth: false,
  intent: 'normal',
};