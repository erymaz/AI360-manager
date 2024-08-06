import {MonetaryAmount} from "@/components/monetary-amount";
import styled from "@emotion/styled";
import {Grid, GridProps} from "@mui/material";
import {ReactNode, useCallback, useState, useEffect} from "react";
import {useTranslations} from "next-intl";

const StyledGeneratorCardContainer = styled(Grid)`
    position: relative;
`;

const StyledGeneratorActions = styled.div`
    position: absolute;
    top: 2rem;
    right: 0.5rem;
`;

const StyledGeneratorCard = styled.div`
    flex: 1;
    height: 100%;
    background-color: #fff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    border-radius: 10px;
    transition: all 0.15s ease-in;

    cursor: ${({onClick}) => (!!onClick ? "pointer" : "auto")};

    &:hover {
        box-shadow: 0 10px 20px -10px rgba(0, 0, 0, 0.3);
    }
`;

const StyledGeneratorImage = styled.img`
    width: 100%;
    border-radius: 10px 10px 0px 0px;
    aspect-ratio: 4 / 3;
    object-fit: cover;
`;

const StyledGeneratorTitle = styled.div`
    font-style: normal;
    font-weight: 700;
    font-size: 18px;
    line-height: 20px;
    color: #000000;
`;

const StyledGeneratorDescription = styled.div`
    font-style: normal;
    font-weight: 400;
    font-size: 14px;
    line-height: 20px;
    color: #000000;
    margin: 0.5rem 0;
`;

const StyledGeneratorBody = styled.div`
    padding-bottom: 1.5rem;
`;

const StyledGeneratorContent = styled.div`
    padding: 1rem 1rem 0;
`;
const StyledGeneratorFooter = styled.div`
    margin-top: -1rem;
`;
const StyledGeneratorFooterContent = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 0 1rem 1rem;
`;
const StyledGeneratorFooterAction = styled.div`
    display: flex;
    justify-content: center;
    padding-bottom: 1rem;
`;
const StyledGeneratorCredits = styled.div`
    color: #878b90;
    font-size: 12px;
`;

const StyledGeneratorButton = styled.button`
    appearance: none;
    display: inline-block;
    border: none;
    background-color: transparent;
    font-family: inherit;
    font-size: 1rem;
    text-align: center;
    background-color: #1c58d8;
    cursor: pointer;
    border-radius: 10px;
    font-style: normal;
    font-weight: 500;
    font-size: 14px;
    line-height: 20px;
    color: #fff;
    padding: 0.5rem 1rem;
`;

const StyledGeneratorPopularity = styled.div`
    font-style: normal;
    font-size: 12px;
    line-height: 20px;
    color: #878b90;
`;

const extractPopularityKey = (popularity: number): string => {
    switch (popularity) {
        case 1:
            return "high";
        case 2:
            return "medium";
        case 3:
            return "low";
        default:
            return "low";
    }
};

export const GeneratorCard = ({
                                  image,
                                  title,
                                  description,
                                  cost,
                                  popularity,
                                  compact,
                                  onClick,
                                  actions,
                                  showPrice = true,
                                  ...rest
                              }: Partial<Omit<GridProps, "title">> & {
    image?: string;
    title?: any;
    description?: any;
    cost: number;
    popularity: number;
    onClick?: () => any;
    compact?: boolean;
    showPrice?: boolean;
    actions?: ReactNode;
}) => {
    const t = useTranslations('waipify.ui');
    const [imageUrl, setImageUrl] = useState(
        `/ai-generators-library/${image !== "" ? image : "realEstateExpose"}.png`
    );

    const onError = useCallback(() => {
        setImageUrl(`/ai-generators-library/realEstateExpose.png`);
    }, []);

    useEffect(() => {
        setImageUrl(`/ai-generators-library/${image}.png`);
    }, [image]);

    return (
        <StyledGeneratorCardContainer
            item
            xs={12}
            md={6}
            lg={compact ? 3 : 4}
            {...rest}
        >
            {!!actions && <StyledGeneratorActions>{actions}</StyledGeneratorActions>}
            <StyledGeneratorCard onClick={compact ? onClick : undefined}>
                <StyledGeneratorBody>
                    <StyledGeneratorImage
                        src={imageUrl}
                        alt={t(title) || title["en-US"]}
                        onError={onError}
                    />
                    <StyledGeneratorContent>
                        <StyledGeneratorTitle>{title}</StyledGeneratorTitle>
                        {!compact && (
                            <StyledGeneratorDescription>
                                {description}
                            </StyledGeneratorDescription>
                        )}
                    </StyledGeneratorContent>
                </StyledGeneratorBody>
                {(!compact || showPrice) && (
                    <StyledGeneratorFooter>
                        <StyledGeneratorFooterContent>
                            <StyledGeneratorPopularity>
                <span>
                  <b>{t("general.generator_popularity.heading")}:</b>
                </span>{" "}
                                {t(
                                    `general.generator_popularity.${extractPopularityKey(
                                        popularity
                                    )}`
                                )}
                            </StyledGeneratorPopularity>
                            {showPrice && (
                                <StyledGeneratorCredits>
                  <span>
                    <b>
                      <MonetaryAmount centCost={cost}/>
                    </b>
                  </span>{" "}
                                    / {t("general.per-use")}
                                </StyledGeneratorCredits>
                            )}
                        </StyledGeneratorFooterContent>
                        {!compact && (
                            <StyledGeneratorFooterAction>
                                <StyledGeneratorButton onClick={onClick}>
                                    {t("ai-generators.add_to_workspace")}
                                </StyledGeneratorButton>
                            </StyledGeneratorFooterAction>
                        )}
                    </StyledGeneratorFooter>
                )}
            </StyledGeneratorCard>
        </StyledGeneratorCardContainer>
    );
};
