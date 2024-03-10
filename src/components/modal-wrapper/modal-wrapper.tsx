import styles from './modal-wrapper.module.css';
import classnames from 'classnames';
import { Modal } from 'antd';

type Props = {
    children: React.ReactNode;
    modalWrapperStales?: string;
    width?: string | number;
};

export const ModalWrapper = ({ children, modalWrapperStales, width }: Props) => (
    <div className={classnames(styles.wrapper)}>
        <Modal
            open
            closable={false}
            footer={null}
            className={modalWrapperStales}
            centered
            width={width}
        >
            {children}
        </Modal>
    </div>
);
