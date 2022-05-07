import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Button } from './Button';
import { ButtonTypes, ControlSizes } from '../../constants';

export default {
  title: 'Button',
  component: Button,
  argTypes: {
  },
} as ComponentMeta<typeof Button>;

const Template: ComponentStory<typeof Button> = (args) => <Button {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  buttonSize: ControlSizes.S,
  buttonType: ButtonTypes.PRIMARY,
  extraRound: false,
  children: 'Click me',
};
