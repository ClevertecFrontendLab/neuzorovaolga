import React, { useContext, useEffect } from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import styles from './registration-page.module.css';
import 'antd/dist/antd.css';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';

import { Button, Form, Input } from 'antd';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registrationRequest } from './../../api/auth';
import { AuthContext } from '../../context/AuthContext';
import { LoaderContext } from '../../context/LoaderContext';
import { PATH } from '../../router';

interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

export const RegistrationPage: React.FC = () => {
    const navigate = useNavigate();
    const { email, changeEmail, password, changePassword, repeatedRequest, changeRepeatedRequest } =
        useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const items1: MenuProps['items'] = ['Вход', 'Регистрация'].map((key) => ({
        key,
        label: `${key}`,
        style: { width: 184, textAlign: 'center', fontSize: 16, padding: 0 },
        onClick: () => {
            if (key === 'Вход') {
                navigate(PATH.AUTH);
            }
        },
    }));

    const handleRegistration = (username: string, password: string) => {
        showLoader();
        registrationRequest(username, password)
            .then(() => {
                navigate(PATH.SUCCESS);
            })
            .catch((error) => {
                if (error.statusCode === 409) {
                    navigate(PATH.ERROR_USER_EXIST);
                } else {
                    navigate(PATH.ERROR);
                }
            })
            .finally(hideLoader);
    };

    const onFinish = ({ username, password }: FormData) => {
        changeEmail(username);
        changePassword(password);
        handleRegistration(username, password);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const regex = (value: string) => {
        const regexValue = /(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,}/g;
        const result = regexValue.test(value);
        return result;
    };

    useEffect(() => {
        if (repeatedRequest) {
            changeRepeatedRequest(false);
            handleRegistration(email, password);
        }
    }, [repeatedRequest, handleRegistration, email, password]);

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img className={styles.logo} src={Logo} />

                <div className={styles.form}>
                    <div className={styles.buttonWrapper}>
                        <Menu
                            mode='horizontal'
                            defaultSelectedKeys={['Регистрация']}
                            items={items1}
                        />
                    </div>

                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: '100%', height: 319 }}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        autoComplete='off'
                    >
                        <Form.Item<FormData>
                            name='username'
                            rules={[
                                { required: true, message: '' },
                                { type: 'email', message: '' },
                            ]}
                        >
                            <Input
                                data-test-id='registration-email'
                                addonBefore='e-mail:'
                                size='large'
                                style={{ width: 368, marginBottom: 8 }}
                            />
                        </Form.Item>

                        <Form.Item<FormData>
                            name='password'
                            rules={[
                                {
                                    required: true,
                                    message: '',
                                },

                                {
                                    validator: (_, value) =>
                                        value && regex(value)
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
                                style={{ width: 368 }}
                            />
                        </Form.Item>

                        <Form.Item<FormData>
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
                                style={{ width: 368, marginTop: 25 }}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button
                                data-test-id='registration-submit-button'
                                type='primary'
                                htmlType='submit'
                                block
                                size='large'
                                style={{ marginTop: 36 }}
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='default' block size='large' icon={<GooglePlusOutlined />}>
                        Регистрация через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
