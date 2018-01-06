import './index.scss';

import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { AppContainer } from 'react-hot-loader';

const root = document.getElementById('app');

const render = (Component: any) => {
    ReactDOM.render(
        <AppContainer>
            <Component />
        </AppContainer>,
        root
    );
};

const main = async () => {
    // Initial render
    const { App: InitialApp } = await import('./containers/App');
    render(InitialApp);

    // Re-render on hot module updates
    if (module.hot) {
        module.hot.accept('./containers/App', async () => {
            const { App: NextApp } = await import('./containers/App');
            render(NextApp);
        });
    }
};

main();
