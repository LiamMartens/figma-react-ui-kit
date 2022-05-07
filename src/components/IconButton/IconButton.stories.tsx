import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { IconButton } from './IconButton';
import { ControlSizes } from '../../constants';

export default {
  title: 'IconButton',
  component: IconButton,
  argTypes: {
  },
} as ComponentMeta<typeof IconButton>;

const Template: ComponentStory<typeof IconButton> = (args) => <IconButton {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  buttonSize: ControlSizes.S,
  extraRound: false,
  on: false,
  label: 'Click me',
  children: (
    <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5C3 8.328 2.328 9 1.5 9C0.672 9 0 8.328 0 7.5C0 6.672 0.672 6 1.5 6C2.328 6 3 6.672 3 7.5ZM9 7.5C9 8.328 8.328 9 7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5ZM13.5 9C14.328 9 15 8.328 15 7.5C15 6.672 14.328 6 13.5 6C12.672 6 12 6.672 12 7.5C12 8.328 12.672 9 13.5 9Z" />
    </svg>
  ),
};
