import React, { useState, useEffect } from "react";
import Link from "next/link";
import {useClerk} from "@clerk/nextjs";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowUpRight, CirclePlus } from "lucide-react";
import { Role } from "@/types";
import { request } from "@/helpers/request";

const DashboardEmpty = ({
  view,
  fillals,
}: {
  view?: any;
  fillals: any[];
}) => {
  const {session} = useClerk();

  const [departments, setDepartments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const isOwner = session?.user?.publicMetadata['organizationRole'] == Role.OWNER;

  useEffect(() => {
    if (fillals?.length === 1) {
      getDepartmentData(fillals[0].id);
    }
  }, []);

  const getDepartmentData = async (filialId: string) => {
    setIsLoading(true);
    await request<{ departments?: any }>(`/api/impact360/department?filial_id=${filialId}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((res) => {
      if (res) {
        setDepartments(res.departments);
      }
      setIsLoading(false);
    }).catch((err) => {
      setIsLoading(false);
    });
  };

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Card x-chunk="dashboard-01-chunk-1" className="bg-black text-white">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Start here!
          </CardTitle>
          <Link href={`/360/${view ? view : "aimanager"}/report`}>
            <CirclePlus className="h-4 w-4" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Add AI opportunities to your first report
          </div>
          <p className="text-xs">
            Find AI opportunities that solve big problems and meet your goals
          </p>
        </CardContent>
      </Card>

      {(!isLoading && isOwner && fillals?.length < 2 && !departments.length) && <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Match your organization structure
          </CardTitle>
          <Link href="/departments">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Add Departments to Your Organization 
          </div>
          <p className="text-xs text-muted-foreground">
            Distribute opportunities among departments in the report
          </p>
        </CardContent>
      </Card>}

      {isOwner && <Card x-chunk="dashboard-01-chunk-1">
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">
            Distribute AI Opportunities to the responsible teams
          </CardTitle>
          <Link href="/members#/organization-members">
            <ArrowUpRight className="h-4 w-4 text-muted-foreground" />
          </Link>
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">
            Invite Team Members
          </div>
          <p className="text-xs text-muted-foreground">
            Add members of your team to one or several reports
          </p>
        </CardContent>
      </Card>}
    </div>
  );
}

export default DashboardEmpty;
