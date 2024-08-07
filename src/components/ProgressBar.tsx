import React, { useEffect, useState } from "react";
import { UseState } from "../types";

export interface ProgressBarProps {
    // Should be in the range of [0; 1].
    progress?: number;

    // If `fake` is a positive number, simulate progress for that many seconds.
    fake?: number;
}

async function sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = (props: ProgressBarProps): JSX.Element => {
    const [progress, setProgress]: UseState<number> = useState<number>(props.progress ?? 0);

    if (props.fake != null && props.fake > 0) {
        const fake: number = props.fake ?? 4;

        useEffect(() => {
            let isMounted: boolean = true;

            const updateProgress: () => Promise<void> = async (): Promise<void> => {
                while (isMounted && progress < 1) {
                    const step: number = Math.random() * (1 - progress) * .25;
                    const zzz: number = Math.max(80, Math.round(step * fake * 1000));
                    await sleep(zzz);
                    if (isMounted) {
                        setProgress(
                            (prev: number): number => {
                                const next: number = Math.min(prev + step, 1);
                                return next < .98 ? next : 1;
                            }
                        );
                    }
                }
            };

            updateProgress();

            return () => {
                isMounted = false;
            };
        }, [progress]);
    }

    const percentage: number = Math.round(100 * progress);
    const width: string = `${percentage}%`;

    return (
        <div className="progress">
            <div
                className="progress-bar progress-bar-striped progress-bar-animated"
                role="progressbar"
                style={ {width} }
                aria-valuenow={percentage}
                aria-valuemin={0}
                aria-valuemax={100}>
                {percentage}%
            </div>
        </div>
    );
}

export default ProgressBar;
