import { Component, ReactNode } from 'react'

import './DropDownMenu.css';

interface DDMIFace {
    children: ReactNode | ReactNode[] | undefined;
    rightIcon: ReactNode | undefined;
}

export class DropDownMenu extends Component<DDMIFace> implements DDMIFace {
    children : ReactNode | ReactNode[];
    rightIcon: ReactNode;

    constructor(props: DDMIFace)
    {
        super(props);
    }
    
    render() {
        return(
            <div className='dropdown-menu'>
                <div className='menu'>
                    {this.props.children}
                    <span className='icon-right'>{this.props.rightIcon}</span>
                </div>
            </div>
        );
    };
};