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
    CourseInstances = "/courseInstances",
    Laboratories = "/laboratories",
    LaboratoryInstances = "/laboratoryInstances",
    SingleSubject = "/subjects/:subjectId",
    SingleCourse = "/courses/:courseId",
    SingleLaboratory = "/laboratories/:laboratoryId",
    SingleLaboratoryInstance = "/laboratoryInstances/:laboratoryInstanceId",
    SingleCourseInstance = "/courseInstances/:courseInstanceId"
}
