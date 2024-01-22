interface IdeaCardData {
    pre_registration: number;
    vos_completed: number;
    group_formation: number;
    idea_submissions: number;
}

interface OrgIdeaStats {
    id: string;
    name: string;
    code: string;
    full_name: string;
    no_of_entries: number;
    district: string;
    zone: string;
    email: string;
    assigned_to: string;
    assigned_to_email: string;
    pre_registration: number;
    vos_completed: number;
    idea_submissions: number;
    group_formation: number;
}

interface DataItem {
    [key: string]: any; // Replace 'any' with more specific types if possible
}