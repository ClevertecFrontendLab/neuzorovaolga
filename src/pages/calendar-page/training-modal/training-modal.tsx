import { CloseIcon } from '@app/assets/icons/close-icon/close-icon';
import { BackIcon } from '@app/assets/icons/close-icon/back-icon';
import classnames from 'classnames';
import styles from './training-modal.module.css';
import Empty from '../../../assets/img/empty-image.png';
import { Badge, Button, Select } from 'antd';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
    cleanSelectedTraining,
    selectEditTraining,
    selectTraining,
    setTrainings,
    showDrawer,
} from '@redux/calendar/reducer';
import { useSelector } from 'react-redux';
import {
    selectIsEditTraining,
    selectSelectedTraining,
    selectTrainingsList,
} from '@redux/calendar/selectors';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { EditOutlined } from '@ant-design/icons';
import {
    createTrainingRequest,
    getTrainingsRequest,
    updateTrainingRequest,
} from '@app/api/training';
import { ErrorSaveDataModal } from '../error-save-data-modal/error-save-data-modal';
import moment from 'moment';
import { Training } from '@models/trainings';

type Props = {
    listData: Training[];
    handleClose: () => void;
    date: string;
    isRightPosition?: boolean;
    dateISO: string;
    // top?: number;
    // left: number;
    // right: number;
};

export const TrainingModal = ({
    listData,
    handleClose,
    date,
    isRightPosition,
    dateISO,
}: // top,
// left,
// right,
Props) => {
    const dispatch = useDispatch();
    const trainingsList = useSelector(selectTrainingsList);
    const selectedTraining = useSelector(selectSelectedTraining);
    const isEditTraining = useSelector(selectIsEditTraining);
    const [isCreateStatus, setIsCreateStatus] = useState(false);
    const [isSaveDataErrorModal, setIsSaveDataErrorModal] = useState(false);
    // const desktopPositionStyles = isRightPosition
    //     ? { top: `${top - 25}px`, right: `${right - 5}px` }
    //     : { top: `${top - 25}px`, left: `${left - 5}px` };

    const selectedTrainingNames = listData.map((item) => item.name);
    const selectOptions = trainingsList.filter(
        (item) => !selectedTrainingNames.includes(item.name),
    );

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
            dispatch(cleanSelectedTraining());
            setIsCreateStatus(false);
        });
    };

    const handleButton = () => {
        setIsCreateStatus(true);
    };

    const handleOpenDrawer = () => {
        dispatch(showDrawer());
    };

    const handleEditTraining = (item: Training) => {
        dispatch(selectEditTraining(item));
        setIsCreateStatus(true);
    };

    const handleSaveDataError = () => {
        setIsSaveDataErrorModal(true);
    };

    const handleCloseSaveDataErrorModal = () => {
        handleClose();
        dispatch(cleanSelectedTraining());
        setIsSaveDataErrorModal(false);
    };

    const handleSelectTrainingName = (value: string) => {
        dispatch(
            selectTraining({ name: value, date: date, isImplementation: false, exercises: [] }),
        );
    };

    const handleSaveTraining = () => {
        if (selectedTraining) {
            !isEditTraining &&
                createTrainingRequest({ ...selectedTraining, date: dateISO })
                    .then(updateTrainings)
                    .catch(handleSaveDataError);

            isEditTraining &&
                updateTrainingRequest(selectedTraining._id || '', {
                    ...selectedTraining,
                    date: dateISO,
                })
                    .then(updateTrainings)
                    .catch(handleSaveDataError);
        }
    };

    const handleBack = () => {
        dispatch(cleanSelectedTraining());
        setIsCreateStatus(false);
    };

    return (
        <div className={classnames(styles.wrapper)}>
            {!isCreateStatus && (
                <div data-test-id='modal-create-training'>
                    <div className={styles.top}>
                        <div>
                            <div className={styles.title}>{`Tренировки на ${date}`}</div>
                            {!listData.length && (
                                <div className={styles.message}>Нет активных тренировок</div>
                            )}
                        </div>
                        <Button
                            type='link'
                            onClick={handleClose}
                            data-test-id='modal-create-training-button-close'
                        >
                            <CloseIcon />
                        </Button>
                    </div>
                    {!listData.length && (
                        <div className={styles.logo}>
                            <img src={Empty} />
                        </div>
                    )}
                    {!!listData.length && (
                        <div>
                            {listData.map((item, index) => (
                                <div
                                    key={item._id}
                                    className={styles.itemWrapper}
                                    // data-test-id={`modal-update-training-edit-button${index}`}
                                >
                                    <Badge status='success' text={item.name} />
                                    <div
                                        className={styles.change}
                                        onClick={() => handleEditTraining(item)}
                                        data-test-id={`modal-update-training-edit-button${index}`}
                                    >
                                        <EditOutlined />
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                    <Button
                        type='primary'
                        size='large'
                        className={styles.button}
                        onClick={handleButton}
                        disabled={
                            dateISO < new Date().toISOString() ||
                            listData.length >= trainingsList.length
                        }
                    >
                        {!listData.length ? 'Создать тренировку' : 'Создать тренировку'}
                    </Button>
                </div>
            )}
            {isCreateStatus && (
                <div data-test-id='modal-create-exercise'>
                    <div className={styles.topSelect}>
                        <BackIcon
                            handleClick={handleBack}
                            data-test-id='modal-exercise-training-button-close'
                        />
                        <Select
                            data-test-id='modal-create-exercise-select'
                            disabled={!!selectedTraining?.exercises?.length}
                            defaultValue='Выбор типа тренировки'
                            value={selectedTraining ? selectedTraining.name : undefined}
                            onSelect={handleSelectTrainingName}
                            style={{ width: 220 }}
                            bordered={false}
                            options={selectOptions.map(({ name, key }) => ({
                                value: name,
                                label: name,
                                disabled: selectedTrainingNames.includes(name),
                            }))}
                        />
                    </div>
                    {selectedTraining?.exercises.map((item, index) => (
                        <div className={styles.userExercisesWrapper}>
                            <div className={styles.userExercises}>{item.name}</div>
                            <div
                                className={styles.change}
                                onClick={handleOpenDrawer}
                                data-test-id={`modal-update-training-edit-button${index}`}
                            >
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
                            {isEditTraining ? 'Сохранить изменения' : 'Сохранить'}
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
