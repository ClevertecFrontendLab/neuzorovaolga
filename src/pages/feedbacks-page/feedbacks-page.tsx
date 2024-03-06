import { Menu } from '@pages/main-page/menu/menu';
import styles from './feedbacks-page.module.css';
import { useContext, useEffect, useState } from 'react';
import { getFeedbacksRequest } from '@app/api/feedbacks';
import { FeedbackCard } from '@pages/feedbacks-page/feedback-card/feedback-card.tsx';
import { Button } from 'antd';
import {
    CreateFeedbackData,
    CreateFeedbackModal,
} from '@pages/feedbacks-page/create-feedback-modal/create-feedback-modal.tsx';
import { ErrorFeedbackModal } from '@pages/feedbacks-page/error-feedback-modal/error-feedback-modal.tsx';
import { SuccessFeedbackModal } from '@pages/feedbacks-page/success-feedback-modal/success-feedback-modal.tsx';
import { ServerErrorModal } from '@components/server-error-modal/server-error-modal.tsx';
import { useNavigate } from 'react-router-dom';
import { VacantFeedback } from './vacant-feedback/vacant-feedback';
import { LoaderContext } from '@context/LoaderContext';

export interface Feedback {
    id: string;
    fullName: string;
    imageSrc: string;
    message: string;
    rating: number;
    createdAt: string;
}

export const FeedbacksPage = () => {
    const navigate = useNavigate();
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const [isCreateModal, setIsCreateModal] = useState(false);
    const [isErrorModal, setIsErrorModal] = useState(false);
    const [isSuccessModal, setIsSuccessModal] = useState(false);
    const [isServerErrorModal, setIsServerErrorModal] = useState(false);
    const [createFeedbackData, setCreateFeedbackData] = useState<CreateFeedbackData | undefined>();
    const [isAllFeedbacks, setIsAllFeedbacks] = useState(false);
    // const { updateFeedbacks, feedbacks } = useContext(FeedbacksContext);
    const [feedbacks, setFeedbacks] = useState<Feedback[]>([]);

    const handleServerError = () => {
        setIsServerErrorModal(true);
    };

    const updateFeedbacks = () => {
        showLoader();
        getFeedbacksRequest()
            .then((response) => {
                setFeedbacks(response.reverse());
            })
            .catch(handleServerError)
            .finally(hideLoader);
    };

    const handleShowCreateModal = () => {
        setIsCreateModal(true);
    };

    const handleCloseCreateModal = () => {
        setIsCreateModal(false);
        setCreateFeedbackData(undefined);
    };

    const handleErrorCreateModal = (data: CreateFeedbackData) => {
        setIsCreateModal(false);
        setCreateFeedbackData(data);
        setIsErrorModal(true);
    };

    const handleSuccessCreateModal = () => {
        setIsCreateModal(false);
        updateFeedbacks();
        setIsSuccessModal(true);
    };

    const handleCloseErrorModal = () => {
        setIsErrorModal(false);
        setCreateFeedbackData(undefined);
    };

    const handleRepeatErrorModal = () => {
        setIsErrorModal(false);
        setIsCreateModal(true);
    };

    const handleCloseSuccessModal = () => {
        setIsSuccessModal(false);
    };

    const handleAllFeedback = () => {
        if (isAllFeedbacks) {
            setIsAllFeedbacks(false);
        } else {
            setIsAllFeedbacks(true);
        }
    };

    const showAllFeedbacks = () => {
        return feedbacks
            .slice(0, 4)
            .map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
                <FeedbackCard
                    key={id}
                    fullName={fullName}
                    imageSrc={imageSrc}
                    message={message}
                    rating={rating}
                    createdAt={createdAt}
                />
            ));
    };

    const showFourFeedbacks = () => {
        return feedbacks.map(({ id, fullName, imageSrc, message, rating, createdAt }) => (
            <FeedbackCard
                key={id}
                fullName={fullName}
                imageSrc={imageSrc}
                message={message}
                rating={rating}
                createdAt={createdAt}
            />
        ));
    };
    const handleCloseServerErrorModal = () => {
        navigate('/main');
    };

    useEffect(() => {
        updateFeedbacks();
    }, []);

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.feedbacksWrapper}>
                <div className={styles.headerWrapper}>
                    <p className={styles.lightText}>Главная /</p> <p>&nbsp;Отзывы пользователей</p>
                </div>
                <div className={styles.feedbacksContainer}>
                    {feedbacks.length > 0 && (
                        <div className={styles.comments}>
                            {isAllFeedbacks ? showFourFeedbacks() : showAllFeedbacks()}
                        </div>
                    )}
                    {feedbacks.length === 0 && (
                        <VacantFeedback handleShowCreateModal={handleShowCreateModal} />
                    )}
                    {feedbacks.length > 0 && (
                        <div className={styles.navigateButtons}>
                            <Button
                                className={styles.buttonWriteFeedback}
                                type='primary'
                                data-test-id='write-review'
                                onClick={handleShowCreateModal}
                            >
                                Написать отзыв
                            </Button>
                            <Button
                                className={styles.buttonAllFeedback}
                                type='link'
                                data-test-id='all-reviews-button'
                                onClick={handleAllFeedback}
                            >
                                {!isAllFeedbacks ? 'Развернуть все отзывы' : 'Свернуть все отзывы'}
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            {isCreateModal && (
                <CreateFeedbackModal
                    defaultData={createFeedbackData}
                    handleClose={handleCloseCreateModal}
                    handleError={handleErrorCreateModal}
                    handleSuccess={handleSuccessCreateModal}
                />
            )}
            {isErrorModal && (
                <ErrorFeedbackModal
                    handleClose={handleCloseErrorModal}
                    handleRepeat={handleRepeatErrorModal}
                />
            )}
            {isSuccessModal && <SuccessFeedbackModal handleClose={handleCloseSuccessModal} />}
            {isServerErrorModal && (
                <ServerErrorModal handleButton={handleCloseServerErrorModal} isModal />
            )}
        </div>
    );
};
