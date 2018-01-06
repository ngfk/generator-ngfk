import * as React from 'react';

import { Counter } from '../components/Counter';
import { HelloWorld } from '../components/HelloWorld';

export const App: React.SFC = () => (
    <React.Fragment>
        <HelloWorld />
        <Counter />
    </React.Fragment>
);
