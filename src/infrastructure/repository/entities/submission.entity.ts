import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  UpdateDateColumn,
  OneToOne,
} from 'typeorm';
import { SubmissionMediaEntity } from './submissionMedia.entity';
import { ComponentType } from 'src/domain/vo/enum/componentType.enum';
import { SubmissionStatus } from 'src/domain/vo/enum/submissionStatus.enum';
import { Submission } from 'src/domain/submission';

@Entity('submissions')
export class SubmissionEntity {
  @PrimaryColumn({ type: 'char', length: 26 })
  id: string;

  @Column({ name: 'student_id', type: 'char', length: 26 })
  studentId: string;

  @Column({ name: 'component_type', type: 'varchar', length: 100 })
  componentType: ComponentType;

  @Column({ name: 'submit_text', type: 'text' })
  submitText: string;

  @Column({ type: 'varchar', length: 50 })
  status: SubmissionStatus;

  @Column({ type: 'integer' })
  score: number;

  @Column({ type: 'jsonb', nullable: true })
  result: any;

  @OneToOne(() => SubmissionMediaEntity, { nullable: true })
  submissionMedia: SubmissionMediaEntity | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', nullable: true })
  updatedAt: string;

  constructor(submission: Submission) {
    if (submission) {
      this.id = submission.id;
      this.studentId = submission.studentId;
      this.componentType = submission.componentType;
      this.submitText = submission.submitText;
      this.status = submission.status;
      this.score = submission.score;
      this.result = submission.result;
      this.submissionMedia = new SubmissionMediaEntity({
        ...submission.submissionMedia,
      });
      this.createdAt = submission.createdAt;
      this.updatedAt = submission.updatedAt;
    }
  }
}
