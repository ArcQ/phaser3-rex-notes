import Decorator from '../core/Nodes/Decorator.js';
import { SUCCESS, ERROR, FAILURE } from '../constants.js';

class RepeatUntilSuccess extends Decorator {

    constructor({
        maxLoop = -1,
        child = null,
        name = 'RepeatUntilSuccess'
    } = {}) {

        super({
            child,
            name,
            properties: {
                maxLoop
            },
        });

        this.maxLoopExpression = this.addNumberVariable(maxLoop);
        this.maxLoop = undefined;
    }

    open(tick) {
        tick.blackboard.set('i', 0, tick.tree.id, this.id);

        this.maxLoop = this.maxLoopExpression.eval(tick.blackboardContext);
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var i = tick.blackboard.get('i', tick.tree.id, this.id);
        var status = ERROR;

        while (this.maxLoop < 0 || i < this.maxLoop) {
            status = this.child._execute(tick);

            if (status == FAILURE) {
                i++;
            } else {
                break;
            }
        }

        i = tick.blackboard.set('i', i, tick.tree.id, this.id);
        return status;
    }
};

export default RepeatUntilSuccess;