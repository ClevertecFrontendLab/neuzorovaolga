import React, { useContext, useEffect, useState } from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import MobileLogo from './../../assets/img/mobile-logo.png';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './login-page.module.css';

import { Button, Checkbox, Form, Input } from 'antd';
import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { checkEmailRequest, loginRequest } from './../../api/auth';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from './../../context/AuthContext';
import { LoaderContext } from '../../context/LoaderContext';
import { PATH } from '../../router';
import { GlobalContext } from '../../context/GlobalContext';
import { saveTokenHelper } from '@utils/storage';
import useWindowDimensions from '@hooks/useWindowDimensions';

interface FormData {
    username: string;
    password: string;
    remember: boolean;
}

export const LoginPage: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    const { email, changeEmail, repeatedRequest, changeRepeatedRequest } = useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
    const { logIn } = useContext(GlobalContext);
    const [emailValue, setEmailValue] = useState(email);

    const items1: MenuProps['items'] = ['Вход', 'Регистрация'].map((key) => ({
        key,
        label: `${key}`,
        style: {
            width: `${!isMobile ? '184px' : '148px'}`,
            textAlign: 'center',
            fontSize: `${!isMobile ? '16px' : '14px'}`,
            padding: 0,
        },
        onClick: () => {
            if (key === 'Регистрация') {
                navigate(PATH.REGISTRATION);
            }
        },
    }));

    const handleChangeEmail = (event: any) => {
        setEmailValue(event?.target.value);
    };

    const forgotPasswordFlow = () => {
        changeEmail(emailValue);
        showLoader();
        checkEmailRequest(emailValue)
            .then(() => navigate(PATH.CONFIRM_EMAIL))

            .catch((error) => {
                if (error.status === 404) {
                    navigate(PATH.ERROR_CHECK_EMAIL_NO_EXIST);
                } else {
                    navigate(PATH.ERROR_CHECK_EMAIL);
                }
            })
            .finally(hideLoader);
    };

    const handleForgotPassword = () => {
        if (!form.getFieldError('username').length && form.isFieldTouched('username')) {
            forgotPasswordFlow();
        }
    };

    const onFinish = ({ username, password, remember }: FormData) => {
        showLoader();
        loginRequest(username, password)
            .then(({ accessToken }) => {
                logIn();
                saveTokenHelper(accessToken, remember);
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
            forgotPasswordFlow();
        }
    }, [repeatedRequest, forgotPasswordFlow]);

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                {!isMobile && <img className={styles.logo} src={Logo} />}
                {isMobile && <img className={styles.logo} src={MobileLogo} />}
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
                        form={form}
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
                                style={
                                    !isMobile
                                        ? { width: 368, marginBottom: 8 }
                                        : { width: 296, marginBottom: 8 }
                                }
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
                                style={!isMobile ? { width: 368 } : { width: 296, fontSize: 14 }}
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
                                style={
                                    !isMobile
                                        ? {
                                              paddingRight: 0,
                                              fontSize: 16,
                                              color: '#2f54eb',
                                          }
                                        : {
                                              paddingRight: 0,
                                              fontSize: 14,
                                              marginRight: 5,
                                              color: '#2f54eb',
                                          }
                                }
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
                                style={{
                                    backgroundColor: '#2f54eb',
                                }}
                            >
                                Войти
                            </Button>
                        </Form.Item>
                    </Form>
                    <Button
                        className={styles.googleButton}
                        type='default'
                        block
                        size='large'
                        icon={!isMobile && <GooglePlusOutlined />}
                    >
                        Войти через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
