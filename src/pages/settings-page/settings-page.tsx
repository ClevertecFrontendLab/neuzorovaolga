import { Menu } from '@pages/main-page/menu/menu';
import styles from './settings-page.module.css';
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Switch, Tooltip } from 'antd';
import Free from '../../assets/img/free-tariff.png';
import ProDisabled from '../../assets/img/pro-disabled-tariff.png';
import ProActive from '../../assets/img/pro-active-tariff.png';
import { useSelector } from 'react-redux';
import {
    selectUserActiveTariff,
    selectUserNotification,
    selectUserProfile,
    selectUserReadyForTraining,
    selectUserTariffList,
} from '@redux/user/selectors';
import { setUserProfile } from '@redux/user/reducer';
import { TariffCard } from './tarif-card/tarif-card';
import { TariffDrawer } from './tariff-drawer/tariff-drawer';
import { selectIsDrawer } from '@redux/calendar/selectors';
import { useDispatch } from 'react-redux';
import { updateUserRequest } from '@app/api/user';
import { useState } from 'react';
import {
    CreateFeedbackData,
    CreateFeedbackModal,
} from '@pages/feedbacks-page/create-feedback-modal/create-feedback-modal';
import { PATH } from '@app/router';
import { useNavigate } from 'react-router-dom';
import { ErrorFeedbackModal } from '@pages/feedbacks-page/error-feedback-modal/error-feedback-modal';
import { SuccessFeedbackModal } from '@pages/feedbacks-page/success-feedback-modal/success-feedback-modal';

export const SettingsPage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const isDrawer = useSelector(selectIsDrawer);
    const tariffList = useSelector(selectUserTariffList);
    const userActiveTariff = useSelector(selectUserActiveTariff);
    const userProfile = useSelector(selectUserProfile);
    const isNotifications = useSelector(selectUserNotification);
    const isUserJoinTraining = useSelector(selectUserReadyForTraining);
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [createFeedbackData, setCreateFeedbackData] = useState<CreateFeedbackData | undefined>();
    const tariffImages = [Free, userActiveTariff ? ProActive : ProDisabled];

    const dateString: string = userActiveTariff?.expired || '';
    const date = new Date(dateString);
    const dateActiveTariff = date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' });

    const changeStatusUserNotification = (e: boolean) => {
        userProfile &&
            updateUserRequest({ ...userProfile, sendNotification: e }).then((profile) => {
                dispatch(setUserProfile(profile));
            });
    };

    const changeStatusUserJoinTraining = (e: boolean) => {
        userProfile &&
            updateUserRequest({ ...userProfile, readyForJointTraining: e }).then((profile) => {
                dispatch(setUserProfile(profile));
            });
    };

    const showFeedbackPage = () => {
        navigate(PATH.FEEDBACKS);
    };

    const handleShowCreateModal = () => {
        setIsCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModal(false);
        setCreateFeedbackData(undefined);
    };
    const handleErrorCreateModal = (data: CreateFeedbackData) => {
        setIsCreateModal(false);
        setCreateFeedbackData(data);
        setIsErrorModal(true);
    };
    const handleSuccessCreateModal = () => {
        setIsCreateModal(false);
        setIsSuccessModal(true);
    };

    const handleCloseErrorModal = () => {
        setIsErrorModal(false);
        setCreateFeedbackData(undefined);
    };

    const handleRepeatErrorModal = () => {
        setIsErrorModal(false);
        setIsCreateModal(true);
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModal(false);
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.profileWrapper}>
                <div className={styles.headerWrapper}>
                    <Button type='text' icon={<ArrowLeftOutlined />}>
                        Настройки
                    </Button>
                </div>
                <div className={styles.wrapperContent}>
                    <div className={styles.title}>Мой тариф</div>
                    <div className={styles.tariffs}>
                        {tariffList?.map((item, index) => (
                            <TariffCard
                                title={item.name}
                                images={tariffImages[index]}
                                isActive={item?.isActive}
                                userActiveTariff={userActiveTariff}
                                dateActiveTariff={dateActiveTariff}
                            />
                        ))}
                    </div>
                    <div className={styles.switchWrapper}>
                        <div className={styles.switch}>
                            <div>
                                {`Открыт для совместных тренировок `}
                                <Tooltip
                                    placement='bottomLeft'
                                    title={
                                        'включеная функция позволит участвовать в совместных тренировках'
                                    }
                                    overlayStyle={{ maxWidth: '205px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch
                                onChange={changeStatusUserJoinTraining}
                                defaultChecked={isUserJoinTraining}
                            />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                {`Уведомления `}
                                <Tooltip
                                    placement='bottomLeft'
                                    title={
                                        'включеная функция позволит получать уведомления об активностях'
                                    }
                                    overlayStyle={{ maxWidth: '215px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch
                                onChange={changeStatusUserNotification}
                                defaultChecked={isNotifications}
                            />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                {`Темная тема `}
                                <Tooltip
                                    placement='bottomLeft'
                                    title={'темная тема доступна для Pro tarif'}
                                    overlayStyle={{ maxWidth: '113px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch disabled={!userActiveTariff} />
                        </div>
                    </div>
                    <div className={styles.navigateButtons}>
                        <Button
                            className={styles.buttonWriteFeedback}
                            type='primary'
                            onClick={handleShowCreateModal}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className={styles.buttonAllFeedback}
                            type='link'
                            onClick={showFeedbackPage}
                        >
                            Смотреть все отзывы
                        </Button>
                    </div>
                </div>
            </div>
            {isDrawer && (
                <TariffDrawer
                    userActiveTariff={userActiveTariff}
                    dateActiveTariff={dateActiveTariff}
                />
            )}
            {isErrorModal && (
                <ErrorFeedbackModal
                    handleClose={handleCloseErrorModal}
                    handleRepeat={handleRepeatErrorModal}
                />
            )}
            {isSuccessModal && <SuccessFeedbackModal handleClose={handleCloseSuccessModal} />}
            {isCreateModal && (
                <CreateFeedbackModal
                    defaultData={createFeedbackData}
                    handleClose={handleCloseCreateModal}
                    handleError={handleErrorCreateModal}
                    handleSuccess={handleSuccessCreateModal}
                />
            )}
        </div>
    );
};
