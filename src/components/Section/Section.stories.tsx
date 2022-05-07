import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { Section } from './Section';

export default {
  title: 'Section',
  component: Section,
  argTypes: {
  },
} as ComponentMeta<typeof Section>;

const Template: ComponentStory<typeof Section> = (args) => (
  <>
    <Section {...args} />
    <Section {...args} />
    <Section {...args} />
    <Section {...args} />
  </>
);

export const Standard = Template.bind({});
Standard.args = {
  children: 'Hello world',
};
