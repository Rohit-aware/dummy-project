
interface UseMyProjectStoreProps {
    projectLoad: boolean;
    page: number,
    isFinish: boolean;
    projects: Array<any> | any;
    setIsFinish: ({ value }: { value: boolean }) => void;
    setMyProjectPage: ({ projectPage }: { projectPage: number }) => void;
    getProjects: ({ token, formData, projectPage }: { token: string, formData: {}, projectPage: number }) => Promise<any>;
};
export type { UseMyProjectStoreProps };