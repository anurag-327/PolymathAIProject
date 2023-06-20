// defines schema for user

export interface User{
    id:String,
    name:String,
    email:String
}

// define schema for project

export interface Project{
    id:String,
    name:String,
    description:String,
    deploymentURL:String,
    githubURL:String
}