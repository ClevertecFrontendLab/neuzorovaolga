export type Profile = {
    email: string;
    firstName?: string;
    lastName?: string;
    birthday?: string;
    imgSrc?: string;
    readyForJointTraining: boolean;
    sendNotification: boolean;
    tariff?: {
        tariffId: string;
        expired: string;
    };
};

export type TariffItem = {
    _id: string;
    name: string;
    isActive?: boolean;
    periods?: [
        {
            text: string;
            cost: number;
            days: number;
        },
    ];
};
