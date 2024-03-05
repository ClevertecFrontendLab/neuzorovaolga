import { useContext, useEffect } from 'react';
import Logo from './../../assets/img/infoCardLogo.png';
import MobileLogo from './../../assets/img/mobile-logo.png';
import styles from './registration-page.module.css';
import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';

import { Button, Form, Input } from 'antd';

import type { MenuProps } from 'antd';
import { Menu } from 'antd';
import { GooglePlusOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { registrationRequest } from './../../api/auth';
import { AuthContext } from '@context/AuthContext';
import { LoaderContext } from '@context/LoaderContext';
import { PATH } from '../../router';
import useWindowDimensions from '@hooks/useWindowDimensions';
import { regexPasswordValidation } from '@utils/validation';

interface FormData {
    username: string;
    password: string;
    confirmPassword?: string;
}

export const RegistrationPage = () => {
    const navigate = useNavigate();
    const { width } = useWindowDimensions();
    const isMobile = width <= 833;
    const { email, changeEmail, password, changePassword, repeatedRequest, changeRepeatedRequest } =
        useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);
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
                if (error.status === 409) {
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

    useEffect(() => {
        if (repeatedRequest) {
            changeRepeatedRequest(false);
            handleRegistration(email, password);
        }
    }, [repeatedRequest, handleRegistration, email, password]);

    return (
        <ScreenWrapper>
            <div className={styles.wrapper}>
                {!isMobile && <img className={styles.logo} src={Logo} />}
                {isMobile && <img className={styles.logo} src={MobileLogo} />}

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
                        className={styles.formWrapper}
                        initialValues={{ remember: true }}
                        onFinish={onFinish}
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
                                className={styles.inputEmail}
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
                                className={styles.inputConfirmPassword}
                            />
                        </Form.Item>
                        <Form.Item wrapperCol={{ span: 360 }}>
                            <Button
                                data-test-id='registration-submit-button'
                                type='primary'
                                htmlType='submit'
                                block
                                size='large'
                                className={styles.submitButton}
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
                        Регистрация через Google
                    </Button>
                </div>
            </div>
        </ScreenWrapper>
    );
};
