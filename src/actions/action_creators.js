import {
    CHANGE_CELL_STATE,
    CLOSE_SETTINGS,
    NEXT_CYCLE,
    OPEN_SETTINGS,
    RESET_BOARD,
    START_CYCLE,
    STOP_CYCLE,
    CHANGE_ALIVE_CELL_PROBABILITY,
    GENERATE_CELLS_RANDOMLY,
    CHANGE_RULE
} from '../constants/actions';

export function changeCellState(x, y){
    return {
        type: CHANGE_CELL_STATE,
        row: x,
        column: y
    };
}
export function startCycle(){
    return dispatch => {

        const timerId = window.setInterval(() => {
            dispatch({
                type: NEXT_CYCLE
            });
        });

        dispatch({
            type: START_CYCLE,
            timerId
        });
    };
}
export function nextCycle(){
    return {
        type: NEXT_CYCLE
    };
}
export function stopCycle(timerId){
    window.clearInterval(timerId);

    return {
        type: STOP_CYCLE,
        timerId
    };
}
export function openSettings(){
    return {
        type: OPEN_SETTINGS
    };
}
export function closeSettings(){
    return {
        type: CLOSE_SETTINGS
    };
}
export function resetBoard(){
    return {
        type: RESET_BOARD,
    };
}
export function changeAliveCellProbability(newValue){
    return {
        type: CHANGE_ALIVE_CELL_PROBABILITY,
        newProbabilityValue: newValue
    };
}
export function generateCellsRandomly(aliveProbability){
    return {
        type: GENERATE_CELLS_RANDOMLY,
        probability: aliveProbability
    };
}
export function changeRule(rule){
    return {
        type: CHANGE_RULE,
        rule
    };
}