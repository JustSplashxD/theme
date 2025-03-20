import React, { useEffect, useState } from 'react';
import { Server } from '@/api/server/getServer';
import getServers from '@/api/getServers';
import ServerRow from '@/components/dashboard/ServerRow';
import Spinner from '@/components/elements/Spinner';
import PageContentBlock from '@/components/elements/PageContentBlock';
import useFlash from '@/plugins/useFlash';
import { useStoreState } from 'easy-peasy';
import { usePersistedState } from '@/plugins/usePersistedState';
import Switch from '@/components/elements/Switch';
import tw from 'twin.macro';
import useSWR from 'swr';
import { PaginatedResult } from '@/api/http';
import Pagination from '@/components/elements/Pagination';
import { useLocation } from 'react-router-dom';
import Avatar from '@/components/Avatar';

export default () => {
    const { search } = useLocation();
    const defaultPage = Number(new URLSearchParams(search).get('page') || '1');

    const [page, setPage] = useState(!isNaN(defaultPage) && defaultPage > 0 ? defaultPage : 1);
    const { clearFlashes, clearAndAddHttpError } = useFlash();
    const uuid = useStoreState((state) => state.user.data!.uuid);
    const user = useStoreState((state) => state.user.data!.username);
    const rootAdmin = useStoreState((state) => state.user.data!.rootAdmin);
    const [showOnlyAdmin, setShowOnlyAdmin] = usePersistedState(`${uuid}:show_all_servers`, false);

    const { data: servers, error } = useSWR<PaginatedResult<Server>>(
        ['/api/client/servers', showOnlyAdmin && rootAdmin, page],
        () => getServers({ page, type: showOnlyAdmin && rootAdmin ? 'admin' : undefined })
    );

    useEffect(() => {
        if (!servers) return;
        if (servers.pagination.currentPage > 1 && !servers.items.length) {
            setPage(1);
        }
    }, [servers?.pagination.currentPage]);

    useEffect(() => {
        // Don't use react-router to handle changing this part of the URL, otherwise it
        // triggers a needless re-render. We just want to track this in the URL incase the
        // user refreshes the page.
        window.history.replaceState(null, document.title, `/${page <= 1 ? '' : `?page=${page}`}`);
    }, [page]);

    useEffect(() => {
        if (error) clearAndAddHttpError({ key: 'dashboard', error });
        if (!error) clearFlashes('dashboard');
    }, [error]);

    return (
        <PageContentBlock title={'Dashboard'} showFlashKey={'dashboard'}>
            <div className="bg_home_section">
                <p className="text-3xl text-white font-bold mt-[50px] block relative z-1">
                    Welcome back {user}!
                </p>
            </div>
            <div className="servers_content mt-[150px] block relative z-1" style={{ width: '102%' }}>
                <div className="homeServers block relative">
                <div className="w-full flex items-center justify-between mb-4">
                    <p className="text-lg text-white font-bold">Servers you own</p>

                    {rootAdmin &&
                    <div css={tw`hidden sm:flex justify-end items-center`} className="switcher w-fit absolute" style={{top:'10px',right:'0'}}>
                        <p css={tw`uppercase text-xs text-neutral-400 mr-2 hidden sm:block`}>
                            {showOnlyAdmin ? 'Showing other\'s servers' : 'Showing your servers'}
                        </p>
                        <Switch
                            name={'show_all_servers'}
                            defaultChecked={showOnlyAdmin}
                            onChange={() => setShowOnlyAdmin(s => !s)}
                        />
                    </div>
                    }
                </div>
                    <div className="clear"></div>

                    {!servers ?
                        <Spinner centered size={'large'}/>
                        :
                        <Pagination data={servers} onPageSelect={setPage}>
                            {({ items }) => (
                                items.length > 0 ?
                                    <div class="relative overflow-x-auto -ml-6 serverList">
                                        <table class="w-full text-sm text-left">
                                            <thead class="text-white">
                                                <tr>
                                                    <th scope="col" class="px-6 hidden 2xl:block">
                                                        CPU Usage
                                                    </th>
                                                    <th scope="col" class="px-6">
                                                        Server name
                                                    </th>
                                                    <th scope="col" class="px-6">
                                                        IP Address
                                                    </th>
                                                    <th scope="col" class="px-6 hidden 2xl:block">
                                                        Server ID
                                                    </th>
                                                    <th scope="col" class="px-6">
                                                        Status
                                                    </th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                            {items.map((server, index) => (
                                                <ServerRow
                                                    key={server.uuid}
                                                    server={server}
                                                    css={index > 0 ? tw`mt-2` : undefined}
                                                />
                                            ))}
                                            </tbody>
                                        </table>
                                    </div>
                                    :
                                    <p css={tw`text-center text-sm text-neutral-400`}>
                                        {showOnlyAdmin ?
                                            'There are no other servers to display.'
                                            :
                                            'There are no servers associated with your account.'
                                        }
                                    </p>
                            )}
                        </Pagination>
                    }
                </div>
             
            </div>
            <div className="clear"></div>
        </PageContentBlock>
    );
};
