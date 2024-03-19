export type Training = {
    _id?: string;
    name: string;
    date: string;
    isImplementation: boolean;
    userId?: string;
    parameters: {
        repeat: boolean;
        period: number;
        jointTraining: boolean;
        participants: string[];
    };
    exercises: Exercise[];
};

export type Exercise = {
    _id?: string;
    name: string;
    replays: number;
    weight: number;
    approaches: number;
    isImplementation: boolean;
    checked?: boolean;
};

export type TrainingsListItem = {
    name: string;
    key: string;
};
