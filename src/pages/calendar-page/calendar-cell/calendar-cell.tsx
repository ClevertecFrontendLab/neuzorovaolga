import { Badge, BadgeProps } from 'antd';
import { useState } from 'react';
import { CreateTrainee } from '../create-trainee/create-trainee';

type ListItemType = {
    id: number;
    content: string;
    date: string;
    status: string;
};

type Props = {
    listData: ListItemType[];
    date: string;
    handleCloseModal: () => void;
    activeDateModal: string;
};
export const CalendarCell = ({ listData, date, handleCloseModal, activeDateModal }: Props) => {
    return (
        <div className='events'>
            {listData.map((item) => (
                <div key={item.id}>
                    <Badge status={item.status as BadgeProps['status']} text={item.content} />
                </div>
            ))}
            {date === activeDateModal && (
                <CreateTrainee handleClose={handleCloseModal} date={date} />
            )}
        </div>
    );
};
