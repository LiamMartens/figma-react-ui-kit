import React from 'react';
import { ComponentStory, ComponentMeta } from '@storybook/react';
import { SectionBlock } from './SectionBlock';

export default {
  title: 'SectionBlock',
  component: SectionBlock,
  argTypes: {
  },
} as ComponentMeta<typeof SectionBlock>;

const Template: ComponentStory<typeof SectionBlock> = (args) => <SectionBlock {...args} />;

export const Standard = Template.bind({});
Standard.args = {
  children: 'Hello world',
};
