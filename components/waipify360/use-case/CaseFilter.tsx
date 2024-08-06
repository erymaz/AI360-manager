import {MultiSelect} from "@/components/multi-select-dropdown";
import {request} from "@/helpers/request";
import {taskRisks} from "@/helpers/tasks";
import {getAllIndustry} from "@/lib/api/impact360";
import styled from "@emotion/styled";
import {DatePicker, LocalizationProvider} from "@mui/x-date-pickers";
import {AdapterDateFns} from "@mui/x-date-pickers/AdapterDateFns";
import moment from "moment";
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

    //   &.wp-industry {
    //     width: 150px;
    //   }
    //   &.wp-risk {
    //     width: 112px;
    //   }
    //   &.wp-createdby {
    //     width: 146px;
    //   }
`;

const Wap360AdminListInputGroup = styled.div`
    width: auto;

    & label {
        display: block;
        font-size: 14px;
        font-weight: 400;
        line-height: 16px;
        color: #000;
        margin-bottom: 8px;
    }

    & input {
        width: 92px;
        height: 26px;
        border-radius: 8px;
        padding: 5px 13px 5px 5px;

        :focus {
            outline: none;
        }
    }

    & .wap-inner-input-group {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 8px;
    }
`;

type Option = { cat: string; key: string };

export default function UseCaseFilter({
                                          handleFilterDataChange,
                                          organization360,
                                      }: {
    handleFilterDataChange: (value: any, type: string) => void;
    organization360: any;
}) {
    const t = useTranslations('waipify.ui');

    const [cases, setCases] = useState([]);
    const [tasks, setTasks] = useState([]);
    const [industries, setIndustries] = useState<any>([]);
    const [creators, setCreators] = useState([]);

    useEffect(() => {
        loadIndustry();
        loadCasesSchema(organization360);
    }, []);

    const loadIndustry = () => {
        getAllIndustry().then((res: any) => {
            setIndustries([...res.industries, {id: null, name: "Cross-industry"}]);
        });
    };

    const loadCasesSchema = async (org: any) => {
        let url = `/api/impact360/ivmcases/filterschema?organization_creator_id=${org?.creator_id}`;

        if (organization360.is_superadmin) {
            url += "&view=admin";
        } else if (organization360.is_supervisor) {
            url += "&view=supervisor";
        }

        return request<{ cases?: any }>(url, {
            method: "GET",
        }).then((res: any) => {
            if (res) {
                const caseArray = res.cases.filter((cas: any) => cas.id && cas.name);
                const taskArray = res.tasks.filter((cas: any) => cas.id && cas.name);
                setCases(caseArray);
                setTasks(taskArray);
                setCreators(res.creators);
            }
        });
    };

    const handleMultiSelect = (name: string, newValue: Option[]) => {
        const values = newValue.length > 0 ? newValue.map((_) => _.cat) : [];
        handleFilterDataChange(values, name);
    };

    const onChange = (date: string, type: string) => {
        if (moment(date).toString() !== "Invalid date") {
            handleFilterDataChange(moment(date).format("YYYY-MM-DD"), type);
        } else {
            handleFilterDataChange(null, type);
        }
    };

    return (
        <Wap360AdminListFilter>
            <Wap360AdminListSelect>
                <label>Use Case</label>
                <MultiSelect
                    placeholder="Select case"
                    options={
                        cases &&
                        cases.map((element: any) => ({
                            cat: element?.id,
                            key: element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("case_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect>
                <label>Task</label>
                <MultiSelect
                    placeholder="Select task"
                    options={
                        tasks &&
                        tasks.map((element: any) => ({
                            cat: element?.id,
                            key: element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("task_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect className="wp-industry">
                <label>Industry</label>
                <MultiSelect
                    placeholder="Select industries"
                    options={
                        industries &&
                        industries.map((element: any) => ({
                            cat: element?.id,
                            key: element?.id ? t(`account_settings.industry.${element?.name}`) : element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("industry_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListSelect className="wp-risk">
                <label>Risk</label>
                <MultiSelect
                    placeholder="Select risks"
                    options={taskRisks.map((element: any) => ({
                        cat: element,
                        key: element,
                    }))}
                    max="250px"
                    onChange={(values)=>handleMultiSelect("risk_ids", values)}
                />
            </Wap360AdminListSelect>
            <Wap360AdminListInputGroup>
                <label>Date created</label>
                <div className="wap-inner-input-group">
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            onChange={(date: any) => onChange(date, "created_at_min")}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DatePicker
                            onChange={(date: any) => onChange(date, "created_at_max")}
                        />
                    </LocalizationProvider>
                </div>
            </Wap360AdminListInputGroup>
            <Wap360AdminListSelect className="wp-createdby">
                <label>Created by</label>
                <MultiSelect
                    placeholder="Select created by"
                    options={
                        creators &&
                        creators.map((element: any) => ({
                            cat: element?.id,
                            key: element?.name,
                        }))
                    }
                    max="250px"
                    onChange={(values)=>handleMultiSelect("createdby_ids", values)}
                />
            </Wap360AdminListSelect>
        </Wap360AdminListFilter>
    );
}
