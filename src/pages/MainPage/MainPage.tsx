import { Component, PropsWithChildren } from 'react'

import { WindowGlobalEvents } from '../../components/WindowControlBox/WindowControlBox';
import { invoke } from '@tauri-apps/api';

import { InsideWindowModal } from '../../components/InsideWindowModal/InsideWindowModal';

import PlusIcon from '../../assets/Icons/plus.svg';
import HelpIcon from '../../assets/Icons/help-circle.svg';
import FileIcon from '../../assets/Icons/file.svg';

import './MainPage.css';
import './IWModal.css';

type appearance = 'visible' | 'invisible';

interface currentState
{
    NewProjectIWM: {
        visibilty: appearance
    }
}

export class MainPage extends Component {
    constructor(props: PropsWithChildren)
    {
        super(props);

        this.state = {
            NewProjectIWM: {
                visibilty: 'invisible'
            }
        } as currentState;
    }
    
    getHelpEventHandler = ( ) => {
        (async ( ) => {
            await invoke('open_external_url', { url: 'https://youtube.com' });
        })();
    }

    newProjectEventHandler = ( ) => {
        this.setState({
            NewProjectIWM: {
                visibilty: 'visible'
            }
        } as currentState);
    }

    render() {
        const state: currentState = this.state as unknown as currentState;
        return(
            <div className='overflow-hidden'>
                <div className='grid-splitter min-w-full select-none'>
                    <span className='text-area justify-end items-end'>
                        <p className='text-xl inline-flex gap-2 mt-24'><span className='inline-flex font-extrabold w-1 h-3 rounded-sm bg-white align-middle justify-self-center self-center'></span>Recent Projects</p>
                    </span>
                    <span className='wide-text-area justify-end items-end'>
                        <p className='text-xl inline-flex gap-2 ml-12 mt-24 absolute'><span className='inline-flex font-extrabold w-1 h-3 rounded-sm bg-white align-middle justify-self-center self-center'></span>Welcome to Uvilc Photoly, The home of all designers.</p>
                    </span>
                    <div className='content-area'>
                        <div className='flex flex-col'>
                            <span className='project-item'>
                                <p className='project-name'>Project.upy</p>
                                <p className='project-date opacity-30 font-extralight text-sm'>9/21/2023</p>
                            </span>
                            <span className='project-item'>
                                <p className='project-name'>Untitled-1.upy</p>
                                <p className='project-date opacity-30 font-extralight text-sm'>8/12/2022</p>
                            </span>
                            <span className='project-item'>
                                <p className='project-name'>Untitled-2.upy</p>
                                <p className='project-date opacity-30 font-extralight text-sm'>5/02/2020</p>
                            </span>
                        </div>
                    </div>

                    <div className='wide-content-area ml-12'>
                        <div className='inline-flex gap-3'>
                            <span className='project-square' onClick={this.newProjectEventHandler}>
                                <img className='square-icon invert' src={PlusIcon}/>
                                <p className='square-name'>New Project</p>
                            </span>
                            <span className='project-square' onClick={WindowGlobalEvents.openProject}>
                                <img className='square-icon invert' src={FileIcon}/>
                                <p className='square-name'>Open Project</p>
                            </span>
                            <span className='project-square' onClick={this.getHelpEventHandler}>
                                <img className='square-icon invert' src={HelpIcon}/>
                                <p className='square-name'>Get Help</p>
                            </span>
                        </div>
                    </div>
                </div>
                {
                    state.NewProjectIWM.visibilty == 'invisible' ? (
                    <InsideWindowModal 
                        Closeabe Draggable 
                        ModalName='New Project'
                        Position={['15%', '15%']}
                        Content={
                            <div className='iwm-window'>
                                <div className='first-preview-area'>
                                    <span className='iwm-preview'>
                                        <p className='text-black px-12'>Second to agriculture,&nbsp;<p className='pre-select'>humbug</p>&nbsp;is the biggest&nbsp;<p className='pre-select'>industry of our age.</p></p>
                                        <p className='text-black px-12 font-bold'><p className='pre-select'>Second to agriculture</p>, humbug is the biggest industry of our age.</p>
                                    </span>
                                </div>
                                <div className='style-area'>
                                    <span className='long-gray-line'></span>
                                </div>
                                <div className='second-settings-area '>
                                
                                </div>
                            </div>
                        }
                        onCloseButtonClick={( ) => this.setState({
                            NewProjectIWM: {
                                visibilty: 'invisible'
                            }
                        } as currentState)}
                    />) : ''
                }
            </div>
        );
    };
};