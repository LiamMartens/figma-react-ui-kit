import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { OptionMenu } from './OptionMenu';
import { ControlSizes } from '../../constants';

export default {
  title: 'OptionMenu',
  component: OptionMenu,
  argTypes: {
  },
} as ComponentMeta<typeof OptionMenu>;

const Template: ComponentStory<typeof OptionMenu> = (args) => <OptionMenu {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  optionMenuSize: ControlSizes.S,
  options: [
    {
      label: 'Option 1',
      value: 'option-1',
      onClick: console.log,
    },
    {
      label: 'Option 2',
      value: 'option-2',
      onClick: console.log,
    },
  ]
};
