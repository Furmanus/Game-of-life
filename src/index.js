import React from 'react';
import ReactDOM from 'react-dom';
import GameContainer from './containers/game_container';
import {createStore, applyMiddleware} from 'redux';
import {Provider} from 'react-redux';
import reducer from './reducers/reducer';
import thunk from 'redux-thunk';
import Page from './containers/page';

let store = createStore(reducer, applyMiddleware(thunk));

ReactDOM.render(
    <Provider store={store}>
        <div>
            <Page/>
        </div>
    </Provider>,
    document.getElementById('app')
);