import React from 'react';
import PropTypes from 'prop-types';
import autobind from 'autobind-decorator';
import './styles/select.css';

export class Select extends React.PureComponent{

    renderSelectOptions(options){
        return options.map(option => {
            return <option value={option.value} key={option.value}>{option.label}</option>
        });
    }
    @autobind
    onOptionChange(selectedOption){
        const {
            onChange
        } = this.props;

        onChange(selectedOption.currentTarget.value);
    }

    render(){
        const {
            options,
            label
        } = this.props;

        return (
            <div className="select-container">
                <p>{label}</p>
                <select
                    className="select-lc"
                    onChange={this.onOptionChange}
                >
                    {this.renderSelectOptions(options)}
                </select>
            </div>
        )
    }
}

Select.propTypes = {
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    label: PropTypes.string
};

Select.defaultProps = {
    label: 'Select...'
};