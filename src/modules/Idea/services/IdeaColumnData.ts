export const OrgColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "name", header: "Name", isSortable: true },
    { key: "assigned_to", header: "Assigned To", isSortable: true },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: true,
    },
    { key: "vos_completed", header: "VOS", isSortable: true },
    { key: "group_formation", header: "Groups", isSortable: true },
    { key: "idea_submissions", header: "Ideas", isSortable: true },
];

export const InternColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "full_name", header: "Name", isSortable: true },
    { key: "email", header: "Email", isSortable: true },
    { key: "no_of_entries", header: "Assigned", isSortable: true },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: true,
    },
    { key: "vos_completed", header: "VOS", isSortable: true },
    { key: "group_formation", header: "Groups", isSortable: true },
    { key: "idea_submissions", header: "Ideas", isSortable: true },
];

export const DistrictColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "district", header: "District", isSortable: true },
    { key: "no_of_entries", header: "Assigned", isSortable: true },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: true,
    },
    { key: "vos_completed", header: "VOS", isSortable: true },
    { key: "group_formation", header: "Groups", isSortable: true },
    { key: "idea_submissions", header: "Ideas", isSortable: true },
];

export const ZoneColumns: TableColumn<OrgIdeaStats>[] = [
    { key: "zone", header: "Zone", isSortable: true },
    { key: "no_of_entries", header: "Assigned", isSortable: true },
    {
        key: "pre_registration",
        header: "Pre-Reg",
        isSortable: true,
    },
    { key: "vos_completed", header: "VOS", isSortable: true },
    { key: "group_formation", header: "Groups", isSortable: true },
    { key: "idea_submissions", header: "Ideas", isSortable: true },
];