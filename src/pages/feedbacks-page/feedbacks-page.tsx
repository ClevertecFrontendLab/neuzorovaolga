import { Menu } from '@pages/main-page/menu/menu';
import styles from './feedbacks-page.module.css';
import { useContext } from 'react';
import { feedbacksRequest } from '@app/api/feedbacks';
import { FeedbacksContext } from '@context/FeedbacksContext';
import { FeedbacksCard } from './feedbacks-card/feedbacks-card';

export const FeedbacksPage = () => {
    const { createFeedback, feedbacks } = useContext(FeedbacksContext);
    feedbacksRequest().then((res) => {
        const feedbacks = res;
        createFeedback(feedbacks);
    });

    // .catch((error) => {
    //     console.log(error);
    // });
    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.feedbacksWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText}>Главная /</p> <p>&nbsp;Отзывы пользователей</p>
                </div>
                <div className={styles.feedbacksContainer}>
                    {feedbacks
                        .slice(feedbacks.length - 5, feedbacks.length - 1)
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
                        ))}
                </div>
            </div>
        </div>
    );
};
