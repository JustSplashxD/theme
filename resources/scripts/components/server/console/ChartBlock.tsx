import React from 'react';
import classNames from 'classnames';
import styles from '@/components/server/console/style.module.css';

interface ChartBlockProps {
    title: string;
    legend?: React.ReactNode;
    children: React.ReactNode;
    type?: string;
}

export default ({ title, legend, children, type }: ChartBlockProps) => (
    <div>
        <div className={type == 'full' ? classNames(styles.chart_container_full, 'group') : classNames(styles.chart_container, 'group')}>{children}</div>
    </div>
);
