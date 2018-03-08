import React from 'react';
import autobind from 'autobind-decorator';
import PropTypes from 'prop-types';
import './styles/cell.css';

export class Cell extends React.PureComponent{

    @autobind
    onCellClick(){
        const {
            onClick,
            x,
            y
        } = this.props;

        onClick(x, y);
    }

    @autobind
    getCellStyles(){
        const {colour} = this.props;

        return{
            background: `radial-gradient(${colour} 60%, transparent 40%)`
        }
    }

    render(){

        return <td style={this.getCellStyles()} onClick={this.onCellClick}/>
    }
}

Cell.propTypes = {
    colour: PropTypes.string,
    x: PropTypes.number.isRequired,
    y: PropTypes.number.isRequired
};

Cell.defaultProps = {
    colour: 'transparent'
};