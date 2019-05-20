import * as React from 'react';
import { IButtonProps } from './typings/Button';
import { ICheckboxProps } from './typings/Checkbox';
import { IInputProps } from './typings/Input';
import { ITextareaProps } from './typings/Textarea';

declare const Button: React.ComponentClass<IButtonProps>;
declare const Checkbox: React.ComponentClass<ICheckboxProps>;
declare const Input: React.ComponentClass<IInputProps>;
declare const Textarea: React.ComponentClass<ITextareaProps>;
declare const Section: React.ComponentClass<React.HTMLAttributes<HTMLDivElement>>;
declare const SectionBlock: React.ComponentClass<React.HTMLAttributes<HTMLDivElement>>;
declare const SectionTitle: React.ComponentClass<React.HTMLAttributes<HTMLParagraphElement>>;