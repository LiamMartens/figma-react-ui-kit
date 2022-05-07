import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { InputLabel } from './InputLabel';

export default {
  title: 'InputLabel',
  component: InputLabel,
  argTypes: {
  },
} as ComponentMeta<typeof InputLabel>;

const Template: ComponentStory<typeof InputLabel> = (args) => <InputLabel {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: 'Label',
};
