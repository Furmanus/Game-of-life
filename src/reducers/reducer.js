import {createReducer} from 'redux-create-reducer';
import {getPreparedStructureBoard, prepareInitialBoardState} from '../utils/state';
import {
    CHANGE_CELL_STATE,
    START_CYCLE,
    NEXT_CYCLE,
    STOP_CYCLE,
    OPEN_SETTINGS,
    CLOSE_SETTINGS,
    RESET_BOARD,
    CHANGE_ALIVE_CELL_PROBABILITY,
    GENERATE_CELLS_RANDOMLY,
    CHANGE_RULE,
    CHANGE_PRESENTATION_MODE,
    PREDEFINED_STRUCTURE_USE
} from '../constants/actions';
import {
    ALIVE,
    DEAD
} from '../constants/cell_contants';
import {
    calculateTableDimension,
    getAppContainerDimenstion
} from '../utils/dom';

let boardDimension;

const initialState = {
    aliveCells: [],
    timerInterval: null,
    isMenuOpen: false,
    isGameTemporarilyPaused: false,
    aliveCellProbability: 10,
    rule: '23/3',
    presentationMode: 'canvas'
};

export default createReducer(initialState, {
    [CHANGE_CELL_STATE]: (state, action) => {
        return {
            ...state,
            aliveCells: changeSingleCellState(state.aliveCells, action.row, action.column)
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
            aliveCells: changeCellsStateAfterCycle(state.aliveCells, ruleArray, state.presentationMode)
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
            aliveCells: [],
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
            aliveCells: generateRandomCells(action.probability, state.presentationMode)
        };
    },
    [CHANGE_RULE]: (state, action) => {
        return {
            ...state,
            rule: action.rule
        };
    },
    [CHANGE_PRESENTATION_MODE]: state => {
        const presentationMode = state.presentationMode === 'canvas' ? 'html' : 'canvas';

        return {
            ...state,
            presentationMode,
            cells: prepareInitialBoardState(presentationMode)
        };
    },
    [PREDEFINED_STRUCTURE_USE]: (state, action) => {
        return {
            ...state,
            aliveCells: getPreparedStructureBoard(action.structure, state.presentationMode)
        };
    }
});

//------------HELPER FUNCTIONS-------------------

function changeSingleCellState(aliveCells, x, y){
    const cellCoordinates = `${x}x${y}`;
    const aliveCellsCopy = [...aliveCells];

    if(aliveCellsCopy.includes(cellCoordinates)){
        aliveCellsCopy.splice(aliveCellsCopy.indexOf(cellCoordinates), 1);
    }else{
        aliveCellsCopy.push(cellCoordinates);
    }

    return aliveCellsCopy;
}

function changeCellsStateAfterCycle(aliveCells, rule, presentationMode){
    const aliveCellsCopy = [];
    const examinedAliveCells = {};
    const examinedDeadCells = {};
    let examinedCellNeighbourNumber;
    let examinedCellNewState;

    boardDimension = (presentationMode === 'canvas') ? getAppContainerDimenstion() : calculateTableDimension();

    for(let cell of aliveCells){
        calculateCellNeighbours(cell);
    }

    for(let cell in examinedAliveCells){
        if(examinedAliveCells.hasOwnProperty(cell)) {
            examinedCellNeighbourNumber = examinedAliveCells[cell];
            examinedCellNewState = getNewCellState(ALIVE, examinedCellNeighbourNumber, rule);

            if (examinedCellNewState === ALIVE) {
                aliveCellsCopy.push(cell);
            }
        }
    }

    for(let cell in examinedDeadCells){
        if(examinedDeadCells.hasOwnProperty(cell)) {
            examinedCellNeighbourNumber = examinedDeadCells[cell];
            examinedCellNewState = getNewCellState(DEAD, examinedCellNeighbourNumber, rule);

            if (examinedCellNewState === ALIVE) {
                aliveCellsCopy.push(cell);
            }
        }
    }

    return aliveCellsCopy;

    function calculateCellNeighbours(examinedCell){
        const coordinatesArray = examinedCell.split('x');
        const x = parseInt(coordinatesArray[0], 10);
        const y = parseInt(coordinatesArray[1], 10);
        let examinedNewX;
        let examinedNewY;
        let examinedNeighbourCell;

        examinedAliveCells[examinedCell] = 0;

        for(let i=-1; i<=1; i++){
            for(let j=-1; j<=1; j++){

                if(i !== 0 || j !== 0){

                    if(x + i < 0){
                        examinedNewX = boardDimension.columns - 1;
                    }else if(x + i >= boardDimension.columns){
                        examinedNewX = 0;
                    }else{
                        examinedNewX = x + i;
                    }

                    if(y + j < 0){
                        examinedNewY = boardDimension.rows - 1;
                    }else if(y + j >= boardDimension.rows){
                        examinedNewY = 0;
                    }else{
                        examinedNewY = y + j;
                    }

                    examinedNeighbourCell = `${examinedNewX}x${examinedNewY}`;

                    if(aliveCells.includes(examinedNeighbourCell)){
                        examinedAliveCells[examinedCell]++;
                    }else{
                        if(examinedDeadCells[examinedNeighbourCell]){
                            examinedDeadCells[examinedNeighbourCell]++;
                        }else{
                            examinedDeadCells[examinedNeighbourCell] = 1;
                        }
                    }
                }
            }
        }
    }
}

function generateRandomCells(probability, presentationMode){
    const aliveCells = [];
    let boardWidth;
    let boardHeight;

    boardDimension = (presentationMode === 'canvas') ? getAppContainerDimenstion() : calculateTableDimension();
    boardWidth = boardDimension.rows;
    boardHeight = boardDimension.columns;

    for(let i=0; i<boardWidth; i++){
        for(let j=0; j<boardHeight; j++){
            if(Math.floor(Math.random() * 100 < probability)){
                aliveCells.push(`${i}x${j}`);
            }
        }
    }

    return aliveCells;
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