type LeadDetsilType = {
    company_name: string;
    contact_person: string;
    phone: string;
    email: string;
    linkedin_url: string;
    website_url: string;
    address: string;
    state_id: string;
    city_id: string;
    state_name: string;
    city_name: string;
    source: string;
    person_role: string;
    skype: string;
    remark: string;
    outsider_name: string;
    outsider_id: string;
    country_name: string;
    created_on: string;
    share_lead: string;
    shared_count: string;
    client_id: string;
    country_id: string;
    share_allowed: 'Y' | 'N',
    edit_allowed: 'Y' | 'N',
    project_count: number;
    closed_projects: number;
    is_owner?: 'Y' | 'N',
}

interface UseMyLeadStore {
    leadsData: any[];
    page: number;
    isFinish: boolean;
    loading: boolean;
    leadDetails: LeadDetsilType;
    setLeadDetails: ({ value }: { value: LeadDetsilType }) => void;
    setIsFinish: ({ value }: { value: boolean }) => void;
    setMyLeadPage: ({ leadPage }: { leadPage: number }) => void;
    getLeads: ({ formData, leadPage, token }: { formData: {}, leadPage: number, token: string }) => void;
    getSingleLeads: ({ formData, token }: { formData: {}, token: string }) => void;
};

export type { UseMyLeadStore };