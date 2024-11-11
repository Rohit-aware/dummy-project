interface UseMyLeadStore {
    leadsData: any[];
    page: number;
    isFinish: boolean;
    loading: boolean;
    setIsFinish: ({ value }: { value: boolean }) => void;
    setMyLeadPage: ({ leadPage }: { leadPage: number }) => void;
    getLeads: ({ formData, leadPage, token }: { formData: {}, leadPage: number, token: string }) => void;
};

export type { UseMyLeadStore };