import { Component, PropsWithChildren } from 'react'
import './App.css';
import { WindowControlBox } from './components/WindowControlBox/WindowControlBox';

import {
    Link,
    MemoryRouter,
    Route,
    Routes,
} from 'react-router-dom';
import { MainPage } from './pages/MainPage/MainPage';

export class App extends Component {
    constructor(props: PropsWithChildren)
    {
        super(props);
    }

    render() {
        return(
            <>
                <WindowControlBox/>
                <div className='memory-router-viewarea'>
                    <MemoryRouter future={{ v7_startTransition: true }}>
                        <Routes>
                            <Route path='/' element={<MainPage/>}/>
                            <Route path='col' element={<Link to='/'>fantastic cocacolastic bombasitc</Link>}/>
                        </Routes>
                    </MemoryRouter>
                </div>
            </>
        );
    };
};