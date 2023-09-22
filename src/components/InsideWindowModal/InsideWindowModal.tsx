import { Component, MouseEvent as RMouseEvent, ReactElement, ReactNode, RefObject, createRef } from 'react'

import CloseIcon from '../../assets/ControlBox/x.svg';

import './InsideWindowModal.css';

interface IIWModal {
    ModalName               : string;

    Draggable               : boolean;
    Closeabe                : boolean;

    Content                 : ReactNode | ReactNode[] | ReactElement | ReactElement[];
    Position               ?: string[];
    
    className              ?: string;
    onCloseButtonClick     ?: ( ) => void;
}

export class InsideWindowModal extends Component<IIWModal> {
    ModalControlBarRef  : RefObject<HTMLDivElement>;

    globalPositionX     : number = 0;
    globalPositionY     : number = 0;

    globalMPositionX    : number = 0;
    globalMPositionY    : number = 0;
    
    constructor(props: IIWModal)
    {
        super(props);
        this.ModalControlBarRef = createRef<HTMLDivElement>();   
    }

    componentDidMount(): void {
        document.addEventListener('mouseup', this.WModalControlBarMouseUp, false);
        
        if (this.props.Position != undefined)
        {
            if ( !this.ModalControlBarRef.current ) return;
            this.ModalControlBarRef.current.style.top  = this.props.Position[0];
            this.ModalControlBarRef.current.style.left = this.props.Position[1];
        }
    }

    WModalControlBarMouseDown = (event: RMouseEvent<HTMLSpanElement>) => {
        event.preventDefault();
        this.globalPositionX = event.clientX - event.currentTarget.getBoundingClientRect().left;
        this.globalPositionY = event.clientY - event.currentTarget.getBoundingClientRect().top + 48;
        document.addEventListener('mousemove', this.WModalControlBarMouseMove, false);
    }

    WModalControlBarMouseUp = ( ) => {
        document.removeEventListener('mousemove', this.WModalControlBarMouseMove, false);
    }

    WModalControlBarMouseMove = ( event: MouseEvent ) => {
        this.globalMPositionX = event.clientX - this.globalPositionX;
        this.globalMPositionY = event.clientY - this.globalPositionY;
        
        if (!this.ModalControlBarRef.current) return;
        const ModalContolBarRefTop    : number = Number(this.ModalControlBarRef.current.style.top.replace('px', '') );
        const ModalContolBarRefLeft   : number = this.ModalControlBarRef.current.getBoundingClientRect().left  ;
        const ModalContolBarRefRight  : number = this.ModalControlBarRef.current.getBoundingClientRect().right ;
        const ModalContolBarRefWidth  : number = this.ModalControlBarRef.current.getBoundingClientRect().width ;
        const ModalContolBarRefHeight : number = this.ModalControlBarRef.current.getBoundingClientRect().height;
         
        const ModalCurrentPositionSFZ : number = ModalContolBarRefHeight + ModalContolBarRefTop;
 
        const WindowInnerHeight       : number = window.innerHeight - 42;
        const WindowInnerWidth        : number = window.innerWidth;

        const ModalOffsetLeftPosition : number = (WindowInnerWidth - ModalContolBarRefLeft);
        
        {
            if (
                (ModalContolBarRefRight >= WindowInnerWidth && this.globalMPositionX >= (ModalContolBarRefRight - ModalContolBarRefWidth)) ||
                (ModalOffsetLeftPosition >= WindowInnerWidth && this.globalMPositionX <= (ModalContolBarRefRight - ModalContolBarRefWidth)) 
            ) return;

            this.ModalControlBarRef.current.style.left = this.globalMPositionX + 'px';
        }

        {
            if ( 
                (WindowInnerHeight - 2) <= (ModalCurrentPositionSFZ + 8) && 
                this.globalMPositionY > ModalContolBarRefTop 
            ) return;
    
            this.ModalControlBarRef.current.style.top  = this.globalMPositionY + 'px';
        }
    }

    render() {
        return(
            <div 
                className={
                    this.props.className != undefined ? 
                    'inside-window-modal ' + this.props.className : 
                    'inside-window-modal'
                }
                ref={this.ModalControlBarRef}
            >
                <span 
                    className='wmodal-control-bar' 
                    onMouseDown={this.WModalControlBarMouseDown}
                >
                    <p className='wmodal-control-bar-title opacity-40'>{this.props.ModalName}</p>
                    <span className='wmodal-control-bar-button inline-flex justify-center items-center'>
                        { 
                            this.props.Closeabe ? 
                            <img src={CloseIcon} className='invert self-center justify-self-center inline-flex' style={{
                                width: '20px',
                                height: '20px',
                            }} onClick={( event: RMouseEvent<HTMLImageElement> ) => {
                                event.preventDefault();
                                if (!this.props.onCloseButtonClick) return;
                                if (!this.ModalControlBarRef.current) return;
                                this.ModalControlBarRef.current.style.animationName = 'bg-sl-animation';
                                setTimeout(this.props.onCloseButtonClick, 196);
                            } }/> : '' 
                        }
                    </span>
                </span>
                <span className='wmodal-contents'>
                    {this.props.Content}
                </span>
            </div>
        );
    };
};