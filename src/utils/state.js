import {DEAD} from '../constants/cell_contants';
import {
    calculateTableDimension,
    getAppContainerDimenstion
} from './dom';
import {
    GLIDER,
    GOSPER_GLIDER_GUN,
    LIGHTWEIGHT_SPACESHIP
} from '../constants/predefined_structures';

export function prepareInitialBoardState(presentationMode){
    const tableDimensions = presentationMode === 'canvas' ? getAppContainerDimenstion() : calculateTableDimension();
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

export function getPreparedStructureBoard(structure, presentationMode){
    let preparedStructureData = [];
    const tableDimensions = presentationMode === 'canvas' ? getAppContainerDimenstion() : calculateTableDimension();
    const middlePoint = {
        x: Math.floor(tableDimensions.rows / 2),
        y: Math.floor(tableDimensions.columns / 2)
    };

    switch(structure){
        case GLIDER:
            preparedStructureData = [
                `${middlePoint.x - 1}x${middlePoint.y + 1}`,
                `${middlePoint.x}x${middlePoint.y + 1}`,
                `${middlePoint.x + 1}x${middlePoint.y + 1}`,
                `${middlePoint.x + 1}x${middlePoint.y}`,
                `${middlePoint.x}x${middlePoint.y - 1}`,
            ];
            break;
        case LIGHTWEIGHT_SPACESHIP:
            preparedStructureData = [
                `${middlePoint.x - 2}x${middlePoint.y + 1}`,
                `${middlePoint.x - 1}x${middlePoint.y + 1}`,
                `${middlePoint.x}x${middlePoint.y + 1}`,
                `${middlePoint.x + 1}x${middlePoint.y + 1}`,
                `${middlePoint.x - 3}x${middlePoint.y}`,
                `${middlePoint.x + 1}x${middlePoint.y}`,
                `${middlePoint.x + 1}x${middlePoint.y - 1}`,
                `${middlePoint.x}x${middlePoint.y - 2}`,
                `${middlePoint.x - 3}x${middlePoint.y - 2}`,
            ];
            break;
        case GOSPER_GLIDER_GUN:
            preparedStructureData = [
                `${middlePoint.x - 19}x${middlePoint.y}`,
                `${middlePoint.x - 18}x${middlePoint.y}`,
                `${middlePoint.x - 19}x${middlePoint.y + 1}`,
                `${middlePoint.x - 18}x${middlePoint.y + 1}`,
                `${middlePoint.x - 9}x${middlePoint.y}`,
                `${middlePoint.x - 9}x${middlePoint.y + 1}`,
                `${middlePoint.x - 9}x${middlePoint.y + 2}`,
                `${middlePoint.x - 8}x${middlePoint.y - 1}`,
                `${middlePoint.x - 8}x${middlePoint.y + 3}`,
                `${middlePoint.x - 7}x${middlePoint.y - 2}`,
                `${middlePoint.x - 7}x${middlePoint.y + 4}`,
                `${middlePoint.x - 6}x${middlePoint.y - 2}`,
                `${middlePoint.x - 6}x${middlePoint.y + 4}`,
                `${middlePoint.x - 5}x${middlePoint.y + 1}`,
                `${middlePoint.x - 4}x${middlePoint.y - 1}`,
                `${middlePoint.x - 4}x${middlePoint.y + 3}`,
                `${middlePoint.x - 3}x${middlePoint.y}`,
                `${middlePoint.x - 3}x${middlePoint.y + 1}`,
                `${middlePoint.x - 3}x${middlePoint.y + 2}`,
                `${middlePoint.x - 2}x${middlePoint.y + 1}`,
                `${middlePoint.x + 1}x${middlePoint.y - 2}`,
                `${middlePoint.x + 1}x${middlePoint.y - 1}`,
                `${middlePoint.x + 1}x${middlePoint.y}`,
                `${middlePoint.x + 2}x${middlePoint.y - 2}`,
                `${middlePoint.x + 2}x${middlePoint.y - 1}`,
                `${middlePoint.x + 2}x${middlePoint.y}`,
                `${middlePoint.x + 3}x${middlePoint.y - 3}`,
                `${middlePoint.x + 3}x${middlePoint.y + 1}`,
                `${middlePoint.x + 5}x${middlePoint.y - 4}`,
                `${middlePoint.x + 5}x${middlePoint.y - 3}`,
                `${middlePoint.x + 5}x${middlePoint.y + 1}`,
                `${middlePoint.x + 5}x${middlePoint.y + 2}`,
                `${middlePoint.x + 15}x${middlePoint.y - 1}`,
                `${middlePoint.x + 16}x${middlePoint.y - 1}`,
                `${middlePoint.x + 15}x${middlePoint.y - 2}`,
                `${middlePoint.x + 16}x${middlePoint.y - 2}`
            ];
            break;
    }

    return preparedStructureData;
}