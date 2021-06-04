import * as React from 'react';
import * as styles from 'src/scss/components/Tabs.scss';
import classNames from 'classnames';
import { ITabsProps, ITab } from 'typings/Tabs';

interface IState {
    currentTab: string;
}

export class Tabs extends React.Component<ITabsProps, IState> {
    constructor(props: ITabsProps) {
        super(props);

        const { defaultTab } = props;
        this.state = {
            currentTab: defaultTab || '',
        }
    }

    private get activeTab() {
        const { currentTab } = this.state;
        const { tabs } = this.props;
        return tabs.find((t, index) => (!currentTab && index === 0) || t.id === currentTab);
    }

    private handleSwitchTab = (tab: ITab) => {
        const { onSwitch } = this.props;
        this.setState({
            currentTab: tab.id,
        }, () => {
            if (onSwitch) onSwitch(tab);
        });
    }

    private handleClickTab = (tab: ITab) => {
        const { onTabClick } = this.props;
        this.handleSwitchTab(tab);
        if (onTabClick) {
            onTabClick(tab);
        }
    }

    public render() {
        const { currentTab } = this.state;
        const { className, tabClassName, tabs, onSwitch, ...rest } = this.props;

        const activeTab = this.activeTab;
        const ActiveTabComponent = activeTab ? activeTab.view : undefined;

        return (
            <div
                {...rest}
                className={classNames({
                    [styles.tabs]: true,
                    [className]: !!className,
                })}
            >
                <ul className={styles.tabsList}>
                    {tabs.map((tab, index) => {
                        const Icon = tab.icon;
                        return (
                            <li
                                key={tab.id}
                                onClick={() => this.handleClickTab(tab)}
                                className={classNames({
                                    [styles.tabEntry]: true,
                                    [styles.active]: (!currentTab && index === 0) || tab.id === currentTab,
                                    [tabClassName]: !!tabClassName,
                                })}
                            >
                                {Icon && <Icon />}
                                {tab.label}
                            </li>
                        );
                    })}
                </ul>
                <div className={styles.view}>
                    {activeTab && (
                        <ActiveTabComponent />
                    )}
                </div>
            </div>
        );
    }
}