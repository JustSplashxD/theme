import React, { useEffect, useState } from 'react';
import { Button } from '@/components/elements/button/index';
import Can from '@/components/elements/Can';
import { ServerContext } from '@/state/server';
import { PowerAction } from '@/components/server/console/ServerConsoleContainer';
import { Dialog } from '@/components/elements/dialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlayCircle, faSyncAlt, faPowerOff } from '@fortawesome/free-solid-svg-icons';

interface PowerButtonProps {
    className?: string;
}

export default ({ className }: PowerButtonProps) => {
    const [open, setOpen] = useState(false);
    const status = ServerContext.useStoreState((state) => state.status.value);
    const instance = ServerContext.useStoreState((state) => state.socket.instance);

    const killable = status === 'stopping';
    const onButtonClick = (
        action: PowerAction | 'kill-confirmed',
        e: React.MouseEvent<HTMLButtonElement, MouseEvent>
    ): void => {
        e.preventDefault();
        if (action === 'kill') {
            return setOpen(true);
        }

        if (instance) {
            setOpen(false);
            instance.send('set state', action === 'kill-confirmed' ? 'kill' : action);
        }
    };

    useEffect(() => {
        if (status === 'offline') {
            setOpen(false);
        }
    }, [status]);

    return (
        <div className={className+' serverPowers'}>
            <Dialog.Confirm
                open={open}
                hideCloseIcon
                onClose={() => setOpen(false)}
                title={'Forcibly Stop Process'}
                confirm={'Continue'}
                onConfirmed={onButtonClick.bind(this, 'kill-confirmed')}
            >
                Forcibly stopping a server can lead to data corruption.
            </Dialog.Confirm>
            <Can action={'control.start'}>
                <Button
                    className={'btn'}
                    disabled={status !== 'offline'}
                    onClick={onButtonClick.bind(this, 'start')}
                >
                    <FontAwesomeIcon icon={faPlayCircle} className="text-xs mr-2" />
                    <span>Start</span>
                </Button>
            </Can>
            <Can action={'control.restart'}>
                <Button.Text className={'btn'} disabled={!status} onClick={onButtonClick.bind(this, 'restart')}>
                    <FontAwesomeIcon icon={faSyncAlt} className="text-xs font-nor mr-2" />
                    <span>Restart</span>
                </Button.Text>
            </Can>
            <Can action={'control.stop'}>
                <Button.Danger
                    className={'btn'}
                    disabled={status === 'offline'}
                    onClick={onButtonClick.bind(this, killable ? 'kill' : 'stop')}
                >
                    <FontAwesomeIcon icon={faPowerOff} className="text-xs" />
                </Button.Danger>
            </Can>
        </div>
    );
};
