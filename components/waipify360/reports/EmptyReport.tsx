import React, { useState, useMemo } from "react";
import { ArrowUp, ArrowDown, CirclePlus, SendHorizonal } from "lucide-react";

import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { request } from "@/helpers/request";
import { MultiSelect } from "@/components/multi-select-dropdown";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { Spinner } from "@/components/ui/spinner";
import { AppLoading } from "@/components/app-loading";

const EmptyReport = ({
  impOrganization,
  reportId,
  filialId,
  businessAreas,
  refresh,
}: {
  impOrganization: any;
  reportId: string;
  filialId: string;
  businessAreas: any[];
  refresh: () => void;
}) => {
  const { toast } = useToast();

  const [isLoading, setIsLoading] = useState(false);
  const [isFiltered, setIsFiltered] = useState(false);
  const [showLoading, setShowLoading] = useState(false);
  const [intervalId, setIntervalId] = useState<null | NodeJS.Timer>(null);
  const [timeInSeconds, setTimeInSeconds] = useState(-1);
  const [selectedBusinessAreas, setSelectedBusinessAreas] = useState<any[]>([]);
  const [selectedCases, setSelectedCases] = useState<any[]>([]);
  const [selectedKpis, setSelectedKpis] = useState<any[]>([]);
  const [cases, setCases] = useState<any[]>([]);
  const [impactKpis, setImpactKpis] = useState<any[]>([]);
  const [entries, setEntries] = useState<any[]>([]);
  const [totalSolutions, setTotalSolutions] = useState(0);
  const [assistantQuery, setAssistantQuery] = useState("");

  useLayoutEffect(() => {
    if (selectedBusinessAreas.length) {
      loadCases();
    } else {
      setCases([]);
    }
  }, [selectedBusinessAreas]);

  useLayoutEffect(() => {
    if (selectedCases.length) {
      loadKpis();
    } else {
      setImpactKpis([]);
    }
  }, [selectedCases]);

  const loadingDescription = useMemo(() => {
    if (intervalId) {
      if (timeInSeconds < 1) {
        return "Learning from your company's public data....";
      } else if (timeInSeconds < 2) {
        return "Processing within our exclusive high quality dataset..";
      } else if (timeInSeconds < 3) {
        return "Bringing all the knowledge to your fingertips...";
      } else if (isFiltered) {
        clearInterval(intervalId);
        setTimeInSeconds(-1);
        setShowLoading(false);
      }
      return "Bringing all the knowledge to your fingertips...";
    }
  }, [timeInSeconds]);

  const runLocalTime = () => {
    const interval = setInterval(() => {
      setTimeInSeconds((previousState: number) => previousState + 1);
    }, 1000);
    setIntervalId(interval);
  }

  const loadCases = async (): Promise<void> => {
    const business_areas = selectedBusinessAreas.map(_ => _.cat);
    return request<{
      cases?: any;
    }>(`/api/impact360/cases?business_area_ids=${JSON.stringify(business_areas)}`, {
      method: "GET",
    }).then((res) => {
      if (res) {
        setCases(res?.cases);
      }
    });
  };

  const loadKpis = async (): Promise<void> => {
    const _cases = selectedCases.map(_ => _.cat);
    return request<{
      kpis?: any;
    }>(`/api/impact360/kpis?case_ids=${JSON.stringify(_cases)}`, {
      method: "GET",
    }).then((res) => {
      if (res) {
        setImpactKpis(res?.kpis);
      }
    });
  };

  const getMasterEntries = () => {
    if (!selectedBusinessAreas.length) {
      return;
    }
    const _businessAreas = selectedBusinessAreas.map(_ => _.cat);
    const _cases = selectedCases.map(_ => _.cat);
    let url = `/api/impact360/entries/getall/master?business_area_ids=${JSON.stringify(_businessAreas)}&case_ids=${JSON.stringify(_cases)}`;

    setIsFiltered(false);
    setTimeInSeconds(0);
    setShowLoading(true);
    runLocalTime();
    request<{
      entries: any[];
      totalSolutions: number;
    }>(
      url,
      {
        method: "GET",
      }
    )
      .then((res) => {
        const _entries = res.entries.filter(entry => !!entry.id);
        if (_entries.length) {
          setIsFiltered(true);
          setEntries(res.entries);
          setTotalSolutions(res.totalSolutions);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const getEntriesFromAssistant = () => {
    if (!assistantQuery) {
      return;
    }
    const _businessAreas = selectedBusinessAreas.map(_ => _.cat).join(",");
    const _cases = selectedCases.map(_ => _.cat).join(",");
    let url = `http://54.163.59.30/query?query_text=${assistantQuery}${selectedBusinessAreas.length ? ` &business_area_ids=${_businessAreas}` : ""}${selectedCases.length ? ` &use_case_ids=${_cases}` : ""}`;

    setIsFiltered(false);
    setTimeInSeconds(0);
    setShowLoading(true);
    runLocalTime();
    request<{
      results: any[];
      totalSolutions: number;
    }>(
      url,
      { method: "GET" }
    )
      .then((res) => {
        if (res.results) {
          setIsFiltered(true);
          setEntries(res.results);
          setTotalSolutions(res.totalSolutions || 0);
        }
      })
      .catch((err) => {
        console.log(err);
        if (intervalId) {
          clearInterval(intervalId);
        }
        setTimeInSeconds(-1);
        setShowLoading(false);
      });
  };

  const handleBulkCreation = (id?: string) => {
    setIsLoading(true);
    const _businessAreas = selectedBusinessAreas.map(_ => _.cat);
    const _cases = selectedCases.map(_ => _.cat);
    request(
      `/api/impact360/entries/bulk?organization_id=${impOrganization?.id}&report_id=${reportId}&filial_id=${filialId}&original_id=${id || ''}`,
      {
        method: "POST",
        body: {
          business_area_ids: _businessAreas,
          case_ids: _cases,
        },
      }
    )
      .then((res: any) => {
        const { faildCount, duplicate, successCount } = res;
        if (successCount > 0) {
          if (id) {
            const _entries = entries.filter(entry => entry.id !== id);
            setEntries(_entries);
          } else {
            setEntries([]);
          }
          toast({
            description: "The opportunity was added to the report",
          });
        } else {
          toast({
            description: "The opportunity was not added to the report",
            variant: 'destructive'
          });
        }

        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        toast({
          description: "The opportunity was not added to the report",
          variant: 'destructive'
        });
        setIsLoading(false);
      });
  };

  const handleBusinessFunctionSelect = (values: any[]): void => {
    setSelectedBusinessAreas([...values]);
  };
  
  const handleUseCaseSelect = (values: any[]): void => {
    setSelectedCases(values);
  };

  const handleKpiSelect = (values: any[]): void => {
    setSelectedKpis(values);
  };

  const handleDiscard = () => {
    setSelectedBusinessAreas([]);
    setSelectedCases([]);
  };

  const getKpisArr = (kpisStr: string) => {
    try {
      return JSON.parse(kpisStr);
    } catch (err) {
      return [];
    }
  };

  const startNewQuestion = () => {
    setIsFiltered(false);
    setEntries([]);
    setSelectedKpis([]);
    setSelectedCases([]);
    setSelectedBusinessAreas([]);
  }

  return (
    <AppLoading loading={isLoading}>
      <div className="w-full">
        {showLoading && <div className="w-full lg:w-2/3 min-h-60 rounded-lg bg-white p-12 text-center border border-border rounded-lg">
          <p className="font-semibold text-gray-800">
            {loadingDescription}
          </p>
          <div className="mt-20 mb-12">
            <Spinner className="text-blue-700" />
          </div>
        </div>}

        {!showLoading && <>
          {!entries.length && !isFiltered && <div className="w-full lg:w-2/3 flex flex-col min-h-60 rounded-lg bg-white border border-border rounded-lg">
            <div className="p-6 flex-1">
              <Textarea
                className="text-text"
                rows={6}
                placeholder="Which business problem do you want to solve with this report? Which software solution are you looking for? What would you like to improve. Describe it in your own business terms..."
                onChange={(e) => {setAssistantQuery(e.target.value)}}
              />
            </div>
            <div className="px-6 py-2 flex flex-wrap items-center justify-between gap-4 border-t border-border">
              <div className="flex gap-4">
                <MultiSelect
                  placeholder="Business Function"
                  options={(businessAreas || []).map((ba => ({
                    cat: ba.id,
                    key: ba.name,
                  })))}
                  value={selectedBusinessAreas}
                  width="230px"
                  onChange={handleBusinessFunctionSelect}
                />
                {!!selectedBusinessAreas.length && <MultiSelect
                  placeholder="Use case"
                  options={(cases || []).map((ca => ({
                    cat: ca.id,
                    key: ca.name,
                  })))}
                  value={selectedCases}
                  width="230px"
                  onChange={handleUseCaseSelect}
                />}
                {!!selectedCases.length && <MultiSelect
                  placeholder="KPIs"
                  options={(impactKpis || []).map((ik => ({
                    cat: ik.id,
                    key: ik.name,
                  })))}
                  value={selectedKpis}
                  width="180px"
                  onChange={handleKpiSelect}
                />}
              </div>
              <div className="flex gap-4">
                <Button onClick={handleDiscard} variant="transparent" className="text-blue-700">
                  Discard
                </Button>
                <Button disabled={!assistantQuery} onClick={getEntriesFromAssistant} variant="default" className="">
                  Find AI Opportunities
                </Button>
              </div>
            </div>
          </div>}

          {isFiltered && <div className="flex flex-col lg:flex-row gap-1">
            <div className="w-full p-4 rounded-lg bg-white">
              <p className="text-labelGray">
                {entries.length} opportunities found with {totalSolutions} software solutions evaluated 
              </p>
              <div className="flex justify-end">
                <span className="pr-10 font-semibold text-sm text-blue-700">
                  Add to report
                </span>
              </div>

              {/* Entries list */}
              <div className="h-[calc(100vh_-_360px)] divide-y overflow-y-auto">
                {entries.map(entry =>
                  <div key={entry.entry_id} className="flex gap-4 py-4">
                    <div className="w-1/2 text-foreground">
                      <p className="font-semibold">{entry.case_name}</p>
                      <p className="text-sm mt-4">
                        {entry.case_description}
                      </p>
                    </div>
                    <div className="flex-1 divide-y">
                      {entry.impacted_kpis?.slice(0, 3)?.map((kpi: any, index: number) => (
                        <div key={index} className="flex items-center py-2 truncate">
                          {kpi.effect === 'Increase' && <ArrowUp className="w-4 mr-2" />}
                          {kpi.effect === 'Decrease' && <ArrowDown className="w-4 mr-2" />}
                          <span className="text-sm text-text">
                            {`${kpi.expected_impact || ''}${kpi.unit || ''} ${kpi.name || ''}`}
                          </span>
                        </div>
                      ))}
                    </div>
                    {<div className="w-32 flex items-center justify-center">
                      <Button variant="transparent" onClick={()=>handleBulkCreation(entry.entry_id)}>
                        <CirclePlus className="w-6 text-blue-700" />
                      </Button>
                    </div>}
                  </div>
                )}
              </div>

              {/* <Button
                variant="outline"
                className="text-blue-700 float-right mt-4"
                onClick={()=>handleBulkCreation()}
              >
                <CirclePlus className="w-4 mr-4" />
                <span className="text-sm">Add all</span>
              </Button> */}
            </div>
            <div className="flex flex-col lg:w-96 rounded-lg">
              <div className="flex-1 bg-white rounded-t-lg">
                {/* display messages */}
              </div>
              <div className="relative h-12 py-1 px-2 bg-gray-300 rounded-b-lg">
                <Input
                  className="bg-white pr-8"
                  placeholder="Talk to me here..."
                />
                <SendHorizonal className="absolute top-3 right-4 w-5 text-gray-300" />
              </div>
            </div>
          </div>}

          {isFiltered && <div className="flex justify-end gap-4 mt-6">
            <Button variant="link" className="text-blue-700" onClick={startNewQuestion}>
              Start a new question
            </Button>
            <Button onClick={refresh}>
              Go to the Report
            </Button>
          </div>}
        </>}
      </div>
    </AppLoading>
  )
}

export default EmptyReport;
