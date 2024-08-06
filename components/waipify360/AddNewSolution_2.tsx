// import { Select } from "../select";
import { Button } from "../ui/button";
import { Checkbox } from "../ui/checkbox";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Textarea } from "../ui/textarea";
import ModalSelect from "./ModalSelect";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { request } from "@/helpers/request";
import styled from "@emotion/styled";
import { Alert, Snackbar } from "@mui/material";
import React, { useEffect, useState } from "react";

const SolutionTableHf = styled.h4`
  color: #000;
  font-size: 14px;
  font-style: normal;
  font-weight: 600;
  line-height: 16px;
`;
const BackMain = styled.button`
  background-image: url("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxOCIgaGVpZ2h0PSIxOCIgdmlld0JveD0iMCAwIDE4IDE4IiBmaWxsPSJub25lIj4KICA8cGF0aCBkPSJNNy4xNzc1IDQuNDQ3MjdMMi42MjUgOC45OTk3N0w3LjE3NzUgMTMuNTUyM00xNS4zNzUgOC45OTk3N0gyLjc1MjUiIHN0cm9rZT0iIzNFNDg1NiIgc3Ryb2tlLXdpZHRoPSIxLjUiIHN0cm9rZS1taXRlcmxpbWl0PSIxMCIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2UtbGluZWpvaW49InJvdW5kIi8+Cjwvc3ZnPg==");
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background-color: #fff;
  width: 40px;
  height: 40px;
  background-position: center;
  background-repeat: no-repeat;
  cursor: pointer;
`;

const BackMainH = styled.h5`
  color: #1a262d;
  font-size: 18px;
  font-style: normal;
  font-weight: 600;
  line-height: 24px;
  display: flex;
  align-items: center;
  gap: 14px;
`;

const ProductMetricsLine = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin-bottom: 12px;
`;
const ProductMetricsLabel = styled.label`
  color: #6a7381;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  line-height: 20px;
  margin-bottom: 4px;
  display: block;
`;

const ProductMetricsGroup = styled.div`
  width: 30%;
  position: relative;
  :nth-of-type(2) {
    width: 24%;
  }
  :nth-of-type(3) {
    width: 30%;
  }
  :nth-of-type(4) {
    width: 10%;
  }
`;

const SelectWapBtn = styled.button`
  border-radius: 8px;
  border: 1px solid #d7dbe0;
  background: #fff;
  padding: 8px 13px;
  color: #9ca5af;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 24px;
  width: 100%;
  text-align: left;
  position: relative;
  cursor: pointer;
`;

const ChevronDown = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="18"
    height="18"
    viewBox="0 0 18 18"
    fill="none"
    style={{ position: "absolute", right: "13px", top: "12px" }}
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

const ProductMetricsTextareaSpan = styled.span`
  color: #9ca5af;
  text-align: right;
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 20px;
  display: block;
`;

const AddNewSolution = ({
  u_details,
  handleAddChange,
  solution,
  isEdit,
  feasibilityCriteria,
}: {
  u_details: any;
  handleAddChange: (val?: any) => void;
  solution: any;
  isEdit: boolean;
  feasibilityCriteria: any;
}) => {
  const [providerOn, setProviderOn] = useState(false);
  const [aiOn, setaiOn] = useState(false);
  const [solutionOn, setSolutionOn] = useState(false);
  const [providers, setProviders] = useState<any>([]);
  const [provider, setProvider] = useState<any>(null);
  const [seSolution, setSESolution] = useState<any>(null);
  const [seSolutions, setSESolutions] = useState<any>([]);
  const [searchInt, setSearchInt] = useState<any>(null);
  const [feasibilityNumber, setFeasibilityNumber] = useState<any>(0);
  const [showError, setShowError] = useState("");
  const [reviews, setReviews] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [f_details, setF_details] = useState({
    task_to_solution_id: "",
    needs_allocation: "false",
    impact_starts: 0,
    start_period: "day",
    suggested: false,
  });
  const [validation, setValidation] = useState<any>({});

  useEffect(() => {
    loadProvider();
    if (solution) {
      loadSolution(solution.provider_id);
      const impact_starts = solution.impact_starts.split(" ");
      const details = {
        task_to_solution_id: solution.id,
        needs_allocation: !solution.needs_allocation ? "false" : "true",
        impact_starts: impact_starts[0] ?? 0,
        suggested: solution.suggested === 0 ? false : true,
        start_period: impact_starts[1] ?? "day",
      };
      setF_details(details);
    }
  }, []);

  useEffect(() => {
    if (solution) {
      if (seSolutions.length && !seSolution) {
        const solution_val = seSolutions.filter(
          (sol: any) => sol.id == solution.solution_id
        );
        setSESolution({
          ...solution_val[0],
          name: solution.solution_name,
          description: solution.description,
          documentation_url: solution.documentation_url,
          features: solution.features,
          benefits: solution.benefits,
          has_api: solution.has_api,
          has_user_friendly_ui: solution.has_user_friendly_ui,
          has_grpc: solution.has_grpc,
          has_extension: solution.has_extension,
          is_platform: solution.is_platform,
          has_incumbent_integration: solution.has_incumbent_integration,
          model_id: solution.model_id,
          version: solution.version,
        });
      }

      if (providers.length && !provider) {
        const provider = providers.filter(
          (pro: any) => pro.id === solution.provider_id
        );
        setProvider(provider[0]);
      }
    }
  }, [providers.length, seSolutions.length]);

  useEffect(() => {
    if (feasibilityCriteria && !reviews) {
      const details: any = {};
      for (let i = 0; i < feasibilityCriteria.length; i++) {
        details[feasibilityCriteria[i].id] = {
          name: feasibilityCriteria[i].name,
          comment: "",
          score: 0,
          weight_multiplicative: feasibilityCriteria[i].weight_multiplicative,
        };
      }
      if (solution) {
        const tts_data = solution.solution_entry_reviews;
        if (tts_data.length) {
          for (let i = 0; i < tts_data.length; i++) {
            if (details[tts_data[i]["feasibility_criteria_id"]]) {
              details[tts_data[i]["feasibility_criteria_id"]]["comment"] =
                tts_data[i]["comment"];
              details[tts_data[i]["feasibility_criteria_id"]]["score"] =
                tts_data[i]["score"];
            }
          }
        }
        setReviews(details);
      } else {
        setReviews(details);
      }

      handleFN(details);
    }
  }, [feasibilityCriteria]);

  const handleSelect = async (value: any, type: string) => {
    if (type === "provider") {
      loadSolution(value.id);
      setProvider(value);
      setProviderOn(false);
      setSESolution(null);
    } else if (type === "solution") {
      setSESolution(value);
      if (!f_details.task_to_solution_id) {
        loadReview(value.id);
      }
      setSolutionOn(false);
    }

    if (validation[type]) {
      setValidation({
        ...validate,
        [type]: "",
      });
    }
  };

  const loadSolution = async (id: string, name?: string) => {
    await request<{ objectives?: any }>(
      `/api/impact360/solutions?provider_id=${id}${
        name ? `&name=${name}` : ""
      }`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res: any) => {
        setSESolutions(res.solutions);
      })
      .catch(() => setSESolutions([]));
  };

  const loadReview = async (id: string) => {
    await request<{ objectives?: any }>(
      `/api/impact360/entries/${u_details.entryId}/task_to_solution_reviews?solution_id=${id}&task_id=${u_details.task_id}&report_id=${u_details.reportId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res: any) => {
      const new_reviews = res.task_to_solution_reviews;
      const fcdata = { ...reviews };
      for (let i = 0; i < new_reviews.length; i++) {
        if (fcdata[new_reviews[i]["feasibility_criteria_id"]]) {
          fcdata[new_reviews[i]["feasibility_criteria_id"]]["comment"] =
            new_reviews[i]["comment"];
          fcdata[new_reviews[i]["feasibility_criteria_id"]]["score"] =
            new_reviews[i]["score"];
        }
      }
      setReviews(fcdata);
      handleFN(fcdata);
    });
  };

  const loadProvider = async (name?: string) => {
    await request<{ providers?: any }>(
      `/api/impact360/provider${name ? `?name=${name}` : ""}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    ).then((res: any) => {
      if (res) {
        setProviders(res?.providers);
      }
    });
  };

  const handleFN = (details: any) => {
    let new_fn = 0;
    let mulFm = 0;
    for (let val in details) {
      new_fn +=
        Number(details[val]["weight_multiplicative"]) * details[val]["score"];
      mulFm += Number(details[val]["weight_multiplicative"]);
    }
    setFeasibilityNumber((new_fn / mulFm).toFixed(1));
  };

  const handleAddNew = async (
    content: string,
    type: string,
    callback?: any
  ) => {
    if (type == "provider") {
      await request(`/api/impact360/provider`, {
        method: "POST",
        body: {
          name: content,
          logo: null,
          type: null,
          description: null,
          headquarters_city_id: null,
          headquarters_country_id: null,
          headquarters_address_line: null,
          headquarters_address_number: null,
          headquarters_zip_code: null,
          organization_id: u_details.organization,
        },
      })
        .then((res: any) => {
          if (res) {
            setProvider(res.provider);
            setProviderOn(false);
            loadProvider();
            setSESolution(null);
            setSESolutions([])
            if (callback) {
              callback({ success: true });
            }
          }
        })
        .catch((err) => {
          if (callback) {
            callback({ success: false, error: err.error });
          }
        });
    } else if (type == "solution") {
      await request(`/api/impact360/solutions`, {
        method: "POST",
        body: {
          name: content,
          provider_id: provider.id,
          organization_id: u_details.organization,
        },
      })
        .then((res: any) => {
          if (res) {
            setSESolution(res?.solution);
            setSolutionOn(false);
            loadSolution(provider?.id);
            if (callback) {
              callback({ success: true });
            }
          }
        })
        .catch((err) => {
          if (callback) {
            callback({ success: false, error: err.error });
          }
        });
    }
  };

  const handleBlur = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => {
    let { name, value }: { name: string; value: any } = event && event.target;
    if (!value && type == "score") {
      const pr_value = { ...reviews };
      pr_value[name] = {
        ...pr_value[name],
        [type]: 0,
      };
      setReviews(pr_value);
    }
  };

  const handleChangeData = (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>,
    type: string
  ) => {
    let { name, value }: { name: string; value: any } = event && event.target;

    if (validation[name]) {
      setValidation({
        ...validate,
        [name]: "",
      });
    }

    if (type === "score" && value) {
      if (Number(value) < 0 || value > 5 || countDecimals(value) > 1) {
        return;
      }
    }

    const pr_value = { ...reviews };
    pr_value[name] = {
      ...pr_value[name],
      [type]: value,
    };

    if (type === "score") {
      handleFN(pr_value);
    }
    setReviews(pr_value);
  };

  const countDecimals = (value: any) => {
    if (Math.floor(value.valueOf()) === value.valueOf()) return 0;

    var str = value.toString();
    if (str.indexOf(".") !== -1 && str.indexOf("-") !== -1) {
      return str.split("-")[1] || 0;
    } else if (str.indexOf(".") !== -1) {
      return str.split(".")[1].length || 0;
    }
    return str.split("-")[1] || 0;
  };

  const handleSave = async () => {
    const { error, errorObj } = validate();

    if (!error) {
      const { id, created_at, name, ...solvData } = seSolution;

      const current_solution = solution.solution_entry_reviews;
      const update_val = [];
      for (let i = 0; i < current_solution.length; i++) {
        const current_review =
          reviews[current_solution[i]["feasibility_criteria_id"]];
        if (current_review) {
          const details: any = {
            feasibility_criteria_id:
              current_solution[i]["feasibility_criteria_id"],
            score: Number(current_review["score"]),
            comment: current_review["comment"],
            reviewer_organization_id: u_details.organization,
            task_to_solution_id: f_details.task_to_solution_id,
          };

          if (current_solution[i]["id"]) {
            details["id"] = current_solution[i]["id"];
          }

          update_val.push(details);
        }
      }

      const tts_data = {
        task_id: u_details.task_id,
        solution_id: seSolution.id,
        needs_allocation: f_details.needs_allocation == "true" ? true : false,
        impact_starts: `${f_details.impact_starts} ${f_details.start_period}`,
        suggested: f_details.suggested,
        feasibility_number: feasibilityNumber,
      };

      const is_solution_changed = handleSolutionChanged();
      const is_case_to_solution_changed = verifyChangeSolution(tts_data);

      let details = {
        ...solution,
        ...solvData,
        ...tts_data,
        is_solution_changed,
        is_case_to_solution_changed,
        solution_name: name,
        provider_id: provider?.id,
        provider_name: provider?.name,
        provider_logo: provider?.logo,
        provider_type: provider?.type,
        solution_entry_reviews: update_val,
      };
      handleAddChange(details);
    } else {
      setValidation(errorObj);
    }
  };

  const handleSolutionChanged = () => {
    const old_solution = seSolutions.filter(
      (solv: any) => solv.id == seSolution.id
    )[0];
    if (old_solution && seSolution) {
      if (
        old_solution.has_api != seSolution.has_api ||
        old_solution.has_user_friendly_ui != seSolution.has_user_friendly_ui ||
        old_solution.has_grpc != seSolution.has_grpc ||
        old_solution.has_extension != seSolution.has_extension ||
        old_solution.is_platform != seSolution.is_platform ||
        old_solution.has_incumbent_integration !=
          seSolution.has_incumbent_integration ||
        old_solution.description != seSolution.description
      ) {
        return true;
      }
    }
    return false;
  };

  const handleDataChange = (event: any) => {
    const { name, value } = event && event.target;

    setF_details({
      ...f_details,
      [name]: value,
    });

    if (validation[name]) {
      setValidation({
        ...validate,
        [name]: "",
      });
    }
  };

  const handleSelectChange = (value: any, type: string) => {
    setF_details({
      ...f_details,
      [type]: value,
    });

    if (validation[type]) {
      setValidation({
        ...validate,
        [type]: "",
      });
    }
  };

  const handleBlurImpact = (event: any) => {
    let { name, value }: { name: string; value: any } = event && event.target;
    if (!value) {
      setF_details({
        ...f_details,
        [name]: 0,
      });
    }
  };

  const validate = () => {
    let error = false;
    let errorObj: any = {};

    if (!provider) {
      error = true;
      errorObj["provider"] = "Provider is required";
    }

    if (!seSolution) {
      error = true;
      errorObj["solution"] = "Solution is required";
    }

    for (let fct in reviews) {
      if (reviews[fct]["comment"] && reviews[fct]["comment"].length > 4000) {
        error = true;
        errorObj[fct] = "Maximum 4000 characters allowed";
      }
    }

    return { error, errorObj };
  };

  const verifyChangeSolution = (value: any) => {
    if (
      provider.id != solution.provider_id ||
      value.solution_id != solution.solution_id ||
      value.impact_starts != solution.impact_starts ||
      value.suggested != solution.suggested ||
      value.needs_allocation != solution.needs_allocation ||
      feasibilityNumber != solution.feasibility_number
    ) {
      return true;
    }
    return false;
  };

  const getUpdatedReview = () => {
    const update_val = [];
    const current_solution = solution.solution_entry_reviews;
    for (let i = 0; i < current_solution.length; i++) {
      const current_review =
        reviews[current_solution[i]["feasibility_criteria_id"]];
      if (current_review) {
        const details: any = {
          feasibility_criteria_id:
            current_solution[i]["feasibility_criteria_id"],
          entry_id: u_details.entryId,
          score: Number(current_review["score"]),
          comment: current_review["comment"],
          reviewer_organization_id: u_details.organization,
          task_to_solution_id: f_details.task_to_solution_id,
        };

        if (
          current_solution[i]["comment"] != current_review["comment"] ||
          current_solution[i]["score"] != current_review["score"]
        ) {
          details["id"] = current_solution[i]["id"];
          update_val.push(details);
        }
      }
    }
    return update_val;
  };

  const handleSearchVal = async (value: any, type: any) => {
    if (searchInt) {
      clearInterval(searchInt);
    }

    const searchTime = setTimeout(async () => {
      if (type === "provider") {
        loadProvider(value);
      }
      if (type === "solution") {
        loadSolution(provider?.id, value);
      }
    }, 500);
    setSearchInt(searchTime);
  };

  const handleSolutionChange = (event: any) => {
    let {
      name,
      value,
      checked,
    }: { name: string; value?: any; checked?: boolean } = event && event.target;
    setSESolution({
      ...seSolution,
      [name]: checked != undefined ? checked : value,
    });
  };

  return (
    <div className="absolute custom-scrollbar w-full min-h-screen max-h-screen bg-white top-0 right-0 p-5 py-24 overflow-auto overflow-x-hidden">
      <BackMainH className="text-[#0F172A] text-base leading-6 font-semibold fixed top-0 right-0 w-full bg-white p-5 z-10 border-b border-solid border-[#D7DBE0]">
        <BackMain onClick={() => handleAddChange()}></BackMain>Enter new
        Solution & Review for this Use case’s task
      </BackMainH>
      <div className="py-5">
        <ProductMetricsLine className="mb-0">
          <ProductMetricsGroup>
            <Label
              htmlFor="message-2"
              className="text-xs text-labelGray font-medium mb-1 block"
            >
              Provider
            </Label>
            <SelectWapBtn onClick={() => setProviderOn(!providerOn)}>
              {provider ? provider?.name : " Choose a provider"}
              <ChevronDown />
            </SelectWapBtn>
            {providerOn && (
              <ModalSelect
                modalContent={providers}
                handleSelect={handleSelect}
                handleAddNew={handleAddNew}
                handleSearchVal={handleSearchVal}
                type="provider"
                onClickOutside={() => setProviderOn(!providerOn)}
              />
            )}
            <p className="text-danger">{validation?.provider}</p>
          </ProductMetricsGroup>
          <ProductMetricsGroup>
            <Label
              htmlFor="message-2"
              className="text-xs text-labelGray font-medium mb-1 block"
            >
              Type
            </Label>
            <div
              className="text-sm font-normal overflow-hidden overflow-ellipsis whitespace-nowrap text-[#64748B] leading-6 border border-solid border-[#E2E8F0] rounded-md px-3 py-1.5 h-[42px]"
              onClick={() => setaiOn(!aiOn)}
            >
              {provider && provider.type ? provider.type : "AI solutions"}
            </div>
          </ProductMetricsGroup>
          <ProductMetricsGroup>
            <Label
              htmlFor="message-2"
              className="text-xs text-labelGray font-medium mb-1 block"
            >
              Solution name
            </Label>
            <SelectWapBtn
              onClick={() => setSolutionOn(!solutionOn)}
              disabled={!provider}
            >
              {seSolution ? seSolution.name : " Choose a solution"}
              <ChevronDown />
            </SelectWapBtn>
            {solutionOn && (
              <ModalSelect
                modalContent={seSolutions}
                handleSelect={handleSelect}
                handleAddNew={handleAddNew}
                handleSearchVal={handleSearchVal}
                type="solution"
                onClickOutside={() => setSolutionOn(!solutionOn)}
              />
            )}
            <p className="text-danger">{validation?.solution}</p>
          </ProductMetricsGroup>
          <ProductMetricsGroup>
            <ProductMetricsLabel>VN</ProductMetricsLabel>
            <SolutionTableHf>{feasibilityNumber}</SolutionTableHf>
          </ProductMetricsGroup>
        </ProductMetricsLine>
      </div>

      <div className="flex items-center gap-5 mb-6 md:mb-0">
        <div className="w-full md:w-3/6 lg:w-9/12 flex-grow">
          <Label
            htmlFor="message-2"
            className="text-xs text-labelGray font-medium mb-1 block"
          >
            Solution Description
          </Label>
          <Textarea
            name="description"
            placeholder="Solution Description"
            value={seSolution?.description || ""}
            onChange={handleSolutionChange}
            disabled={!seSolution}
            className="placeholder:text-[#9CA5AF] flex min-h-[85px] w-full rounded-lg border border-[#D7DBE0] font-normal bg-transparent shadow-none px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
          />
          <ProductMetricsTextareaSpan>
            {seSolution
              ? seSolution.description
                ? seSolution.description.length
                : 0
              : 0}
            /1000
          </ProductMetricsTextareaSpan>
        </div>
        <div className="w-full md:w-3/6 lg:w-3/12">
          <ul className="flex flex-col gap-3">
            <li>
              {/* <input type="checkbox" name="has_grpc" />
              <label>Third party application</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="third_party_app"
                  name="has_grpc"
                  checked={seSolution?.has_grpc}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="third_party_app"
                  className="text-sm font-medium flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Third party application
                </label>
              </div>
            </li>
            <li>
              {/* <input
                type="checkbox"
                name="has_api"
                checked={seSolution?.has_api}
                onChange={handleSolutionChange}
                disabled={!seSolution || isEdit}
              />
              <label>APIs</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="apis"
                  name="has_api"
                  checked={seSolution?.has_api}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="apis"
                  className="text-sm font-medium flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  APIs
                </label>
              </div>
            </li>
            <li>
              {/* <input
                type="checkbox"
                name="has_extension"
                checked={seSolution?.has_extension}
                onChange={handleSolutionChange}
                disabled={!seSolution || isEdit}
              />
              <label>Extension</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="extension"
                  name="has_extension"
                  checked={seSolution?.has_extension}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="extension"
                  className="text-sm font-medium flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Extension
                </label>
              </div>
            </li>
            <li>
              {/* <input
                type="checkbox"
                name="has_incumbent_integration"
                checked={seSolution?.has_incumbent_integration}
                onChange={handleSolutionChange}
                disabled={!seSolution || isEdit}
              />
              <label>Seamless integration in current funtionality</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="int_funtionality"
                  name="has_incumbent_integration"
                  checked={seSolution?.has_incumbent_integration}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="int_funtionality"
                  className="text-sm font-medium flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Seamless integration in current funtionality
                </label>
              </div>
            </li>
            <li>
              {/* <input
                type="checkbox"
                name="has_user_friendly_ui"
                checked={seSolution?.has_user_friendly_ui}
                onChange={handleSolutionChange}
                disabled={!seSolution || isEdit}
              />
              <label>Owned Foundational Model</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="foundational_model"
                  name="has_user_friendly_ui"
                  checked={seSolution?.has_user_friendly_ui}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="foundational_model"
                  className="text-sm font-medium flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Owned Foundational Model
                </label>
              </div>
            </li>
            <li>
              {/* <input
                type="checkbox"
                name="is_platform"
                checked={seSolution?.is_platform}
                onChange={handleSolutionChange}
                disabled={!seSolution || isEdit}
              />
              <label>Platform</label> */}
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="platform"
                  name="is_platform"
                  checked={seSolution?.is_platform}
                  onChange={handleSolutionChange}
                  disabled={!seSolution || isEdit}
                />
                <label
                  htmlFor="platform"
                  className="text-sm font-medium cursor-pointer flex-grow leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                >
                  Platform
                </label>
              </div>
            </li>
          </ul>
        </div>
      </div>

      {reviews &&
        Object.keys(reviews).map((element: any, index: any) => {
          return (
            <div
              className="flex gap-3 md:gap-5 lg:gap-6 items-center mb-6 md:mb-0"
              key={index}
            >
              <div className="w-full md:w-3/6 lg:w-9/12 flex-grow">
                <Label
                  htmlFor="message-2"
                  className="text-xs text-labelGray font-medium mb-1 block"
                >
                  {reviews[element].name}
                </Label>
                <Textarea
                  placeholder="Enter text here"
                  name={element}
                  value={reviews[element].comment}
                  className="placeholder:text-[#9CA5AF] flex min-h-[85px] w-full rounded-lg border border-[#D7DBE0] font-normal bg-transparent shadow-none px-3 py-2 text-sm placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-0"
                  onChange={(event) => handleChangeData(event, "comment")}
                />
                <span className="text-xs font-medium text-[#9CA5AF] block max-w-fit ml-auto">
                  {reviews[element].comment?.length}/4000
                </span>
                <p className="text-danger">{validation[element]}</p>
              </div>
              <div className="w-full md:w-3/6 lg:w-3/12">
                <Label
                  htmlFor="message-2"
                  className="text-xs text-labelGray font-medium mb-1 block"
                >
                  Score (0 to 5)
                </Label>
                <Input
                  type="number"
                  min={0}
                  max={5}
                  name={element}
                  onChange={(event) => handleChangeData(event, "score")}
                  onBlur={(event) => handleBlur(event, "score")}
                  value={reviews[element].score}
                  placeholder=""
                  className="rounded-md"
                />
              </div>
            </div>
          );
        })}

      <div className="pt-5 flex items-end gap-4">
        <div className="sm:w-9/12">
          <p className="peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs text-labelGray font-medium mb-1 block">
            The expected time of implementation of this solution in order to
            achieve a high level of adoption by our teams is estimated in{" "}
          </p>
          <div className="flex gap-3 flex-shrink-0 items-center">
            <div>
              <Input
                type="number"
                name="impact_starts"
                value={f_details.impact_starts}
                onBlur={handleBlurImpact}
                onChange={handleDataChange}
                className="w-[150px] focus:ring-0 focus-visible:ring-0 rounded-md"
              />
            </div>
            <Select
              name="start_period"
              onValueChange={(val) => handleSelectChange(val, "start_period")}
              value={f_details.start_period}
            >
              <SelectTrigger className="w-[150px] focus:ring-0 focus-visible:ring-0">
                <SelectValue placeholder="Day" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem className="cursor-pointer" value="day">
                  Day
                </SelectItem>
                <SelectItem className="cursor-pointer" value="week">
                  Week
                </SelectItem>
                <SelectItem className="cursor-pointer" value="month">
                  Month
                </SelectItem>
                <SelectItem className="cursor-pointer" value="year">
                  Year
                </SelectItem>
              </SelectContent>
            </Select>
            <p className="sm:w-44 peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs text-labelGray font-medium mb-1 block">
              for the the following allocation of resources
            </p>
          </div>
        </div>
        <div className="sm:w-3/12">
          <Select
            name="needs_allocation"
            onValueChange={(val) => handleSelectChange(val, "needs_allocation")}
            value={f_details.needs_allocation}
          >
            <SelectTrigger className="focus:ring-0 focus-visible:ring-0">
              <SelectValue placeholder="Yes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem className="cursor-pointer" value="false">
                No allocation needed
              </SelectItem>
              <SelectItem className="cursor-pointer" value="true">
                Yes
              </SelectItem>
            </SelectContent>
          </Select>
          <p className="text-danger">{validation?.needs_allocation}</p>
        </div>
      </div>

      <div className="w-full p-4 bg-white flex justify-end fixed bottom-0 left-0 border-t border-solid border-[#D7DBE0]">
        <Button
          onClick={handleSave}
          className="bg-none block max-w-fit min-w-[77px] px-4 py-2 bg-[#1D5BD8] hover:bg-white hover:text-[#1D5BD8] border border-solid border-[#1D5BD8] w-auto h-10 rounded-md text-white text-sm leading-relaxed disabled:opacity-20 transition-all duration-300 ease-in"
        >
          {loading && <span className="loader"></span>} Save
        </Button>
      </div>

      <Snackbar
        open={!!showError}
        autoHideDuration={3000}
        onClose={() => setShowError("")}
      >
        <Alert severity="error">{showError}</Alert>
      </Snackbar>
    </div>
  );
};
export default AddNewSolution;
