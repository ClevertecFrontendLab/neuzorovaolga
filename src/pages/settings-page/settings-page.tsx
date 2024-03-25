import { Menu } from '@pages/main-page/menu/menu';
import styles from './settings-page.module.css';
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Switch, Tooltip } from 'antd';
import Free from '../../assets/img/free-tariff.png';
import ProDisabled from '../../assets/img/pro-disabled-tariff.png';
import { useSelector } from 'react-redux';
import { selectUserActiveTariff, selectUserTariffList } from '@redux/user/selectors';
import { TariffCard } from './tarif-card/tarif-card';
import { TariffDrawer } from './tariff-drawer/tariff-drawer';
import { selectIsDrawer } from '@redux/calendar/selectors';

export const SettingsPage = () => {
    const isDrawer = useSelector(selectIsDrawer);
    const tariffList = useSelector(selectUserTariffList);
    const userActiveTariff = useSelector(selectUserActiveTariff);
    const tariffImages = [Free, ProDisabled];
    const textTrainingInfo = 'включеная функция позволит участвовать в совместных тренировках';
    const textNotificationsInfo = 'включеная функция позволит получать уведомления об активностях';
    const textBlackThemeInfo = 'темная тема доступна для Pro tarif';

    const dateString: string = userActiveTariff?.expired || '';
    const date = new Date(dateString);
    const options = { day: '2-digit', month: '2-digit' };
    const dateActiveTariff = date.toLocaleDateString('ru-RU', options);

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
                                    title={textTrainingInfo}
                                    overlayStyle={{ maxWidth: '205px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                {`Уведомления `}
                                <Tooltip
                                    placement='bottomLeft'
                                    title={textNotificationsInfo}
                                    overlayStyle={{ maxWidth: '215px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                {`Темная тема `}
                                <Tooltip
                                    placement='bottomLeft'
                                    title={textBlackThemeInfo}
                                    overlayStyle={{ maxWidth: '113px' }}
                                    color={'black'}
                                >
                                    <ExclamationCircleOutlined />
                                </Tooltip>
                            </div>
                            <Switch disabled />
                        </div>
                    </div>
                    <div className={styles.navigateButtons}>
                        <Button className={styles.buttonWriteFeedback} type='primary'>
                            Написать отзыв
                        </Button>
                        <Button className={styles.buttonAllFeedback} type='link'>
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
        </div>
    );
};
