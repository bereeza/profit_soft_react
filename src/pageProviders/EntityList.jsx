import PageContainer from "./components/PageContainer";
import EntityListPage from "pages/song/song_lits";
import React from 'react';
import * as authorities from "../constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";

const EntityList = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <EntityListPage {...props}/>
            </PageContainer>
        </PageAccessValidator>
    );
};

export default EntityList;