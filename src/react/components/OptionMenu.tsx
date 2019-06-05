import * as React from 'react';
import * as styles from 'src/scss/components/OptionMenu.scss';
import classNames from 'classnames';
import { IOptionMenuProps, IOption } from 'typings/OptionMenu';
import { IconButton } from './IconButton';
import { ControlSizes } from 'constants';

interface IState {
    isOpen: boolean;
    hangLeft: boolean;
}

export class OptionMenu<V = any> extends React.Component<IOptionMenuProps<V>, IState> {
    private optionMenuRef = React.createRef<HTMLDivElement>();
    private optionListRef = React.createRef<HTMLUListElement>();

    public static defaultProps = {
        optionMenuSize: ControlSizes.S,
        stopPropagation: true,
    }

    public state = {
        isOpen: false,
        hangLeft: false,
    };

    private handleWindowClick = (event: Event) => {
        const { isOpen } = this.state;
        if (isOpen && this.optionListRef.current && !this.optionListRef.current.contains(event.target as any)) {
            this.setState({
                isOpen: false,
            });
        }
    }

    private handleClick = (event: React.SyntheticEvent) => {
        const { stopPropagation } = this.props;
        const { isOpen } = this.state;
        const listRect = this.optionListRef.current.getBoundingClientRect() as DOMRect;
        if (stopPropagation) event.stopPropagation();
        this.setState({
            isOpen: !isOpen,
            hangLeft: window.innerWidth < (listRect.x + listRect.width + 20)
        });
    }

    private handleOptionClick = (opt: IOption) => {
        opt.onClick(opt.value);
        this.setState({
            isOpen: false,
        });
    }

    public componentDidUpdate(prevProps: IOptionMenuProps, prevState: IState) {
        const { isOpen } = this.state;
        if (isOpen !== prevState.isOpen) {
            if (isOpen) {
                window.requestAnimationFrame(() => {
                    window.addEventListener('click', this.handleWindowClick);
                });
            } else {
                window.requestAnimationFrame(() => {
                    window.removeEventListener('click', this.handleWindowClick);
                });
            }
        }
    }

    public componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClick);
    }

    public render() {
        const { isOpen, hangLeft } = this.state;
        const { optionMenuSize, options, className, stopPropagation, ...rest } = this.props;

        return (
            <div
                {...rest}
                ref={this.optionMenuRef}
                className={classNames({
                    [styles.optionMenu]: true,
                    [className]: className,
                })}
            >
                <IconButton
                    on={isOpen}
                    buttonSize={optionMenuSize}
                    onClick={this.handleClick}
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5C3 8.328 2.328 9 1.5 9C0.672 9 0 8.328 0 7.5C0 6.672 0.672 6 1.5 6C2.328 6 3 6.672 3 7.5ZM9 7.5C9 8.328 8.328 9 7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5ZM13.5 9C14.328 9 15 8.328 15 7.5C15 6.672 14.328 6 13.5 6C12.672 6 12 6.672 12 7.5C12 8.328 12.672 9 13.5 9Z" />
                    </svg>
                </IconButton>
                <ul
                    ref={this.optionListRef}
                    className={classNames({
                        [styles.optionList]: true,
                        [styles.isOpen]: isOpen,
                        [styles.hangLeft]: hangLeft,
                        [styles[optionMenuSize]]: true,
                    })}
                >
                    {options.map(o => (
                        <li
                            key={o.label}
                            className={styles.option}
                            onClick={(event: React.SyntheticEvent<HTMLLIElement>) => {
                                if (stopPropagation) event.stopPropagation();
                                this.handleOptionClick(o);
                            }}
                        >
                            {o.label}
                        </li>
                    ))}
                </ul>
            </div>
        );
    }
}