import React from 'react';
import PropTypes from 'prop-types';
import {findDOMNode} from 'react-dom';
import './styles/settings_header.css';

export class SettingsHeader extends React.PureComponent{

    componentDidUpdate(prevProps){
        const {isMenuOpen} = this.props;

        if(!prevProps.isMenuOpen && isMenuOpen){
            findDOMNode(this).classList.add('settings-header-opened');
        }else if(prevProps.isMenuOpen && !isMenuOpen){
            findDOMNode(this).classList.remove('settings-header-opened');
        }
    }

    render(){
        return <div className="settings-header">SETTINGS</div>
    }
}

SettingsHeader.propTypes = {
    isMenuOpen: PropTypes.bool
};

SettingsHeader.defaultProps = {
    isMenuOpen: false
};