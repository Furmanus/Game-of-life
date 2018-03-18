import React from 'react';
import {connect} from 'react-redux';
import autobind from 'autobind-decorator';
import './styles/turn_counter_container.css';
import {Button} from "../components/button";
import {startCycle, stopCycle} from "../actions/action_creators";
import TurnCounter from '../components/turn_counter';

const mapStateToProps = state => {
    return {
        timerInterval: state.timerInterval,
        turn: state.turn
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startCycle: () => {
            dispatch(startCycle());
        },
        stopCycle: timerInterval => {
            dispatch(stopCycle(timerInterval));
        }
    };
};
class TurnCounterContainer extends React.PureComponent{
    @autobind
    stopCyclesGenerator(){
        const {
            stopCycle,
            timerInterval
        } = this.props;

        stopCycle(timerInterval);
    }

    render(){
        const {
            timerInterval,
            startCycle,
            turn
        } = this.props;

        return (
            <div className="turn-counter-container">
                <Button
                    value={!!timerInterval ? "Stop" : "Start"}
                    onClick={!!timerInterval ? this.stopCyclesGenerator : startCycle}
                />
                <TurnCounter
                    turn={turn}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TurnCounterContainer);