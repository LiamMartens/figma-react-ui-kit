import * as React from 'react';
import * as styles from 'src/scss/components/OptionMenu.scss';
import classNames from 'classnames';
import { IOptionMenuProps, IOption } from 'typings/OptionMenu';
import { IconButton } from './IconButton';
import { ControlSizes } from 'constants';
import { Portal } from 'react-portal';

interface IState {
    isOpen: boolean;
    hangLeft: boolean;
    boundingClientRect?: {
        top: number;
        left: number;
        width: number;
        height: number;
    };
}

export class OptionMenu<V = any> extends React.Component<IOptionMenuProps<V>, IState> {
    public OptionMenuRef = React.createRef<HTMLDivElement>();
    private optionListRef = React.createRef<HTMLUListElement>();

    public static defaultProps = {
        optionMenuSize: ControlSizes.S,
        stopPropagation: false,
    }

    public state = {
        isOpen: false,
        hangLeft: false,
    };

    private get isOpen() {
        const { open } = this.props;
        const { isOpen } = this.state;
        if (typeof open === 'boolean') {
            return open;
        }
        return isOpen;
    }

    private handleWindowClick = (event: Event) => {
        const { onClose } = this.props;
        if (
            this.isOpen
            && this.optionListRef.current
            && (!(event.target instanceof Node) || !this.optionListRef.current.contains(event.target as any))
        ) {
            this.setState({
                isOpen: false,
            }, onClose);
        }
    }

    private handleClick = (event: React.SyntheticEvent) => {
        const { stopPropagation, onOpen, portal, onClose } = this.props;
        const rect = this.OptionMenuRef.current.getBoundingClientRect() as DOMRect;
        if (stopPropagation) {
            event.stopPropagation();
            window.dispatchEvent(new Event('click'));
        }
        this.setState({
            isOpen: !this.isOpen,
            hangLeft: window.innerWidth < (rect.x + rect.width + 20),
            boundingClientRect: portal ? rect : undefined,
        }, this.isOpen ? onClose : onOpen);
    }

    private handleOptionClick = (opt: IOption) => {
        const { onClose } = this.props;
        opt.onClick(opt.value);
        this.setState({
            isOpen: false,
        }, onClose);
    }

    private renderOptionsList = () => {
        const { options, portal, portalScrollParent, portalScroll, stopPropagation, hangLeft: hangLeftOverride, optionMenuSize, optionListClassName = '' } = this.props;
        const { hangLeft, boundingClientRect } = this.state as IState;
        const s_top = portalScroll
            ? (typeof portalScroll.top === 'number' ? portalScroll.top : portalScroll.top())
            : (portalScrollParent ? portalScrollParent.scrollTop : document.body.scrollTop || document.documentElement.scrollTop);
        const s_left = portalScroll
            ? (typeof portalScroll.left === 'number' ? portalScroll.left : portalScroll.left())
            : (portalScrollParent ? portalScrollParent.scrollLeft : document.body.scrollLeft || document.documentElement.scrollLeft);

        return (
            <ul
                ref={this.optionListRef}
                className={classNames({
                    [styles.optionList]: true,
                    [styles.isOpen]: this.isOpen,
                    [styles.hangLeft]: (hangLeftOverride !== undefined && hangLeftOverride !== null) ? hangLeftOverride : hangLeft,
                    [styles[optionMenuSize]]: true,
                    [optionListClassName]: !!optionListClassName,
                })}
                style={{
                    ...(portal ? {
                        top: `${s_top + boundingClientRect.top}px`,
                        left: `${s_left + boundingClientRect.left}px`,
                        minWidth: `${boundingClientRect.width}px`,
                    } : {}),
                }}
            >
                {options.map(o => (
                    <li
                        key={o.label}
                        className={styles.option}
                        onClick={(event: React.SyntheticEvent<HTMLLIElement>) => {
                            if (stopPropagation) {
                                event.stopPropagation();
                            }
                            this.handleOptionClick(o);
                        }}
                    >
                        {o.label}
                    </li>
                ))}
            </ul>
        );
    }

    private handleWindowResize = (event: Event) => {
        if (this.isOpen) {
            this.setState({
                isOpen: false,
            });
        }
    }

    public componentDidUpdate(prevProps: IOptionMenuProps, prevState: IState) {
        const { isOpen } = this.state;
        const { open } = this.props;
        if (typeof open === 'boolean' ? open !== prevProps.open : isOpen !== prevState.isOpen) {
            if (this.isOpen) {
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

    public componentDidMount() {
        window.addEventListener('resize', this.handleWindowResize);
    }

    public componentWillUnmount() {
        window.removeEventListener('click', this.handleWindowClick);
        window.removeEventListener('resize', this.handleWindowResize);
    }

    public render() {
        const {
            portal,
            portalScroll,
            portalScrollParent,
            optionMenuSize,
            options,
            className,
            stopPropagation,
            extraRound,
            hangLeft: hangLeftOverride,
            open,
            onOpen,
            onClose,
            ...rest
        } = this.props;

        return (
            <div
                {...rest}
                ref={this.OptionMenuRef}
                className={classNames({
                    [styles.optionMenu]: true,
                    [styles.extraRound]: !!extraRound,
                    [className]: !!className,
                })}
            >
                <IconButton
                    on={this.isOpen}
                    extraRound={extraRound}
                    buttonSize={optionMenuSize}
                    onClick={this.handleClick}
                >
                    <svg width="15" height="15" viewBox="0 0 15 15" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M3 7.5C3 8.328 2.328 9 1.5 9C0.672 9 0 8.328 0 7.5C0 6.672 0.672 6 1.5 6C2.328 6 3 6.672 3 7.5ZM9 7.5C9 8.328 8.328 9 7.5 9C6.672 9 6 8.328 6 7.5C6 6.672 6.672 6 7.5 6C8.328 6 9 6.672 9 7.5ZM13.5 9C14.328 9 15 8.328 15 7.5C15 6.672 14.328 6 13.5 6C12.672 6 12 6.672 12 7.5C12 8.328 12.672 9 13.5 9Z" />
                    </svg>
                </IconButton>
                {this.isOpen && (
                    portal ? (
                        <Portal node={portal === true ? document.body : portal}>
                            {this.renderOptionsList()}
                        </Portal>
                    ) : (
                        this.renderOptionsList()
                    )
                )}
            </div>
        );
    }
}