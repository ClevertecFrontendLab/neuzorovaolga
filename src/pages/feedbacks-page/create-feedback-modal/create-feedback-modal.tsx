import { createFeedbackRequest } from '@app/api/feedbacks';
import styles from './create-feedback-modal.module.css';
import { Button, Form, Input, Rate } from 'antd';
import { CloseIcon } from '@app/assets/icons/close-icon/close-icon.tsx';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

export interface CreateFeedbackData {
    message: string;
    rating: number;
}

interface Props {
    defaultData?: CreateFeedbackData;
    handleClose: () => void;
    handleError: (data: CreateFeedbackData) => void;
    handleSuccess: () => void;
}

export const CreateFeedbackModal = ({
    defaultData,
    handleClose,
    handleError,
    handleSuccess,
}: Props) => {
    const onFinish = ({ message, rating }: CreateFeedbackData) => {
        createFeedbackRequest(message, rating)
            .then(handleSuccess)
            .catch(() => handleError({ message, rating }));
    };

    return (
        <ModalWrapper>
            <div className={styles.content}>
                <div className={styles.title}>
                    <div>Ваш отзыв</div>
                    <CloseIcon handleClick={handleClose} />
                </div>
                <Form className={styles.form} name='comment' onFinish={onFinish}>
                    <Form.Item name='rating'>
                        <Rate
                            style={{ fontSize: '14px', marginBottom: '10px', marginLeft: '16px' }}
                            defaultValue={defaultData?.rating}
                        />
                    </Form.Item>
                    <Form.Item name='message' className={styles.message}>
                        <Input.TextArea
                            placeholder='Autosize height based on content lines'
                            defaultValue={defaultData?.message}
                        />
                    </Form.Item>
                    <Form.Item className={styles.button}>
                        <Button
                            className={styles.submit}
                            type='primary'
                            htmlType='submit'
                            data-test-id='new-review-submit-button'
                        >
                            Опубликовать
                        </Button>
                    </Form.Item>
                </Form>
            </div>
        </ModalWrapper>
    );
};
