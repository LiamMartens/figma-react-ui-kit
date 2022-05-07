import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Select } from './Select';

export default {
  title: 'Select',
  component: Select,
  argTypes: {
  },
} as ComponentMeta<typeof Select>;

const Template: ComponentStory<typeof Select> = (args) => <Select {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  options: [
    {
      value: 'option-1',
      label: 'Option 1',
    },
    {
      value: 'option-2',
      label: 'Option 2',
    },
  ]
};
