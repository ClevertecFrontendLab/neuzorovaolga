import { hideDrawer } from '@redux/calendar/reducer';
import { selectIsDrawer } from '@redux/calendar/selectors';
import { Button, Drawer, Radio, RadioChangeEvent } from 'antd';
import TrueIcon from '../../../assets/img/true-icon.png';
import FalseIcon from '../../../assets/img/false-icon.png';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styles from './tariff-drawer.module.css';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { selectUserTariffList } from '@redux/user/selectors';
import { useState } from 'react';
import { connectionProTariffRequest } from '@app/api/user';
import { PaymentCheckModal } from '../payment-check-modal/payment-check-modal';
import { DownCircleOutlined } from '@ant-design/icons';

type Props = {
    userActiveTariff?: {
        tariffId: string;
        expired: string;
    };
    dateActiveTariff: string;
};

const PRO_TARIFF_INDEX = 1;

export const TariffDrawer = ({ userActiveTariff, dateActiveTariff }: Props) => {
    const dispatch = useDispatch();
    const tariffList = useSelector(selectUserTariffList);
    const [isCheckedTariff, setIsCheckedTariff] = useState(0);
    const [isPaymentCheckModal, setIsPaymentCheckModal] = useState(false);
    const isDrawer = useSelector(selectIsDrawer);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const tariffDetails = [
        { name: 'Статистика за месяц', free: true, pro: true },
        { name: 'Статистика за все время', free: false, pro: true },
        { name: 'Современные тренировки', free: true, pro: true },
        { name: 'Участие в марафонах', free: false, pro: true },
        { name: 'Приложение IOS', free: false, pro: true },
        { name: 'Приложение Android', free: false, pro: true },
        { name: 'Индивидуальный Chat GPT', free: false, pro: true },
    ];

    const onClose = () => {
        dispatch(hideDrawer());
    };
    const onChange = (e: RadioChangeEvent) => {
        setIsCheckedTariff(e.target.value);
        console.log(isCheckedTariff);
    };

    const handlePostTariffRequest = () => {
        connectionProTariffRequest(tariffList?.[PRO_TARIFF_INDEX]?._id, isCheckedTariff);
        setIsPaymentCheckModal(true);
    };

    const handleCloseModal = () => {
        setIsPaymentCheckModal(false);
    };

    return (
        <>
            <Drawer
                className={styles.drawer}
                placement={isMobile ? 'bottom' : 'right'}
                closable={false}
                onClose={onClose}
                open={isDrawer}
                getContainer={false}
            >
                <div className={styles.wrapper}>
                    <div className={styles.header}>
                        <div>Сравнить тарифы</div>
                        <div onClick={onClose} data-test-id='modal-drawer-right-button-close'>
                            <CloseIcon />
                        </div>
                    </div>
                    {userActiveTariff && (
                        <div
                            className={styles.activeTariff}
                        >{`Ваш PRO tarif активен до ${dateActiveTariff}`}</div>
                    )}
                    <div className={styles.tariffs}>
                        {tariffList?.map((item) => (
                            <div className={item.name !== 'Pro' ? styles.tariff : styles.tariffPro}>
                                {item.name.toUpperCase()}

                                {item.name === 'Pro' && userActiveTariff && (
                                    <DownCircleOutlined
                                        style={{ color: 'green', paddingLeft: '3px' }}
                                    />
                                )}
                            </div>
                        ))}
                    </div>
                    <div>
                        <div className={styles.detailsWrapper}>
                            {tariffDetails?.map((item, index) => (
                                <div key={index}>
                                    <div className={styles.optionsWrapper}>
                                        <div>{item.name}</div>
                                        <div className={styles.options}>
                                            <div className={styles.details}>
                                                {item.free ? (
                                                    <img src={TrueIcon} />
                                                ) : (
                                                    <img src={FalseIcon} />
                                                )}
                                            </div>
                                            <div className={styles.details}>
                                                {item.pro ? (
                                                    <img src={TrueIcon} />
                                                ) : (
                                                    <img src={FalseIcon} />
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                    {!userActiveTariff && <div className={styles.message}>Стоимость тарифа</div>}
                    {!userActiveTariff && (
                        <div className={styles.detailsWrapper}>
                            {tariffList?.[PRO_TARIFF_INDEX].periods?.map((item) => (
                                <div className={styles.periods} key={item.days}>
                                    <div>{item.text}</div>
                                    <div className={styles.priceWrapper}>
                                        <div className={styles.price}>{`${item.cost} $`}</div>
                                        <Radio
                                            value={item.days}
                                            className={styles.price}
                                            onChange={onChange}
                                            checked={isCheckedTariff === item.days}
                                        ></Radio>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    {!userActiveTariff && (
                        <Button
                            onClick={handlePostTariffRequest}
                            className={styles.payButton}
                            type='primary'
                            size='large'
                            block
                            disabled={!isCheckedTariff}
                        >
                            Выбрать и оплатить
                        </Button>
                    )}
                </div>
            </Drawer>
            {isPaymentCheckModal && <PaymentCheckModal handleCloseModal={handleCloseModal} />}
        </>
    );
};
