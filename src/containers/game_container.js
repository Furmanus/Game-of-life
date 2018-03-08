import React from 'react';
import autobind from 'autobind-decorator';
import './styles/game_container.css';
import Column from './../containers/column';
import {calculateTableDimension} from '../utils/dom';
import PropTypes from 'prop-types';
import {
    changeCellState,
    startCycle,
    stopCycle
} from '../actions/action_creators';
import {connect} from 'react-redux';
import {spaceKeyEventListener} from '../utils/events';

const mapStateToProps = state => {
    return {
        timerId: state.timerInterval
    }
};

const mapDispatchToProps = dispatch => {
    return {
        onCellClick: (x, y) => {
            dispatch(changeCellState(x, y))
        },
        startCycle: () => {
            dispatch(startCycle())
        },
        stopCycle: (timerId) => {
            dispatch(stopCycle(timerId))
        }
    }
};
class GameContainer extends React.PureComponent{

    constructor(props){
        super(props);

        this.spaceKeyEventListener = spaceKeyEventListener.bind(this);

        window.addEventListener('keydown', this.spaceKeyEventListener);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.spaceKeyEventListener);
    }

    @autobind
    renderTableContent(){
        const {onCellClick} = this.props;
        const tableDimenstions = calculateTableDimension();
        const rows = tableDimenstions.rows;
        const columns = tableDimenstions.columns;
        const tableContent = [];

        for(let i=0; i<columns; i++){
            tableContent[i] = (
                <Column
                    totalColumnsNumber={rows}
                    rowNumber={i}
                    key={`column: ${i}`}
                    onClick={onCellClick}
                />
            )
        }

        return tableContent;
    }

    render(){

        return (
            <table className='board-table'>
                <tbody>
                    {this.renderTableContent()}
                </tbody>
            </table>
        );
    }
}

GameContainer.propTypes = {
    timerId: PropTypes.number,
    onCellClick: PropTypes.func,
    startCycle: PropTypes.func.isRequired,
    stopCycle: PropTypes.func.isRequired
};

GameContainer.defaultProps = {
    timerId: null,
    onCellClick: () => {}
};

export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);