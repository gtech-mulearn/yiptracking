interface InternsDataResponse {
    data: UserData[];
    pagination: Pagination;
}

interface InternData {
    user_id: string;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    mobile: string | null;
    gender: string | null;
    dob: string | null;
    district_id: string | null;
    district_name: string | null;
    org_id: string | null;
    org_name: string | null;
    zone_id: string | null;
    zone_name: string | null;
    assigned: AssignedData;
    updated_at: string | null;
    created_at: string;
    created_by: string;
}

interface AssignedData {
    college: OrgData[];
    school: OrgData[];
}

interface Pagination {
    count: number;
    totalPages: number;
    isNext: boolean;
    isPrev: boolean;
    nextPage: number;
}

interface SelectOption {
    label: string;
    value: string;
}
interface CreateUser {
    email?: string;
    college?: SelectOption[];
    school?: SelectOption[];
    iti?: SelectOption[];
}

interface getOrgResponse {
    created_at: string;
    created_by: string;
    district_id: string;
    name: string;
    org_id: string;
    org_type: string;
    updated_at: string;
    updated_by: string;
}
