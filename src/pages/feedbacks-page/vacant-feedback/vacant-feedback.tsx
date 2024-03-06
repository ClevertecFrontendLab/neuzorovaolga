import { Button } from 'antd';
import styles from './vacant-feedback.module.css';

export const VacantFeedback = ({ handleShowCreateModal }: any) => (
    <div className={styles.container}>
        <div className={styles.wrapper}>
            <div className={styles.title}>Оставьте свой отзыв первым</div>
            <div className={styles.text}>
                {`Вы можете быть первым, кто оставит отзыв об этом фитнесс приложении.
                    Поделитесь своим мнением и опытом с другими пользователями,
                    и помогите им сделать правильный выбор.`}
            </div>
        </div>
        <Button
            className={styles.button}
            type='primary'
            data-test-id='write-review'
            onClick={handleShowCreateModal}
        >
            Написать отзыв
        </Button>
    </div>
);
