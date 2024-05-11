export interface Project {
    id:            string;
    startDate:     string;
    finishDate:    string;
    description:   string;
    scopes:        string;
    objective:     string;
    budget:        string;
    requirements:  string;
    team_profile:  string;
    data:          ProjectData;
    status:        boolean;
    createDate:    string;
    updateDate:    string;
    userCreate:    User;
    usersAdmitted: User[];
}

export interface ProjectData {
    data: string;
}

export interface User {
    id:                  string;
    email:               string;
    fullName:            string;
    jobMatcherResponses: null;
    phone:               string;
    bio:                 null;
    isActive:            boolean;
    roles:               string[];
    createDate:          Date;
    updateDate:          Date;
    yearsexperience:     string;
}

export interface UserCreateData {
    yearsofexp:     string;
    language:       string[];
    timezone:       string;
    hoursavailable: string;
    skills:         string[];
    location:       string;
    cv:             string;
}

export interface JobMatcherResponses {
    job_description_match: string;
    matching_keywords:     string[];
    profile_summary:       string;
}
