import PageContainer from "./components/PageContainer";
import EntityDetailsPage from "pages/song/song_details";
import React from 'react';
import * as authorities from "../constants/authorities";
import PageAccessValidator from "./components/PageAccessValidator";

const EntityDetails = (props) => {
    return (
        <PageAccessValidator
            neededAuthorities={[authorities.ENABLE_SEE_SECRET_PAGE]}
        >
            <PageContainer>
                <EntityDetailsPage {...props}/>
            </PageContainer>
        </PageAccessValidator>
    );
};

export default EntityDetails;