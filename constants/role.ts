export interface RoleOption { 
    label : string;
    value : string;
}

export const ROLE_OPTIONS : RoleOption[] = [
    { label : "I want to donate blood", value : "donor" },
    { label : "I need to request blood", value : "requester" },
];
