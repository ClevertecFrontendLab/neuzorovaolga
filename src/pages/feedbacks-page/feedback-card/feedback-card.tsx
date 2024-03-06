import { getTimeHelper } from '@utils/date';
import styles from './feedback-card.module.css';
import { Rate } from 'antd';
import { StarFilled, StarOutlined } from '@ant-design/icons';

interface Props {
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
}

export const FeedbackCard = ({ fullName, imageSrc, message, rating, createdAt }: Props) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.user}>
                <img className={styles.photo} src={imageSrc} alt='feedback-img' />
                {/*<Avatar size={42} icon={<UserOutlined />} />*/}
                <div>{fullName || 'Вы'}</div>
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
                <div className={styles.message}>{message}</div>
            </div>
        </div>
    );
};
