import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Input } from './Input';
import { ControlSizes } from '../../constants';

export default {
  title: 'Input',
  component: Input,
  argTypes: {
  },
} as ComponentMeta<typeof Input>;

const Template: ComponentStory<typeof Input> = (args) => <Input {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  inputSize: ControlSizes.S,
  inlineLabel: 'Label',
  cleanBorder: false,
  extraRound: false,
};
