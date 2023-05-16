export interface Laboratory {
    id: string,
    assistantName: string;
    startTime: string;
    duration: number;
    location: string;
    dayOfWeek: number;
    courseId: string;
}

export type LaboratoryState = {
    laboratoryToUpdate: Laboratory
};
