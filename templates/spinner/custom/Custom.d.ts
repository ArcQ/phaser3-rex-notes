import Base from '../base/Base';
import { IConfig as IConfigBase } from '../base/Base';

export interface IConfig extends IConfigBase {
    create?: (
        {
            arc?: number | string | string[],
            circle?: number | string | string[],
            ellipse?: number | string | string[],
            line?: number | string | string[],
            lines?: number | string | string[],
            rectangle?: number | string | string[],
            triangle?: number | string | string[],
        } |
        ((this: Custom) => void)
    );

    update?: (this: Custom) => void;

    type?: string,
}

export default class Custom extends Base {
}