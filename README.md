# Figma React UI Kit
This library contains some generic components for creating Figma styled UI's

## Getting started
Install the libray
```
npm install --save figma-react-ui-kit
```

## Import css
Be sure to import the css files.
```
node_modules/figma-ui-kit/dist/react.css
node_modules/figma-ui-kit/dist/style.css
```

## Included components
### Button
```html
<Button disabled>I am a disabled button</Button>
<Button buttonSize={ControlSizes.S} buttonType={ButtonTypes.PRIMARY}>I am a small primary button</Button>
<Button buttonSize={ControlSizes.M} buttonType={ButtonTypes.GHOST}>I am a medium ghost button</Button>
```

### IconButton
```html
<IconButton>
    <svg />
</IconButton>
```

### Input
```html
<Input type="text" />
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

### Section
```html
<Section>
    <SectionBlock>
        <SectionBlockTitle>This is a title</SectionBlockTitle>
    </SectionBlock>
</Section>
```