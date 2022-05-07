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

const Icon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fillRule="evenodd" clipRule="evenodd" d="M13 8C13 10.761 10.761 13 8 13C5.239 13 3 10.761 3 8C3 5.239 5.239 3 8 3C10.761 3 13 5.239 13 8ZM14 8C14 11.313 11.314 14 8 14C4.686 14 2 11.313 2 8C2 4.687 4.686 2 8 2C11.314 2 14 4.687 14 8ZM7.488 8.383C7.4 8.599 7.355 8.889 7.355 9.253H8.355L8.371 9.016C8.4 8.76 8.513 8.538 8.711 8.348L9.027 8.047C9.275 7.807 9.448 7.59 9.547 7.395C9.646 7.197 9.695 6.987 9.695 6.765C9.695 6.279 9.543 5.902 9.238 5.637C8.934 5.369 8.505 5.234 7.953 5.234C7.406 5.234 6.973 5.375 6.656 5.656C6.341 5.937 6.181 6.326 6.176 6.824H7.309C7.312 6.677 7.344 6.552 7.402 6.45C7.426 6.408 7.455 6.37 7.488 6.336C7.55 6.273 7.622 6.226 7.705 6.196C7.78 6.169 7.862 6.156 7.953 6.156C8.359 6.156 8.563 6.376 8.563 6.816C8.563 6.891 8.553 6.964 8.532 7.036C8.512 7.103 8.484 7.169 8.445 7.234C8.367 7.364 8.21 7.535 7.973 7.746C7.738 7.955 7.577 8.166 7.488 8.383ZM7.418 10.023C7.301 10.135 7.242 10.279 7.242 10.453C7.242 10.625 7.3 10.767 7.414 10.879C7.531 10.991 7.684 11.047 7.875 11.047C7.995 11.047 8.102 11.024 8.192 10.979C8.244 10.953 8.29 10.919 8.332 10.879C8.449 10.767 8.508 10.625 8.508 10.453C8.508 10.279 8.448 10.135 8.328 10.023C8.211 9.909 8.06 9.852 7.875 9.852C7.781 9.852 7.695 9.867 7.617 9.896C7.543 9.925 7.477 9.967 7.418 10.023Z" fill="currentColor" />
  </svg>
)

export const Standard = Template.bind({});
Standard.args = {
  optionMenuSize: ControlSizes.S,
  options: [
    {
      icon: Icon,
      label: 'Option 1',
      value: 'option-1',
      onClick: console.log,
    },
    {
      icon: Icon,
      label: 'Option 2',
      value: 'option-2',
      onClick: console.log,
    },
  ],
  children: (
    <div>
      <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
        <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5C3 8.328 2.328 9 1.5 9C0.672 9 0 8.328 0 7.5C0 6.672 0.672 6 1.5 6C2.328 6 3 6.672 3 7.5ZM9 7.5C9 8.328 8.328 9 7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5ZM13.5 9C14.328 9 15 8.328 15 7.5C15 6.672 14.328 6 13.5 6C12.672 6 12 6.672 12 7.5C12 8.328 12.672 9 13.5 9Z" />
      </svg>
      More
    </div>
  )
};
