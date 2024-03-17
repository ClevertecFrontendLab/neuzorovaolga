import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { BackIcon } from '@app/assets/icons/close-icon/back-icon';
import classnames from 'classnames';
import styles from './training-modal.module.css';
import Empty from '../../../assets/img/empty-image.png';
import { Button, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { selectTraining, setTrainings, showDrawer } from '@redux/calendar/reducer';
import { useSelector } from 'react-redux';
import { selectSelectedTraining, selectTrainingsList } from '@redux/calendar/selectors';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { EditOutlined } from '@ant-design/icons';
import { createTrainingRequest, getTrainingsRequest } from '@app/api/training';
import { ErrorSaveDataModal } from '../error-save-data-modal/error-save-data-modal';
import moment from 'moment';

type Props = {
    handleClose: () => void;
    date: string;
    isRightPosition?: boolean;
    dateISO: string;
    top: number;
    left: number;
    right: number;
};

export const TrainingModal = ({
    handleClose,
    date,
    isRightPosition,
    dateISO,
    top,
    left,
    right,
}: Props) => {
    const dispatch = useDispatch();
    const trainingsList = useSelector(selectTrainingsList);
    const selectedTraining = useSelector(selectSelectedTraining);
    const [isCreateStatus, setIsCreateStatus] = useState(false);
    const [isSaveDataErrorModal, setIsSaveDataErrorModal] = useState(false);
    const desktopPositionStyles = isRightPosition
        ? { top: `${top - 25}px`, right: `${right - 5}px` }
        : { top: `${top - 25}px`, left: `${left - 5}px` };

    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const updateTrainings = () => {
        getTrainingsRequest().then((trainingsResponse) => {
            dispatch(
                setTrainings(
                    trainingsResponse.map((item) => ({
                        ...item,
                        date: moment(item.date).format('DD.MM.yyyy'),
                    })),
                ),
            );
            setIsCreateStatus(false);
        });
    };

    const handleButton = () => {
        setIsCreateStatus(true);
    };

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };

    const handleSaveDataError = () => {
        setIsSaveDataErrorModal(true);
    };

    const handleCloseSaveDataErrorModal = () => {
        setIsSaveDataErrorModal(false);
    };

    const handleSelectTrainingName = (value: string) => {
        dispatch(
            selectTraining({ name: value, date: date, isImplementation: false, exercises: [] }),
        );
    };

    const handleSaveTraining = () => {
        selectedTraining &&
            createTrainingRequest({ ...selectedTraining, date: dateISO })
                .then(updateTrainings)
                .catch(handleSaveDataError);
    };

    return (
        <div className={classnames(styles.wrapper)} style={!isMobile ? desktopPositionStyles : {}}>
            {!isCreateStatus && (
                <div data-test-id='modal-create-training'>
                    <div className={styles.top}>
                        <div>
                            <div className={styles.title}>{`Tренировки на ${date}`}</div>
                            <div className={styles.message}>Нет активных тренировок</div>
                        </div>
                        <Button
                            type='link'
                            onClick={handleClose}
                            data-test-id='modal-create-training-button-close'
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    <div className={styles.logo}>
                        <img src={Empty} />
                    </div>
                    <Button
                        type='primary'
                        size='large'
                        className={styles.button}
                        onClick={handleButton}
                    >
                        Создать тренировку
                    </Button>
                </div>
            )}
            {isCreateStatus && (
                <div data-test-id='modal-create-exercise'>
                    <div className={styles.topSelect}>
                        <BackIcon
                            handleClick={handleClose}
                            data-test-id='modal-exercise-training-button-close'
                        />
                        <Select
                            data-test-id='modal-create-exercise-select'
                            disabled={!!selectedTraining?.exercises?.length}
                            defaultValue='Выбор типа тренировки'
                            onSelect={handleSelectTrainingName}
                            style={{ width: 220 }}
                            bordered={false}
                            options={trainingsList.map(({ name, key }) => ({
                                value: name,
                                label: name,
                            }))}
                        />
                    </div>
                    {selectedTraining?.exercises.map((item) => (
                        <div className={styles.userExercisesWrapper}>
                            <div className={styles.userExercises}>{item.name}</div>
                            <div className={styles.change} onClick={handleOpenDrawer}>
                                <EditOutlined />
                            </div>
                        </div>
                    ))}
                    <div className={styles.buttons}>
                        <Button onClick={handleOpenDrawer} disabled={!selectedTraining}>
                            Добавить упражнения
                        </Button>
                        <Button
                            type='text'
                            disabled={!selectedTraining?.exercises?.length}
                            className={styles.buttonSave}
                            onClick={handleSaveTraining}
                        >
                            Сохранить
                        </Button>
                    </div>
                </div>
            )}
            {isSaveDataErrorModal && (
                <ErrorSaveDataModal handleButton={handleCloseSaveDataErrorModal} />
            )}
        </div>
    );
};
