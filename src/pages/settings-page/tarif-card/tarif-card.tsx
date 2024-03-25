import { Button } from 'antd';
import styles from './tarif-card.module.css';
import { CheckOutlined } from '@ant-design/icons';
import { showDrawer } from '@redux/calendar/reducer';
import { useDispatch } from 'react-redux';

type Props = {
    title: string;
    isActive: boolean | undefined;
    images: any;
    userActiveTariff?: {
        tariffId: string;
        expired: string;
    };
    dateActiveTariff: string;
};

export const TariffCard = ({
    title,
    images,
    isActive,
    userActiveTariff,
    dateActiveTariff,
}: Props) => {
    const dispatch = useDispatch();

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.text}>{`${title.toUpperCase()} tarif`}</div>
                <Button type='link' onClick={handleOpenDrawer}>
                    Подробнее
                </Button>
            </div>
            <img src={images} alt='photo' />
            {isActive && (
                <div className={styles.active}>
                    активен <CheckOutlined />
                </div>
            )}
            {!isActive && !userActiveTariff && (
                <div className={styles.active}>
                    <Button type='primary'>Активировать</Button>{' '}
                </div>
            )}
            {!isActive && !!userActiveTariff && (
                <div className={styles.activeTariff}>{`активен до ${dateActiveTariff} `}</div>
            )}
        </div>
    );
};
