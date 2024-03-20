import { Menu } from '@pages/main-page/menu/menu';
import styles from './calendar-page.module.css';
import { Calendar, Space } from 'antd';
import type { Moment } from 'moment';
import { useEffect, useState } from 'react';
import { CalendarCell } from './calendar-cell/calendar-cell';
import { getTrainingsListRequest } from '@app/api/training';
import { useDispatch } from 'react-redux';
import { setTrainingsList } from '@redux/calendar/reducer';
import { ExerciseDrawer } from './exercise-drawer/exercise-drawer';
import { useSelector } from 'react-redux';
import { selectIsDrawer, selectTrainings } from '@redux/calendar/selectors';
import { SettingOutlined } from '@ant-design/icons';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { ErrorDownloadModal } from './error-download-modal/error-download-modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@app/router';
import moment from 'moment';
import 'moment/locale/ru';
import locale from 'antd/lib/date-picker/locale/ru_RU';
import { PickerLocale } from 'antd/lib/date-picker/generatePicker';

export const CalendarPage = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const isDrawer = useSelector(selectIsDrawer);
    const trainings = useSelector(selectTrainings);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const [activeDateModal, setActiveDateModal] = useState('');
    const [isOpenDataErrorModal, setIsOpenDataErrorModal] = useState(false);

    const handleCloseModal = () => {
        setActiveDateModal('');
    };

    const handleOpenDataError = () => {
        setIsOpenDataErrorModal(true);
    };

    const handleCloseOpenDataErrorModal = () => {
        setIsOpenDataErrorModal(false);
    };

    const redirectMainPage = () => {
        navigate(PATH.MAIN);
    };

    const handleDateClick = (date: string) => {
        setActiveDateModal(date);
    };

    useEffect(() => {
        moment.locale('ru');
        getTrainingsListRequest()
            .then((data) => {
                dispatch(setTrainingsList(data));
            })
            .catch(handleOpenDataError);
    }, []);

    const dateFullCellRender = (value: Moment) => {
        const stringValue = value.format('DD.MM.yyyy');
        const listData = trainings.filter((training) => training.date === stringValue);

        return (
            <CalendarCell
                listData={listData}
                value={value}
                handleCloseModal={handleCloseModal}
                activeDateModal={activeDateModal}
                handleDate={handleDateClick}
            />
        );
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.calendarWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText} onClick={redirectMainPage}>
                        Главная /
                    </p>
                    <p>&nbsp;Календарь</p>
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
                    dateFullCellRender={dateFullCellRender}
                />
                {isDrawer && <ExerciseDrawer />}
            </div>
            {isOpenDataErrorModal && (
                <ErrorDownloadModal handleButton={handleCloseOpenDataErrorModal} />
            )}
        </div>
    );
};
