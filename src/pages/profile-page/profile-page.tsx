import { Alert, Button, DatePicker, Form, Input, Space } from 'antd';
import moment from 'moment';
import styles from './profile-page.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from '@pages/main-page/menu/menu';
import { UserPhoto } from './user-photo/user-photo';
import { regexPasswordValidation } from '@utils/validation';

import { useState } from 'react';
import { ErrorProfileModal } from './error-profile-modal/error-profile-modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@app/router';
import { getUserCatalogsTariffRequest, updateUserRequest } from '@app/api/user';
import { useDispatch } from 'react-redux';
import { setUserTariffList } from '@redux/user/reducer';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '@redux/user/selectors';
import { Profile } from '@models/user';

export const ProfilePage = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [isActive, setIsActive] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [isErrorSizeFile, setIsErrorSizeFile] = useState(false);
    const [isErrorSaveProfile, setIsErrorSaveProfile] = useState(false);
    const [isAlert, setIsAlert] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const userProfile = useSelector(selectUserProfile);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const onFinish = (values: any) => {
        const newProfile: Profile = { ...userProfile } as Profile;
        if (values?.email) {
            newProfile.email = values.email;
        }
        if (values.firstName) {
            newProfile.firstName = values.firstName;
        }
        if (values?.lastName) {
            newProfile.lastName = values.lastName;
        }
        if (values?.birthday) {
            newProfile.birthday = values.birthday;
        }
        if (values?.password) {
            newProfile['password'] = values.password;
        }
        if (imageUrl) {
            newProfile.imgSrc = imageUrl;
        }
        updateUserRequest(newProfile)
            .then(() => setIsAlert(true))
            .catch(() => {
                setIsErrorSaveProfile(true);
            });
    };

    const doValidation = () => {
        setIsValidation(true);
    };

    const closeErrorProfileModal = () => {
        if (isErrorSizeFile) {
            setIsErrorSizeFile(false);
        } else {
            setIsErrorSaveProfile(false);
        }
    };

    const showErrorProfileModal = () => {
        if (!isErrorSizeFile) {
            setIsErrorSizeFile(true);
        } else {
            setIsErrorSaveProfile(true);
        }
    };

    const handleButtonSettings = () => {
        getUserCatalogsTariffRequest().then((data) => dispatch(setUserTariffList(data)));
        navigate(PATH.SETTINGS);
    };

    const handleSaveImage = (url: string) => {
        setIsActive(true);
        setImageUrl(url);
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.profileWrapper}>
                <div className={styles.headerWrapper}>
                    <div className={styles.headerTitle}>Профиль</div>
                    <div className={styles.settingsButtonWrapper}>
                        {width >= 834 ? (
                            <button
                                className={styles.settingsButton}
                                onClick={handleButtonSettings}
                            >
                                <Space className={styles.icon}>
                                    <SettingOutlined />
                                </Space>
                                Настройки
                            </button>
                        ) : (
                            <button className={styles.settingsButtonMobile}>
                                <SettingOutlined />
                            </button>
                        )}
                    </div>
                </div>

                <div className={styles.wrapperContent}>
                    <div className={styles.title}>Личная информация</div>
                    <Form
                        onFinish={onFinish}
                        className={styles.formWrapper}
                        onFinish={onFinish}
                        autoComplete='off'
                        onChange={() => setIsActive(true)}
                    >
                        <div className={styles.userInfo}>
                            <UserPhoto
                                showErrorProfileModal={showErrorProfileModal}
                                handleSaveImage={handleSaveImage}
                                isMobile={isMobile}
                            />

                            <div className={styles.userData}>
                                <Form.Item name='firstName'>
                                    <Input
                                        placeholder='Имя'
                                        defaultValue={userProfile?.firstName}
                                        className={styles.firstName}
                                        size='large'
                                    />
                                </Form.Item>
                                <Form.Item name='lastName'>
                                    <Input
                                        placeholder='Фамилия'
                                        defaultValue={userProfile?.lastName}
                                        className={styles.lastName}
                                        size='large'
                                    />
                                </Form.Item>
                                <Form.Item name='birthday'>
                                    <DatePicker
                                        style={{ width: isMobile ? 312 : 347 }}
                                        format={'DD.MM.YYYY'}
                                        placeholder='Дата рождения'
                                        size='large'
                                        defaultValue={
                                            userProfile?.birthday
                                                ? moment(userProfile?.birthday)
                                                : undefined
                                        }
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={styles.title}>Приватность авторизации</div>
                        <Form.Item name='email' rules={[{ type: 'email', message: '' }]}>
                            <Input
                                data-test-id='registration-email'
                                addonBefore='e-mail:'
                                size='large'
                                className={styles.inputEmail}
                                defaultValue={userProfile?.email}
                            />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            onChange={doValidation}
                            rules={[
                                // { required: false, message: '' },
                                isValidation
                                    ? {
                                          validator: (_, value) =>
                                              value && regexPasswordValidation(value)
                                                  ? Promise.resolve()
                                                  : Promise.reject(
                                                        'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                                    ),
                                      }
                                    : {},
                            ]}
                            help='Пароль не менее 8 символов, с заглавной буквой и цифрой'
                        >
                            <Input.Password
                                data-test-id='registration-password'
                                placeholder='Пароль'
                                size='large'
                                className={styles.inputPassword}
                            />
                        </Form.Item>

                        <Form.Item
                            name='confirmPassword'
                            dependencies={['password']}
                            rules={[
                                ({ getFieldValue }) => ({
                                    validator(_, value) {
                                        if (!value || getFieldValue('password') === value) {
                                            return Promise.resolve();
                                        }
                                        return Promise.reject('Пароли не совпадают');
                                    },
                                }),
                            ]}
                        >
                            <Input.Password
                                data-test-id='registration-confirm-password'
                                placeholder='Повторите пароль'
                                size='large'
                                className={styles.inputConfirmPassword}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button
                                data-test-id='registration-submit-button'
                                type='primary'
                                htmlType='submit'
                                size='large'
                                className={styles.submitButton}
                                disabled={!isActive}
                            >
                                Сохранить изменения
                            </Button>
                        </Form.Item>
                    </Form>
                    {isAlert && (
                        <Alert
                            message='Данные профиля успешно обновлены'
                            type='success'
                            showIcon
                            closable
                            className={styles.alert}
                        />
                    )}
                </div>
            </div>
            {isErrorSizeFile && (
                <ErrorProfileModal
                    handleButton={closeErrorProfileModal}
                    title={`Файл слишком большой`}
                    message={`Выберете файл размером до 5 МБ`}
                />
            )}
            {isErrorSaveProfile && (
                <ErrorProfileModal
                    handleButton={closeErrorProfileModal}
                    title={`При сохранении данных произошла ошибка`}
                    message={`Придется попробовать еще раз`}
                />
            )}
        </div>
    );
};
