import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Textarea } from './Textarea';
import { ControlSizes } from '../../constants';

export default {
  title: 'Textarea',
  component: Textarea,
  argTypes: {
  },
} as ComponentMeta<typeof Textarea>;

const Template: ComponentStory<typeof Textarea> = (args) => <Textarea {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  textareaSize: ControlSizes.S,
  extraRound: false,
};
