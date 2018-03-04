import React from 'react';
import autobind from 'autobind-decorator';
import {Cell} from '../components/cell';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    ALIVE,
    GREEN,
    TRANSPARENT
} from "../constants/cell_contants";

const mapStateToProps = state => {
    return {
        cells: state.cells
    }
};

class Column extends React.PureComponent{

    @autobind
    renderColumns(){
        const {
            totalColumnsNumber,
            rowNumber,
            onClick,
            cells
        } = this.props;
        const columns = [];
        let examinedCellColour;

        for(let i=0; i<totalColumnsNumber; i++){
            examinedCellColour = cells[`${rowNumber}x${i}`] === ALIVE ? GREEN : TRANSPARENT;

            columns[i] = (
                <Cell
                    x={rowNumber}
                    y={i}
                    key={`cell:${rowNumber}x${i}`}
                    onClick={onClick}
                    colour={examinedCellColour}
                />
            );
        }

        return columns;
    }

    render(){
        return (
            <tr>
                {this.renderColumns()}
            </tr>
        );
    }
}

Column.propTypes = {
    cells: PropTypes.object.isRequired,
    totalColumnsNumber: PropTypes.number.isRequired,
    rowNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

Column.defaultProps = {
    onClick: () => {}
};

export default connect(mapStateToProps)(Column);