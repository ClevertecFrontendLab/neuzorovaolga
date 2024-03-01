import { Menu } from '@pages/main-page/menu/menu';
import styles from './feedbacks-page.module.css';
import { useContext, useState } from 'react';
import { feedbacksRequest } from '@app/api/feedbacks';
import { FeedbacksContext } from '@context/FeedbacksContext';
import { FeedbacksCard } from './feedbacks-card/feedbacks-card';
import { Button } from 'antd';
import { ModalCardFeedback } from './modal-card/modal-card';

export const FeedbacksPage = () => {
    const [statusWriteComment, setStatusWriteComment] = useState(false);
    const [showComments, setShowComments] = useState(false);
    const { createFeedback, feedbacks } = useContext(FeedbacksContext);

    feedbacksRequest().then((res) => {
        const feedbacks = res;
        createFeedback(feedbacks);
    });

    // .catch((error) => {
    //     console.log(error);
    // });

    const handleButton = () => {
        if (statusWriteComment) {
            setStatusWriteComment(false);
        } else {
            setStatusWriteComment(true);
        }
    };

    const handleShow = () => {
        if (showComments) {
            setShowComments(false);
        } else {
            setShowComments(true);
        }
    };

    const showAllFeedbacks = () => {
        return feedbacks
            .slice(-4)
            .reverse()
            .map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
                <FeedbacksCard
                    key={id}
                    id={id}
                    fullName={fullName}
                    imageSrc={imageSrc}
                    message={message}
                    rating={rating}
                    createdAt={createdAt}
                />
            ));
    };

    const showFourFeedbacks = () => {
        return feedbacks
            .reverse()
            .map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
                <FeedbacksCard
                    key={id}
                    id={id}
                    fullName={fullName}
                    imageSrc={imageSrc}
                    message={message}
                    rating={rating}
                    createdAt={createdAt}
                />
            ));
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
                        {showComments ? showFourFeedbacks() : showAllFeedbacks()}
                    </div>
                    <div className={styles.navigateButtons}>
                        <Button
                            className={styles.buttonWriteFeedback}
                            type='primary'
                            onClick={handleButton}
                        >
                            Написать отзыв
                        </Button>
                        <Button
                            className={styles.buttonAllFeedback}
                            type='link'
                            onClick={handleShow}
                        >
                            {!showComments ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                        </Button>
                    </div>
                </div>
            </div>
            {statusWriteComment && <ModalCardFeedback handleButton={handleButton} />}
        </div>
    );
};
