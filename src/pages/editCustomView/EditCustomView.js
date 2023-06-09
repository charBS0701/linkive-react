import { useState } from "react";
import ViewText from "../../routes/customView/ViewText";
import ViewTitle from "../../routes/customView/ViewTitle";
import ViewLink from "../../routes/customView/ViewLink";
import ViewCode from "../../routes/customView/ViewCode";
import ViewCheck from "../../routes/customView/ViewCheck";
import ViewAddress from "../../routes/customView/ViewAddress";
import ViewImage from "../../routes/customView/ViewImage";
import styled from "styled-components";
import BtnAddLink from "../home/BtnAddLink";
import MapContainer from "../../routes/customView/MapContainer";
import LandingPage from "../../routes/customView/LandingPage";

const StyledMargin = styled.div`
    margin-bottom: 30px;
`;

const EditCustomView = () => {
    return (
        <div>
            <ViewAddress/>
        </div>
    )
}

export default EditCustomView;