import { Menu } from '@pages/main-page/menu/menu';
import styles from './calendar-page.module.css';

import 'antd/dist/antd.css';

import { Badge, BadgeProps, Calendar } from 'antd';
import type { Moment } from 'moment';
import { useState } from 'react';
import { CreateTrainee } from './create-trainee/create-trainee';
import { CalendarCell } from './calendar-cell/calendar-cell';

export const CalendarPage = () => {
    const [activeDateModal, setActiveDateModal] = useState('');

    const handleDateClick = (date: string) => {
        setActiveDateModal(date);
    };
    const handleCloseModal = () => {
        setActiveDateModal('');
    };

    const data = [
        {
            id: 1,
            content: 'Example',
            date: '01/02/2024',
            status: 'error',
        },
        {
            id: 3,
            content: 'Example1',
            status: 'success',
            date: '01/02/2024',
        },
        {
            id: 2,
            content: 'Example2',
            status: 'warning',
            date: '02/02/2024',
        },
    ];

    const dateCellRender = (value: Moment) => {
        const stringValue = value.format('DD.MM.yyyy');
        const listData = data.filter(({ date }) => date === stringValue);

        return (
            <CalendarCell
                listData={listData}
                date={stringValue}
                handleCloseModal={handleCloseModal}
                activeDateModal={activeDateModal}
            />
        );
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.feedbacksWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText}>Главная /</p> <p>&nbsp;Календарь</p>
                </div>

                <Calendar
                    dateCellRender={dateCellRender}
                    onSelect={(value: Moment) => {
                        const stringValue = value.format('DD.MM.yyyy');
                        handleDateClick(stringValue);
                    }}
                />
            </div>
        </div>
    );
};
