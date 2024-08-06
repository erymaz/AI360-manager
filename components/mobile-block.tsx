import {Global, css} from "@emotion/react";
import styled from "@emotion/styled";
import {useTranslations} from "next-intl";

const StyledMobileBlock = styled.div`
    position: fixed;
    inset: 0;
    background: #fff;
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    padding: 4rem;
    font-size: 2rem;

    @media (min-width: 48rem) {
        display: none;
    }
`;

const bodyCss = css`
    body {
        overflow: hidden;
        @media (min-width: 48rem) {
            overflow: auto;
        }
    }
`;

export const MobileBlock = () => {
    const t = useTranslations('waipify.ui');

    return (
        <>
            <StyledMobileBlock>{t("general.mobile-block")}</StyledMobileBlock>
            <Global styles={bodyCss}/>
        </>
    );
};
