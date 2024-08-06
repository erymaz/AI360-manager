import { FormField } from "@/types";

export const RequiredMarker = ({ field }: { field: FormField }) =>
  field.required ? (
    <span style={{ color: "red", marginRight: ".25rem" }}>*</span>
  ) : (
    <></>
  );
