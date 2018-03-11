import React from 'react';
import {connect} from 'react-redux';
import {getAppContainerDimenstion} from '../utils/dom';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import {CANVAS_CELL_WIDTH} from '../constants/number_constants';
import {
    changeCellState,
    startCycle,
    stopCycle
} from '../actions/action_creators';
import {
    ALIVE,
    DEAD
} from '../constants/cell_contants';
import {spaceKeyEventListener} from '../utils/events';

const canvasStyle = {
    border: '1px solid #062F4F',
};

const mapStateToProps = state => {
    return {
        timerId: state.timerInterval,
        aliveCells: state.aliveCells,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        startCycle: () => {
            dispatch(startCycle())
        },
        stopCycle: (timerId) => {
            dispatch(stopCycle(timerId))
        },
        onCellClick: (x, y) => {
            dispatch(changeCellState(x, y));
        }
    }
};

class CanvasComponent extends React.Component{

    constructor(props){
        super(props);

        this.spaceKeyEventListener = spaceKeyEventListener.bind(this);

        window.addEventListener('keydown', this.spaceKeyEventListener);
    }

    componentDidMount(){
        const canvasDimenstions = getAppContainerDimenstion();

        this.refs.canvas.width = canvasDimenstions.width;
        this.refs.canvas.height = canvasDimenstions.height;
        this.ctx = this.refs.canvas.getContext('2d');
    }

    shouldComponentUpdate(nextProps){
        const {
            aliveCells
        } = this.props;
        const nextAliveCells = nextProps.aliveCells;
        let examinedCoord;

        for(let cell of aliveCells){
            if(!nextAliveCells.includes(cell)){
                examinedCoord = cell.split('x');

                this.clearRect(
                    parseInt(examinedCoord[0], 10),
                    parseInt(examinedCoord[1], 10)
                );
            }
        }

        for(let cell of nextAliveCells){
            if(!aliveCells.includes(cell)){
                examinedCoord = cell.split('x');

                this.fillRect(
                    parseInt(examinedCoord[0], 10),
                    parseInt(examinedCoord[1], 10),
                    '#1aff1a'
                );
            }
        }

        return false;
    }

    fillRect(x, y, color){
        this.ctx.fillStyle = color;
        this.ctx.fillRect(x * CANVAS_CELL_WIDTH, y * CANVAS_CELL_WIDTH, CANVAS_CELL_WIDTH, CANVAS_CELL_WIDTH);
    }

    componentWillUnmount(){
        window.removeEventListener('keydown', this.spaceKeyEventListener);
    }

    clearRect(x, y){
        this.ctx.clearRect(x * CANVAS_CELL_WIDTH, y * CANVAS_CELL_WIDTH, CANVAS_CELL_WIDTH, CANVAS_CELL_WIDTH);
    }

    @autobind
    handleClick(ev){
        const {
            onCellClick
        } = this.props;
        const canvasRect = this.refs.canvas.getBoundingClientRect();
        const eventX = Math.floor((ev.clientX - canvasRect.left) / CANVAS_CELL_WIDTH);
        const eventY = Math.floor((ev.clientY - canvasRect.top) / CANVAS_CELL_WIDTH);

        onCellClick(eventX, eventY);
    }
    render(){
        return (
            <canvas
                ref='canvas'
                style={canvasStyle}
                onClick={this.handleClick}
            >
                Your browser doesn't support HTML5 Canvas.
            </canvas>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CanvasComponent);

CanvasComponent.propTypes = {
    aliveCells: PropTypes.array.isRequired
};