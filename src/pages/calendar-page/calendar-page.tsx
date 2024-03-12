import { Menu } from '@pages/main-page/menu/menu';
import styles from './calendar-page.module.css';
import { Calendar, Space } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { CalendarCell } from './calendar-cell/calendar-cell';
import { getTrainingsListRequest, getTrainingsRequest } from '@app/api/training';
import { useDispatch } from 'react-redux';
import { setTrainings, setTrainingsList } from '@redux/calendar/reducer';
import { ExerciseDrawer } from './exercise-drawer/exercise-drawer';
import { useSelector } from 'react-redux';
import { selectIsDrawer } from '@redux/calendar/selectors';
import { SettingOutlined } from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions';

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

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

    useEffect(() => {
        getTrainingsRequest().then((data) => {
            console.log(data);
            dispatch(setTrainings(data));
        });
        getTrainingsListRequest().then((data) => {
            console.log(data);
            dispatch(setTrainingsList(data));
        });
    }, []);

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
            <div className={styles.calendarWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText}>Главная /</p> <p>&nbsp;Календарь</p>
                </div>
                <div className={styles.settingsButtonWrapper}>
                    {width >= 834 ? (
                        <button className={styles.settingsButton}>
                            <Space className={styles.icon}>
                                <SettingOutlined />
                            </Space>
                            Настройки
                        </button>
                    ) : (
                        <button className={styles.settingsButtonMobile}>
                            <SettingOutlined />
                        </button>
                    )}
                </div>
                <Calendar
                    fullscreen={isMobile ? false : true}
                    dateCellRender={dateCellRender}
                    onSelect={(value: Moment) => {
                        const stringValue = value.format('DD.MM.yyyy');
                        if (stringValue !== activeDateModal) {
                            handleDateClick(stringValue);
                        }
                    }}
                />
                {isDrawer && <ExerciseDrawer />}
                {/* <ErrorDownloadModal /> */}
            </div>
        </div>
    );
};
