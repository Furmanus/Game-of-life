import React from 'react';
import PropTypes from 'prop-types';
import './styles/button.css';

export class Button extends React.PureComponent{

    render(){
        const {
            value,
            disabled,
            additionalClass,
            onClick
        } = this.props;

        return (
            <button
                type="button"
                value={value}
                disabled={disabled}
                onClick={onClick}
                className={`button-lc ${additionalClass instanceof Array ? additionalClass.join(' ') : additionalClass}`}
                title={value}
            >
                {value}
            </button>
        );
    }
}
Button.propTypes = {
    value: PropTypes.string,
    disabled: PropTypes.bool,
    additionalClass: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.array
    ]),
    onClick: PropTypes.func
};

Button.defaultProps = {
    value: 'Click',
    disabled: false,
    additionalClass: '',
    onClick: () => {}
};