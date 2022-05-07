import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Checkbox } from './Checkbox';
import { ControlSizes } from '../../constants';

export default {
  title: 'Checkbox',
  component: Checkbox,
  argTypes: {
  },
} as ComponentMeta<typeof Checkbox>;

const Template: ComponentStory<typeof Checkbox> = (args) => <Checkbox {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  checkboxSize: ControlSizes.S,
  label: 'My checkbox',
  extraRound: false,
};
