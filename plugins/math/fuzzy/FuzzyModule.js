import { FuzzyModule as FuzzyModuleBase } from '../../utils/yuka/fuzzy/FuzzyModule.js';
import GetVariableName from './utils/GetVariableName.js';

class FuzzyModule extends FuzzyModuleBase {
    constructor() {
        super();

        this.dirty = true;
    }

    _fuzzify(name, value) {
        const flv = this.flvs.get(name);
        flv.fuzzify(value);

        this.dirty = true;
    }

    fuzzify(name, value) {
        if (typeof (name) === 'string') {
            this._fuzzify(name, value);

        } else {
            let names = name;
            for (name in names) {
                this._fuzzify(name, names[name]);
            }
        }

        return this;
    }

    _evaluate() {
        if (!this.dirty) {
            return;
        }

        const rules = this.rules;

        this._initConsequences();

        for (let i = 0, l = rules.length; i < l; i++) {
            rules[i].evaluate();
        }

        this.dirty = false;
    }

    _defuzzify(name, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {
        const flv = this.flvs.get(name);

        let value;
        switch (type) {
            case FuzzyModule.DEFUZ_TYPE.MAXAV:
                value = flv.defuzzifyMaxAv();
                break;

            case FuzzyModule.DEFUZ_TYPE.CENTROID:
                value = flv.defuzzifyCentroid();
                break;

            default:
                Logger.warn('YUKA.FuzzyModule: Unknown defuzzification method:', type);
                value = flv.defuzzifyMaxAv(); // use MaxAv as fallback
        }

        return value;
    }

    defuzzify(name, type = FuzzyModule.DEFUZ_TYPE.MAXAV) {

        this._evaluate();

        let result;
        if (typeof (name) === 'string') {
            result = this._defuzzify(name, type);

        } else if (Array.isArray(name)) {
            result = {};
            let names = name;
            for (let i = 0, cnt = names.length; i < cnt; i++) {
                name = names[i];
                result[name] = this._defuzzify(name, type);
            }
        } else {
            // Get all variable names of consequence        
            let names = [];
            let rules = this.rules;
            for (let i = 0, cnt = rules.length; i < cnt; i++) {
                let consequence = rules[i].consequence;
                let name = GetVariableName(consequence.name);

                if (names.indexOf(name) === -1) {
                    names.push(name);
                }
            }
            result = this.defuzzify(names, type);

        }

        return result;
    }
}

export { FuzzyModule };