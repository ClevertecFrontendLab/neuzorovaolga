import { Menu } from '@pages/main-page/menu/menu';
import styles from './settings-page.module.css';
import { ArrowLeftOutlined, ExclamationCircleOutlined } from '@ant-design/icons';
import { Button, Switch } from 'antd';
import Free from '../../assets/img/free-tariff.png';
import ProDisabled from '../../assets/img/pro-disabled-tariff.png';
import { useSelector } from 'react-redux';
import { selectUserTariffList } from '@redux/user/selectors';
import { TariffCard } from './tarif-card/tarif-card';
import { TariffDrawer } from './tariff-drawer/tariff-drawer';
import { selectIsDrawer } from '@redux/calendar/selectors';

export const SettingsPage = () => {
    const isDrawer = useSelector(selectIsDrawer);
    const tariffList = useSelector(selectUserTariffList);
    const tariffImages = [Free, ProDisabled];
    console.log(tariffList);

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
                            />
                        ))}
                    </div>
                    <div className={styles.switchWrapper}>
                        <div className={styles.switch}>
                            <div>
                                Открыт для совместных тренировок <ExclamationCircleOutlined />
                            </div>
                            <Switch defaultChecked />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                Уведомления <ExclamationCircleOutlined />
                            </div>
                            <Switch />
                        </div>
                        <div className={styles.switch}>
                            <div>
                                Темная тема <ExclamationCircleOutlined />
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
            {isDrawer && <TariffDrawer />}
        </div>
    );
};
