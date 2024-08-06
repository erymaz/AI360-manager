import React, { useState } from "react";
import moment from "moment";
import {
  Pencil,
  Check,
} from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";

const ReportItem = ({
  filialId,
  report,
  handleSelectReport,
}: {
  filialId: string;
  report: any;
  handleSelectReport: (id: string) => void;
}) => {
  const { toast } = useToast();
 
  const [edit, setEdit] = useState<boolean>(false);
  const [name, setName] = useState<string>("");

  useLayoutEffect(() => {
    setName(report.name);
  }, [report.name])

  const getShortName = (fullName: string): string | null => {
    if (!fullName) {
      return null;
    }
    const nameArr = fullName.split(" ");
    return `${nameArr[0][0]}${nameArr[1][0] || ""}`
  }

  const save = async (): Promise<void> => {
    try {
      await request(`/api/impact360/report/${filialId}/${report.id}`, {
        method: "PUT",
        body: {
          name,
        },
      }).then((res: any) => {
        if (res) {
          setEdit(false);
          report.name = name;
          toast({
            variant: "default",
            description: "Report name is udpated successfully.",
          });
        }
      });
    } catch (err) {
      setEdit(false);
      toast({
        variant: "destructive",
        title: "Unable to update report name.",
        description: "There was a problem with your request.",
      });
      console.log(err);
    }
  }

  return (
    <div className="w-full grid grid-cols-4 gap-4 whitespace-nowrap text-sm text-text">
      {!edit ?
        <span className="py-2 pl-2 hover:bg-muted cursor-pointer my-auto rounded" onClick={() => handleSelectReport(report["id"])}>
          {report["name"]}
        </span> :
        <Input
          id={report.id}
          name="report_name"
          className="mt-1"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      }
      <span className="py-2 my-auto">
        Generated
      </span>
      <span className="py-2 my-auto">
        {moment(report["time_zone"]).format("DD MMM, YYYY HH:SS A")}
      </span>
      <div className="py-2 flex items-center justify-center gap-x-2">
        <div className="rounded-full bg-blue-100 p-2 text-xs text-blue-700">
          {getShortName(report["createdBy"])}
        </div>
        <span className="pr-2">
          {report["createdBy"] || 'N/A'}
        </span>
        {!edit ?
          <Button size="sm" variant="outline" onClick={()=>setEdit(!edit)}>
            <Pencil className="w-4" />
          </Button> :
          <Button size="sm" variant="outline" onClick={save}>
            <Check className="w-4" />
          </Button>
        }
      </div>
    </div>
  )
}

export default ReportItem;
