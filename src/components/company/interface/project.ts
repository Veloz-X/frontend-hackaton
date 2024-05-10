export interface Project {
    id:            string;
    startDate:     string;
    finishDate:    string;
    name:          string;
    description:   string;
    scopes:        string;
    objective:     string;
    budget:        string;
    requirements:  string;
    team_profile:  string;
    // data:          ProjectData;
    status:        boolean;
    createDate:    string;
    updateDate:    string;
    userCreate:    string;
    // usersAdmitted: User[];
}

export interface ProjectData {
    data: string;
}

export interface User {
    id:         string;
    email:      string;
    fullName:   string;
    phone:      null | string;
    data:       UserCreateData;
    isActive:   boolean;
    roles:      string[];
    createDate: Date;
    updateDate: Date;
}

export interface UserCreateData {
    yearsofexp:     string;
    language:       string[];
    timezone:       string;
    hoursavailable: string;
    skills:         Skill[];
    location:       string;
    cv:             string;
}

export enum Skill {
    AngularJS = "Angular.js",
    NodeJS = "Node.js",
    ReactJS = "React.js",
}
