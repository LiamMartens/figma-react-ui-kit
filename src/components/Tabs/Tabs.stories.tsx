import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Tabs } from './Tabs';

export default {
  title: 'Tabs',
  component: Tabs,
  argTypes: {
  },
} as ComponentMeta<typeof Tabs>;

const Template: ComponentStory<typeof Tabs> = (args) => <Tabs {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  defaultTab: 'tab-1',
  tabs: [
    {
      id: 'tab-1',
      label: 'Tab 1',
      view: () => <h1>Tab 1</h1>,
    },
    {
      id: 'tab-2',
      label: 'Tab 2',
      view: () => <h1>Tab 2</h1>,
    }
  ]
};
