export enum FormFieldType {
  Text,
  Textarea,
  Image,
  Checkbox,
  Switch,
  Number,
  NumberDropdown,
  Dropdown,
  Multiselect,
  Slider,
  Address,
  Avatar,
  Divider,
  Callout,
  Group,
  Date,
}

export type FormField = {
  formFieldType: FormFieldType;
  name: string;
  label: string;
  placeholder?: string;
  value?: string | string[];
  options?: Record<string, string>[];
  checked?: boolean;
  min?: number;
  max?: number;
  maxLength?: number;
  fields?: FormField[];
  required?: boolean;
  resize?: Record<string, number>;
};

export type WorkspaceCard = {
  id: string;
  title: string;
  description: string;
  category: string;
  users: { id: string }[];
};

export type AiGenerator = {
  id: string;
  name: string;
  title: Record<string, string>;
  description: Record<string, string>;
  image: string;
  contentType: string;
  credits_per_use: number;
  cost_per_use: number;
  popularity: number;
  promoted: number;
  tags: string[];
};

export type WorkspaceGeneratorsDto = {
  generators: string[];
};

export type WorkspaceDto = {
  id: string;
  workspaceName?: string;
  generators: string[];
  tenantId: string;
  logoUrl: string;
  currentUserRole: WorkspaceRole;
  template: {
    color: string;
    name: string;
  };
};

export type UserWorkspaceDto = {
  tenantId: string;
  workspaceId: string;
  workspaceRole: WorkspaceRole;
  userId: string | null;
  email: string;
  firstName?: string;
  lastName?: string;
};

export type MemberOption = {
  email: string;
  userId: string | null | undefined;
  forInvite?: boolean;
};

export type MemberOptions = {
  allowed: MemberOption[];
  added: MemberOption[];
}

export enum WorkspaceRole {
  ADMIN = "admin",
  CREATOR = "creator",
}

export enum Locale {
  en = "en-US", de = "de-DE"
}

export enum Role {
  OWNER = "org:admin",
  MEMBER = "org:member",
  EDITOR = "org:editor",
  NO_ROLE = "no_role",
}

export type Pagination = {
  pageNumber: number;
  pageSize: number;
};
