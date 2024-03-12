import { Badge, BadgeProps } from 'antd';
import { useRef, useState } from 'react';
import { CreateTrainee } from '../create-trainee/create-trainee';
import { Training } from '@models/trainings';

type Props = {
    listData: Training[];
    date: string;
    handleCloseModal: () => void;
    activeDateModal: string;
    dateISO: string;
};
export const CalendarCell = ({
    listData,
    date,
    handleCloseModal,
    activeDateModal,
    dateISO,
}: Props) => {
    const cellRef = useRef<HTMLDivElement>(null);
    return (
        <div className='events' ref={cellRef}>
            {listData.map((item) => (
                <div key={item.id}>
                    <Badge status='success' text={item.name} />
                </div>
            ))}
            {date === activeDateModal && (
                <CreateTrainee
                    handleClose={handleCloseModal}
                    date={date}
                    dateISO={dateISO}
                    isRightPosition={
                        (cellRef?.current?.getBoundingClientRect?.()?.left || 0) + 264 >
                        window.innerWidth
                    }
                />
            )}
        </div>
    );
};
