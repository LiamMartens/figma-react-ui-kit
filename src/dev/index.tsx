import * as React from 'react';
import * as ReactDOM from 'react-dom';
import * as styles from './index.scss';
import { Section, SectionBlock, SectionTitle, Input, ControlSizes, InputLabel, Textarea, Button, ButtonTypes, Checkbox, IconButton, Select, OptionMenu, Tabs } from '../react'

class App extends React.Component {
    public render() {
        return (
            <>
                <Section>
                    <SectionTitle>Inputs</SectionTitle>
                    <SectionBlock>
                        <InputLabel>Some label</InputLabel>
                        <Input className={styles.input} inputSize={ControlSizes.M} type="text" placeholder="Enter your name" />
                        <Input extraRound className={styles.input} inlineLabel="X Pos" inputSize={ControlSizes.S} type="text" />
                        <Input cleanBorder className={styles.input} inlineLabel="X Pos" inputSize={ControlSizes.S} type="text" />
                        <Input cleanBorder className={styles.input} inlineLabel="Long label" inputSize={ControlSizes.S} type="text" />
                        <Input cleanBorder className={styles.input} inlineLabel={(
                            <svg width="8" height="8" viewBox="0 0 8 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path fill-rule="evenodd" clip-rule="evenodd" d="M0 0V8H8V7H5C5 4.79 3.21 3 1 3V0H0ZM1 4V7H4C4 5.343 2.657 4 1 4Z" fill="black"/>
                            </svg>
                        )} inputSize={ControlSizes.S} type="text" />
                    </SectionBlock>
                    <SectionBlock className={styles.checkboxes}>
                        <Checkbox
                            className={styles.checkbox}
                            checkboxSize={ControlSizes.M}
                            label="Check me"
                        />
                        <Checkbox
                            className={styles.checkbox}
                            checkboxSize={ControlSizes.S}
                            label="Check me"
                        />
                    </SectionBlock>
                    <SectionBlock className={styles.flex}>
                        <Select
                            maxHeight={100}
                            onOpen={() => console.log('open')}
                            onClose={() => console.log('close')}
                            className={styles.select}
                            selectSize={ControlSizes.M}
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                                { label: 'Option 3', value: '3' },
                                { label: 'Option 4', value: '4' },
                                { label: 'Option 5', value: '5' },
                                { label: 'Option 6', value: '6' },
                            ]}
                        />
                        <Select
                            className={styles.select}
                            selectSize={ControlSizes.S}
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                            ]}
                        />
                        <Select
                            cleanBorder
                            className={styles.select}
                            selectSize={ControlSizes.S}
                            options={[
                                { label: 'Option 1', value: '1' },
                                { label: 'Option 2', value: '2' },
                            ]}
                        />
                    </SectionBlock>
                    <SectionBlock>
                        <Textarea className={styles.textarea}></Textarea>
                    </SectionBlock>
                </Section>
                <Section>
                    <SectionTitle>Buttons</SectionTitle>
                    <SectionBlock>
                        <Button className={styles.button} buttonSize={ControlSizes.M}>Click me!</Button>
                        <Button extraRound className={styles.button} buttonSize={ControlSizes.S}>Click me!</Button>
                        <Button className={styles.button} buttonType={ButtonTypes.DESTRUCTIVE} buttonSize={ControlSizes.S}>Click me!</Button>
                    </SectionBlock>
                    <SectionBlock>
                        <Button className={styles.button} buttonType={ButtonTypes.GHOST} buttonSize={ControlSizes.M}>Click me!</Button>
                        <Button className={styles.button} buttonType={ButtonTypes.GHOST} buttonSize={ControlSizes.S}>Click me!</Button>
                    </SectionBlock>
                    <SectionBlock className={styles.flex}>
                        <IconButton buttonSize={ControlSizes.M} className={styles.button}>X</IconButton>
                        <IconButton buttonSize={ControlSizes.S} className={styles.button}>X</IconButton>
                    </SectionBlock>
                    <SectionBlock>
                        <div style={{ width: '50px' }}>
                            <OptionMenu<string>
                                options={[
                                    {
                                        label: 'Click me',
                                        value: 'click-me',
                                        onClick: (v: string) => {
                                            alert(v);
                                        }
                                    }
                                ]}
                            />
                        </div>

                        <OptionMenu<string>
                            options={[
                                {
                                    label: 'Click me',
                                    value: 'click-me',
                                    onClick: (v: string) => {
                                        alert(v);
                                    }
                                }
                            ]}
                        />
                    </SectionBlock>
                </Section>
                <Section>
                    <SectionTitle>Tabs</SectionTitle>
                    <Tabs
                        onSwitch={console.log}
                        tabs={[{
                            icon: () => (
                                <svg width="101" height="101" viewBox="0 0 101 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M93.3149 84.0263L73.2189 63.9303C77.3379 57.9413 79.7539 50.6983 79.7539 42.8973C79.7539 22.3733 63.0569 5.67628 42.5349 5.67628C22.0119 5.67628 5.31494 22.3733 5.31494 42.8973C5.31494 63.4193 22.0119 80.1173 42.5349 80.1173C50.3359 80.1173 57.5799 77.7003 63.5689 73.5833L83.6649 93.6783C84.9969 95.0103 86.7429 95.6763 88.4909 95.6763C90.2369 95.6763 91.9829 95.0103 93.3149 93.6783C95.9809 91.0123 95.9809 86.6913 93.3149 84.0263ZM16.2349 42.8973C16.2349 28.3953 28.0329 16.5973 42.5349 16.5973C57.0369 16.5973 68.8339 28.3953 68.8339 42.8973C68.8339 57.3983 57.0369 69.1973 42.5349 69.1973C28.0329 69.1973 16.2349 57.3983 16.2349 42.8973Z" fill="black"/>
                                </svg>
                            ),
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
                            view: () => (
                                <p>Tab 3 Content</p>
                            )
                        }]}
                    />
                </Section>
            </>
        );
    }
}

ReactDOM.render(
    <App />,
    document.getElementById('app'),
);