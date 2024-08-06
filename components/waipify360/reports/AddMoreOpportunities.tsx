"use client";

import Image from "next/image";

import { Drawer, DrawerContent, DrawerOverlay } from "@/components/ui/drawer";
import EmptyReport from "./EmptyReport";
import { ModalCancel } from "@/components/side-modal";

function AddMoreOpportunities({
  open,
  impOrganization,
  reportId,
  filialId,
  businessAreas,
  setIsOpen,
  refresh,
}: {
  open: boolean;
  impOrganization: any;
  reportId: string;
  filialId: string;
  businessAreas: any;
  setIsOpen: (value: boolean) => void;
  refresh: (value: boolean) => void;
}) {
  return (
    <Drawer direction="right" open={open} onClose={()=>setIsOpen(false)}>
      <DrawerOverlay className="bg-transparent"></DrawerOverlay>
      <DrawerContent
        className="max-h-[calc(100vh_-_108px)] mt-auto h-full max-w-[calc(100%_-_58px)] ml-auto p-5 rounded-none border-l border-solid border-inputBorder"
        draggable={false}
        data-vaul-no-drag={false}
      >
        <div className="">
          <ModalCancel
            className="absolute top-3 right-3 !border !border-solid !border-[#E2E8F0] !bg-[#F1F5F9] !p-1.5 z-30"
            type="button"
            onClick={()=>setIsOpen(false)}
          >
            <Image
              src={"/close.svg"}
              width={12}
              height={12}
              className="filter brightness-75"
              alt="close-the-popup"
            />
          </ModalCancel>
          <EmptyReport
            impOrganization={impOrganization}
            reportId={reportId}
            filialId={filialId}
            businessAreas={businessAreas}
            refresh={()=>refresh(false)}
          />
        </div>
      </DrawerContent>
    </Drawer>
  );
}

export default AddMoreOpportunities;
