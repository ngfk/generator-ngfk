import * as React from 'react';

export interface CounterState {
    readonly count: number;
}

export class Counter extends React.Component<{}, CounterState> {
    public interval: number;

    public state: CounterState = {
        count: 0
    };

    public componentDidMount(): void {
        this.interval = window.setInterval(() => {
            this.setState(({ count }) => ({
                count: count + 1
            }));
        }, 1000);
    }

    public componentWillUnmount(): void {
        window.clearInterval(this.interval);
    }

    public render(): JSX.Element {
        const { count } = this.state;
        return <div>Count: {count}</div>;
    }
}
