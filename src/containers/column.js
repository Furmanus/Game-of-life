import React from 'react';
import autobind from 'autobind-decorator';
import {Cell} from '../components/cell';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import {
    GREEN,
    TRANSPARENT
} from '../constants/cell_contants';

const mapStateToProps = state => {
    return {
        aliveCells: state.aliveCells
    }
};

class Column extends React.PureComponent{

    @autobind
    renderColumns(){
        const {
            totalColumnsNumber,
            rowNumber,
            onClick,
            aliveCells
        } = this.props;
        const columns = [];
        let examinedCellColour;

        for(let i=0; i<totalColumnsNumber; i++){
            examinedCellColour = aliveCells.includes(`${rowNumber}x${i}`) ? GREEN : TRANSPARENT;

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
    aliveCells: PropTypes.array.isRequired,
    totalColumnsNumber: PropTypes.number.isRequired,
    rowNumber: PropTypes.number.isRequired,
    onClick: PropTypes.func
};

Column.defaultProps = {
    onClick: () => {}
};

export default connect(mapStateToProps)(Column);