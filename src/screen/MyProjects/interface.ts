interface ProjectsCardProps {
    client: string;
    name: string;
    title: string;
    source: string;
    status: string;
    location: string;
    phonenumber: string;
    onProjectDetail: () => void;
};

interface ProjectsListProps {
    page: number;
    data: Array<any>;
    finish: boolean;
    loading: boolean;
    refresh: boolean;
    onRefresh: () => void;
    onEndReached: () => void;
};

export type { ProjectsCardProps, ProjectsListProps };
