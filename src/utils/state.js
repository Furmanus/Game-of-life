import {ALIVE, DEAD} from '../constants/cell_contants';
import {calculateTableDimension} from './dom';

export function prepareInitialBoardState(){
    const tableDimensions = calculateTableDimension();
    const tableInitialState = {};
    const rows = tableDimensions.rows;
    const columns = tableDimensions.columns;

    for(let i=0; i<columns; i++){
        for(let j=0; j<rows; j++){
            tableInitialState[`${i}x${j}`] = DEAD;
        }
    }

    return tableInitialState;
}