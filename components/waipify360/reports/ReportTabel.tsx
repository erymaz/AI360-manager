import EntryRow from "./EntryRow";
import styled from "@emotion/styled";
import Box from "@mui/material/Box";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import TableSortLabel from "@mui/material/TableSortLabel";
import { visuallyHidden } from "@mui/utils";
import * as React from "react";

interface Data {
  id: number;
  case_name: string;
  task_name: string;
  provider_name: string;
  incumbent: number;
  accuracy: number;
  adption: number;
  privacy_data: number;
  cybersec: number;
  people_env: number;
  ransp_explan: number;
  bias_faorness: number;
  rai_policies: number;
  rai_score: number;
  eu_ai_act_score: number;
  feasibility_number: number;
  impact_starts: string;
  output_metric: string;
  input_metric: string;
  sanity_metric: string;
  business_baseline: string;
  genai_impact: string;
  recommendation: string;
  business_objective: string;
  department: string;
  planned: string;
  status: string;
  actions: string;
  solution_name: string;
}

type Order = "asc" | "desc";

interface HeadCell {
  disablePadding: boolean;
  id: keyof Data;
  label: string;
  numeric: boolean;
  sort?: boolean;
}

const headCells: readonly HeadCell[] = [
  {
    id: "case_name",
    numeric: false,
    disablePadding: true,
    label: "AI-enabled solution",
    sort: true,
  },
  {
    id: "task_name",
    numeric: false,
    disablePadding: false,
    label: "Task",
    sort: true,
  },
  {
    id: "provider_name",
    numeric: false,
    disablePadding: false,
    label: "Software solution",
    sort: true,
  },
  {
    id: "solution_name",
    numeric: false,
    disablePadding: false,
    label: "Solution name",
    sort: true,
  },
  {
    id: "incumbent",
    numeric: false,
    disablePadding: false,
    label: "Incumbent",
  },
];

const headCellV1: readonly HeadCell[] = [
  {
    id: "feasibility_number",
    numeric: false,
    disablePadding: false,
    label: "VN",
    sort: true,
  },
  {
    id: "impact_starts",
    numeric: false,
    disablePadding: false,
    label: "Impact starts",
    sort: true,
  },
  {
    id: "output_metric",
    numeric: false,
    disablePadding: false,
    label: "Output metric",
  },
  {
    id: "input_metric",
    numeric: false,
    disablePadding: false,
    label: "Input metric",
  },
  {
    id: "sanity_metric",
    numeric: false,
    disablePadding: false,
    label: "Sanity metric",
  },
  {
    id: "business_baseline",
    numeric: false,
    disablePadding: false,
    label: "Business baseline",
  },
  {
    id: "genai_impact",
    numeric: false,
    disablePadding: false,
    label: "Estimated genai impact ",
    sort: true,
  },
  {
    id: "recommendation",
    numeric: false,
    disablePadding: false,
    label: "Recommendation",
  },
  {
    id: "business_objective",
    numeric: false,
    disablePadding: false,
    label: "Business objective",
  },
  {
    id: "department",
    numeric: false,
    disablePadding: false,
    label: "Department",
    sort: true,
  },
  {
    id: "planned",
    numeric: false,
    disablePadding: false,
    label: "Planned",
  },
  {
    id: "status",
    numeric: false,
    disablePadding: false,
    label: "Status",
    sort: true,
  },
  {
    id: "actions",
    numeric: false,
    disablePadding: false,
    label: "Actions",
  },
];

interface EnhancedTableProps {
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Data
  ) => void;
  order: Order;
  orderBy: string;
  feasibilityCriteria: any;
}

const WapTabelTh = styled(TableSortLabel)`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  padding: 8px;
`;
const WapTabelHedding = styled(TableCell)`
  padding: 0px;
  text-align: center;
`;

const WapTabelDiv = styled(TableContainer)`
  position: relative;
  flex: auto;
  height: 100%;
  overflow: auto;
  ::-webkit-scrollbar {
    width: 5px;
    height: 5px;
  }

  ::-webkit-scrollbar-track {
    background: #f1f1f1;
  }

  ::-webkit-scrollbar-thumb {
    background: #888;
  }

  ::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  &.no_record {
    max-height: 110px;
  }
`;

const WapTabelLoder = styled(TableCell)`
border: .2em solid transparent;
border-top-color: currentcolor;
border-radius: 50%;
animation: 1s loader-05 linear infinite;
position: absolute;
top: 50%;
left:50%;
transform: translate(-50%,-50%);
&:before {
  content: '';
  display: block;
  width: inherit;
  height: inherit;
  position: absolute;
  top: -.2em;
  left: -.2em;
  border-radius: 50%;
  opacity: .5;
`;

const WapTabelTd = styled(TableCell)`
  color: #000;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px;
  padding: 13px;
  text-align: center;
`;

const WapTabelRow = styled(TableRow)`
  padding: 40px;
  display: block;
  & td {
    border-bottom: none;
  }
  &:nth-of-type(even) {
    background-color: #f8f9fa;
  }
`;

function EnhancedTableHead(props: EnhancedTableProps) {
  const { order, orderBy, onRequestSort } = props;
  const [fca, setFca] = React.useState([]);

  const createSortHandler =
    (property: keyof Data, isSort: boolean) =>
    (event: React.MouseEvent<unknown>) => {
      if (!isSort) {
        return;
      }
      onRequestSort(event, property);
    };

  React.useEffect(() => {
    const newFca = props.feasibilityCriteria.map((fca: any) => ({
      id: fca.id,
      numeric: true,
      disablePadding: false,
      label: fca.name,
    }));
    setFca(newFca);
  }, []);

  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <WapTabelHedding
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <WapTabelTh
              active={!!(orderBy === headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id, !!headCell.sort)}
              className="wap-tabel-th"
              hideSortIcon={headCell.sort ? false : true}
            >
              <span>{headCell.label}</span>
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </WapTabelTh>
          </WapTabelHedding>
        ))}

        {fca.map((headCell: any) => (
          <WapTabelHedding
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
          >
            <WapTabelTh
              active={!!(orderBy === headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id, !!headCell.sort)}
              className="wap-tabel-th"
              hideSortIcon
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </WapTabelTh>
          </WapTabelHedding>
        ))}

        {headCellV1.map((headCell) => (
          <WapTabelHedding
            key={headCell.id}
            align={headCell.numeric ? "right" : "left"}
            padding={headCell.disablePadding ? "none" : "normal"}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            <WapTabelTh
              active={!!(orderBy === headCell.id)}
              direction={orderBy === headCell.id ? order : "asc"}
              onClick={createSortHandler(headCell.id, !!headCell.sort)}
              className="wap-tabel-th"
              hideSortIcon={headCell.sort ? false : true}
            >
              {headCell.label}
              {orderBy === headCell.id ? (
                <Box component="span" sx={visuallyHidden}>
                  {order === "desc" ? "sorted descending" : "sorted ascending"}
                </Box>
              ) : null}
            </WapTabelTh>
          </WapTabelHedding>
        ))}
      </TableRow>
    </TableHead>
  );
}

export default function ReportTabel({
  entries,
  statuses,
  feasibilityCriteria,
  loading,
  handleStatusChange,
  handleSortData,
  handleEditEntry,
}: {
  entries?: any;
  statuses: any;
  feasibilityCriteria: any;
  loading: boolean;
  handleSortData: (sortData: any) => void;
  handleStatusChange: () => void;
  handleEditEntry: (row: any) => void;
}) {
  const [order, setOrder] = React.useState<any>("");
  let [orderBy, setOrderBy] = React.useState("");

  const handleRequestSort = (event: any, property: any) => {
    let order_new = "asc";
    if (property === orderBy) {
      order_new = order === "asc" ? "desc" : "asc";
    }
    setOrder(order_new as Order);
    setOrderBy(property);
    handleSortData({ sortKey: property, sortDirection: order_new });
  };

  return (
    <WapTabelDiv className={entries?.length === 0 ? "no_record" : ""}>
      <Table
        sx={{ minWidth: 4000 }}
        aria-labelledby="tableTitle"
        size={"medium"}
      >
        <EnhancedTableHead
          order={order}
          orderBy={orderBy}
          onRequestSort={handleRequestSort}
          feasibilityCriteria={feasibilityCriteria}
        />
        <TableBody>
          {!loading ? (
            entries?.length > 0 &&
            entries.map((row: any, index: any) => {
              return (
                <EntryRow
                  key={index}
                  row={row}
                  index={index}
                  feasibilityCriteria={feasibilityCriteria}
                  statuses={statuses}
                  handleStatusChange={handleStatusChange}
                  handleEditEntry={handleEditEntry}
                />
              );
            })
          ) : (
            <WapTabelRow
              hover
              role="checkbox"
              tabIndex={-1}
              sx={{ cursor: "pointer" }}
            >
              <WapTabelTd colSpan={27} align="left">
                <WapTabelLoder></WapTabelLoder>
              </WapTabelTd>
            </WapTabelRow>
          )}
        </TableBody>
      </Table>
    </WapTabelDiv>
  );
}
