import {MultiSelectArea} from "@/components/textarea-select";
import {request} from "@/helpers/request";
import styled from "@emotion/styled";
import {Alert, MenuItem, Select, Snackbar} from "@mui/material";
import {access} from "fs";
import {useEffect, useState} from "react";
import Modal from "react-modal";
import {useTranslations} from "next-intl";

const WapCreateUseCase = styled.div`
    & h3 {
        font-size: 18px;
        font-weight: 600;
        line-height: 24px;
        color: #1a262d;
        margin-bottom: 60px;
    }
`;

const WapCreateUseForm = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 35px;
    max-width: 680px;
    width: 100%;
    margin-bottom: 30px;
`;

const WapCreateUseLabelLeft = styled.div`
    width: 50px;

    & h6 {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #6a7381;
        margin-top: 0;
        margin-bottom: 7px;
    }

    & p {
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #9ca5af;
        margin: 0;
        margin-top: 27px;
    }

    & h6 + p {
        margin-top: 0px;
    }
`;
const WapCreateUseInputRightG = styled.div`
    width: calc(100% - 85px);

    & label {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #6a7381;
        display: block;
        margin-bottom: 4px;
    }

    & input {
        padding: 8px 13px 8px 11px;
        border-radius: 8px;
        border: 1px solid #d7dbe0;
        width: 100%;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #000;

        :placeholder {
            color: #9ca5af;
        }

        :focus {
            outline: none;
        }
    }
`;

const WapIndustriesTa = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 0 47px;
    max-width: 680px;
    width: 100%;
    margin-bottom: 20px;
`;

const WapIndustriesTextarea = styled.div`
    width: 387px;

    & label {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #6a7381;
        display: block;
        margin-bottom: 4px;
    }

    & textarea {
        padding: 8px 13px;
        border-radius: 8px;
        border: 1px solid #d7dbe0;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        height: 136px;

        :placeholder {
            color: #9ca5af;
        }

        :focus {
            outline: none;
        }
    }
`;
const WapIndustriesCountryRegion = styled.div`
    display: flex;
    flex-wrap: wrap;
    width: calc(100% - 434px);
`;

const WapIndustriesCountry = styled.div`
    width: 100%;

    & label {
        font-size: 14px;
        font-weight: 500;
        line-height: 20px;
        color: #6a7381;
        display: block;
        margin-bottom: 4px;
    }

    & select {
        padding: 8px 45px 8px 8px;
        border-radius: 8px;
        border: 1px solid #d7dbe0;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        color: #9ca5af;
        -webkit-appearance: none;
        -moz-appearance: none;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iOCIgdmlld0JveD0iMCAwIDE0IDgiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CjxwYXRoIGQ9Ik0xMi45NDA1IDEuMjEyODlMOC4wNTA1NSA2LjEwMjg5QzcuNDczMDUgNi42ODAzOSA2LjUyODA1IDYuNjgwMzkgNS45NTA1NSA2LjEwMjg5TDEuMDYwNTUgMS4yMTI4OSIgc3Ryb2tlPSIjOUNBNUFGIiBzdHJva2Utd2lkdGg9IjEuMiIgc3Ryb2tlLW1pdGVybGltaXQ9IjEwIiBzdHJva2UtbGluZWNhcD0icm91bmQiIHN0cm9rZS1saW5lam9pbj0icm91bmQiLz4KPC9zdmc+Cg==");
        background-repeat: no-repeat;
        background-position: right 16px center;
        width: 100%;

        :focus {
            outline: none;
        }
    }
`;

const WapIndustriesDescription = styled.div`
    max-width: 680px;
    width: 100%;

    & textarea {
        padding: 8px 13px;
        border-radius: 8px;
        border: 1px solid #d7dbe0;
        width: 100%;
        color: #000;
        font-size: 16px;
        font-weight: 400;
        line-height: 24px;
        font-family: "Roboto", "Helvetica", "Arial", sans-serif;
        height: 88px;

        :placeholder {
            color: #9ca5af;
        }

        :focus {
            outline: none;
        }

        & label {
            font-size: 14px;
            font-weight: 500;
            line-height: 20px;
            color: #6a7381;
            display: block;
            margin-bottom: 4px;
        }
    }
`;
const SubcasesTasks = styled.h5`
    margin-top: 37px;
    font-size: 14px;
    font-weight: 500;
    line-height: 20px;
    color: #3e4856;
`;
const WapIndustriesButsG = styled.div`
    padding-top: 15px;
    padding-bottom: 34px;
    display: flex;
    flex-wrap: wrap;
    gap: 7px;
    align-items: center;
    border-top: 1px solid #ebeaea;
    position: absolute;
    bottom: 0;
    width: calc(100% - 60px);
    justify-content: end;

    & .btn-cancel {
        padding: 7px 19px;
        background-color: #c6cad2;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        color: #fff;
        border: none;
        cursor: pointer;
        transition: 0.3s all ease;

        :hover {
            opacity: 0.7;
        }

        :focus {
            outline: none;
        }
    }

    & .btn-create {
        padding: 7px 19px;
        background-color: #1f75ff;
        border-radius: 8px;
        font-size: 14px;
        font-weight: 600;
        line-height: 20px;
        color: #fff;
        border: none;
        cursor: pointer;
        transition: 0.3s all ease;
        min-width: 128px;
        text-align: center;

        :hover {
            opacity: 0.7;
        }

        :focus {
            outline: none;
        }
    }
`;

const AddRecordModalContent = styled(Modal)`
    position: fixed;
    top: 0 !important;
    background: #fff;
    width: 969px;
    transform: unset !important;
    margin-right: 0 !important;
    inset: unset !important;
    right: 0 !important;
    padding: 30px;
    min-height: 100vh;
    overflow: auto;
`;

const ModalCloseBtn = styled.button`
    background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMjM4Nl8zNzMyNiIgdHJhbnNmb3JtPSJzY2FsZSgwLjAzMTI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzIzODZfMzczMjYiIHdpZHRoPSIzMiIgaGVpZ2h0PSIzMiIgeGxpbms6aHJlZj0iZGF0YTppbWFnZS9wbmc7YmFzZTY0LGlWQk9SdzBLR2dvQUFBQU5TVWhFVWdBQUFDQUFBQUFnQ0FZQUFBQnplbnIwQUFBQUFYTlNSMElBcnM0YzZRQUFBRVJsV0VsbVRVMEFLZ0FBQUFnQUFZZHBBQVFBQUFBQkFBQUFHZ0FBQUFBQUE2QUJBQU1BQUFBQkFBRUFBS0FDQUFRQUFBQUJBQUFBSUtBREFBUUFBQUFCQUFBQUlBQUFBQUNzaG1MekFBQUMyMGxFUVZSWUNjMlhTMnNVUVJESEV4K0pCdSt1NGtHdlF0U0RTRUF2QVJGZkJBVy9oRXJVZ3g4Z2VQSW1QcEFjRlB3QVlpRGdJUmNUSWNaclBBcmVWSkw0UUJBVkg2RCtmc3ZVME16TzdNNkd4YlhndjkxZDlhL3FtdTZ1bnRuQmdmb3lCSFVjVElBRFlEdG9BR1VWcklGbE1Bdm13VS9RRTNHU20rQXorRk1UY3ZXSkJPbVd5MkM1dXFrZDVuY0tYQUlqSU9RYm5VWHdCcXhreWgyMHU4QVJVT1RlUWpjRmZvRGFZdWJQUWZyRU00eFBnaTJnU3JUSmtadjZHcXZqYXNCcHlpaS9yMEVFV0tJLzFyUjA5Nk9QdmhISG1NWnVLeDZzZFBJN2pEZTE5V2h2MU5jWWFSS1ZLK0VwZjVhUUorbjNTb3dWU2JnZHcyV0JyeVVrVDNDdjVRWUJJNG5yeGVBdS9aZU1zRWk3c1Vqb3dkaVlUNEZKV0VrN1FTN3BQaDNLdGIzdkhDUmtyTUowaEhmdjQ1SjVHTXFTMXNOekc1d3BzWVhxTUoyN1lHOG9TdHBINkdJVnRtby9saWxVbmxKUklWZlJ5L2tOTHBSd2pxUDdEdVRjSzdHSHludENUajVmTEwvNzBzd29tSVYyRCtQM0lKelRLa2tuTndsdnhDcnhzdm9Lak9OcURTd0FCMDlBSjlrSDRRT0lKQzdUTDA1K29sTVE3SE5aRE10KzRHVTJlT0NnaHV5SDh4RkVFcjcxN0h2WHQ5dEN6TG5jcDZmUHF3MzhSRG04emMzdE95OHdId1dmTXRwbTJsL2dISGljNlRvMUt4bWhZUUxyRWUrTmtjVFJLOWUzNGJxazJ5MUk5OXhsaisyd09zN1h6Q0RmQXZrTHdQMm9jd2lMazUvR2J4Uzh5MkxVVFdJdTR6Y1BZZDB5OURNczZ0dzJQWERGSk01aXI1S1dNcXg3RVYwaG9pdmw1R1dsbGlZeFhUVTcrcGFMYUFobG5hdDRHN3lMd0RLc2t0MFkvSVJyVkJIUXQxekZjbU1iZk1KLy9qSXlnYjYvamsyaXJ4OGtKdUJac0N6Y0JqRUplaVhHaXJpVm4yUk8xdGVQMG5oYXl5bjlNbDVpUEJiR0xscDk5STBuTjZheGE0bGw1RktGcyswTXNJYTlTS3BFbXh5NXFhK3hTa3Z6di8xclJzSzVtTG1mNlhGWnBVOVcxWmVyVCtsVG84K2wzUXJrcEt4amxZeURDZUI3d1FNYkU2elNYd1BMWUJiTWcxcC96LzhDa01nSUwzdjhDeklBQUFBQVNVVk9SSzVDWUlJPSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
    width: 32px;
    height: 32px;
    border: none;
    background-color: transparent;
    position: absolute;
    top: 12px;
    right: 21px;
    cursor: pointer;
`;

const LoaderTabs = styled.div`
    width: 48px;
    height: 48px;
    border: 5px solid #1f75ff;
    border-bottom-color: transparent;
    border-radius: 50%;
    display: inline-block;
    box-sizing: border-box;
    animation: rotation 1s linear infinite;
    position: absolute;
    transform: translate(-50%, -50%);
    top: 50%;
    left: 50%;
`;
const LoaderBox = styled.div`
    ::before {
        content: "";
        width: 100%;
        height: 100%;
        position: absolute;
        left: 0;
        top: 0;
        background-color: rgba(0, 0, 0, 0.3);
        z-index: 99;
    }
`;

const ChevronDown = () => (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        width="18"
        height="18"
        viewBox="0 0 18 18"
        fill="none"
        style={{position: "absolute", right: "13px", top: "12px"}}
    >
        <path
            d="M14.9405 6.71289L10.0505 11.6029C9.47305 12.1804 8.52805 12.1804 7.95055 11.6029L3.06055 6.71289"
            stroke="#9CA5AF"
            strokeWidth="1.2"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
        />
    </svg>
);

const customStyles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        zIndex: "99",
    },
    content: {
        top: "50%",
        left: "50%",
        right: "auto",
        bottom: "auto",
        marginRight: "-50%",
        transform: "translate(-50%, -50%)",
    },
};

type Country = {
    id?: string;
    en: string;
    iso2: string;
    iso3: string;
    flag: string;
    de: string;
    es: string;
};

type Option = { cat: string; key: string };

export default function CaseModel({
                                      open,
                                      case_id,
                                      impOrganization,
                                      handleCaseModel,
                                  }: {
    open: boolean;
    case_id: String | null;
    impOrganization: any;
    handleCaseModel: (value: boolean) => void;
}) {
    const [showError, setShowError] = useState<any>(null);
    const [successAlert, setSuccessAlert] = useState<any>(false);
    const [formData, setFormData] = useState<any>({});
    const [validation, setValidation] = useState<any>({});
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [countries, setCountries] = useState<Country[]>([]);
    const [industries, setIndustries] = useState([]);
    const [currentCase, setCurrentCase] = useState<any>(null);
    const t = useTranslations('waipify.ui');

    useEffect(() => {
        if (open) {
            if (case_id) {
                getCase(case_id);
            }
            if (industries.length === 0) {
                loadIndustry();
            }
            if (countries.length === 0) {
                loadCountry();
            }
        }
    }, [open, case_id]);

    const getCase = async (id: String) => {
        setIsLoading(true);
        const url = `/api/impact360/cases/${id}`;
        request<{ subcases?: any }>(url, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res: any) => {
            if (res) {
                setCurrentCase(res);
                setFormData({
                    name: res.name,
                    country_id: res.country_id,
                    description: res.description,
                    region_id: res.region_id,
                    industry_id: res.industries.map((ind: any) => ({
                        cat: ind.id,
                        key: t(`account_settings.industry.${ind.name}`),
                    })),
                });
            }
            setIsLoading(false);
        });
    };

    const loadIndustry = async () => {
        await request<{ industries?: any }>(`/api/impact360/industries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res) {
                if (res) {
                    setIndustries(res?.industries);
                }
            }
        });
    };

    const loadCountry = async () => {
        await request<{ countries?: any }>(`/api/impact360/countries`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json",
            },
        }).then((res) => {
            if (res) {
                setCountries(res?.countries);
            }
        });
    };

    const handleParamChange = (event: any) => {
        const {name, value} = event.target;

        setFormData({
            ...formData,
            [name]: value,
        });

        setValidation({
            ...validation,
            [name]: "",
        });
    };

    const handleCloseModel = () => {
        setValidation({});
        setFormData({});
        handleCaseModel(false);
    };

    const validate = () => {
        let error = false;
        let errObj: any = {};
        if (!formData.name) {
            error = true;
            errObj["name"] = "Please input name";
        }

        return {error, errObj};
    };

    const onSubmit = async () => {
        let {error, errObj} = validate();
        if (error) {
            setValidation({
                ...validation,
                ...errObj,
            });
            return;
        }
        setIsLoading(true);
        if (
            case_id &&
            currentCase.organization_creator_id == impOrganization.creator_id
        ) {
            const promiseArray = [];

            if (
                formData.name != currentCase.name ||
                formData.country_id != currentCase.country_id ||
                formData.description != currentCase.description ||
                formData.region_id != currentCase.region_id
            ) {
                promiseArray.push(
                    request(`/api/impact360/cases/${case_id}`, {
                        method: "PUT",
                        body: {
                            name: formData.name,
                            country_id: formData.country_id || null,
                            region_id: null,
                            description: formData.description || "",
                        },
                    })
                );
            }

            let previoue_ids = currentCase.industries
                ? currentCase.industries.map((cuc: any) => cuc.id)
                : [];

            let current_ids = formData.industry_id.map((_: any) => _.cat);

            let new_ids = current_ids.filter(
                (initId: any) => !previoue_ids.includes(initId)
            );
            let deleted_ids = previoue_ids.filter(
                (initId: any) => !current_ids.includes(initId)
            );

            if (deleted_ids.length) {
                promiseArray.push(
                    request(`/api/impact360/case_to_industry/remove`, {
                        method: "POST",
                        body: {
                            cases_to_industry: deleted_ids,
                        },
                    })
                );
            }

            if (new_ids.length) {
                const detailsArray = [];
                for (let idvalue of new_ids) {
                    const details = {
                        case_id: case_id,
                        industry_id: idvalue,
                    };
                    detailsArray.push(details);
                }

                promiseArray.push(
                    request(`/api/impact360/case_to_industry`, {
                        method: "POST",
                        body: {cases_to_industry: detailsArray},
                    })
                );
            }

            if (promiseArray.length) {
                return await Promise.all(promiseArray).then(() => {
                    setIsLoading(false);
                    handleCloseModel();
                });
            }
        } else {
            request(`/api/impact360/cases`, {
                method: "POST",
                body: {
                    name: formData.name,
                    region_id: null,
                    country_id: formData.country_id || null,
                    industry_id: null,
                    organization_id: impOrganization.id,
                    original_id: case_id ? case_id : null,
                    description: formData.description || "",
                },
            })
                .then((res: any) => {
                    if (res.case) {
                        if (formData.industry_id && formData.industry_id) {
                            const PromiseArray = [];
                            const currentIndustries = formData.industry_id.map(
                                (cuc: any) => cuc.cat
                            );
                            for (let idvalue of currentIndustries) {
                                const details = {
                                    case_id: res.case.id,
                                    industry_id: idvalue,
                                };
                                PromiseArray.push(details);
                            }

                            request(`/api/impact360/case_to_industry`, {
                                method: "POST",
                                body: {cases_to_industry: PromiseArray},
                            })
                                .then((res: any) => {
                                    if (res.cases_to_industry_data) {
                                        setIsLoading(false);
                                        handleCloseModel();
                                    }
                                })
                                .catch(() => setIsLoading(false));
                        } else {
                            setIsLoading(false);
                            handleCloseModel();
                        }
                    }
                })
                .catch(() => setIsLoading(false));
        }
    };

    const handleMultiSelect = (name: string, newValue: Option[]) => {
        setFormData({
            ...formData,
            [name]: newValue,
        });
    };

    return (
        <AddRecordModalContent
            isOpen={open}
            onRequestClose={handleCloseModel}
            style={customStyles}
        >
            {isLoading && (
                <LoaderBox>
                    <LoaderTabs></LoaderTabs>
                </LoaderBox>
            )}

            <ModalCloseBtn onClick={handleCloseModel}></ModalCloseBtn>
            <WapCreateUseCase>
                <h3>{case_id ? "Update Use Case" : "Create Use Case"}</h3>
                <form>
                    <WapCreateUseForm>
                        <WapCreateUseLabelLeft>
                            <h6>Locale</h6>
                            <p>en_US</p>
                        </WapCreateUseLabelLeft>
                        <WapCreateUseInputRightG>
                            <label>Use case name</label>
                            <input
                                type="text"
                                placeholder="Enter name...."
                                name="name"
                                value={formData.name}
                                onChange={handleParamChange}
                            />
                        </WapCreateUseInputRightG>
                    </WapCreateUseForm>
                    <WapCreateUseForm>
                        <WapCreateUseLabelLeft>
                            <p>en_DE</p>
                        </WapCreateUseLabelLeft>
                        <WapCreateUseInputRightG>
                            <label>Use case name translation</label>
                            <input
                                type="text"
                                placeholder="Enter Translation...."
                                name="name"
                                value={formData.name}
                                onChange={handleParamChange}
                            />
                        </WapCreateUseInputRightG>
                    </WapCreateUseForm>
                    <WapIndustriesTa>
                        <WapIndustriesTextarea>
                            <label>Industries</label>
                            <MultiSelectArea
                                name="industry_id"
                                placeholder="Enter and Select one or multiple Industry names. If it applies to cross-industry leave it blank"
                                options={
                                    industries &&
                                    industries.map((element: any) => ({
                                        cat: element?.id,
                                        key: element?.id
                                            ? t(`account_settings.industry.${element?.name}`)
                                            : element?.name,
                                    }))
                                }
                                selected={formData.industry_id}
                                onChange={handleMultiSelect}
                            />
                        </WapIndustriesTextarea>
                        <WapIndustriesCountryRegion>
                            <WapIndustriesCountry>
                                <div style={{width: "100%", position: "relative"}}>
                                    <label>Country</label>
                                    <Select
                                        size="small"
                                        name="country_id"
                                        sx={{width: "100%"}}
                                        inputProps={{IconComponent: () => null}}
                                        value={formData.country_id || ""}
                                        onChange={handleParamChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select if country specific
                                        </MenuItem>
                                        {countries.map((country, index) => (
                                            <MenuItem value={country.id} key={index}>
                                                {`${country?.flag} ${country?.en}`}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    <div style={{position: "absolute", top: 25, right: 1}}>
                                        <ChevronDown/>
                                    </div>
                                    <p className="text-danger">{validation.country_id}</p>
                                </div>
                            </WapIndustriesCountry>
                            <WapIndustriesCountry>
                                <div style={{width: "100%", position: "relative"}}>
                                    <label>Region</label>
                                    <Select
                                        size="small"
                                        name="country_id"
                                        sx={{width: "100%"}}
                                        inputProps={{IconComponent: () => null}}
                                        value={formData.country_id || ""}
                                        onChange={handleParamChange}
                                    >
                                        <MenuItem value="" disabled>
                                            Select if region specific
                                        </MenuItem>
                                    </Select>
                                    <div style={{position: "absolute", top: 25, right: 1}}>
                                        <ChevronDown/>
                                    </div>
                                    <p className="text-danger">{validation.country_id}</p>
                                </div>
                            </WapIndustriesCountry>
                        </WapIndustriesCountryRegion>
                    </WapIndustriesTa>
                    <WapIndustriesDescription>
                        <label>Description</label>
                        <textarea
                            placeholder="Enter a description if you think the name is not explicative enough..."
                            name="description"
                            value={formData.description || ""}
                            onChange={handleParamChange}
                        ></textarea>
                    </WapIndustriesDescription>
                    <SubcasesTasks>Subcases & Tasks</SubcasesTasks>
                    <WapIndustriesButsG>
                        <button
                            className="btn-cancel"
                            type="button"
                            onClick={handleCloseModel}
                        >
                            Cancel
                        </button>
                        <button className="btn-create" type="button" onClick={onSubmit}>
                            {case_id ? "Update" : "Create"}
                        </button>
                    </WapIndustriesButsG>
                </form>
            </WapCreateUseCase>
            <Snackbar
                open={!!successAlert}
                autoHideDuration={3000}
                onClose={() => setSuccessAlert(undefined)}
            >
                <Alert severity="success">{successAlert}</Alert>
            </Snackbar>
            <Snackbar
                open={!!showError}
                autoHideDuration={3000}
                onClose={() => setShowError(undefined)}
            >
                <Alert severity="error">{showError}</Alert>
            </Snackbar>
        </AddRecordModalContent>
    );
}
