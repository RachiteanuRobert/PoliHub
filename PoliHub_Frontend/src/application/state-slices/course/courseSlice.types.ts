export interface Course {
    id: string,
    professorName: string;
    startTime: string;
    duration: number;
    location: string;
    series: string;
    dayOfWeek: number;
    subjectId: string;
}

export type CourseState = {
    courseToUpdate: Course
};
