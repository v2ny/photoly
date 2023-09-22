import { Component, PropsWithChildren, RefObject, createRef } from 'react'
import { window, dialog } from '@tauri-apps/api';
import { MenuItem } from './MenuItem/MenuItem';
import { DropMenuItem } from './MenuItem/DropMenuItem';

import './WindowControlBox.css';

import CloseIcon from '../../assets/ControlBox/x.svg';
import MinimizeIcon from '../../assets/ControlBox/minus.svg';
import MaximizeIcon from '../../assets/ControlBox/square_unstacked.svg';
import RestoreIcon from '../../assets/ControlBox/squares_stack.svg';

interface StateInterface {
    fileMenu: {
        state: boolean
    }
}

export class WindowGlobalEvents {
    public static openProject = ( ): Promise<string | string[] | null> => {
        return dialog.open({ recursive: true, title: 'Open Uvilc Photoly Project', multiple: false, filters: [{
            name: 'Uvilc Photoly Project',
            extensions: ['upy'],
        }] }).then(v => v)
    }
}

class WindowGlobalShortcuts {
    public static isOpenProjectCombinationKeysPressed = JSON.parse(JSON.stringify({
        'o': false,
        'p': false,
    }));
}

export class WindowControlBox extends Component {
    MaximizeImageRef: RefObject<HTMLImageElement>;

    CurrentState: StateInterface = {
        fileMenu: {
            state: false,
        }
    };

    constructor(props: PropsWithChildren)
    {
        super(props);

        this.MaximizeImageRef = createRef<HTMLImageElement>();

        this.state = this.CurrentState;
    }

    WindowShortcutsRegisterer = ( ) => {
        document.addEventListener('keydown', ( kbd ) => {
            if ( !kbd.ctrlKey ) return;

            kbd.preventDefault();

            const currentKbdKey: string = kbd.key.toLowerCase();
            const IOPCKP = WindowGlobalShortcuts.isOpenProjectCombinationKeysPressed;
            IOPCKP[currentKbdKey] = true;
            if ( IOPCKP['o'] && IOPCKP['p'] )
                return this.OpenProject();
        });

        document.addEventListener('keyup', ( kbd ) => {
            const currentKbdKey: string = kbd.key.toLowerCase();
            const IOPCKP = WindowGlobalShortcuts.isOpenProjectCombinationKeysPressed;
            IOPCKP[currentKbdKey] = false;
        });
    }

    componentDidMount()
    {
        setInterval(async ( ) => {
            const IS_TAURI_MAXIMIZED = await window.appWindow.isMaximized();
            IS_TAURI_MAXIMIZED ? this.MaximizeButtonIsToggled() : this.MaximizeButtonIsNotToggled();
        }, 200);
        
        this.WindowShortcutsRegisterer();
    }

    MaximizeButtonIsToggled = ( ) => {
        if (!this.MaximizeImageRef.current) return;
        this.MaximizeImageRef.current.src = RestoreIcon;
        this.MaximizeImageRef.current.style.transform = 'scaleX(-1)';
    }

    MaximizeButtonIsNotToggled = ( ) => {
        if (!this.MaximizeImageRef.current) return;
        this.MaximizeImageRef.current.src = MaximizeIcon;
        this.MaximizeImageRef.current.style.transform = 'scaleX(1)';
    }

    OpenProject = ( ) => {
        WindowGlobalEvents.openProject()
    }

    render() {
        return(
            <div className='window-control-bar-tauri-support'>
                <div data-tauri-drag-region className='window-control-bar'>
                    {/* Left Area */}
                    <span>
                        <MenuItem menuItemName='Project' dropMenuChildren={
                            <>
                                <DropMenuItem itemName='New Project' itemShortcut='Ctrl+N+P'/>
                                <DropMenuItem itemName='Open Project' itemShortcut='Ctrl+O+P' itemOnClickEvent={this.OpenProject}/>
                            </>
                        }/>
                    </span>
                    {/* Right */}
                    <span>
                        <span onClick={( ) => window.appWindow.minimize()} className='control-bar-button inline-flex justify-center items-center default-color'>
                            <img src={MinimizeIcon} className='invert self-center justify-self-center inline-flex' style={{
                                width: '15px',
                                height: '15px',
                            }}/>
                        </span>
                        <span onClick={( ) => window.appWindow.toggleMaximize()} className='control-bar-button inline-flex justify-center items-center default-color'>
                            <img ref={this.MaximizeImageRef} src={MaximizeIcon} className='invert self-center justify-self-center inline-flex' style={{
                                width: '15px',
                                height: '15px',
                            }}/>
                        </span>
                        <span onClick={( ) => window.appWindow.close()} className='control-bar-button inline-flex justify-center items-center close-color'>
                            <img src={CloseIcon} className='invert self-center justify-self-center inline-flex' style={{
                                width: '24px',
                                height: '24px',
                            }}/>
                        </span>
                    </span>
                </div>
            </div>
        );
    };
};