import {MultiSelect} from "@/components/multi-select-dropdown";
import {request} from "@/helpers/request";
import styled from "@emotion/styled";
import {useEffect, useState} from "react";
import {useTranslations} from "next-intl";

const Wap360AdminListFilter = styled.div`
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    position: relative;
    z-index: 9;
`;

const Wap360AdminListSelect = styled.div`
    width: 250px;

    & label {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #000;
        margin-bottom: 3px;
    }

    & select {
        width: 100%;
        border-radius: 8px;
        padding: 8px 13px 8px 5px;
        background-color: #fff;
        border: 1px solid #d7dbe0;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMi45NDA1IDEuMjEyODlMOC4wNTA1NSA2LjEwMjg5QzcuNDczMDUgNi42ODAzOSA2LjUyODA1IDYuNjgwMzkgNS45NTA1NSA2LjEwMjg5TDEuMDYwNTUgMS4yMTI4OSIgc3Ryb2tlPSIjOUNBNUFGIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
        background-repeat: no-repeat;
        background-position: right 16px center;

        :focus {
            outline: none;
        }
    }
`;

const Wap360AdminListInputGroup = styled.div`
    width: auto;

    & label {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #000;
        margin-bottom: 3px;
    }

    & input {
        width: 92px;
        border-radius: 8px;
        padding: 8px 13px 8px 5px;
        background-color: #fff;
        border: 1px solid #d7dbe0;

        :focus {
            outline: none;
        }
    }

    & .wap-inner-input-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 15px;
    }
`;

const WapReportImpectInput = styled.input`
    height: 36px;
    border-radius: 6px;
    border: 1px solid #d7dbe0;
    background: #fff;
    padding: 8px 13px;
    color: #9ca5af;
    font-size: 14px;
    font-style: normal;
    font-weight: 400;
    line-height: 8px;
    max-width: 93px;

    :focus {
        outline: none;
    }
`;

const WapReportImpect = styled.div`
    display: flex;
    flex-wrap: wrap;
    margin-top: 8px;
    gap: 9px;
`;

type Option = { cat: string; key: string };

const providerTypes = [
    "AI Solutions",
    "Incumbent",
    "AI Foundational Models",
    "AI Solutions Consulting",
    "AI Models & Solutions",
    "AI Platform & Solutions",
    "AI Models, Solutions and Platform",
    "Platform",
];

export default function ModelFilter({
                                        handleFilterDataChange,
                                        organization360,
                                    }: {
    handleFilterDataChange: (value: any, type: string) => void;
    organization360: any;
}) {
    const t = useTranslations('waipify.ui');

    const [models, setModels] = useState([]);
    const [providers, setProviders] = useState([]);

    useEffect(() => {
        loadModelSchema(organization360);
    }, []);

    const loadModelSchema = async (org: any) => {
        let url = `/api/impact360/ivmmodel/filterschema?organization_creator_id=${org?.creator_id}`;

        if (organization360.is_superadmin) {
            url += "&view=admin";
        } else if (organization360.is_supervisor) {
            url += "&view=supervisor";
        }

        return request<{ cases?: any }>(url, {
            method: "GET",
        }).then((res: any) => {
            if (res) {
                const modelArray = res.models.filter(
                    (cas: any) => cas.id && cas.name
                );
                const providerArray = res.providers.filter(
                    (cas: any) => cas.id && cas.name
                );
                setModels(modelArray);
                setProviders(providerArray);
            }
        });
    };

    const handleMultiSelect = (name: string, newValue: Option[]) => {
        const values = newValue.length > 0 ? newValue.map((_) => _.cat) : [];
        handleFilterDataChange(values, name);
    };

    const onChange = (event: any) => {
        const {value, name} = event.target;
        handleFilterDataChange(value, name);
    };

    return (
        <Wap360AdminListFilter>
            <Wap360AdminListSelect>
                <label>Model</label>
                <MultiSelect
                    placeholder="Select models"
                    options={
                        models &&
                        models.map((element: any) => ({
                            cat: element?.id,
                            key: element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("model_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect>
                <label>Provider</label>
                <MultiSelect
                    placeholder="Select providers"
                    options={
                        providers &&
                        providers.map((element: any) => ({
                            cat: element?.id,
                            key: element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("provider_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect>
                <label>Type</label>
                <MultiSelect
                    placeholder="Select types"
                    options={
                        providerTypes &&
                        providerTypes.map((element: any) => ({
                            cat: element,
                            key: element,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("type_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect>
                <label>Capability</label>
                <MultiSelect
                    placeholder="Select capability"
                    options={[]}
                    max="250px"
                    onChange={(values)=>handleMultiSelect("capability_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListInputGroup>
                <label>Tokens size</label>
                <WapReportImpect>
                    <WapReportImpectInput
                        type="number"
                        placeholder="From"
                        name="avg_sft_min"
                        onChange={onChange}
                    />
                    <WapReportImpectInput
                        type="number"
                        placeholder="To"
                        name="avg_sft_max"
                        onChange={onChange}
                    />
                </WapReportImpect>
            </Wap360AdminListInputGroup>
            <Wap360AdminListInputGroup>
                <label>Latency</label>
                <WapReportImpect>
                    <WapReportImpectInput
                        type="number"
                        placeholder="From"
                        name="avg_sft_min"
                        onChange={onChange}
                    />
                    <WapReportImpectInput
                        type="number"
                        placeholder="To"
                        name="avg_sft_max"
                        onChange={onChange}
                    />
                </WapReportImpect>
            </Wap360AdminListInputGroup>
        </Wap360AdminListFilter>
    );
}
