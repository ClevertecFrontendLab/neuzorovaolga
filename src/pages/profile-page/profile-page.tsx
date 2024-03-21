import { Button, DatePicker, Form, Input, Space } from 'antd';
import styles from './profile-page.module.css';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { SettingOutlined } from '@ant-design/icons';
import { Menu } from '@pages/main-page/menu/menu';
import { UserPhoto } from './user-photo/user-photo';
import { regexPasswordValidation } from '@utils/validation';

import { useState } from 'react';
import { ErrorSizeFileModal } from './error-size-file-modal/error-size-file-modal';

export const ProfilePage = () => {
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;

    const onFinish = (values: any) => {
        console.log({ values });
    };

    const [isErrorSizeModal, setIsErrorSizeModal] = useState(false);

    const closeErrorsizeModal = () => {
        setIsErrorSizeModal(false);
    };

    const showErrorsizeModal = () => {
        setIsErrorSizeModal(true);
    };

    return (
        <div className={styles.wrapper}>
            <Menu />
            <div className={styles.profileWrapper}>
                <div className={styles.headerWrapper}>
                    <div className={styles.headerTitle}>Профиль</div>
                    <div className={styles.settingsButtonWrapper}>
                        {width >= 834 ? (
                            <button className={styles.settingsButton}>
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
                    <Form onFinish={onFinish} className={styles.formWrapper}>
                        <div className={styles.userInfo}>
                            <div>
                                <Form.Item name={'profilePicture'}>
                                    <UserPhoto showErrorsizeModal={showErrorsizeModal} />
                                </Form.Item>
                            </div>
                            <div className={styles.userData}>
                                <Form.Item
                                    name='username'
                                    rules={[
                                        { required: true, message: 'Please input your username!' },
                                    ]}
                                >
                                    <Input placeholder='Имя' />
                                </Form.Item>
                                <Form.Item
                                    name='usersurname'
                                    rules={[
                                        { required: true, message: 'Please input your username!' },
                                    ]}
                                >
                                    <Input placeholder='Фамилия' />
                                </Form.Item>
                                <Form.Item name='birthday'>
                                    <DatePicker
                                        style={{ width: 347 }}
                                        placeholder='Дата рождения'
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div className={styles.title}>Приватность авторизации</div>
                        <Form.Item
                            name='useremail'
                            rules={[
                                { required: true, message: '' },
                                { type: 'email', message: '' },
                            ]}
                        >
                            <Input
                                data-test-id='registration-email'
                                addonBefore='e-mail:'
                                size='large'
                                className={styles.inputEmail}
                            />
                        </Form.Item>

                        <Form.Item
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },

                                {
                                    validator: (_, value) =>
                                        value && regexPasswordValidation(value)
                                            ? Promise.resolve()
                                            : Promise.reject(
                                                  'Пароль не менее 8 символов, с заглавной буквой и цифрой',
                                              ),
                                },
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
                                { required: true, message: '' },
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
