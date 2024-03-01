import styles from './footer.module.css';
import { Button } from 'antd';
import { AndroidFilled, AppleFilled } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';

export const Footer = () => {
    const navigate = useNavigate();
    const handleButton = () => {
        navigate('/feedbacks');
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.linkButtonWrapper}>
                <Button
                    style={{
                        color: '#2f54eb',
                    }}
                    type='link'
                    size='large'
                    onClick={handleButton}
                >
                    Cмотреть отзывы
                </Button>
            </div>
            <div className={styles.cardFooterWrapper}>
                <div className={styles.cardFooterText}>
                    <p className={styles.blueText}>Скачать на телефон</p>
                    <p className={styles.lightText}>Доступно в PRO-тарифе</p>
                </div>
                <div className={styles.OSButtons}>
                    <Button type='text' icon={<AndroidFilled />}>
                        Android OS
                    </Button>
                    <Button type='text' icon={<AppleFilled />}>
                        Apple iOS
                    </Button>
                </div>
            </div>
        </div>
    );
};
