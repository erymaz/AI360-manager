"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { useToast } from "@/components/ui/use-toast";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
} from "@/components/ui/alert-dialog";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import { request } from "@/helpers/request";
import useLayoutEffect from "@/helpers/use-isomorphic-layout-effect";
import { ModalCancel } from "@/components/side-modal";
import { PlusIcon } from "lucide-react";
import {useTranslations} from "next-intl";

function CreateReportsInBulk({
  open,
  impOrganization,
  reportId,
  filialId,
  industries,
  setIsOpen,
}: {
  open: boolean;
  impOrganization: any;
  reportId: any;
  filialId: any;
  industries: any;
  setIsOpen: (value: boolean) => void;
}) {
  const { toast } = useToast();
  const t = useTranslations('waipify.ui');

  const [confirm, setConfirm] = useState(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [entries, setEntries] = useState<any[]>([]);
  const [categories, setCategories] = useState<any>([]);
  const [industryId, setIndustryId] = useState("");
  const [industryCategoryId, setIndustryCategoryId] = useState("");
  const [selected, setSelected] = useState('');

  useLayoutEffect(() => {
    if (open) {
      setIndustryId("");
      setIndustryCategoryId("");
      getMasterEntries();
    }
  }, [open]);

  useLayoutEffect(() => {
    if (industryId) {
      setIndustryCategoryId("");
      loadCategory(industryId);
    }
  }, [industryId]);

  const filteredEntries = useMemo(() => {
    let _entries = [...entries];
    if (industryId) {
      _entries = _entries.filter(entry => entry.industry_id === industryId);
    }

    if (industryCategoryId) {
      _entries = _entries.filter(entry => entry.industry_category_id === industryCategoryId);
    }
    return _entries;
  }, [entries, industryId, industryCategoryId]);

  const getMasterEntries = () => {
    let url = `/api/impact360/entries/getall/master`;

    setIsLoading(true);
    request<{
      entries: any[];
    }>(
      url,
      {
        method: "GET",
      }
    )
      .then((res) => {
        setEntries(res.entries);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const loadCategory = async(industry_id: any) => {
    return request<{
      industry_categories?: any;
    }>(
      `/api/impact360/industry_category?organization_id=${impOrganization.id}&industry_id=${industry_id}`,
      {
        method: "GET",
      }
    ).then((res) => {
      if (res) {
        setCategories(res.industry_categories);
      }
    });
  };

  const openConfirmModal = (id?: string) => {
    setSelected(id || '');
    setConfirm(true);
  }

  const handleCloseModel = () => {
    setIsOpen(false);
  };

  const handleBulkCreation = () => {
    setConfirm(false);
    setIsLoading(true);
    request(
      `/api/impact360/entries/bulk?organization_id=${impOrganization?.id}&report_id=${reportId}&filial_id=${filialId}&original_id=${selected}&industry_id=${industryId}&industry_category_id=${industryCategoryId}`,
      {
        method: "POST",
        body: {},
      }
    )
      .then((res: any) => {
        const { faildCount, duplicate, successCount } = res;
        toast({
          title: "Bulk Entries",
          description: `${successCount} ${
            successCount > 1 ? "entries" : "entry"
          } created. ${
            duplicate > 0
              ? `${duplicate} ${
                  duplicate > 1 ? "entries" : "entry"
                } are already exists. `
              : ""
          }${
            faildCount > 0
              ? `failed to create ${faildCount} ${
                  faildCount > 1 ? "entries" : "entry"
                }. `
              : ""
          }`,
          className: "custom_toast bg-success",
          open: true,
        });
        setIsLoading(false);
        setIsOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  return (
    <Drawer direction="right" open={open} onClose={handleCloseModel}>
      <DrawerOverlay className="bg-transparent"></DrawerOverlay>
      <DrawerContent
        className="max-h-screen h-full max-w-[880px] ml-auto p-5 px-[19px] rounded-none border-l border-solid border-inputBorder"
        draggable={false}
        data-vaul-no-drag={false}
      >
        <div className="flex items-center justify-between mb-[20px] gap-[25px]">
          <ModalCancel
            className="absolute top-0 -left-3 !border !border-solid !border-[#E2E8F0] !bg-[#F1F5F9] !p-1.5 z-30"
            type="button"
            onClick={handleCloseModel}
          >
            <Image
              src={"/close.svg"}
              width={12}
              height={12}
              className="filter brightness-75"
              alt="close-the-popup"
            />
          </ModalCancel>
          <h3 className="text-[#0F172A] text-base leading-6 font-semibold">
            Add new AI opportunities in bulk 
          </h3>
        </div>
        <div className="pt-4 pb-0 flex-shrink-0 flex-grow flex flex-col">
          {isLoading && (
            <div className="absolute z-20 top-0 left-0 w-full h-full flex items-center justify-center bg-[rgba(0,0,0,0.25)]">
              <div
                className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-primaryColor motion-reduce:animate-[spin_1.5s_linear_infinite]"
                role="status"
              >
                <span className="z-20 !absolute !-m-px !h-px !w-px !overflow-hidden !whitespace-nowrap !border-0 !p-0 ![clip:rect(0,0,0,0)]">
                  Loading...
                </span>
              </div>
            </div>
          )}

          {!isLoading &&
            <>
              <div className="w-full grid grid-cols-1 lg:grid-cols-2 gap-4">
                <div className="w-full">
                  <Label
                    htmlFor="industry"
                    className="text-labelGray text-xs font-normal leading-6 block"
                  >
                    Industry
                  </Label>
                  <Select
                    onValueChange={(id) => setIndustryId(id)}
                    value={industryId || ""}
                  >
                    <SelectTrigger
                      className={
                        industryId
                          ? "select-value focus:ring-0"
                          : " select-placeholder"
                      }
                    >
                      <SelectValue placeholder="Select Industry" />
                    </SelectTrigger>
                    <SelectContent>
                      {industries.map((industry: any) => (
                        <SelectItem value={industry.id} key={industry.id}>
                          {t(`account_settings.industry.${industry.name}`)}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="business_function"
                    className="text-labelGray text-xs font-normal leading-6 block"
                  >
                    Category
                  </Label>
                  <Select
                    onValueChange={(id) => setIndustryCategoryId(id)}
                    value={industryCategoryId || ""}
                  >
                    <SelectTrigger
                      className={
                        industryCategoryId
                          ? "select-value focus:ring-0"
                          : " select-placeholder"
                      }
                    >
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category: any) => (
                        <SelectItem value={category.id} key={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="overflow-y-auto scroll-smooth custom-scrollbar max-h-[calc(100vh_-_320px)] mt-8">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 font-bold">
                        AI Use Case
                      </TableHead>
                      <TableHead className="py-1 text-xs px-1.5 text-labelGray !leading-4 text-center" />
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredEntries.length > 0 ? (
                      filteredEntries.map((entry: any) => {
                        return (
                          <TableRow key={entry.id}>
                            <TableCell className="p-2 align-middle text-sm font-normal text-[#1A262D]">
                              <span className="text-xs block font-normal leading-3 overflow-hidden flex-grow line-ellips-2">
                                {entry.case_name}
                              </span>
                            </TableCell>
                            <TableCell className="p-2">
                              <Button variant="ghost" size="sm" onClick={() => openConfirmModal(entry.id)}>
                                <PlusIcon className="text-blue-500" />
                              </Button>
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
              </div>

              <Button size="sm" className="ml-auto mt-8 w-fit" onClick={() => openConfirmModal()}>
                Add All
              </Button>
            </>
          }
        </div>

        <AlertDialog open={confirm}>
          <AlertDialogContent className="pt-10 pb-9 gap-8">
            <AlertDialogHeader>
              <AlertDialogDescription className="text-center">
                Are you sure you want to add {selected ? 'this opportunity' : 'these opportunities'}?
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="sm:justify-center">
              <AlertDialogAction
                className="min-w-28"
                onClick={handleBulkCreation}
              >
                Yes
              </AlertDialogAction>
              <AlertDialogCancel
                className="min-w-28"
                onClick={() => setConfirm(false)}
              >
                No
              </AlertDialogCancel>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </DrawerContent>
    </Drawer>
  );
}

export default CreateReportsInBulk;
