import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { PencilIcon, SaveIcon } from "lucide-react";
import { request } from "@/helpers/request";

export default function EditableSolutionName({
  solution,
  organization,
  providerId,
}: {
  solution: any;
  organization: any;
  providerId?: string;
}) {
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(solution?.name || '');

  const handleEdit = () => {
    if (!edit) {
      setEdit(true);
      return;
    } else {
      if (solution?.id) {
        const url = `/api/impact360/solutions/${solution.id}`;
        request(url, {
          method: "PUT",
          body: {
            name,
          },
        }).then((res: any) => {
          setEdit(false);
        });
      } else {
        const url = `/api/impact360/solutions`;
        request(url, {
          method: "POST",
          body: {
            name,
            provider_id: providerId,
            organization_id: organization.id,
          },
        }).then((res: any) => {
          setEdit(false);
        });
      }
    }
  }

  return (
    <div className="flex justify-between items-center">
      {!edit && <p className="text-black">{name}</p>}
      {edit &&
        <Input value={name} onChange={(e)=>setName(e.target.value)} />
      }
      <Button
        variant="ghost"
        onClick={() => handleEdit()}
      >
        {!edit && <PencilIcon className="text-blue-500 w-4" />}
        {edit && <SaveIcon className="text-red-700 w-4" />}
      </Button>
    </div>
  );
}
