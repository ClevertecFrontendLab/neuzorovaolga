import { Badge, BadgeProps } from 'antd';
import { useRef, useState } from 'react';
import { TrainingModal } from '../training-modal/training-modal';
import { Training } from '@models/trainings';

const TRAINING_MODAL_WIDTH = 264;

type Props = {
    listData: Training[];
    date: string;
    handleCloseModal: () => void;
    activeDateModal?: string;
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
    console.log(listData);

    return (
        <div className='events' ref={cellRef}>
            {date === activeDateModal && (
                <TrainingModal
                    listData={listData}
                    handleClose={handleCloseModal}
                    date={date}
                    dateISO={dateISO}
                    isRightPosition={
                        (cellRef?.current?.getBoundingClientRect?.()?.left || 0) +
                            TRAINING_MODAL_WIDTH >
                        window.innerWidth
                    }
                />
            )}
            {listData.map((item) => (
                <div key={item._id}>
                    <Badge status='success' text={item.name} />
                </div>
            ))}
        </div>
    );
};
