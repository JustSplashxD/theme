import TransferListener from '@/components/server/TransferListener';
import React, { useEffect, useState, useMemo } from 'react';
import { NavLink, Route, Switch, useRouteMatch } from 'react-router-dom';
import NavigationBar from '@/components/NavigationBar';
import TransitionRouter from '@/TransitionRouter';
import WebsocketHandler from '@/components/server/WebsocketHandler';
import { ServerContext } from '@/state/server';
import { CSSTransition } from 'react-transition-group';
import Can from '@/components/elements/Can';
import Spinner from '@/components/elements/Spinner';
import { NotFound, ServerError } from '@/components/elements/ScreenBlock';
import { httpErrorToHuman } from '@/api/http';
import { useStoreState } from 'easy-peasy';
import SubNavigation from '@/components/elements/SubNavigation';
import InstallListener from '@/components/server/InstallListener';
import ErrorBoundary from '@/components/elements/ErrorBoundary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExternalLinkAlt, faGlobe, faWifi, faDesktop, faTerminal, faFolder, faDatabase, faClock, faUsers, faArchive, faEthernet, faNetworkWired, faSlidersH, faClipboardCheck, faQuestionCircle } from '@fortawesome/free-solid-svg-icons';
import { useLocation } from 'react-router';
import ConflictStateRenderer from '@/components/server/ConflictStateRenderer';
import PermissionRoute from '@/components/elements/PermissionRoute';
import routes from '@/routers/routes';
import CopyOnClick from '@/components/elements/CopyOnClick';
import { bytesToString, ip, mbToBytes } from '@/lib/formatters';
import PowerButtons from '@/components/server/console/PowerButtons';

export default () => {
    const match = useRouteMatch<{ id: string }>();
    const location = useLocation();

    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [error, setError] = useState('');

    const id = ServerContext.useStoreState((state) => state.server.data?.id);
    const uuid = ServerContext.useStoreState((state) => state.server.data?.uuid);
    const name = ServerContext.useStoreState((state) => state.server.data?.name);
    const nestId = ServerContext.useStoreState((state) => state.server.data?.nestId);
    const inConflictState = ServerContext.useStoreState((state) => state.server.inConflictState);
    const serverId = ServerContext.useStoreState((state) => state.server.data?.internalId);
    const getServer = ServerContext.useStoreActions((actions) => actions.server.getServer);
    const clearServerState = ServerContext.useStoreActions((actions) => actions.clearServerState);
    const limits = ServerContext.useStoreState((state) => state.server.data?.limits);

    const textLimits = useMemo(
        () => ({
            cpu: limits?.cpu ? `${limits.cpu}%` : null,
            memory: limits?.memory ? bytesToString(mbToBytes(limits.memory)) : null,
            disk: limits?.disk ? bytesToString(mbToBytes(limits.disk)) : null,
        }),
        [limits]
    );
    
    const allocation = ServerContext.useStoreState((state) => {
        const match = state.server.data?.allocations.find((allocation) => allocation.isDefault);

        return !match ? 'n/a' : `${match.alias || ip(match.ip)}:${match.port}`;
    });
    const status = ServerContext.useStoreState((state) => state.status.value);

    const to = (value: string, url = false) => {
        if (value === '/') {
            return url ? match.url : match.path;
        }
        return `${(url ? match.url : match.path).replace(/\/*$/, '')}/${value.replace(/^\/+/, '')}`;
    };

    useEffect(
        () => () => {
            clearServerState();
        },
        []
    );

    useEffect(() => {
        setError('');

        getServer(match.params.id).catch((error) => {
            console.error(error);
            setError(httpErrorToHuman(error));
        });

        return () => {
            clearServerState();
        };
    }, [match.params.id]);

    return (
        <React.Fragment key={'server-router'}>
            <div className="flex">
            <NavigationBar />
            <div className={'mainContent'}>
            {!uuid || !id ? (
                <div className={'mainContent'}>
                {error ? (
                    <ServerError message={error} />
                ) : (
                    <Spinner size={'large'} centered />
                )}
                </div>
            ) : (
            <>
            <div className="bg_home_section">
                <p className="text-3xl text-white font-bold mt-[50px] block relative z-1">
                    Manage {name}
                </p>
                <p className="serverMore flex items-center mt-1">
                    <FontAwesomeIcon icon={faDesktop} className="mr-2" />
                    {textLimits.cpu} vCPU
                    <span className="text-xs mx-2 pb-1">●</span>
                    {textLimits.memory} RAM
                    <span className="text-xs mx-2 pb-1">●</span>
                    {textLimits.disk} disk
                </p>
            </div>
            <div className="block sm:flex">
                <div className="server_left_content mt-[150px] block relative z-1">
                    <div className="server_left_block">
                        <p className="text-white opacity-50">Address</p>
                        <CopyOnClick text={allocation}>
                            <p className="text-white text-lg font-bold leading-4">
                                {allocation}
                            </p>
                        </CopyOnClick>

                        <p className="text-white opacity-50 mt-2">Status</p>
                        <p className="text-white text-lg font-bold leading-4 capitalize">
                            {status === null ? (
                                <>Connecting</>
                            ) : (
                                <>{status}</>
                            )}
                        </p>
                        <PowerButtons className="flex justify-between mt-4 mb-6" />

                        <div>
                            {routes.server
                                .filter((route) => !!route.name)
                                .map((route) =>
                                    route.permission ? (
                                        <Can key={route.path} action={route.permission} matchAny>
                                            <NavLink to={to(route.path, true)} exact={route.exact} className="w-full flex items-center gap-x-4 mb-1 server_menu_left_items">
                                                <div className="w-[46px] h-[46px] bg-gray-700 rounded-lg flex justify-center items-center">
                                                    {route.name == 'Console' ? 
                                                        <FontAwesomeIcon icon={faTerminal} />
                                                    : route.name == 'Files' ?
                                                        <FontAwesomeIcon icon={faFolder} />
                                                    : route.name == 'Databases' ?
                                                        <FontAwesomeIcon icon={faDatabase} />
                                                    : route.name == 'Schedules' ?
                                                        <FontAwesomeIcon icon={faClock} />
                                                    : route.name == 'Users' ?
                                                        <FontAwesomeIcon icon={faUsers} />
                                                    : route.name == 'Backups' ?
                                                        <FontAwesomeIcon icon={faArchive} />
                                                    : route.name == 'Network' ?
                                                        <FontAwesomeIcon icon={faEthernet} />
                                                    : route.name == 'Startup' ?
                                                        <FontAwesomeIcon icon={faNetworkWired} />
                                                    : route.name == 'Settings' ?
                                                        <FontAwesomeIcon icon={faSlidersH} />
                                                    : route.name == 'Activity' ?
                                                        <FontAwesomeIcon icon={faClipboardCheck} />
                                                    : 
                                                        <FontAwesomeIcon icon={faQuestionCircle} />
                                                    }
                                                </div>
                                                {route.name}
                                            </NavLink>
                                        </Can>
                                    ) : (
                                        <NavLink key={route.path} to={to(route.path, true)} exact={route.exact} className="w-full flex items-center gap-x-4 mb-1 server_menu_left_items">
                                            <div className="w-[46px] h-[46px] bg-gray-700 rounded-lg flex justify-center items-center">
                                                {route.name == 'Console' ? 
                                                    <FontAwesomeIcon icon={faTerminal} />
                                                : route.name == 'Files' ?
                                                    <FontAwesomeIcon icon={faFolder} />
                                                : route.name == 'Databases' ?
                                                    <FontAwesomeIcon icon={faDatabase} />
                                                : route.name == 'Schedules' ?
                                                    <FontAwesomeIcon icon={faClock} />
                                                : route.name == 'Users' ?
                                                    <FontAwesomeIcon icon={faUsers} />
                                                : route.name == 'Backups' ?
                                                    <FontAwesomeIcon icon={faArchive} />
                                                : route.name == 'Network' ?
                                                    <FontAwesomeIcon icon={faEthernet} />
                                                : route.name == 'Startup' ?
                                                    <FontAwesomeIcon icon={faNetworkWired} />
                                                : route.name == 'Settings' ?
                                                    <FontAwesomeIcon icon={faSlidersH} />
                                                : route.name == 'Activity' ?
                                                    <FontAwesomeIcon icon={faClipboardCheck} />
                                                : 
                                                    <FontAwesomeIcon icon={faQuestionCircle} />
                                                }
                                            </div>
                                            {route.name}
                                        </NavLink>
                                    )
                                )}
                            {rootAdmin && (
                                // eslint-disable-next-line react/jsx-no-target-blank
                                <a href={`/admin/servers/view/${serverId}`} target={'_blank'} className="w-full flex items-center gap-x-4 mb-1 server_menu_left_items">
                                    <div className="w-[46px] h-[46px] bg-gray-700 rounded-lg flex justify-center items-center">
                                        <FontAwesomeIcon icon={faExternalLinkAlt} />
                                    </div>
                                    Admin control
                                </a>
                            )}
                        </div>
                    </div>
                </div>
                <div className="server_right_content mt-[150px] block relative z-1">
                    <div className="block relative">
                        <InstallListener />
                        <TransferListener />
                        <WebsocketHandler />
                        {inConflictState && (!rootAdmin || (rootAdmin && !location.pathname.endsWith(`/server/${id}`))) ? (
                            <ConflictStateRenderer />
                        ) : (
                            <ErrorBoundary>
                                <TransitionRouter>
                                    <Switch location={location}>
                                        {routes.server.map(({ name, path, permission, component: Component }) => (
                                            <PermissionRoute key={path} permission={permission} path={to(path)} exact>
                                                <Spinner.Suspense>
                                                    <p className="text-lg text-white font-bold mb-2">{name}</p>
                                                    <Component />
                                                </Spinner.Suspense>
                                            </PermissionRoute>
                                        ))}
                                        <Route path={'*'} component={NotFound} />
                                    </Switch>
                                </TransitionRouter>
                            </ErrorBoundary>
                        )}
                    </div>
                </div>
            </div>
            </>
            )}
        </div>
        </div>
        </React.Fragment>
    );
};
