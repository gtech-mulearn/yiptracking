interface OrgStatusData {
    org_id: string;
    visited: boolean;
    whatsapp: string;
    pta: string;
    alumni: string;
    visited_at?: string;
    participants: number;
    association: string;

    orientation: boolean;
    is_scheduled?: boolean;
	orientation_date?: string;
	scheduled_date?: string;
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
    district_name: string | null;
    zone_id: string | null;
    zone_name: string | null;
    org_name: string | null;
    assigned: {
        college: OrgData[];
        school: OrgData[];
		iti: OrgData[];
    };
    updated_at: string;
    created_at: string;
    created_by: string;
}

interface OrgData {
    org_id: string;
    title: string;
    code: string;
    visited: boolean;
    pta: string | null;
    alumni: string | null;
    association: string | null;
    whatsapp: string | null;
    participants: number;
    visited_at?: string;
    district_id: string;
    district_name: string;
    zone_id: string;
    zone_name: string;
    orientation: boolean;
    is_scheduled?: boolean;
    orientation_date?: string;
    scheduled_date?: string;
}

interface ProfileEditData {
    gender: string;
    dob: string;
    mobile: string;
	currentPassword: string;
	newPassword: string;
}
