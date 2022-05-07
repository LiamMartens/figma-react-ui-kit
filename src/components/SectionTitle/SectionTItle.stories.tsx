import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionTitle } from './SectionTitle';

export default {
  title: 'SectionTitle',
  component: SectionTitle,
  argTypes: {
  },
} as ComponentMeta<typeof SectionTitle>;

const Template: ComponentStory<typeof SectionTitle> = (args) => <SectionTitle {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: 'Hello world',
};
