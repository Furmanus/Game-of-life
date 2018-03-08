import React from 'react';
import autobind from 'autobind-decorator';
import {SettingsHeader} from './../components/settings_header';
import './styles/settings_container.css';
import {connect} from 'react-redux';
import {
    openSettings,
    closeSettings,
    resetBoard,
    stopCycle,
    startCycle,
    nextCycle,
    changeAliveCellProbability,
    generateCellsRandomly,
    changeRule,
    changePresentationMode
} from '../actions/action_creators';
import {Settings} from '../components/settings';

const mapStateToProps = state => {
    return {
        isMenuOpen: state.isMenuOpen,
        timerId: state.timerInterval,
        isGameTemporarilyPaused: state.isGameTemporarilyPaused,
        aliveCellProbability: state.aliveCellProbability
    };
};

const mapDispatchToProps = dispatch => {
    return {
        openSettings: () => {
            dispatch(openSettings());
        },
        closeSettings: () => {
            dispatch(closeSettings());
        },
        nextCycle: () => {
            dispatch(nextCycle());
        },
        resetBoard: () => {
            dispatch(stopCycle());
            dispatch(resetBoard());
        },
        stopCycle: timerId => {
            dispatch(stopCycle(timerId));
        },
        startCycle: () => {
            dispatch(startCycle());
        },
        changeAliveCellProbability: value => {
            dispatch(changeAliveCellProbability(value));
        },
        generateRandomCells: aliveProbability => {
            dispatch(generateCellsRandomly(aliveProbability));
        },
        changeRule: newRule => {
            dispatch(changeRule(newRule));
        },
        changePresentationMode: () => {
            dispatch(changePresentationMode());
        }
    };
};

class SettingsContainer extends React.PureComponent{

    componentDidUpdate(prevProps){
        const {
            isGameTemporarilyPaused,
            stopCycle,
            startCycle,
            isMenuOpen,
            timerId
        } = this.props;

        if(prevProps.timerId && isGameTemporarilyPaused){
            stopCycle(timerId);
        }else if(prevProps.isMenuOpen && !isMenuOpen && prevProps.isGameTemporarilyPaused){
            startCycle();
        }
    }
    @autobind
    onSettingsMenuMouseEnter(){
        this.props.openSettings();
    }
    @autobind
    onSettingsMenuMouseLeave(){
        this.props.closeSettings();
    }
    @autobind
    onProbabilitySelectChange(selectedValue){
        this.props.changeAliveCellProbability(selectedValue);
    }
    @autobind
    onRuleSelectChange(selectedValue){
        this.props.changeRule(selectedValue);
    }
    @autobind
    onResetButtonClick(){
        const {
            resetBoard
        } = this.props;

        resetBoard();
    }
    @autobind
    onGenerateCellsButtonClick(){
        const {
            aliveCellProbability,
            generateRandomCells
        } = this.props;

        generateRandomCells(aliveCellProbability);
    }
    @autobind
    onNextCycleButtonClick(){
        const {
            nextCycle
        } = this.props;

        nextCycle();
    }
    @autobind
    onChangePresentationMode(){
        const {
            resetBoard,
            changePresentationMode,
            stopCycle
        } = this.props;

        resetBoard();
        changePresentationMode();
    }

    render(){
        const {
            isMenuOpen,
            aliveCellProbability
        } = this.props;

        return (

            <div
                className={"settings-container"}
                onMouseEnter={this.onSettingsMenuMouseEnter}
                onMouseLeave={this.onSettingsMenuMouseLeave}
            >
                <SettingsHeader isMenuOpen={isMenuOpen}/>
                <Settings
                    isMenuOpen={isMenuOpen}
                    aliveCellProbability={aliveCellProbability}
                    onResetButtonClick={this.onResetButtonClick}
                    onProbabilitySelectChange={this.onProbabilitySelectChange}
                    onGenerateCellsButtonClick={this.onGenerateCellsButtonClick}
                    onNextCycleButtonClick={this.onNextCycleButtonClick}
                    onRuleSelectChange={this.onRuleSelectChange}
                    onPresentationModeSelectChange={this.onChangePresentationMode}
                />
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SettingsContainer);