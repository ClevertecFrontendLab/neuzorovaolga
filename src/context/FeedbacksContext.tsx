import React, { createContext, useState } from 'react';

export interface GlobalStateInterface {
    createFeedback: (value: any) => void;
    feedbacks: any;
}
interface Props {
    children: React.ReactNode;
}

export const FeedbacksContext = createContext<GlobalStateInterface>({
    createFeedback: (value: any) => {
        return;
    },
    feedbacks: [],
});

export const FeedbacksProvider = ({ children }: Props) => {
    const [feedbacks, setFeedbacks] = useState([]);

    const createFeedback = (value: any) => {
        setFeedbacks(value);
    };

    return (
        <FeedbacksContext.Provider value={{ createFeedback, feedbacks }}>
            {children}
        </FeedbacksContext.Provider>
    );
};
