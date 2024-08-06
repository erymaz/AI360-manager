import React from "react";
import { Spinner } from '@/components/ui/spinner';
import ReportItem from "./ReportItem";

const ReportList = ({
  filialId,
  loading,
  reports,
  handleSelectReport,
}: {
  filialId: string,
  loading: boolean,
  reports: any,
  handleSelectReport: (id: string) => void
}) => {
  return (
    <div className="max-w-6xl mt-4 bg-white rounded-lg p-6">
      {loading && <Spinner className="text-blue-900" />}
      {reports.length ?
        <div className="w-full grid grid-cols-4 gap-2 whitespace-nowrap text-xs font-medium text-gray-600 mb-4">
          <span className="pl-2">Name</span>
          <span>Content Type</span>
          <span>Date Created</span>
          <span className="pr-2 text-center">Created By</span>
        </div> : <></>
      }
      {reports.map((report: any, index: number) => {
        return (
          <ReportItem key={index} filialId={filialId} report={report} handleSelectReport={handleSelectReport} />
        );
      })}
    </div>
  )
}

export default ReportList;
