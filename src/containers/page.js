import React from 'react';
import {connect} from 'react-redux';
import CanvasComponent from './../components/canvas_component';
import SettingsContainer from './settings_container';
import GameContainer from './game_container';

const mapStateToProps = state => {
    return {
        presentationMode: state.presentationMode
    };
};

class Page extends React.PureComponent{

    render(){
        const {
            presentationMode
        } = this.props;

        return (
            <div>
                {presentationMode === 'canvas' ? <CanvasComponent/> : <GameContainer/>}
                <SettingsContainer/>
            </div>
        );
    }
}

export default connect(mapStateToProps)(Page);