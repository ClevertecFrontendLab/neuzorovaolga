import React, { useContext, useEffect, useState } from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './login-page.module.css';

import 'antd/dist/antd.css';
import { Button, Checkbox, Form, Input } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { checkEmailRequest, loginRequest } from './../../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { LoaderContext } from '../../context/LoaderContext';
import { useSelector } from 'react-redux';
import { getRouterSelector } from '@redux/selector';
import { PATH } from '../../router';

interface FormData {
    username: string;
    password: string;
    remember: string;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();

    const router = useSelector(getRouterSelector);
    const { email, changeEmail, repeatedRequest, changeRepeatedRequest } = useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    console.log(router);

    const [emailValue, setEmailValue] = useState(email);

    const items1: MenuProps['items'] = ['Вход', 'Регистрация'].map((key) => ({
        key,
        label: `${key}`,
        style: { width: 184, textAlign: 'center', fontSize: 16, padding: 0 },
        onClick: () => {
            if (key === 'Регистрация') {
                navigate(PATH.REGISTRATION);
            }
        },
    }));

    const handleChangeEmail = (event: any) => {
        setEmailValue(event?.target.value);
    };

    const handleForgotPassword = () => {
        changeEmail(emailValue);
        showLoader();
        checkEmailRequest(emailValue)
            .then(() => navigate(PATH.CONFIRM_EMAIL))

            .catch((error) => {
                if (error.statusCode === 404 && error.message === 'Email не найден') {
                    navigate(PATH.ERROR_CHECK_EMAIL_NO_EXIST);
                } else {
                    navigate(PATH.ERROR_CHECK_EMAIL);
                }
            })
            .finally(hideLoader);
    };

    const onFinish = ({ username, password }: FormData) => {
        showLoader();
        loginRequest(username, password)
            .then((data) => {
                console.log('data', data);

                navigate(PATH.MAIN);
            })
            .catch(() => {
                navigate(PATH.ERROR_LOGIN);
            })
            .finally(hideLoader);
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    useEffect(() => {
        if (repeatedRequest) {
            changeRepeatedRequest(false);
            handleForgotPassword();
        }
    }, [repeatedRequest, handleForgotPassword]);

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                <img className={styles.logo} src={Logo} />

                <div className={styles.form}>
                    <div className={styles.buttonWrapper}>
                        <Menu mode='horizontal' defaultSelectedKeys={['Вход']} items={items1} />
                    </div>

                    <Form
                        name='basic'
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16 }}
                        style={{ width: '100%', height: 270 }}
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
                                data-test-id='login-email'
                                addonBefore='e-mail:'
                                size='large'
                                style={{ width: 368, marginBottom: 8 }}
                                onChange={handleChangeEmail}
                            />
                        </Form.Item>

                        <Form.Item<FormData>
                            name='password'
                            rules={[
                                { required: true, message: '' },
                                { min: 8, message: '' },
                            ]}
                        >
                            <Input.Password
                                data-test-id='login-password'
                                placeholder='Пароль'
                                size='large'
                                style={{ width: 368 }}
                            />
                        </Form.Item>
                        <div className={styles.checkAndLink}>
                            <Form.Item<FormData>
                                name='remember'
                                valuePropName='checked'
                                wrapperCol={{ span: 40 }}
                            >
                                <Checkbox data-test-id='login-remember'>Запомнить меня</Checkbox>
                            </Form.Item>
                            <Button
                                data-test-id='login-forgot-button'
                                type='link'
                                style={{
                                    paddingRight: 0,
                                    fontSize: 16,
                                }}
                                onClick={handleForgotPassword}
                            >
                                Забыли пароль?
                            </Button>
                        </div>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button
                                data-test-id='login-submit-button'
                                type='primary'
                                htmlType='submit'
                                block
                                size='large'
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button type='default' block size='large' icon={<GooglePlusOutlined />}>
                        Войти через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
