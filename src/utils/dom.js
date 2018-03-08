import {
    GAME_BOARD_SCREEN_PERCENTAGE,
    TABLE_CELL_WIDTH,
    CANVAS_CELL_WIDTH
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

export function getAppContainerDimenstion(){
    let width = Math.floor(document.body.clientWidth * 0.7);
    let height = Math.floor(document.body.clientHeight * 0.9);
    let sideLength = (width > height) ? height : width;

    width -= width % CANVAS_CELL_WIDTH;
    height -= height % CANVAS_CELL_WIDTH;
    sideLength -= sideLength % CANVAS_CELL_WIDTH;

    return {
        rows: sideLength / CANVAS_CELL_WIDTH,
        columns: sideLength / CANVAS_CELL_WIDTH,
        width: sideLength,
        height: sideLength
    };
}