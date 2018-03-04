import {createReducer} from 'redux-create-reducer';
import {prepareInitialBoardState} from '../utils/state';
import {
    CHANGE_CELL_STATE,
    START_CYCLE,
    NEXT_CYCLE,
    STOP_CYCLE,
    OPEN_SETTINGS,
    CLOSE_SETTINGS,
    RESET_BOARD,
    CHANGE_ALIVE_CELL_PROBABILITY,
    GENERATE_CELLS_RANDOMLY, CHANGE_RULE
} from '../constants/actions';
import {
    ALIVE,
    DEAD
} from '../constants/cell_contants';
import {calculateTableDimension} from '../utils/dom';

const boardDimension = calculateTableDimension();

const initialState = {
    cells: prepareInitialBoardState(),
    timerInterval: null,
    isMenuOpen: false,
    isGameTemporarilyPaused: false,
    aliveCellProbability: 10,
    rule: '23/3',
    presentationMode: 'html'
};

export default createReducer(initialState, {
    [CHANGE_CELL_STATE]: (state, action) => {
        return {
            ...state,
            cells: changeSingleCellState(state.cells, action.row, action.column)
        };
    },
    [START_CYCLE]: (state, action) => {
        return {
            ...state,
            timerInterval: action.timerId
        };
    },
    [NEXT_CYCLE]: state => {
        const ruleArray = state.rule.split('/');

        return {
            ...state,
            cells: changeCellsStateAfterCycle(state.cells, ruleArray)
        };
    },
    [STOP_CYCLE]: state => {
        return {
            ...state,
            timerInterval: null
        };
    },
    [OPEN_SETTINGS]: state => {
        return {
            ...state,
            isMenuOpen: true,
            isGameTemporarilyPaused: !!state.timerInterval
        };
    },
    [CLOSE_SETTINGS]: state => {
        return {
            ...state,
            isMenuOpen: false,
            isGameTemporarilyPaused: false
        };
    },
    [RESET_BOARD]: state => {
        return {
            ...state,
            cells: resetStateCells(state.cells),
            isGameTemporarilyPaused: false
        };
    },
    [CHANGE_ALIVE_CELL_PROBABILITY]: (state, action) => {
        return {
            ...state,
            aliveCellProbability: action.newProbabilityValue
        };
    },
    [GENERATE_CELLS_RANDOMLY]: (state, action) => {
        return {
            ...state,
            cells: generateRandomCells(state.cells, action.probability)
        };
    },
    [CHANGE_RULE]: (state, action) => {
        return {
            ...state,
            rule: action.rule
        };
    }
});

function resetStateCells(cells){
    const cellsCopy = {};

    for(let coords in cells){
        if(cells.hasOwnProperty(coords)){
            cellsCopy[coords] = DEAD;
        }
    }

    return cellsCopy;
}

function changeSingleCellState(cells, x, y){
    const cellCoordinates = `${x}x${y}`;
    const newCellState = cells[cellCoordinates] === DEAD ? ALIVE : DEAD;

    return {
        ...cells,
        [`${x}x${y}`]: newCellState
    }
}

function changeCellsStateAfterCycle(cells, rule){
    const cellsCopy = {};
    let examinedValue;
    let examinedNeighbours;

    for(let coords in cells){
        if(cells.hasOwnProperty(coords)){
            cellsCopy[coords] = {
                value: cells[coords],
                neighbourNumber: getCellNeighbourNumber(coords, cells)
            }
        }
    }

    for(let coords in cellsCopy){
        if(cellsCopy.hasOwnProperty(coords)){
            examinedValue = cellsCopy[coords].value;
            examinedNeighbours = cellsCopy[coords].neighbourNumber;

            cellsCopy[coords] = getNewCellState(examinedValue, examinedNeighbours, rule)
        }
    }

    return cellsCopy;
}

function getCellNeighbourNumber(coordinates, cells){
    const coordinatesArray = coordinates.split('x');
    const x = parseInt(coordinatesArray[0], 10);
    const y = parseInt(coordinatesArray[1], 10);
    let aliveNeighbourCount = 0;
    let examinedX;
    let examinedY;

    for(let i=-1; i<=1; i++){
        for(let j=-1; j<=1; j++){

            if(i !== 0 || j !== 0){

                if(x + i < 0){
                    examinedX = boardDimension.columns - 1;
                }else if(x + i >= boardDimension.columns){
                    examinedX = 0;
                }else{
                    examinedX = x + i;
                }

                if(y + j < 0){
                    examinedY = boardDimension.rows - 1;
                }else if(y + j >= boardDimension.rows){
                    examinedY = 0;
                }else{
                    examinedY = y + j;
                }

                if(cells[`${examinedX}x${examinedY}`] === ALIVE){

                    aliveNeighbourCount++;
                }
            }
        }
    }

    return aliveNeighbourCount;
}

function generateRandomCells(cells, probability){
    const cellsCopy = {};

    for(let coords in cells){
        if(cells.hasOwnProperty(coords)){
            cellsCopy[coords] = (Math.floor(Math.random() * 100) < probability) ? ALIVE : DEAD;
        }
    }

    return cellsCopy;
}

function getNewCellState(previousCellState, neighbourNumber, rule){
    const becomeAliveRule = rule[1].split('');
    const shouldCellRemainAliveRule = rule[0].split('');

    if(previousCellState === DEAD){
        for(let item of becomeAliveRule){
            if(parseInt(item, 10) === neighbourNumber){
                return ALIVE;
            }
        }
    }else if(previousCellState === ALIVE){
        for(let item of shouldCellRemainAliveRule){
            if(parseInt(item, 10) === neighbourNumber){
                return ALIVE;
            }
        }
    }

    return DEAD;
}