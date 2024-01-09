interface IdeaData {
    college: OrgIdeaStats[];
    school: OrgIdeaStats[];
    iti: OrgIdeaStats[];
    pre_registration: number;
    vos_completed: number;
    group_formation: number;
    idea_submissions: number;
}

interface OrgIdeaStats {
    id: string;
    name: string;
    code: string;
    pre_registration: number;
    vos_completed: number;
    group_formation: number;
    idea_submissions: number;
}