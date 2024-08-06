import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

function AutoComplete({
  result,
  en_id,
  en_image,
  en_val,
  placeholder,
  tableEntity,
  searchLoading,
  handleAddToTable,
  handleSearch,
}: {
  result: any;
  en_id: string;
  en_image?: string;
  en_val: string;
  placeholder: string;
  tableEntity: any;
  searchLoading: boolean;
  handleAddToTable: (entity: any) => void;
  handleSearch: (value: string, selectedArr?: any) => void;
}) {
  const ref = useRef(null);
  const popupRef = useRef(null);
  const searchRef = useRef<any>("");
  const [selectedEntity, setSelectedEntity] = useState<any>([]);
  const [searchEntity, setSearchEntity] = useState<string>("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      if (
        !(ref.current as any)?.contains(event.target) &&
        !(popupRef.current as any)?.contains(event.target)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("click", handleClickOutside, true);
    return () => {
      document.removeEventListener("click", handleClickOutside, true);
    };
  }, []);

  const myLoader = ({ src }: { src: string }) => {
    return `${src}`;
  };

  const removeSelectedEntity = (entity: any) => {
    const updatedEntities = selectedEntity.filter(
      (tool: any) => tool[en_id] !== entity[en_id]
    );
    setSelectedEntity(updatedEntities);
    handleSearchEntity(searchEntity, updatedEntities);
  };

  const handleSearchEntity = (value: string, selectedArr?: any) => {
    if (searchRef.current) {
      clearTimeout(searchRef.current);
    }

    searchRef.current = setTimeout(() => {
      const new_arr = (selectedArr ?? selectedEntity).map(
        (entity: any) => entity[en_id]
      );
      handleSearch(value, new_arr);
    }, 500);

    setSearchEntity(value);
  };

  const handleAddToTableIn = () => {
    handleAddToTable(selectedEntity);
    setSelectedEntity([]);
    setSearchEntity("");
    handleSearchEntity("")
  };

  const handleSelectEntity = (entity: any) => {
    const new_arr = [...selectedEntity, entity];
    setSelectedEntity(new_arr);
    handleSearchEntity(searchEntity, new_arr);
  };

  return (
    <div className="flex items-center gap-2 mb-4 sm:mb-5 md:mb-[25px]">
      <div className="flex-grow">
        <div
          className="flex flex-wrap items-center gap-4 border border-solid border-inputBorder rounded-md px-3 py-[7px] relative"
          ref={ref}
        >
          {selectedEntity.map((tool: any) => {
            return (
              <span
                key={tool[en_id]}
                className="flex items-center justify-center gap-1 border border-solid border-[#64748B] px-3 bg-white max-w-fit rounded-md font-medium text-[#64748B] text-sm h-7 leading-5"
              >
                <Button
                  variant={"transparent"}
                  className="p-0"
                  onClick={() => removeSelectedEntity(tool)}
                >
                  <Image
                    height={14}
                    width={14}
                    src="/crossdelete.svg"
                    alt="delete"
                    loader={myLoader}
                  />
                </Button>
                {tool[en_val]}
              </span>
            );
          })}
          <div>
            <Input
              type="text"
              onChange={(e) => handleSearchEntity(e.target.value)}
              placeholder={placeholder}
              value={searchEntity}
              onFocus={() => setOpen(true)}
              className="border-0 outline-none h-auto leading-6 p-0 w-56 flex-grow"
            />

            <div
              className={`absolute top-[calc(100%_+_8px)] left-0 w-full max-h-[150px] z-50 bg-white border border-solid border-inputBorder rounded-md overflow-auto scroll-smooth custom-scrollbar  !pr-0 ${
                open && (result?.length > 0 || searchLoading)
                  ? "block"
                  : "hidden"
              }`}
              ref={popupRef}
            >
              {searchLoading ? (
                <div className="space-y-1 px-3 py-[7px]">
                  <Skeleton className="h-8 w-full" />
                </div>
              ) : (
                result.map((entity: any) => (
                  <div
                    key={entity[en_id]}
                    className="flex items-center justify-between gap-4  px-3 py-[7px] cursor-pointer hover:bg-[#EDEEF3] transition-all relative"
                    onClick={() => handleSelectEntity(entity)}
                  >
                    <span className="flex items-center gap-2 text-sm">
                      {en_image && entity[en_image] ? (
                        <Image
                          height={16}
                          width={16}
                          src={entity[en_image]}
                          alt={entity[en_val]}
                          loader={myLoader}
                          onError={(event: any) => {
                            event.target.style.opacity = 0;
                          }}
                        />
                      ) : (
                        <span className="w-5 h-5 rounded-full bg-[#64748B]"></span>
                      )}
                      {entity[en_val]}
                    </span>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
      <Button
        variant={"outline"}
        size={"default"}
        className="capitalize"
        disabled={selectedEntity.length === 0}
        onClick={handleAddToTableIn}
      >
        add to table
      </Button>
    </div>
  );
}

export default AutoComplete;
