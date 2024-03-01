import { feedbacksUserRequest } from '@app/api/feedbacks';
import styles from './modal-card.module.css';
import { Button, Form, Input, Rate } from 'antd';

interface FormData {
    message: string;
    rating: number;
}

export const ModalCardFeedback = ({ handleButton }: any) => {
    const onFinish = ({ message, rating }: FormData) => {
        feedbacksUserRequest(message, rating);
        handleButton();
    };
    return (
        <div className={styles.wrapper}>
            <div className={styles.title}>
                <div>Ваш отзыв</div>
                <div onClick={handleButton}>
                    <svg
                        width='10'
                        height='11'
                        viewBox='0 0 10 11'
                        fill='none'
                        xmlns='http://www.w3.org/2000/svg'
                    >
                        <path
                            d='M5.8095 5.49927L9.91106 0.610205C9.97981 0.528955 9.922 0.405518 9.81575 0.405518H8.56888C8.49544 0.405518 8.42512 0.43833 8.37669 0.49458L4.99388 4.52739L1.61106 0.49458C1.56419 0.43833 1.49388 0.405518 1.41888 0.405518H0.172C0.0657503 0.405518 0.00793765 0.528955 0.0766877 0.610205L4.17825 5.49927L0.0766877 10.3883C0.061287 10.4064 0.0514069 10.4286 0.04822 10.4521C0.0450331 10.4757 0.0486732 10.4997 0.0587085 10.5212C0.0687439 10.5428 0.0847529 10.561 0.104835 10.5737C0.124916 10.5865 0.148227 10.5931 0.172 10.593H1.41888C1.49231 10.593 1.56263 10.5602 1.61106 10.504L4.99388 6.47114L8.37669 10.504C8.42356 10.5602 8.49388 10.593 8.56888 10.593H9.81575C9.922 10.593 9.97981 10.4696 9.91106 10.3883L5.8095 5.49927Z'
                            fill='black'
                            fill-opacity='0.85'
                        />
                    </svg>
                </div>
            </div>
            <Form className={styles.form} name='comment' onFinish={onFinish}>
                <Form.Item name='rating'>
                    <Rate style={{ fontSize: '14px', marginBottom: '10px', marginLeft: '16px' }} />
                </Form.Item>
                <Form.Item name='message' className={styles.message}>
                    <Input.TextArea placeholder='Autosize height based on content lines' />
                </Form.Item>
                <Form.Item className={styles.button}>
                    <Button className={styles.submit} type='primary' htmlType='submit'>
                        Опубликовать
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};
