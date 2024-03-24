import { Button } from 'antd';
import styles from './tarif-card.module.css';
import { CheckOutlined } from '@ant-design/icons';

type Props = {
    title: string;
    isActive: boolean | undefined;
    images: any;
};

export const TariffCard = ({ title, images, isActive }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div className={styles.text}>{`${title.toUpperCase()} tarif`}</div>
                <Button type='link'>Подробнее</Button>
            </div>
            <img src={images} alt='photo' />
            {isActive && (
                <div className={styles.active}>
                    Активен <CheckOutlined />
                </div>
            )}
            {!isActive && (
                <div className={styles.active}>
                    <Button type='primary'>Активировать</Button>{' '}
                </div>
            )}
        </div>
    );
};
