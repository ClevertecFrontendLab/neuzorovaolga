import { useContext, useState } from 'react';
import styles from './main.module.css';
import { CardAction } from './card-action/card-action';
import { CalendarTwoTone, HeartFilled, SolutionOutlined } from '@ant-design/icons';
import { GlobalContext } from '../../../../../context/GlobalContext';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { ServerErrorModal } from '@components/server-error-modal/server-error-modal';
import { LoaderContext } from '@context/LoaderContext';
import { getTrainingsRequest } from '@app/api/training';
import { PATH } from '@app/router';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { setTrainings } from '@redux/calendar/reducer';
import moment from 'moment';

export const Main = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { width } = useWindowDimensions();
    const isTablet = width < 1440 && width > 833;
    const { collapsed } = useContext(GlobalContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [isServerErrorModal, setIsServerErrorModal] = useState(false);

    const handleServerError = () => {
        setIsServerErrorModal(true);
    };

    const handleCloseServerErrorModal = () => {
        setIsServerErrorModal(false);
    };

    const handleCalendar = () => {
        showLoader();
        getTrainingsRequest()
            .then((trainingsResponse) => {
                dispatch(
                    setTrainings(
                        trainingsResponse.map((item) => ({
                            ...item,
                            date: moment(item.date).format('DD.MM.yyyy'),
                        })),
                    ),
                );
                navigate(PATH.CALENDAR);
            })
            .catch(handleServerError)
            .finally(hideLoader);
    };

    const handleProfile = () => {
        navigate(PATH.PROFILE);
    };

    const cards = [
        {
            icon: <HeartFilled color='primary' />,
            iconTitle: 'Тренировки',
            title: 'Расписать тренировки',
            handleClick: () => {
                return;
            },
        },
        {
            icon: <CalendarTwoTone twoToneColor='link' />,
            iconTitle: 'Календарь',
            title: 'Назначить календарь',
            handleClick: handleCalendar,
        },
        {
            icon: <SolutionOutlined color='link' />,
            iconTitle: 'Профиль',
            title: 'Заполнить профиль',
            handleClick: handleProfile,
        },
    ];

    return (
        <>
            <div className={styles.wrapper}>
                <div className={styles.about}>
                    С CleverFit ты сможешь:
                    <br />— планировать свои тренировки на календаре, выбирая тип и уровень
                    нагрузки;
                    <br />— отслеживать свои достижения в разделе статистики, сравнивая свои
                    результаты с нормами и рекордами;
                    <br />— создавать свой профиль, где ты можешь загружать свои фото, видео и
                    отзывы о тренировках;
                    <br />— выполнять расписанные тренировки для разных частей тела, следуя
                    подробным инструкциям и советам профессиональных тренеров.
                </div>
                <div className={isTablet && collapsed ? styles.cardShort : styles.card}>
                    CleverFit — это не просто приложение, а твой личный помощник в мире фитнеса. Не
                    откладывай на завтра — начни тренироваться уже сегодня!
                </div>
                <div className={styles.cardsActionWrapper}>
                    {cards.map(({ icon, iconTitle, title, handleClick }) => (
                        <CardAction
                            icon={icon}
                            iconTitle={iconTitle}
                            title={title}
                            handleClick={handleClick}
                        />
                    ))}
                </div>
            </div>
            {isServerErrorModal && (
                <ServerErrorModal
                    handleButton={handleCloseServerErrorModal}
                    data-test-id='modal-no-review'
                    isModal
                />
            )}
        </>
    );
};
