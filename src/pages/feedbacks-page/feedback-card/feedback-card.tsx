import { getTimeHelper } from '@utils/date';
import styles from './feedback-card.module.css';
import { Avatar, Rate } from 'antd';
import { StarFilled, StarOutlined, UserOutlined } from '@ant-design/icons';
import { useContext } from 'react';
import { GlobalContext } from '@context/GlobalContext';

type Props = {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
};

export const FeedbackCard = ({ fullName, imageSrc, message, rating, createdAt }: Props) => {
    const { collapsed } = useContext(GlobalContext);
    const arrName = fullName?.split(' ');
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                {imageSrc && <img className={styles.photo} src={imageSrc} alt='feedback-img' />}
                {!imageSrc && <Avatar size={42} className={styles.photo} icon={<UserOutlined />} />}
                {fullName ? (
                    <div className={styles.fullName}>
                        <div>{arrName[0]}</div>
                        <div>{arrName[1]}</div>
                    </div>
                ) : (
                    <div>Анонимный</div>
                )}
            </div>
            <div>
                <div className={styles.rate}>
                    <Rate
                        disabled
                        style={{ fontSize: '14px' }}
                        value={rating}
                        character={({ value, index }) => {
                            return value && index! < value ? (
                                <StarFilled style={{ color: '#faad14' }} />
                            ) : (
                                <StarOutlined style={{ color: '#faad14' }} />
                            );
                        }}
                    />
                    <div style={{ paddingLeft: '16px', paddingTop: '2px' }}>
                        {getTimeHelper(createdAt)}
                    </div>
                </div>
                <div className={!collapsed ? styles.message : styles.messageBig}>{message}</div>
            </div>
        </div>
    );
};
