import UseCaseFilter from "@/components/waipify360/use-case/CaseFilter";
import InventoryMasterTable from "@/components/waipify360/use-case/InventoryMasterTable";
import CaseModel from "@/components/waipify360/use-case/caseModel";
import Layout360 from "@/components/layouts/Layout360";
import CreateNewTask from "@/components/waipify360/CreateTask";
import { request } from "@/helpers/request";
import { withRequiredAuthentication } from "@/lib/services/auth";
import styled from "@emotion/styled";
import { TablePagination } from "@mui/material";
import Paper from "@mui/material/Paper";
import { StyledEngineProvider } from "@mui/material/styles";
import { InferGetServerSidePropsType } from "next";
import { useRouter } from "next/router";
import { useEffect, useState, useMemo } from "react";

export const getServerSideProps = withRequiredAuthentication(
  async (ctx, { organisation, organization360, locale, messages }) => {
    if (ctx.query) {
      if (
        ctx.query.viewmode === "admin" &&
        !organization360.is_superadmin &&
        !organization360.is_supervisor
      ) {
        return {
          redirect: {
            destination: "/workspaces",
            permanent: false,
          },
        };
      } else if (
        ctx.query.viewmode !== "admin" &&
        ctx.query.viewmode !== "aimanager"
      ) {
        return {
          redirect: {
            destination: "/workspaces",
            permanent: false,
          },
        };
      }
    }

    return {
      props: {
        companyName: organisation.companyName,
        organization360,
        locale,
        messages
      },
    };
  }
);

const Wap360AdminTitle = styled.h3`
  font-size: 18px;
  font-weight: 600;
  line-height: 24px;
  color: #1a262d;
  margin-top: 10px;
`;

const Wap360AdminSearch = styled.div`
  padding: 10px 0px;
  & input {
    border-radius: 8px;
    border: 1px solid #d7dbe0;
    background: #fff;
    padding: 8px 13px;
    padding-left: 32px;
    color: #000;
    font-size: 16px;
    font-style: normal;
    font-weight: 400;
    line-height: 24px;
    width: 100%;
    max-width: 762px;
    background-image: url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4IiBmaWxsPSJub25lIj4KICA8ZyBjbGlwLXBhdGg9InVybCgjY2xpcDBfMjg5MF80NzE4KSI+CiAgICA8cGF0aCBkPSJNMTYuNSAxNi41TDE1IDE1TTguNjI1IDE1Ljc1QzkuNTYwNjcgMTUuNzUgMTAuNDg3MiAxNS41NjU3IDExLjM1MTYgMTUuMjA3NkMxMi4yMTYxIDE0Ljg0OTYgMTMuMDAxNSAxNC4zMjQ4IDEzLjY2MzEgMTMuNjYzMUMxNC4zMjQ4IDEzLjAwMTUgMTQuODQ5NiAxMi4yMTYxIDE1LjIwNzYgMTEuMzUxNkMxNS41NjU3IDEwLjQ4NzIgMTUuNzUgOS41NjA2NyAxNS43NSA4LjYyNUMxNS43NSA3LjY4OTMzIDE1LjU2NTcgNi43NjI4MyAxNS4yMDc2IDUuODk4MzhDMTQuODQ5NiA1LjAzMzk0IDE0LjMyNDggNC4yNDg0OCAxMy42NjMxIDMuNTg2ODZDMTMuMDAxNSAyLjkyNTI1IDEyLjIxNjEgMi40MDA0MiAxMS4zNTE2IDIuMDQyMzZDMTAuNDg3MiAxLjY4NDI5IDkuNTYwNjcgMS41IDguNjI1IDEuNUM2LjczNTMzIDEuNSA0LjkyMzA2IDIuMjUwNjcgMy41ODY4NiAzLjU4Njg2QzIuMjUwNjcgNC45MjMwNiAxLjUgNi43MzUzMyAxLjUgOC42MjVDMS41IDEwLjUxNDcgMi4yNTA2NyAxMi4zMjY5IDMuNTg2ODYgMTMuNjYzMUM0LjkyMzA2IDE0Ljk5OTMgNi43MzUzMyAxNS43NSA4LjYyNSAxNS43NVoiIHN0cm9rZT0iIzlDQTVBRiIgc3Ryb2tlLXdpZHRoPSIxLjIiIHN0cm9rZS1saW5lY2FwPSJyb3VuZCIgc3Ryb2tlLWxpbmVqb2luPSJyb3VuZCIvPgogIDwvZz4KICA8ZGVmcz4KICAgIDxjbGlwUGF0aCBpZD0iY2xpcDBfMjg5MF80NzE4Ij4KICAgICAgPHJlY3Qgd2lkdGg9IjE4IiBoZWlnaHQ9IjE4IiBmaWxsPSJ3aGl0ZSIvPgogICAgPC9jbGlwUGF0aD4KICA8L2RlZnM+Cjwvc3ZnPg==);
    background-position: left 6px center;
    background-repeat: no-repeat;
    ::placeholder {
      color: #9ca5af;
    }
    :focus {
      outline: none;
    }
  }
  .wap-drap-add {
    display: none;
  }
  & .active-drop {
    background-color: #fcfdff;
    border-radius: 6px;
    position: absolute;
    left: 900px;
    padding: 20px 11px;
    min-width: 206px;
    list-style: none;
    margin-top: 5px;
    margin-bottom: 0;
    display: block;
    z-index: 99;
    @media (max-width: 1098px) {
      left: 110px;
    }
    & li {
      margin-bottom: 16px;
      font-size: 14px;
      font-weight: 500;
      line-height: 16px;
      color: #1d5bd8;
      text-decoration: underline;
      cursor: pointer;
      :last-child {
        margin-bottom: 0px;
      }
    }
  }
  & button {
    border-radius: 8px;
    background: #1f75ff;
    padding: 10px 11px 10px 13px;
    color: #fff;
    font-size: 14px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px;
    border: none;
    cursor: pointer;
    margin-left: 26px;
    position: relative;
    padding-right: 66px;
    overflow: hidden;
    @media (max-width: 1114px) {
      margin-left: 10px;
    }
    @media (max-width: 1098px) {
      margin-left: 0;
      margin-top: 10px;
      min-width: 216px;
    }
    & span {
      width: 51px;
      height: 40px;
      background-image: url("data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiB4bWxuczp4bGluaz0iaHR0cDovL3d3dy53My5vcmcvMTk5OS94bGluayI+CjxyZWN0IHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgZmlsbD0idXJsKCNwYXR0ZXJuMCkiLz4KPGRlZnM+CjxwYXR0ZXJuIGlkPSJwYXR0ZXJuMCIgcGF0dGVybkNvbnRlbnRVbml0cz0ib2JqZWN0Qm91bmRpbmdCb3giIHdpZHRoPSIxIiBoZWlnaHQ9IjEiPgo8dXNlIHhsaW5rOmhyZWY9IiNpbWFnZTBfMzQ2Ml84ODI1IiB0cmFuc2Zvcm09InNjYWxlKDAuMDE1NjI1KSIvPgo8L3BhdHRlcm4+CjxpbWFnZSBpZD0iaW1hZ2UwXzM0NjJfODgyNSIgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiB4bGluazpocmVmPSJkYXRhOmltYWdlL3BuZztiYXNlNjQsaVZCT1J3MEtHZ29BQUFBTlNVaEVVZ0FBQUVBQUFBQkFDQVlBQUFDcWFYSGVBQUFBQVhOU1IwSUFyczRjNlFBQUFFUmxXRWxtVFUwQUtnQUFBQWdBQVlkcEFBUUFBQUFCQUFBQUdnQUFBQUFBQTZBQkFBTUFBQUFCQUFFQUFLQUNBQVFBQUFBQkFBQUFRS0FEQUFRQUFBQUJBQUFBUUFBQUFBQkdVVUt3QUFBQmxrbEVRVlI0QWUzWFcwNENNUmpGY2NxelB1a0t3QVVZRXFQdkVoTWZYWXlyY0N2aUJ2VGRHTmZnRGpEZUZqQ2VRNWhFWW9GcHViVDllcHA4bVVtQndQK1g0ZGJyYVVsQUFoS1FnQVFrSUFFSlNFQUNFcEJBZlFLT3lVM1RuT0J3aDduRUhHSXNyeC9FUFdGdW5YTnZiaDcvakkxank5V2V0aW4yTGdqd2dKTWJ6eDFxMkpvUWdKZkVRUTIxbnNidlBqWWJ6dzNWYkJHQUh3aTFya2UrQllhb2Y4RWNWYWJ3anQ3elByOEtjRExHY0tPVzlZblE2OW5YWUZ1TUsrRVU1M3c3V0w4U0dIK0YrRmUyejM0SThZU3JBb1NGZURZdkFCaEgrQmZ2QlRDSzRJMWZDbUFNWVduOFNnQWpDQ3ZqMXdJVWpyQTJ2aE5Bb1FpZDRqc0RGSWJRT1Q0SW9CQ0VvUGhnZ013Umd1T2pBREpGaUlwblMvVGl6MmJNRkpONmZlQUZuRVdIYlBKQVBIRnFoSFR4TFZ4Q2hQVHhDUkh5aVUrQWtGLzhIaEh5amQ4RFF2N3hPMFFvSjM0SENPWEZieEdoM1BndElKUWZ2d0dDbmZnSUJIdnhBUWgyNC84Z2pQRC93ZmN2a251ajluNm1qd2dkWWlhWXIvbmM0emd3SGEwNENVaEFBaEtRZ0FRa0lBRUpTRUFDRXNoSTRCZDNPSWdZeTFCWE13QUFBQUJKUlU1RXJrSmdnZz09Ii8+CjwvZGVmcz4KPC9zdmc+Cg==");
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center;
      margin-left: 15px;
      background-color: #1e428a;
      position: absolute;
      top: 0;
      right: 0;
    }
  }
`;

const Wap360adminTable = styled(Paper)`
  margin-top: 20px;
`;

const UseCase = ({
  companyName,
  organization360,
}: InferGetServerSidePropsType<typeof getServerSideProps>) => {
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const [caseModel, setCaseModel] = useState(false);
  const [taskModel, setTaskModel] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState<string | null>(null);
  const [selectedCaseId, setSelectedCaseId] = useState<String | null>(null);
  const [searchTimeOut, setSearchTimeOut] = useState<any>("");
  const [search, setSearch] = useState("");
  const [pageData, setPageData] = useState({
    page: 0,
    perpage: 25,
  });

  const [cases, setCases] = useState<any>({
    count: 0,
    cases: [],
  });

  const [filterData, setFilterData] = useState<any>({
    case_ids: [],
    task_ids: [],
    created_at: [null, null],
    search_val: "",
    industry_ids: [],
    risk_ids: [],
    createdby_ids: [],
  });

  const isEditable = useMemo(() => {
    return organization360.is_superadmin || organization360.is_supervisor;
  }, [organization360]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event && event.target.value;
    setSearch(value);
    handleFilterDataChange(value, "search_val");
  };

  useEffect(() => {
    loadCases(organization360);
  }, [pageData, filterData]);

  const loadCases = async (org: any) => {
    const param: any = {};
    for (const filfield in filterData) {
      if (filfield != "created_at") {
        if (filterData[filfield]) {
          param[filfield] = filterData[filfield];
        }
      } else {
        if (filterData[filfield][0] || filterData[filfield][1]) {
          param[filfield] = filterData[filfield];
        }
      }
    }

    let url = `/api/impact360/ivmcases?organization_creator_id=${org?.creator_id}`;

    if (organization360.is_superadmin) {
      url += "&view=admin";
    } else if (organization360.is_supervisor) {
      url += "&view=supervisor";
    }

    if (pageData.perpage) {
      url = `${url}&page=${pageData.page}&limit=${pageData.perpage}`;
    }

    return request<{ cases?: any }>(url, {
      method: "POST",
      body: param,
    }).then((res: any) => {
      if (res) {
        setCases(res);
      }
    });
  };

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    event.stopPropagation();
    setIsActive((current) => !current);
  };

  function handleCaseModel(value: boolean) {
    setCaseModel(value);
    setSelectedCaseId(null);
    loadCases(organization360);
  }

  function handleTaskModel(open: boolean) {
    setSelectedTaskId(null);
    setIsActive(false);
    setTaskModel(open);
    if (!open) {
      loadCases(organization360);
    }
  }

  const handlePageDataChange = (value?: any, type?: any) => {
    const details: any = {
      [type]: value,
    };
    if (type === "perpage") {
      details["page"] = 0;
    }

    setPageData({
      ...pageData,
      ...details,
    });
  };

  const handleFilterDataChange = (value: any, type: any) => {
    if (searchTimeOut) {
      clearInterval(searchTimeOut);
    }
    const mytimeOut = setTimeout(() => {
      setPageData({
        ...pageData,
        page: 0,
      });

      if (type === "created_at_min") {
        type = "created_at";
        value = [value, filterData.created_at[1]];
      } else if (type === "created_at_max") {
        type = "created_at";
        value = [filterData.created_at[0], value];
      }

      setFilterData({
        ...filterData,
        [type]: value,
      });
    }, 500);
    setSearchTimeOut(mytimeOut);
  };

  const editTask = (taskId: string) => {
    setSelectedTaskId(taskId);
    setTaskModel(true);
  };

  const editCase = (caseId: string) => {
    setSelectedCaseId(caseId);
    setCaseModel(true);
  };

  return (
    <>
      <div className="p-6">
        <Wap360AdminTitle>Use Cases Inventory Master</Wap360AdminTitle>

        <Wap360AdminSearch>
          <input
            type="text"
            placeholder="Search by provider or solution name or keyword"
            value={search}
            onChange={handleSearch}
          />
          <button onClick={() => handleCaseModel(true)}>
            Add New Use Case<span onClick={handleClick}></span>
          </button>
          <ul className={isActive ? "active-drop" : "wap-drap-add"}>
            <li onClick={() => handleTaskModel(true)}> Add new task </li>
          </ul>
        </Wap360AdminSearch>

        <UseCaseFilter
          handleFilterDataChange={handleFilterDataChange}
          organization360={organization360}
        />

        <StyledEngineProvider injectFirst>
          <Wap360adminTable sx={{ width: "100%", overflow: "hidden" }}>
            <InventoryMasterTable
              cases={cases}
              isEditable={isEditable}
              rowsPerPage={pageData.perpage}
              page={pageData.page}
              editTask={editTask}
              editCase={editCase}
            />
            <TablePagination
              rowsPerPageOptions={[10, 25, 50]}
              component="div"
              count={cases.count}
              rowsPerPage={pageData.perpage}
              page={pageData.page}
              onPageChange={(event: any, value: any) =>
                handlePageDataChange(value, "page")
              }
              onRowsPerPageChange={(event) =>
                handlePageDataChange(event.target.value, "perpage")
              }
            />
          </Wap360adminTable>
        </StyledEngineProvider>
      </div>

      <CreateNewTask
        open={taskModel}
        impOrganization={organization360}
        setIsOpen={handleTaskModel}
        taskId={selectedTaskId}
      />

      <CaseModel
        open={caseModel}
        impOrganization={organization360}
        handleCaseModel={handleCaseModel}
        case_id={selectedCaseId}
      />
    </>
  );
}

UseCase.getLayout = function getLayout(page: React.ReactElement) {
  return (
    <Layout360>
      {page}
    </Layout360>
  );
}

export default UseCase;
