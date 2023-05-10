export interface Subject {
    id: string,
    name: string;
    year: string;
    professor: string;
    department: string;
    creditsno: string;
    description: string;
}

export type SubjectState = {
    subjectToUpdate: Subject
};
