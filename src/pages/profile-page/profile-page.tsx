import { Button, DatePicker, Form, Input, Space } from 'antd';
import moment from 'moment';
import styles from './profile-page.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from '@pages/main-page/menu/menu';
import { UserPhoto } from './user-photo/user-photo';
import { regexPasswordValidation } from '@utils/validation';

import { useState } from 'react';
import { ErrorSizeFileModal } from './error-size-file-modal/error-size-file-modal';
import { useNavigate } from 'react-router-dom';
import { PATH } from '@app/router';
import { getUserCatalogsTariffRequest, updateUserRequest } from '@app/api/user';
import { useDispatch } from 'react-redux';
import { setUserTariffList } from '@redux/user/reducer';
import { useSelector } from 'react-redux';
import { selectUserProfile } from '@redux/user/selectors';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { Profile } from '@models/user';

dayjs.extend(customParseFormat);
const dateFormat = 'DD.MM.YYYY';

export const ProfilePage = () => {
    const [isActive, setIsActive] = useState(false);
    const [isValidation, setIsValidation] = useState(false);
    const [imageUrl, setImageUrl] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const userProfile = useSelector(selectUserProfile);
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    console.log(userProfile);

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
        updateUserRequest(newProfile);
        console.log(values);
    };

    const [isErrorSizeModal, setIsErrorSizeModal] = useState(false);

    const doValidation = () => {
        setIsValidation(true);
    };

    const closeErrorsizeModal = () => {
        setIsErrorSizeModal(false);
    };

    const showErrorsizeModal = () => {
        setIsErrorSizeModal(true);
    };

    const handleButtonSettings = () => {
        getUserCatalogsTariffRequest().then((data) => dispatch(setUserTariffList(data)));
        navigate(PATH.SETTINGS);
    };

    const handleSaveImage = (url: string) => {
        setIsActive(true);
        setImageUrl(url);
    };

    // const date = new Date(userProfile?.birthday || '');
    // const birthdayDate = date.toLocaleDateString('ru-RU', {
    //     day: '2-digit',
    //     month: '2-digit',
    //     year: 'numeric',
    // });
    // const defaultValue = userProfile?.lastName && dayjs(birthdayDate, dateFormat);

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
                            <div>
                                <UserPhoto
                                    showErrorsizeModal={showErrorsizeModal}
                                    handleSaveImage={handleSaveImage}
                                />
                            </div>
                            <div className={styles.userData}>
                                <Form.Item name='firstName'>
                                    <Input
                                        placeholder='Имя'
                                        defaultValue={userProfile?.firstName}
                                    />
                                </Form.Item>
                                <Form.Item name='lastName'>
                                    <Input
                                        placeholder='Фамилия'
                                        defaultValue={userProfile?.lastName}
                                    />
                                </Form.Item>
                                <Form.Item name='birthday'>
                                    <DatePicker
                                        style={{ width: 347 }}
                                        format={'DD.MM.YYYY'}
                                        placeholder='Дата рождения'
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
                </div>
            </div>
            {isErrorSizeModal && <ErrorSizeFileModal handleButton={closeErrorsizeModal} />}
        </div>
    );
};
