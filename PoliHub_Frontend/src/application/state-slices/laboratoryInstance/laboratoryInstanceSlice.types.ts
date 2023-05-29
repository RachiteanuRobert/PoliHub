export interface LaboratoryInstance {
    id: string,
    name: string;
    description: string;
    laboratoryInstanceDate: Date;
    laboratoryId: string;
}

export type LaboratoryInstanceState = {
    laboratoryInstanceToUpdate: LaboratoryInstance
};
