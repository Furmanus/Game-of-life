import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import './styles/switch.css';

class ToggleSwitch extends React.PureComponent{

    constructor(props){
        super(props);

        this.state = {
            enabled: false
        };
    }
    @autobind
    onSwitchChange(ev){
        const {
            onChange
        } = this.props;
        const isSwitchOn = ev.target.checked;

        this.setState({
            enabled: isSwitchOn
        });
        onChange();
    }

    render(){
        const {
            label,
            onLabelText,
            offLabelText
        } = this.props;

        const {
            enabled
        } = this.state;

        return (
            <div>
                <p className="switch-label">{label}</p>
                <label className="switch">
                    <input onChange={this.onSwitchChange} type="checkbox"/>
                    <span className="slider round"/>
                </label>
                <p className="switch-status">{enabled ? onLabelText : offLabelText}</p>
            </div>
        );
    }
}

export default ToggleSwitch;

ToggleSwitch.propTypes = {
    label: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onLabelText: PropTypes.string,
    offLabelText: PropTypes.string
};

ToggleSwitch.defaultProps = {
    label: '',
    onLabelText: 'ON',
    offLabelText: 'OFF'
};