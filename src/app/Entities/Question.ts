import { IAnswer } from './Answer';

export class IQuestion {
    constructor(
        public id: number,
        public text: string,
        public answers: IAnswer[],
        public isAnsweredRight: boolean) {

    }
}
