/**
 * Here you can add more routes as constant to be used for routing within the application.
 */
export enum AppRoute {
    Index = "/",
    Login = "/login",
    Register = "/register",
    Users = "/users",
    UserFiles = "/user-files",
    Subjects = "/subjects",
    Courses = "/courses",
    Laboratories = "/laboratories",
    SingleSubject = "/subjects/:subjectId",
    SingleCourse = "/courses/:courseId",
    SingleLaboratory = "/laboratories/:laboratoryId"
}
