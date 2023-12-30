interface OrgStatusData {
	org_id: string,
	visited: boolean,
	whatsapp: string,
	pta: string,
	alumni: string,
	visited_at: string,
	participants: number,
	association: string
}

interface DashboardData {
    user_id: string;
    first_name: string;
    last_name: string;
    role: string;
    email: string;
    mobile: string | null;
    gender: string | null;
    dob: string | null;
    district_id: string | null;
    org_id: string | null;
    assigned: {
        college: any[]; // Replace 'any' with a more specific type if applicable
        school: any[]; // Replace 'any' with a more specific type if applicable
    };
    updated_at: string;
    created_at: string;
    created_by: string;
}