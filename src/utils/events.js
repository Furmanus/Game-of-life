export function spaceKeyEventListener(ev){
    if(ev.keyCode === 32){
        ev.preventDefault();

        if(this.props.timerId){
            this.props.stopCycle(this.props.timerId);
        }else {
            this.props.startCycle();
        }
    }
};