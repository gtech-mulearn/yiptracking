export const OrgColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "name", header: "Name", isSortable: false },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: false,
    },
    { key: "vos_completed", header: "VOS", isSortable: false },
    { key: "group_formation", header: "Groups", isSortable: false },
    { key: "idea_submissions", header: "Ideas", isSortable: false },
];

export const InternColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "full_name", header: "Name", isSortable: false },
    { key: "email", header: "Email", isSortable: false },
    { key: "no_of_entries", header: "No. of Org", isSortable: false },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: false,
    },
    { key: "vos_completed", header: "VOS", isSortable: false },
    { key: "group_formation", header: "Groups", isSortable: false },
    { key: "idea_submissions", header: "Ideas", isSortable: false },
];

export const DistrictColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "district", header: "District", isSortable: false },
    { key: "no_of_entries", header: "No. of Org", isSortable: false },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: false,
    },
    { key: "vos_completed", header: "VOS", isSortable: false },
    { key: "group_formation", header: "Groups", isSortable: false },
    { key: "idea_submissions", header: "Ideas", isSortable: false },
];

export const ZoneColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "zone", header: "Zone", isSortable: false },
    { key: "no_of_entries", header: "No. of Districts", isSortable: false },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: false,
    },
    { key: "vos_completed", header: "VOS", isSortable: false },
    { key: "group_formation", header: "Groups", isSortable: false },
    { key: "idea_submissions", header: "Ideas", isSortable: false },
];