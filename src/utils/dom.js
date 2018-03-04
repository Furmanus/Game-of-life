import {
    GAME_BOARD_SCREEN_PERCENTAGE,
    TABLE_CELL_WIDTH
} from '../constants/number_constants';

export function calculateTableDimension(){
    const availWidth = document.body.clientWidth * GAME_BOARD_SCREEN_PERCENTAGE;
    const availHeight = document.body.clientHeight * GAME_BOARD_SCREEN_PERCENTAGE;
    const sideLength = (availWidth > availHeight) ? availHeight : availWidth;
    //left it as it is, in case of implementing board arena as rectangle
    return {
        rows: Math.floor(sideLength / TABLE_CELL_WIDTH),
        columns: Math.floor(sideLength / TABLE_CELL_WIDTH)
    };
}