import AutoComplete from "../auto-complete";
import { Button } from "../ui/button";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import AddNewSolution from "./AddNewSolution";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { searchSolutions } from "@/lib/api/impact360";
import { getNewUUID } from "@/lib/prisma";
import Image from "next/image";
import React, { useRef, useState } from "react";

const SolutionsReviewsList = ({
  details,
  handleParamChange,
  feasibilityCriteria,
  validation,
  formData,
  isEdit,
}: {
  details: any;
  feasibilityCriteria: any;
  handleParamChange: (value: any, type: string) => void;
  validation: any;
  formData: any;
  isEdit: boolean;
}) => {
  const deleteRef = useRef<any>({ type: "", value: null });

  const [finalAITools, setFinalTools] = useState<any>([]);
  const [finalModels, setFinalModels] = useState<any>([]);

  const [aITools, setAITools] = useState<any>([]);
  const [models, setModels] = useState<any>([]);

  const [auSolution, setAUSolution] = useState(false);
  const [solution, setSolution] = useState(null);
  const [searchLoading, setSearchLoading] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState<boolean>(false);

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  useLayoutEffect(() => {
    const idt = setTimeout(() => {
      const valuearr_to = formData?.entrytools;
      if (valuearr_to && valuearr_to.length > 0) {
        setFinalTools(valuearr_to);
      }

      const valuearr = formData?.entrytomodels;
      if (valuearr && valuearr.length > 0) {
        setFinalModels(valuearr);
      }
    }, 500);
    return () => clearTimeout(idt);
  }, []);

  const handleSolution = (value: any) => {
    setSolution(value);
    setAUSolution(true);
  };

  const searchCaseSolutions = async (name: string, selArr?: any) => {
    if (name) {
      setSearchLoading(true);
      const new_arr_table = finalAITools.map((entity: any) => entity["id"]);
      return searchSolutions(name)
        .then((res: any) => {
          if (res.solutions && res.solutions.length) {
            const filteredSolutions = res.solutions.filter(
              (solution: any) =>
                !selArr.includes(solution["id"]) &&
                !new_arr_table.includes(solution["id"])
            );
            setAITools(filteredSolutions);
          }
          setSearchLoading(false);
        })
        .catch(() => {
          setAITools([]);
          setSearchLoading(false);
        });
    } else {
      setAITools([]);
    }
  };

  const loadModel = async (name?: string, selArr?: any) => {
    if (name) {
      setSearchLoading(true);
      await request<{ models?: any }>(
        `/api/impact360/models${name ? `?name=${name}` : ""}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((res: any) => {
          if (res.models && res.models.length) {
            const new_arr_table = finalModels.map(
              (entity: any) => entity["id"]
            );
            const filteredEntities = res.models.filter(
              (entity: any) =>
                !selArr.includes(entity["id"]) &&
                !new_arr_table.includes(entity["id"])
            );
            setModels(filteredEntities);
          } else {
            setModels([]);
          }
          setSearchLoading(false);
        })
        .catch(() => {
          setModels([]);
          setSearchLoading(false);
        });
    } else {
      setModels([]);
    }
  };

  const handleAddNew = (data?: any) => {
    if (data) {
      const data_Index = finalAITools.findIndex(
        (val: any) => data.id === val.id
      );
      const new_arr = [...finalAITools];
      new_arr[data_Index] = data;
      const details: any = { entrytools: new_arr };
      if (data.solution_id === formData?.winner_solution_id) {
        details["winner_solution_data"] = data;
      }
      setFinalTools(new_arr);
      handleParamChange(details, "winner_solution_id");
    }
    setAUSolution(false);
    setSolution(null);
  };

  const handleFinalTools = (tools: any) => {
    const new_tools = tools.map((tool: any) => handleCaseToSolution(tool));
    const new_arr = [...new_tools, ...finalAITools];
    const details: { [key: string]: any } = { entrytools: new_arr };
    setFinalTools(new_arr);
    handleParamChange(details, "winner_solution_id");
  };

  const handleFinalModel = (models: any) => {
    const new_tools = models.map((tool: any) => handleModel(tool));
    const new_arr = [...new_tools, ...finalModels];
    const details: { [key: string]: any } = { entrytomodels: new_arr };
    setFinalModels(new_arr);
    handleParamChange(details, "model_id");
  };

  const handleDeleteClose = () => {
    setIsDeleteOpen(false);
    deleteRef.current = { type: "", value: null };
  };

  const handleDeleteAITools = (val: any, type: string) => {
    setIsDeleteOpen(true);
    deleteRef.current = { type: type, value: val };
  };

  const handleDeleteFinal = () => {
    const details: any = {};
    if (
      (deleteRef.current.type === "model" && deleteRef.current.value.model_id === formData?.winner_solution_id) ||
      (deleteRef.current.type === "aitool" && deleteRef.current.value.solution_id === formData?.winner_solution_id)
    ) {
      details["winner_solution_id"] = null;
      details["winner_solution_data"] = null;
    }

    if (deleteRef.current.type === "model") {
      const filterModels = finalModels.filter(
        (model: any) => model.model_id !== deleteRef.current.value.id
      );
      details["entrytomodels"] = filterModels;
      setFinalModels(filterModels);
    } else if (deleteRef.current.type === "aitool") {
      const filterTools = finalAITools.filter(
        (tool: any) => tool.solution_id !== deleteRef.current.value.id
      );
      details["entrytools"] = filterTools;
      setFinalTools(filterTools);
    }

    handleParamChange(details, "winner_solution_id");
    handleDeleteClose();
  };

  const handleSelectTools = (tool: any) => {
    handleParamChange(
      {
        winner_solution_id: tool.solution_id,
        winner_solution_data: tool,
        winner_solution_is_custom: false,
      },
      "winner_solution_id"
    );
  };

  const handleSelectModel = (model: any) => {
    handleParamChange(
      {
        winner_solution_id: model.model_id,
        winner_solution_data: model,
        winner_solution_is_custom: true,
      },
      "winner_solution_id"
    );
  };

  const handleCaseToSolution = (solution: any) => {
    const fcarry: any = [];
    const new_id = getNewUUID();
    feasibilityCriteria?.forEach((fcv: any) => {
      fcarry.push({
        case_to_solution_id: new_id,
        feasibility_criteria_id: fcv.id,
        feasibility_criteria_name: fcv.name,
        reviewer_organization_id: details.organization,
        score: 0,
        comment: "",
      });
    });

    return {
      id: new_id,
      is_new: true,
      solution_entry_reviews: fcarry,
      feasibility_number: "0",
      impact_starts: "0 day",
      needs_allocation: false,
      suggested: false,
      name: formData?.case_name,
      case_id: formData?.case_id,
      provider_id: solution?.provider_id,
      provider_name: solution?.provider_name,
      provider_logo: solution?.provider_logo,
      provider_type: solution?.provider_type,
      solution_id: solution?.id,
      solution_name: solution?.name,
      description: solution?.description,
      organization_creator_id: solution?.organization_creator_id,
      has_api: solution?.has_api,
      has_user_friendly_ui: solution?.has_user_friendly_ui,
      has_grpc: solution?.has_grpc,
      has_extension: solution?.has_extension,
      is_platform: solution?.is_platform,
      has_incumbent_integration: solution?.has_incumbent_integration,
    };
  };

  const handleModel = (model: any) => {
    const new_id = getNewUUID();

    const details = {
      id: new_id,
      is_new: true,
      task_id: formData?.task_id,
      name: formData?.task_name,
      model_id: model.id,
      model_name: model.name,
      model_capabilities: "",
      development_description: "",
      suggested: false,
    };

    return details;
  };

  const getWinnerSolution = (cr_solutions: any) => {
    if (cr_solutions?.length) {
      let highNum = cr_solutions[0].feasibility_number;
      let win_data = cr_solutions[0];
      for (let i = 1; i < cr_solutions.length; i++) {
        if (cr_solutions[i].feasibility_number > highNum) {
          highNum = cr_solutions[i].feasibility_number;
          win_data = cr_solutions[i];
        }
      }
      return win_data;
    }
    return false;
  };

  return auSolution ? (
    <AddNewSolution
      u_details={details}
      isEdit={isEdit}
      handleAddChange={handleAddNew}
      solution={solution}
      feasibilityCriteria={feasibilityCriteria}
    />
  ) : (
    <>
      <div className="flex items-center gap-x-2 py-2 px-3 rounded-md border border-blue-500">
        <img src="/reddit-logo.png" alt="reddit-logo" className="w-6" />
        <span className="text-foreground text-xs text-medium">Compare AI tools and custom development using an AI model.</span>
      </div>

      <div className="flex items-center justify-between mt-6">
        <h3 className="mb-3 sm:mb-4 font-semibold text-base leading-6 text-baseColor">
          AI Tools
        </h3>
      </div>
      <AutoComplete
        result={aITools}
        en_id="id"
        en_val="name"
        en_image="provider_logo"
        tableEntity={finalAITools}
        searchLoading={searchLoading}
        placeholder="Search for AI tools"
        handleAddToTable={handleFinalTools}
        handleSearch={searchCaseSolutions}
      />

      <div className="relative w-[830px]">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[8%]">
                Best Solution
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[8%] whitespace-nowrap">
                AI Tool
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[35%] whitespace-nowrap">
                Expected impact
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[9%] whitespace-nowrap">
                Viability Score
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[7%]">
                Compliance Score
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[17%]">
                Time to first impact
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[7%] whitespace-nowrap">
                Annual price
              </TableHead>
              <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[9%] text-center"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {finalAITools.length > 0 ? (
              finalAITools.map((tool: any) => {
                return (
                  <TableRow key={tool.id}>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[8%] text-center">
                      <RadioGroup className="justify-center">
                        <RadioGroupItem
                          checked={
                            formData?.winner_solution_id === tool.solution_id &&
                            formData?.winner_solution_is_custom === false
                          }
                          onClick={() => handleSelectTools(tool)}
                          value={tool.id}
                        />
                      </RadioGroup>
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[8%] text-center">
                      <div className="flex items-center flex-col gap-2">
                        {(tool.provider_logo || tool.solution_logo_url) && (
                          <Image
                            src={tool.solution_logo_url || tool.provider_logo}
                            alt="wAIpify"
                            width={24}
                            height={24}
                            loader={myLoader}
                            title={tool.name}
                            onError={(event: any) => {
                              event.target.style.display = "none";
                            }}
                          />
                        )}
                        <span className="text-xs block font-normal text-center leading-3 overflow-hidden w-20 flex-grow line-ellips-2">
                          {tool.solution_name}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[35%]">
                      -
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[9%]">
                      {tool.feasibility_number}
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[7%]">
                      -
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[17%]">
                      {tool.impact_starts}
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[7%] text-center">
                      -
                    </TableCell>
                    <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D] w-[9%] text-center">
                      <div className="flex items-center gap-1 justify-center">
                        {(details.is_superadmin || details.is_supervisor) && (
                          <Button
                            className="flex-shrink-0 border border-solid border-[#EDEEF3] hover:bg-[#EDEEF3] rounded-lg bg-transparent shadow-none p-1.5 h-auto"
                            onClick={() => handleSolution(tool)}
                          >
                            <Image
                              src="/edit.svg"
                              height={16}
                              width={16}
                              alt="edit"
                            />
                          </Button>
                        )}
                        <Button
                          className="flex-shrink-0 border border-solid border-[#EDEEF3] hover:bg-[#EDEEF3] rounded-lg bg-transparent shadow-none p-1.5 h-auto"
                          onClick={() => handleDeleteAITools(tool, "aitool")}
                        >
                          <Image
                            src="/delete.svg"
                            height={16}
                            width={16}
                            alt="delete"
                            loader={myLoader}
                          />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="text-center">
                  No record available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        <p className="text-required text-xs leading-6 font-normal absolute -bottom-5 left-0">
          {validation?.winner_solution_id}
        </p>
      </div>

      <div className="flex items-center justify-between md:pt-8 lg:pt-12">
        <h3 className="mb-3 sm:mb-4 font-semibold text-base leading-6 text-baseColor">
          Custom development
        </h3>
      </div>
      <AutoComplete
        result={models}
        en_id="id"
        en_val="name"
        tableEntity={finalModels}
        searchLoading={searchLoading}
        placeholder="Search for AI models"
        handleAddToTable={handleFinalModel}
        handleSearch={loadModel}
      />

      <Table>
        <TableHeader>
          <TableRow>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[8%]">
              Best Solution
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[8%] whitespace-nowrap">
              AI Model
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[35%] whitespace-nowrap">
              Expected impact
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[9%] whitespace-nowrap">
              Viability Score
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[7%]">
              Compliance Score
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[17%]">
              Time to first impact
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[7%] whitespace-nowrap">
              Annual price
            </TableHead>
            <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 w-[9%] text-center"></TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {finalModels.length > 0 ? (
            finalModels.map((model: any) => {
              return (
                <TableRow key={model.id}>
                  <TableCell className="w-[8%] text-center">
                    <RadioGroup className="justify-center">
                      <RadioGroupItem
                        checked={
                          formData?.winner_solution_id === model.mode_id &&
                          formData?.winner_solution_is_custom === true
                        }
                        onClick={() => handleSelectModel(model)}
                        value={model.id}
                      />
                    </RadioGroup>
                  </TableCell>
                  <TableCell className="w-[8%] text-center">
                    <div className="flex items-center flex-col gap-2">
                      {/* <Image
                        src={model.logo ?? undefined}
                        alt="wAIpify"
                        width={24}
                        height={24}
                        loader={myLoader}
                        title={model.model_name}
                        onError={(event: any) => {
                          event.target.style.display = "none";
                        }}
                      /> */}
                      <span className="text-xs block font-normal text-center leading-3 overflow-hidden w-20 flex-grow">
                        {model.model_name}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell className="w-[35%]">-</TableCell>
                  <TableCell className="w-[9%]">-</TableCell>
                  <TableCell className="w-[7%]">-</TableCell>
                  <TableCell className="w-[17%]">-</TableCell>
                  <TableCell className="w-[7%] text-center">-</TableCell>
                  <TableCell className="w-[9%] text-center">
                    <div className="flex items-center gap-2 justify-center">
                      <Button
                        className="border border-solid border-[#EDEEF3] hover:bg-[#EDEEF3] rounded-lg bg-transparent shadow-none p-1.5 h-auto"
                        onClick={() => handleDeleteAITools(model, "model")}
                      >
                        <Image
                          src="/delete.svg"
                          height={18}
                          width={18}
                          alt="delete"
                          loader={myLoader}
                        />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="text-center">
                No record available
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      <AlertDialog open={isDeleteOpen}>
        <AlertDialogContent className="pt-10 pb-9 gap-8">
          <AlertDialogHeader>
            <AlertDialogDescription className="text-center">
              Are you sure you want to delete this{" "}
              {deleteRef.current?.type === "aitool" ? "tool" : "model"}?
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter className="sm:justify-center">
            <AlertDialogAction className="min-w-28" onClick={handleDeleteFinal}>
              Yes
            </AlertDialogAction>
            <AlertDialogCancel className="min-w-28" onClick={handleDeleteClose}>
              No
            </AlertDialogCancel>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default SolutionsReviewsList;
