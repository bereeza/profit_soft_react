import React, {useMemo} from 'react';
import IntlProvider from 'misc/providers/IntlProvider';
import useLocationSearch from 'misc/hooks/useLocationSearch';

import getMessages from './intl';
import SongDetails from './containers/SongDetails';
import {Provider} from 'react-redux';
import configureStore from '../../../misc/redux/configureStore';
import rootReducer from './reducers';

const store = configureStore(rootReducer);

function Index() {
    const {
        lang,
    } = useLocationSearch();
    const messages = useMemo(() => getMessages(lang), [lang]);
    return (
        <>
            <Provider store={store}>
                <IntlProvider messages={messages}>
                    <SongDetails/>
                </IntlProvider>
            </Provider>
        </>
    );
}

export default Index;
