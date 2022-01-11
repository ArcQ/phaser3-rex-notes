import Decorator from '../core/Nodes/Decorator.js';
import { FAILURE, SUCCESS, ERROR } from '../constants.js';


class Bypass extends Decorator {

    constructor({
        child = null,
        name = 'Bypass'
    } = {}) {

        super({
            child,
            name,
        });
    }

    tick(tick) {
        if (!this.child) {
            return ERROR;
        }

        var status = this.child._execute(tick);

        return status;
    }
};

export default Bypass;