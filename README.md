# Figma React UI Kit
[![npm-badge](https://badge.fury.io/js/figma-react-ui-kit.svg)](https://www.npmjs.com/package/figma-react-ui-kit)  
[Latest Storybook](https://development--6276bd991b0b1d004aff360e.chromatic.com)  
This library contains some generic components for creating Figma styled UI's

## Getting started
Install the libray
```
npm install --save figma-react-ui-kit
```

## Import css
Be sure to import the css files.
```
node_modules/figma-react-ui-kit/lib/react.css
node_modules/figma-react-ui-kit/lib/style.css
```

## Included components
### Button
```html
<Button disabled>I am a disabled button</Button>
<Button buttonSize={ControlSizes.S} buttonType={ButtonTypes.PRIMARY}>I am a small primary button</Button>
<Button buttonSize={ControlSizes.M} buttonType={ButtonTypes.GHOST}>I am a medium ghost button</Button>
<Button buttonSize={ControlSizes.M} buttonType={ButtonTypes.DESTRUCTIVE}>I am a medium ghost button</Button>
```

### IconButton
```html
<IconButton>
    <svg />
</IconButton>
```

### Input
```html
<InputLabel>Some label</InputLabel>
<Input type="text" />
<Input type="text" inlineLabel="Label" />
<Input type="text" cleanBorder />
```

### Textarea
```html
<Textarea>Enter some content...</Textarea
```

### Checkbox
```html
<Checkbox label="This is a checkbox" />
```

### Select
```jsx
<Select
    placeholder="Select an option"
    options={[{
        value: 'value',
        label: 'label',
        icon: (
            <svg />
        )
    }]}
    onChange={(option: ISelectOption) => {}}
/>
```

### OptionMenu
```jsx
<OptionMenu
    options={[
        {
            label: 'My option',
            value: 'my-option',
            onClick: (value) => {
                console.log(value);
            }
        }
    ]}
/>
```

### Section
```html
<Section>
    <SectionBlock>
        <SectionBlockTitle>This is a title</SectionBlockTitle>
    </SectionBlock>
</Section>
```

### Tabs
```jsx
<Tabs
    onSwitch={console.log}
    tabs={[{
        id: 'tab-1',
        label: 'Tab 1',
        view: () => (
            <p>Tab 1 Content</p>
        )
    }, {
        id: 'tab-2',
        label: 'Tab 2',
        view: () => (
            <p>Tab 2 Content</p>
        )
    }, {
        id: 'tab-3',
        label: 'Tab 3',
        view: TabComponent
    }]}
/>
```
