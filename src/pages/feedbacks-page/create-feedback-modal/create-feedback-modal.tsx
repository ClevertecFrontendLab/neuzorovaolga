import { createFeedbackRequest } from '@app/api/feedbacks';
import styles from './create-feedback-modal.module.css';
import { Button, Form, Input, Rate } from 'antd';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon.tsx';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

interface FormData {
    message: string;
    rating: number;
}

interface Props {
    handleClose: () => void;
}

export const CreateFeedbackModal = ({ handleClose }: Props) => {
    const onFinish = ({ message, rating }: FormData) => {
        createFeedbackRequest(message, rating).then((data) => {
            console.log(data);
        });
        handleClose();
    };

    return (
        <ModalWrapper>
            <div className={styles.title}>
                <div>Ваш отзыв</div>
                <CloseIcon handleClick={handleClose} />
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
        </ModalWrapper>
    );
};
