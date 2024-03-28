import { Badge } from 'antd';
import { MouseEventHandler, useRef } from 'react';
import { TrainingModal } from '../training-modal/training-modal';
import { Training } from '@models/trainings';
import { colorBadge } from '@utils/bage';
import type { Moment } from 'moment';
import moment from 'moment';
import styles from './calendar-cell.module.css';
import classnames from 'classnames';
import useWindowDimensions from '@hooks/useWindowDimensions';

const TRAINING_MODAL_WIDTH = 264;

type Props = {
    listData: Training[];
    value: Moment;
    handleCloseModal: () => void;
    handleDate: (date: string) => void;
    activeDateModal?: string;
};
export const CalendarCell = ({
    listData,
    value,
    handleCloseModal,
    activeDateModal,
    handleDate,
}: Props) => {
    const cellRef = useRef<HTMLDivElement>(null);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const date = value.format('DD.MM.yyyy');
    const today = moment().format('DD.MM.yyyy');
    const isToday = today === date;

    const dateISO = value.toISOString();
    const isBlueDate = isMobile && !!listData.length;

    const handleDateClick: MouseEventHandler<HTMLDivElement> = (event) => {
        event.stopPropagation();
        if (date !== activeDateModal) {
            handleDate(date);
        }
    };

    return (
        <div
            className={classnames(
                styles.cellWrapper,
                isBlueDate && styles.bluBackground,
                isToday && styles.today,
            )}
            onClick={handleDateClick}
            ref={cellRef}
        >
            {value.date()}
            {!isMobile && (
                <div className={styles.events}>
                    {listData.map((item) => (
                        <div key={item._id}>
                            <Badge status={colorBadge(item.name)} text={item.name} />
                        </div>
                    ))}
                </div>
            )}
            {date === activeDateModal && (
                <TrainingModal
                    handleClose={handleCloseModal}
                    date={date}
                    dateISO={dateISO}
                    listData={listData}
                    isRightPosition={
                        (cellRef?.current?.getBoundingClientRect?.()?.left || 0) +
                            TRAINING_MODAL_WIDTH >
                        window.innerWidth
                    }
                />
            )}
        </div>
    );
};
