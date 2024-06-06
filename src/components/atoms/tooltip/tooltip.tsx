import React from 'react';
import styles from './tooltip.module.scss';

interface TooltipProps {
    label?: string;
    key?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ label, key }) => {
    return (

        <div className={styles.Tooltip}>
            <p className={styles.Label}>{label}</p>

            {key &&
                <div className={styles.ShortcutKeys}>
                    <span className={styles.Key}>Ctrl</span>
                    <span className={styles.Key}>C</span>
                </div>
            }

        </div>

    )
}

export default Tooltip;
