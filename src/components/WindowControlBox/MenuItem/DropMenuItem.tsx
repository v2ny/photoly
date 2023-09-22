import { Component, MouseEventHandler } from 'react'

interface IDropMenuItem {
    itemName        ?: string;
    itemShortcut    ?: string;
    itemOnClickEvent?: MouseEventHandler<HTMLSpanElement>;
}

export class DropMenuItem extends Component<IDropMenuItem> {
    constructor(props: IDropMenuItem)
    {
        super(props);
    }

    render() {
        return(
            <span className='dd-menu-item' onClick={this.props.itemOnClickEvent}>
                <p>{this.props.itemName}</p>
                <p className='opacity-40 font-light text-sm'>{this.props.itemShortcut}</p>
            </span>
        );
    };
};