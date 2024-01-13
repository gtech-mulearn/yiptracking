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
    district_name: string | null;
    org_name: string | null;
}

interface InternDataWithPagination {
    data: InternData[];
    pagination: PaginationInfo;
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
    name: string;
    id: string;
}
