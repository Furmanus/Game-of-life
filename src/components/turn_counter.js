import React from 'react';
import PropTypes from 'prop-types';
import './styles/turn_counter.css';

class TurnCounter extends React.PureComponent{

    render(){
        const {
            turn
        } = this.props;

        return (
            <p className="turn-counter">
                Generation:
                <span>
                    {` ${turn}`}
                </span>
            </p>
        );
    }
}

export default TurnCounter;

TurnCounter.propTypes = {
    turn: PropTypes.number
};

TurnCounter.defaultProps = {
    turn: 0
};