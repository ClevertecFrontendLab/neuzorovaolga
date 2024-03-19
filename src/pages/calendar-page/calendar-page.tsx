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
import { selectIsDrawer, selectTrainings } from '@redux/calendar/selectors';
import { SettingOutlined } from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { TrainingModal } from './training-modal/training-modal';
import classnames from 'classnames';
import moment from 'moment';
import { ErrorDownloadModal } from './error-download-modal/error-download-modal';

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const trainings = useSelector(selectTrainings);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const [activeDateModal, setActiveDateModal] = useState('');
    const [isOpenDataErrorModal, setIsOpenDataErrorModal] = useState(false);

    const handleDateClick = (date: string) => {
        setActiveDateModal(date);
    };
    const handleCloseModal = () => {
        setActiveDateModal('');
    };

    const handleOpenDataError = () => {
        setIsOpenDataErrorModal(true);
    };

    const handleCloseOpenDataErrorModal = () => {
        setIsOpenDataErrorModal(false);
    };

    useEffect(() => {
        // getTrainingsRequest().then((trainingsResponse) => {
        //     dispatch(
        //         setTrainings(
        //             trainingsResponse.map((item) => ({
        //                 ...item,
        //                 date: moment(item.date).format('DD.MM.yyyy'),
        //             })),
        //         ),
        //     );
        // });
        getTrainingsListRequest()
            .then((data) => {
                dispatch(setTrainingsList(data));
            })
            .catch(handleOpenDataError);
    }, []);

    const dateCellContentRender = (value: Moment) => {
        const stringValue = value.format('DD.MM.yyyy');
        const listData = trainings.filter(({ date }) => date === stringValue);

        return (
            <CalendarCell
                listData={listData}
                date={stringValue}
                handleCloseModal={handleCloseModal}
                activeDateModal={activeDateModal}
                dateISO={value.toISOString()}
            />
        );
    };

    const dateFullCellMobileRender = (value: Moment) => {
        const date = value.format('DD.MM.yyyy');
        const isBlueDate = trainings.some((training) => training.date === date);
        const listData = trainings.filter(({ date }) => date === date);

        return (
            <div className={classnames(isBlueDate && styles.bluBackground)}>
                {value.date()}
                {date === activeDateModal && (
                    <TrainingModal
                        handleClose={handleCloseModal}
                        date={date}
                        dateISO={value.toISOString()}
                        listData={listData}
                    />
                )}
            </div>
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
                    dateFullCellRender={isMobile ? dateFullCellMobileRender : undefined}
                    dateCellRender={dateCellContentRender}
                    onSelect={(value: Moment) => {
                        const stringValue = value.format('DD.MM.yyyy');
                        if (stringValue !== activeDateModal) {
                            handleDateClick(stringValue);
                        }
                    }}
                />
                {isDrawer && <ExerciseDrawer />}
            </div>
            {isOpenDataErrorModal && (
                <ErrorDownloadModal handleButton={handleCloseOpenDataErrorModal} />
            )}
        </div>
    );
};
