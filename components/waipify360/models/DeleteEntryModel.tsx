import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { useToast } from "@/components/ui/use-toast";
import { request } from "@/helpers/request";
import React, { useState } from "react";

function DeleteEntryModel({
  open,
  entry_id,
  handleAccept,
}: {
  open: boolean;
  entry_id: string;
  handleAccept: () => void;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();

  const handleDeleteEntry = async () => {
    setLoading(true);
    await request(`/api/impact360/entries/${entry_id}`, {
      method: "DELETE",
    }).then(() => {
      handleAlert("Entry", "Entry deleted successfully", "success");
    });

    setLoading(false);
    handleAccept();
  };

  const handleAlert = (
    title: string,
    description: string,
    type: "success" | "error"
  ) => {
    toast({
      title: title,
      description: description,
      variant: type === "error" ? "destructive" : "default",
      className: `custom_toast${type === "success" ? " bg-success" : ""}`,
      open: true,
    });
  };

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="pt-10 pb-9 gap-8">
        <AlertDialogHeader>
          <AlertDialogDescription className="text-center">
            Are you sure you want to delete this record? You will lose all the
            information associated with this entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="sm:justify-center">
          <AlertDialogAction className="min-w-28" onClick={handleDeleteEntry}>
            {loading === true && (
              <div className="border-gray-300 h-4 w-4 animate-spin rounded-full border-2 border-t-blue-900 mr-2"></div>
            )}{" "}
            Yes
          </AlertDialogAction>
          <AlertDialogCancel
            className="min-w-28"
            onClick={() => handleAccept()}
          >
            No
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default DeleteEntryModel;
