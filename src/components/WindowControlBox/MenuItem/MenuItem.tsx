import { Component, ReactElement, ReactNode } from 'react'

import { DropDownMenu } from '../../DropDownMenu/DropDownMenu';
import { DropMenuItem } from './DropMenuItem';

interface IMenuItem {
    menuItemName ?: string   ;
    dropMenuIcon ?: ReactNode;
    dropMenuChildren: ReactElement<DropMenuItem>;
}

export class MenuItem extends Component<IMenuItem> {
    constructor(props: IMenuItem)
    {
        super(props);

        this.state = {
            menuItemState: false,
        }
    }

    render() {
        const menuItemState = (this.state as { menuItemState: boolean }).menuItemState;
        return(
            <span 
                className='global-menu-item-class' 
                onMouseEnter={( ) => this.setState({ menuItemState: true  })}
                onMouseLeave={( ) => this.setState({ menuItemState: false })}
            >
                <span className='menu-item-button'>
                    <p>{ this.props.menuItemName }</p>
                </span>

                { menuItemState ? <DropDownMenu rightIcon={ this.props.dropMenuIcon } children={
                    <>
                        { this.props.dropMenuChildren }
                    </>
                }/> : '' }
            </span>
        );
    };
};