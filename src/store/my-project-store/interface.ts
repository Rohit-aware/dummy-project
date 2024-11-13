

interface ProjectDataType {
    project_id: number;
    lead_id: number;
    project_category_id: number;
    project_title: string;
    project_description: string;
    project_status_id: number;
    visible_to: string;
    remark: string;
    amount: number | null;
    conversion_date: string | null;
    created_by: number;
    updated_by: number;
    created_on: string;
    updated_on: string;
    is_update_status: string;
    is_share_lead: string;
    state_name: string;
    city_name: string;
    category_name: string;
    project_status: string;
    client_id: number;
    company_name: string;
    contact_person: string;
    phone: string;
    state_id: string;
    city_id: string;
    source: string;
    country_id: number;
    country_name: string;
  }
  
  

interface UseMyProjectStoreProps {
    projectLoad: boolean;
    page: number,
    isFinish: boolean;
    projects: Array<ProjectDataType> ;
    setIsFinish: ({ value }: { value: boolean }) => void;
    setMyProjectPage: ({ projectPage }: { projectPage: number }) => void;
    getProjects: ({ token, formData, projectPage }: { token: string, formData: {}, projectPage: number }) => Promise<any>;
};
export type { UseMyProjectStoreProps };