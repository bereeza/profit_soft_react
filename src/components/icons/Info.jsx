import React from 'react';
import useTheme from 'misc/hooks/useTheme';
import SvgIcon from '../SvgIcon';

/* eslint-disable max-len */
const Info = ({
                  color = 'info', // default | header | error | success | warning | info | <string>
                  size = 24,
              }) => {
    const {theme} = useTheme();
    const actualColor = theme.icon.color[color] || color;
    return (
        <SvgIcon
            style={{
                height: `${size}px`,
                width: `${size}px`,
            }}
            viewBox="0 0 24 24"
        >
            <path
                fill={actualColor}
                d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-6h2v6zm0-8h-2V7h2v2z"
            />
        </SvgIcon>
    );
};

export default Info;