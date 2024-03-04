import { ScreenWrapper } from '@components/screen-wrapper/screen-wrapper';
import styles from './change-password-page.module.css';
import { Button, Form, Input } from 'antd';
import { changePasswordRequest } from '../../api/auth';
import { useNavigate } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { AuthContext } from '@context/AuthContext';
import { LoaderContext } from '@context/LoaderContext';
import { PATH } from '../../router';
import { regexPasswordValidation } from '@utils/validation';
import { ModalWrapper } from '@components/modal-wrapper/modal-wrapper.tsx';

interface FormData {
    password: string;
    confirmPassword: string;
}

export const ChangePasswordPage = () => {
    const navigate = useNavigate();

    const { repeatedRequest, changeRepeatedRequest, password, changePassword } =
        useContext(AuthContext);
    const { showLoader, hideLoader } = useContext(LoaderContext);

    const handleChangePassword = (password: string, confirmPassword: string) => {
        showLoader();
        changePasswordRequest(password, confirmPassword)
            .then(() => {
                navigate(PATH.SUCCESS_CHANGE_PASSWORD);
            })
            .catch(() => {
                navigate(PATH.ERROR_CHANGE_PASSWORD);
            })
            .finally(hideLoader);
    };

    const onFinish = ({ password, confirmPassword }: FormData) => {
        changePassword(password);
        handleChangePassword(password, confirmPassword);
    };

    useEffect(() => {
        if (repeatedRequest) {
            changeRepeatedRequest(false);
            handleChangePassword(password, password);
        }
    }, [repeatedRequest, password]);

    return (
        <ScreenWrapper>
            <ModalWrapper modalWrapperStales={styles.wrapper}>
                <div className={styles.title}>Восстановление аккаунта</div>
                <Form
                    name='basic'
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ width: '100%', height: 320 }}
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    autoComplete='off'
                >
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
                            data-test-id='change-password'
                            placeholder='Новый пароль'
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
                            data-test-id='change-confirm-password'
                            placeholder='Повторите пароль'
                            size='large'
                            className={styles.inputConfirmPassword}
                        />
                    </Form.Item>
                    <Form.Item wrapperCol={{ span: 360 }}>
                        <Button
                            data-test-id='change-submit-button'
                            type='primary'
                            htmlType='submit'
                            block
                            size='large'
                            style={{ marginTop: 38 }}
                        >
                            Сохранить
                        </Button>
                    </Form.Item>
                </Form>
            </ModalWrapper>
        </ScreenWrapper>
    );
};
