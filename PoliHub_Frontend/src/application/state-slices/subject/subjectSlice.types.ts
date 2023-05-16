export interface Subject {
    id: string,
    name: string;
    year: string;
    semester: string;
    department: string;
    creditsNo: string;
    description: string;
}

export type SubjectState = {
    subjectToUpdate: Subject
};
