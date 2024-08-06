import React from "react";

export const Container = ({
  sidebar,
  children,
  ...props
}: React.ComponentProps<"div"> & {
  sidebar?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div
      className="flex flex-1"
      {...props}
    >
      {!!sidebar &&
        <div className="hidden md:block w-64 bg-white px-4 py-6">
          {sidebar}
        </div>
      }
      <div className="w-full max-w-5xl mx-auto my-0 py-6">
        {children}
      </div>
    </div>
  );
};
