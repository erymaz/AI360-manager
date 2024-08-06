import { request } from "@/helpers/request";

export const searchSolutions = (name: string) => {
  return request<{ objectives?: any }>(
    `/api/impact360/solutions?name=${name}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getEntryCaseSolutions = (entryId: string, caseId: string, solution_id?: string) => {
  return request<{ objectives?: any }>(
    `/api/impact360/entries/${entryId}/solutions?case_id=${caseId}${solution_id ? `&solution_id=${solution_id}` : ""}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getEntryTaskModel = (entryId: string, model_id?: string) => {
  return request<{ model?: any }>(`/api/impact360/entries/${entryId}/model${model_id ? `&model_id=${model_id}` : ""}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getEntryObjectives = (entryId: string) => {
  return request<{ objectives?: any }>(
    `/api/impact360/entries/${entryId}/objectives`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getEntryInitiatives = (entryId: string) => {
  return request<{ initiatives?: any }>(
    `/api/impact360/entries/${entryId}/initiatives`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const deleteTaskToSolution = (entryId: string, id: string) => {
  return request<{ initiatives?: any }>(
    `/api/impact360/entries/${entryId}/solutions/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllIndustry = async () => {
  return request<{ industries?: any }>(`/api/impact360/industries`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const getAllStatus = async () => {
  return request<{ statuses?: any }>(`/api/impact360/statuses`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const opportunityStatusChange = (
  opportunity_id: string,
  status_id: string
) => {
  return request(`/api/impact360/entries/${opportunity_id}`, {
    method: "PUT",
    body: { status_id: status_id },
  });
};

export const getAllIntiatives = (filial_id: string) => {
  return request<{ initiatives?: any }>(
    `/api/impact360/initiatives?filialId=${filial_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};

export const getAllFDepartment = (filial_id: string) => {
  return request<{ departments?: any }>(
    `/api/impact360/department?filial_id=${filial_id}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    }
  );
};
