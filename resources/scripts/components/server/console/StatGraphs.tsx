import React, { useEffect, useRef } from 'react';
import { ServerContext } from '@/state/server';
import { SocketEvent } from '@/components/server/events';
import useWebsocketEvent from '@/plugins/useWebsocketEvent';
import { Line } from 'react-chartjs-2';
import { useChart, useChartTickLabel, useChartTickLabelFull } from '@/components/server/console/chart';
import { hexToRgba } from '@/lib/helpers';
import { bytesToString } from '@/lib/formatters';
import { CloudDownloadIcon, CloudUploadIcon } from '@heroicons/react/solid';
import { theme } from 'twin.macro';
import ChartBlock from '@/components/server/console/ChartBlock';
import Tooltip from '@/components/elements/tooltip/Tooltip';
import { CSSTransition } from 'react-transition-group';

export default () => {
    const status = ServerContext.useStoreState((state) => state.status.value);
    const limits = ServerContext.useStoreState((state) => state.server.data?.limits) || 0;
    const previous = useRef<Record<'tx' | 'rx', number>>({ tx: -1, rx: -1 });

    const cpu = useChartTickLabel('CPU', limits.cpu, '%', 2);
    const memory = useChartTickLabel('Memory', limits.memory, 'MiB');
    const network = useChart('Network', {
        sets: 2,
        options: {
            scales: {
                y: {
                    ticks: {
                        callback(value) {
                            return bytesToString(typeof value === 'string' ? parseInt(value, 10) : value);
                        },
                    },
                },
            },
        },
        callback(opts, index) {
            return {
                ...opts,
                label: !index ? 'Network In' : 'Network Out',
                borderColor: !index ? theme('colors.cyan.400') : theme('colors.yellow.400'),
                backgroundColor: hexToRgba(!index ? theme('colors.cyan.700') : theme('colors.yellow.700'), 0.5),
            };
        },
    });

    const cpu_full = useChartTickLabelFull('CPU', limits.cpu, '%', 2);
    const memory_full = useChartTickLabelFull('Memory', limits.memory, 'MiB');
    const network_full = useChart('Network', {
        sets: 2,
        options: {
            scales: {
                x: {
                    grid: {
                        display: true,
                    },
                },
                y: {
                    grid: {
                        display: true,
                    },
                    ticks: {
                        display: true,
                        callback(value) {
                            return bytesToString(typeof value === 'string' ? parseInt(value, 10) : value);
                        },
                    },
                },
            },
        },
        callback(opts, index) {
            return {
                ...opts,
                label: !index ? 'Network In' : 'Network Out',
                borderColor: !index ? theme('colors.cyan.400') : theme('colors.yellow.400'),
                backgroundColor: hexToRgba(!index ? theme('colors.cyan.700') : theme('colors.yellow.700'), 0.5),
            };
        },
    });

    useEffect(() => {
        if (status === 'offline') {
            cpu.clear();
            memory.clear();
            network.clear();

            cpu_full.clear();
            memory_full.clear();
            network_full.clear();
        }
    }, [status]);

    useWebsocketEvent(SocketEvent.STATS, (data: string) => {
        let values: any = {};
        try {
            values = JSON.parse(data);
        } catch (e) {
            return;
        }
        cpu.push(values.cpu_absolute);
        memory.push(Math.floor(values.memory_bytes / 1024 / 1024));
        network.push([
            previous.current.tx < 0 ? 0 : Math.max(0, values.network.tx_bytes - previous.current.tx),
            previous.current.rx < 0 ? 0 : Math.max(0, values.network.rx_bytes - previous.current.rx),
        ]);

        cpu_full.push(values.cpu_absolute);
        memory_full.push(Math.floor(values.memory_bytes / 1024 / 1024));
        network_full.push([
            previous.current.tx < 0 ? 0 : Math.max(0, values.network.tx_bytes - previous.current.tx),
            previous.current.rx < 0 ? 0 : Math.max(0, values.network.rx_bytes - previous.current.rx),
        ]);

        previous.current = { tx: values.network.tx_bytes, rx: values.network.rx_bytes };
    });

    return (
        <>
        {(status && status == 'running') &&
        <CSSTransition timeout={150} classNames={'fade'} appear in>
            <div className="hidden sm:grid grid-cols-2 2xl:grid-cols-3 gap-x-2">
                <div className="flex items-center bg-white/[.05] rounded-lg pr-2 chart_sm">
                    <div className="min-w-[44px] h-[44px] bg-gray-700 flex justify-center items-center rounded-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect><rect x="9" y="9" width="6" height="6"></rect><line x1="9" y1="1" x2="9" y2="4"></line><line x1="15" y1="1" x2="15" y2="4"></line><line x1="9" y1="20" x2="9" y2="23"></line><line x1="15" y1="20" x2="15" y2="23"></line><line x1="20" y1="9" x2="23" y2="9"></line><line x1="20" y1="14" x2="23" y2="14"></line><line x1="1" y1="9" x2="4" y2="9"></line><line x1="1" y1="14" x2="4" y2="14"></line></svg>
                    </div>
                    <ChartBlock>
                        <Line {...cpu.props} />
                    </ChartBlock>
                    <div className="chart_full">
                        <ChartBlock type="full">
                            <p className="text-sm text-white font-bold mb-2">CPU usage</p>
                            <Line {...cpu_full.props} />
                        </ChartBlock>
                    </div>
                </div>

                <div className="flex items-center bg-white/[.05] rounded-lg pr-2 chart_sm">
                    <div className="min-w-[44px] h-[44px] bg-gray-700 flex justify-center items-center rounded-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[20px]" fill="#fff" viewBox="0 0 576 512"><path d="M64 64C28.7 64 0 92.7 0 128v7.4c0 6.8 4.4 12.6 10.1 16.3C23.3 160.3 32 175.1 32 192s-8.7 31.7-21.9 40.3C4.4 236 0 241.8 0 248.6V320H576V248.6c0-6.8-4.4-12.6-10.1-16.3C552.7 223.7 544 208.9 544 192s8.7-31.7 21.9-40.3c5.7-3.7 10.1-9.5 10.1-16.3V128c0-35.3-28.7-64-64-64H64zM576 352H0v64c0 17.7 14.3 32 32 32H80V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h96V416c0-8.8 7.2-16 16-16s16 7.2 16 16v32h48c17.7 0 32-14.3 32-32V352zM192 160v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32zm128 0v64c0 17.7-14.3 32-32 32s-32-14.3-32-32V160c0-17.7 14.3-32 32-32s32 14.3 32 32z"/></svg>
                    </div>
                    <ChartBlock>
                        <Line {...memory.props} />
                    </ChartBlock>
                    <div className="chart_full">
                        <ChartBlock type="full">
                            <p className="text-sm text-white font-bold mb-2">Memory usage</p>
                            <Line {...memory_full.props} />
                        </ChartBlock>
                    </div>
                </div>

                <div className="items-center bg-white/[.05] rounded-lg pr-2 chart_sm !hidden 2xl:!flex">
                    <div className="w-[44px] h-[44px] bg-gray-700 flex justify-center items-center rounded-lg mr-2">
                        <svg xmlns="http://www.w3.org/2000/svg" className="w-[18px]" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 11a9 9 0 0 1 9 9"></path><path d="M4 4a16 16 0 0 1 16 16"></path><circle cx="5" cy="19" r="1"></circle></svg>
                    </div>
                    <ChartBlock>
                        <Line {...network.props} />
                    </ChartBlock>
                    <div className="chart_full">
                        <ChartBlock type="full">
                            <p className="text-sm text-white font-bold mb-2">Network usage</p>
                            <Line {...network_full.props} />
                        </ChartBlock>
                    </div>
                </div>
            </div>
        </CSSTransition>
        }
        </>
    );
};
