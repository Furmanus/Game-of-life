import React from 'react';
import './styles/settings.css';
import {findDOMNode} from "react-dom";
import {Button} from './button';
import {Select} from './select';

export class Settings extends React.PureComponent{

    componentDidUpdate(prevProps){
        const {isMenuOpen} = this.props;

        if(!prevProps.isMenuOpen && isMenuOpen){
            findDOMNode(this).classList.add('settings-opened');
        }else if(prevProps.isMenuOpen && !isMenuOpen){
            findDOMNode(this).classList.remove('settings-opened');
        }
    }

    getGenerationSelectOptions(){
        return [
            {value: 10, label: '10%'},
            {value: 20, label: '20%'},
            {value: 30, label: '30%'},
            {value: 40, label: '40%'},
            {value: 50, label: '50%'},
            {value: 60, label: '60%'},
            {value: 70, label: '70%'},
            {value: 80, label: '80%'},
            {value: 90, label: '90%'},
            {value: 100, label: '100%'},
        ];
    }

    getRuleSelectOptions(){
        return [
            {value: '23/3', label: '3/23 (default)'},
            {value: '1/1', label: '1/1 (growth)'},
            {value: '0/2', label: '0/2 (seeds)'},
            {value: '12345/3', label: '12345/3 (labyrinth)'},
            {value: '125/36', label: '125/36 (2x2)'},
            {value: '1357/1357', label: '1357/1357 (replicator)'},
            {value: '1358/357', label: '1358/357 (amoeba)'},
            {value: '2345/45678', label: '2345/45678 (cities)'},
            {value: '245/368', label: '245/368 (movement)'},
            {value: '5/345', label: '5/345 (long life)'},
        ];
    }

    render(){
        const {
            onResetButtonClick,
            onProbabilitySelectChange,
            onRuleSelectChange,
            onGenerateCellsButtonClick,
            onNextCycleButtonClick,
            aliveCellProbability
        } = this.props;

        return (
            <div className="settings">
                <div className="button-container">
                    <Select
                        options={this.getRuleSelectOptions()}
                        onChange={onRuleSelectChange}
                        label="Select rule:"
                    />
                    <Select
                        onChange={onProbabilitySelectChange}
                        label="Select probability of alive cell:"
                        options={this.getGenerationSelectOptions()}
                    />
                    <Button
                        onClick={onGenerateCellsButtonClick}
                        value='Generate'
                    />
                    <Button
                        onClick={onResetButtonClick}
                        value='Reset'
                    />
                    <Button
                        onClick={onNextCycleButtonClick}
                        value='Next cycle'
                    />
                </div>
                <h3>Press space to start or stop generator</h3>
            </div>
        );
    }
}