import { Submission } from 'src/domain/submission';

export interface ISubmissionRepository {
  save(student: Submission): Promise<void>;
}
