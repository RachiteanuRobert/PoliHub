export interface CourseInstance {
    id: string,
    name: string;
    description: string;
    courseInstanceDate: Date;
    courseId: string;
}

export type CourseInstanceState = {
    courseInstanceToUpdate: CourseInstance
};
