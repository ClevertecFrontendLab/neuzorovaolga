import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import styles from './create-trainee.module.css';
import Empty from '../../../assets/img/empty-image.png';
import { Button } from 'antd';

export const CreateTrainee = ({ handleClose, date }: any) => {
    return (
        <div className={styles.wrapper}>
            <div className={styles.top}>
                <div>
                    <div className={styles.title}>{`Tренировки на ${date}`}</div>
                    <div className={styles.message}>Нет активных тренировок</div>
                </div>
                <CloseIcon handleClick={handleClose} />
            </div>
            <div className={styles.logo}>
                <img src={Empty} />
            </div>
            <Button type='primary' size='large' className={styles.button}>
                Создать тренировку
            </Button>
        </div>
    );
};
