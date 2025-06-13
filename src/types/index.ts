export interface Project {
    title: string;
    description: string;
    link: string;
}

export interface UserData {
    username: string;
    fullname: string;
    email: string;
    name: string;
    role: string;
    bio: string;
    projects: Project[];
}