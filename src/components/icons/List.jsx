import React from 'react';
import useTheme from 'misc/hooks/useTheme';
import SvgIcon from '../SvgIcon';

/* eslint-disable max-len */
const List = ({
                  color = 'default', // default | header | error | success | warning | info | <string>
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
                d="M3 13h2v-2H3v2zm0 4h2v-2H3v2zm0-8h2V7H3v2zm4 4h14v-2H7v2zm0 4h14v-2H7v2zM7 7v2h14V7H7z"
            />
        </SvgIcon>
    );
};

export default List;
