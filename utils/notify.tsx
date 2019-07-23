import cogoToast from 'cogo-toast';
import Button from '@/components/Button';
import './toast.css';

type TNotifyProps = {
  msg: string;
  btnText: string;
  action: () => void;
};

export default ({ msg, action, btnText }: TNotifyProps) =>
  cogoToast.info(msg, {
    onClick: hide => {
      action();
      // @ts-ignore
      hide();
    },
    hideAfter: 1500,
    position: 'top-left',
    bar: {
      size: '0px',
    },
    renderIcon: () => <Button>{btnText}</Button>,
  });
