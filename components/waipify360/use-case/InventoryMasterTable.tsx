import styled from "@emotion/styled";
import {Tooltip, tooltipClasses, styled as matStyled} from "@mui/material";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import moment from "moment";
import * as React from "react";
import {useTranslations} from "next-intl";

const Wap360adminTh = styled(TableCell)`
    padding: 8px 15px 8px 15px;
    font-size: 13px;
    font-weight: 400;
    line-height: 16px;
    color: #000;
    cursor: pointer;
    white-space: nowrap;

    :nth-of-type(2),
    :nth-of-type(3),
    :nth-of-type(4) {
        width: 15%;
    }

    :nth-of-type(6),
    :nth-of-type(7),
    :nth-of-type(8) {
        text-align: center;
    }
`;

const Wap360adminTd = styled(TableCell)`
    padding: 18px 10px;
    border-right: 1px solid rgb(237, 238, 243);
    position: relative;

    :nth-of-type(6),
    :nth-of-type(7),
    :nth-of-type(8) {
        text-align: center;
    }

    :hover span {
        opacity: 1;
    }

    & p {
        font-size: 16px;
        font-weight: 400;
        line-height: 20px;
        color: #000;
        margin: 0;
        overflow: hidden;
        display: -webkit-box;
        -webkit-line-clamp: 3;
        line-clamp: 3;
        -webkit-box-orient: vertical;
    }

    & span {
        border: 1px solid #c8cdd0;
        border-radius: 6px;
        background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHZpZXdCb3g9IjAgMCAyMCAyMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzQ2NV83NTg4IiB0cmFuc2Zvcm09InNjYWxlKDAuMDE1NjI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzM0NjVfNzU4OCIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQVhOU1IwSUFyczRjNlFBQUFFUmxXRWxtVFUwQUtnQUFBQWdBQVlkcEFBUUFBQUFCQUFBQUdnQUFBQUFBQTZBQkFBTUFBQUFCQUFFQUFLQUNBQVFBQUFBQkFBQUFRS0FEQUFRQUFBQUJBQUFBUUFBQUFBQkdVVUt3QUFBRFhFbEVRVlI0QWUyYXk2dE9VUmpHRCtlUU1wR1lHUEFWVWdaTXBOQ1pLOWZjQnY0SHBVeVZNakJpZ0dKMEpraGhKQVpLSndybGtoaElPaTRuNUJJREpRTzVISDdQeVZ1cjFkcmZ2cVMrdGZaZWJ6MW43Y3RhdS9mM3JNdTM5ejU3YUNoSGRpQTdrQjNJRG5UWGdSbUpvYzhpM3kxb0sxcURGaUl4ZkVJUDBSVjBHZjFFcll2dEVFMmdQeVY2d2ZtZHFEVXhBc2sxVkFidW56OUttK0hVWFpnSndPMEc4R2JHc1pRTkVQeFlBRjd6K3hRYVJWb0RGcUFONkNUNmpnemV5aVNuUXo5NGdSZkZLazY4UVFhdjhpV2FqWklKcmVxbmtRdWg3YzlvTlNvTDFmRkh3cDZ5UnJHY0w0Si9TNExMYWlSNWdycXVnV2RydEIxWVZjSHJ0OXhOWE50MTRRV3czcnZPVXgyTU9RUi9DZm53SHpoV3ArZU5jWjUzclM5MndpKzEyQXc2Qks5VmZkZC9URVRYZEVQR1JobEtOTFRndVNPaHRWT2dDUDRicHJnR2FMdXVDYm9uY0s5eGh2Mm9vZ2hlb010UmFGUlVOV0VkN1g4ZzE0RGQ3RWNUL2VCdHdhdFNKd1Mwa29NK3ZCNk85QlFaUmRRQnExTlhjRDMwRWJrOXIrMGRLSXFvQzZTa3E3YnBVWGNTK2ZEakhJc2lxb0tFa2kxcjI2TlJDUDQreDZONEJpZ0RDRUg3eDRxdThaNksvc09QUnNFRk5PSmZaQkQ3UllsWFhkSGRuSFhUTm9iOFllN3Z0eExlakNnem9kWHdaa0tQamErb1V6MXY4SXZaMEFzT0gvNFp4MW8zNXczYXlpTDQ2MTJHNzhTY0wrcjVERzl6WTVEbC8veWQ5emx5eitPSXY5cm5ZZThQazBIczUyRWZHSnBON3UzOXpzdHpQbUJzTkhOZUR5RlhBd2wyb3VjMVZHOTJHVjRHL1BJTWVNZSt2Y0RVK1NZUi9adzNxS1ZzdUwvSFUreXZzSk1OeTJUZ3hiY1h1UWJjYWdodHpaS0NWOUxIa1d2QUVTTnBVQ1lITDhhN3lEVmdXd053TlVrU1hxK1YvYTh0RmpVd0lFbDRjYTVGYnUrLzdoSzhXUGQ1Qmx5c2FVQ3lQVytjNXp3RER0aUpDbVh5OEdKOGp0d3BNRm9CWEZXV29Fbmt0dFYyTlBmMjVGSWE4Nmt4aFF4Q2Q0TnpDMXJwZzhYTjZEQzZnWDRqYTJlbFJ0TXdTaVkya3FrbHIvTFJ2OHpuVU9vamhQM29QQXE5cDNmYmFUczVlSEllT29SY2tDZnM2eit1L2djSWJwM1E5amh0a3VwNThwMk9CL3dOQVZVOXBpbHpCNDFNWHkzU1AzcTlWUlFDcU5weitvRDVNYnFITkVxa0NTU3pvbzUrdmRNditWZFFDZGFBdFQ3b2pyRlZjUkFhalFLdDZQcUVWU3Y4SnFRVlAwZDJJRHVRSGNnT1pBZGE0TUJmK3NoV0dVRnlPaTBBQUFBQVNVVk9SSzVDWUlJPSIvPgo8L2RlZnM+Cjwvc3ZnPgo=");
        width: 30px;
        height: 30px;
        display: inline-block;
        background-repeat: no-repeat;
        background-position: center;
        cursor: pointer;
        opacity: 0;
        position: absolute;
        right: 10px;
        background-color: #fff;
    }

    & .wap-click-arrow {
        display: flex;
        align-items: center;
        gap: 10px;
    }
`;

const Wap360adminTbody = styled(TableBody)`
    tr:hover {
        background-color: #fff;
    }

    & tr:nth-of-type(even) {
        background-color: rgba(0, 0, 0, 0.04);
    }
`;

const Wap360adminTabelMain = styled(TableContainer)`
    width: 100%;
    overflow-x: auto;
    max-height: calc(100vh - 405px);
`;

const CustomTooltip = matStyled(({className, ...props}: any) => (
    <Tooltip {...props} classes={{popper: className}}/>
))(({theme}) => ({
    [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: "#1E428A",
        color: "#FFFFFF",
        fontSize: 14,
    },
}));

const headers = [
    {
        id: "count",
        label: "#",
        tooltip: "Number automatically assigned to the use case when it was created",
    },
    {
        id: "usecase_name",
        label: "Use Case",
        tooltip: "It tells you what you can do with AI in order to enhance or automate a business task or functionality",
    },
    {
        id: "task_name",
        label: "Business Task",
        tooltip: "This is the business task that your employee, a third party or the system currently performs that will be impacted by the AI",
    },
    {
        id: "task_risk",
        label: "Risk level",
        tooltip: "It shows what is the risk level of the task itself related to applying AI on it. Regulations or internal policies may define for example that applying AI for one activity is not accepted.",
    },
    {
        id: "industry_name",
        label: "Industry",
        tooltip: "It shows the list of industries to which this solution may apply. The use case will appear in the dropdown for those industries",
    },
    {
        id: "created_at",
        label: "Date created",
        tooltip: "Date when this AI enabled solution was created",
    },
    {
        id: "created_by",
        label: "Created by",
    },
    {
        id: "addessed_by",
        label: "Assessed by",
    },
]

export default function InventoryMasterTable({
                                                 cases,
                                                 isEditable,
                                                 rowsPerPage,
                                                 page,
                                                 editTask,
                                                 editCase,
                                             }: {
    cases: any;
    isEditable: boolean;
    rowsPerPage: number;
    page: number;
    editTask: (value: string) => void;
    editCase: (value: string) => void;
}) {
    const t = useTranslations('waipify.ui');

    const startNumber = React.useMemo(() => {
        return page * rowsPerPage + 1;
    }, [page, rowsPerPage]);

    const handleCaseIndustries = (indus: string) => {
        const jsonIndus: any = JSON.parse(indus)
            .filter((val: any) => val.name)
            .map((val: any) => t(`account_settings.industry.${val.name}`));
        return jsonIndus;
    };

    return (
        <Wap360adminTabelMain>
            <Table stickyHeader aria-label="sticky table">
                <TableHead>
                    <TableRow>
                        {headers.map(header =>
                            <Wap360adminTh key={header.id}>
                                {header.tooltip ?
                                    <CustomTooltip title={header.tooltip} placement="bottom-end">
                                        <span>{header.label}</span>
                                    </CustomTooltip>
                                    : <span>{header.label}</span>
                                }
                            </Wap360adminTh>
                        )}
                    </TableRow>
                </TableHead>
                <Wap360adminTbody>
                    {cases ? (
                        cases.cases.map((cased: any, index: number) => {
                            const indvalue = handleCaseIndustries(cased.industry);
                            return (
                                <TableRow hover key={index}>
                                    <Wap360adminTd align="right">{index + startNumber}</Wap360adminTd>
                                    <Wap360adminTd>
                                        <div className="wap-click-arrow">
                                            <p>{cased.case_name || "NA"}</p>{" "}
                                            {isEditable === true && (
                                                <span onClick={() => editCase(cased.case_id)}></span>
                                            )}
                                        </div>
                                    </Wap360adminTd>
                                    <Wap360adminTd>
                                        <div
                                            style={{
                                                display: "flex",
                                                alignItems: "center",
                                                justifyContent: "space-between",
                                            }}
                                        >
                                            <p>{cased.task_name || "NA"}</p>
                                            {isEditable === true && (
                                                <span onClick={() => editTask(cased.task_id)}></span>
                                            )}
                                        </div>
                                    </Wap360adminTd>
                                    <Wap360adminTd>
                                        <p>{cased.risk}</p>
                                    </Wap360adminTd>
                                    <Wap360adminTd>
                                        <p>
                                            {indvalue.length ? indvalue.join(", ") : "Cross-industry"}
                                        </p>
                                    </Wap360adminTd>
                                    <Wap360adminTd>
                                        <p>
                                            {moment(cased.last_task_date).format("DD/MM/YYYY") ||
                                                "NA"}
                                        </p>
                                    </Wap360adminTd>
                                    <Wap360adminTd style={{whiteSpace: 'nowrap'}}>
                                        <p>{cased.organization}</p>
                                    </Wap360adminTd>
                                    <Wap360adminTd>
                                        <p>{cased.organization || "NA"}</p>
                                    </Wap360adminTd>
                                </TableRow>
                            );
                        })
                    ) : (
                        <TableRow hover role="checkbox" tabIndex={-1}>
                            <Wap360adminTd colSpan={8}>
                                <p>No Cases Available</p>
                            </Wap360adminTd>
                        </TableRow>
                    )}
                </Wap360adminTbody>
            </Table>
        </Wap360adminTabelMain>
    );
}
