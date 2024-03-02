import { Menu } from '@pages/main-page/menu/menu';
import styles from './feedbacks-page.module.css';
import { useEffect, useState } from 'react';
import { getFeedbacksRequest } from '@app/api/feedbacks';
import { FeedbackCard } from '@pages/feedbacks-page/feedback-card/feedback-card.tsx';
import { Button } from 'antd';
import { CreateFeedbackModal } from '@pages/feedbacks-page/create-feedback-modal/create-feedback-modal.tsx';

export interface Feedback {
    id: string;
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
}

export const FeedbacksPage = () => {
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const updateFeedbacks = () => {
        getFeedbacksRequest()
            .then((response) => {
                setFeedbacks(response);
            })
            .catch((error) => {
                console.log(error);
            });
    };

    useEffect(() => {
        updateFeedbacks();
    }, []);

    const showCreateFeedbackModal = () => {
        setIsCreateModal(true);
    };

    const hideCreateFeedbackModal = () => {
        setIsCreateModal(false);
    };

    const handleAllFeedback = () => {
        if (isAllFeedbacks) {
            setIsAllFeedbacks(false);
        } else {
            setIsAllFeedbacks(true);
        }
    };

    const showAllFeedbacks = () => {
        return (
            feedbacks
                .slice(0, 4)
                // .reverse()
                .map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
                    <FeedbackCard
                        key={id}
                        fullName={fullName}
                        imageSrc={imageSrc}
                        message={message}
                        rating={rating}
                        createdAt={createdAt}
                    />
                ))
        );
    };

    const showFourFeedbacks = () => {
        return (
            feedbacks
                // .reverse()
                .map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
                    <FeedbackCard
                        key={id}
                        fullName={fullName}
                        imageSrc={imageSrc}
                        message={message}
                        rating={rating}
                        createdAt={createdAt}
                    />
                ))
        );
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.feedbacksWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText}>Главная /</p> <p>&nbsp;Отзывы пользователей</p>
                </div>
                <div className={styles.feedbacksContainer}>
                    <div className={styles.comments}>
                        {isAllFeedbacks ? showFourFeedbacks() : showAllFeedbacks()}
                    </div>
                    <div className={styles.navigateButtons}>
                        <Button
                            className={styles.buttonWriteFeedback}
                            type='primary'
                            onClick={showCreateFeedbackModal}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className={styles.buttonAllFeedback}
                            type='link'
                            onClick={handleAllFeedback}
                        >
                            {!isAllFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                        </Button>
                    </div>
                </div>
            </div>
            {isCreateModal && <CreateFeedbackModal handleClose={hideCreateFeedbackModal} />}
        </div>
    );
};
