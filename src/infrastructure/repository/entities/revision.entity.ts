import { Revision } from 'src/domain/revision';
import { SubmissionEntity } from 'src/infrastructure/repository/entities/submission.entity';
import {
  Entity,
  PrimaryColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity('revisions')
export class RevisionEntity {
  @PrimaryColumn({ type: 'char', length: 26 })
  id: string;

  @ManyToOne(() => SubmissionEntity, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'submission_id' })
  submission: SubmissionEntity;

  @Column({ type: 'integer', nullable: true })
  revisedScore: number | null;

  @Column({ type: 'jsonb', nullable: true })
  revisedResult: Record<string, any> | null;

  @CreateDateColumn({ name: 'created_at', type: 'timestamp' })
  createdAt: string;

  constructor(revision: Revision) {
    if (revision) {
      this.id = revision.id;
      this.submission = new SubmissionEntity(revision.submission);
      this.revisedScore = revision.revisedScore;
      this.revisedResult = revision.revisedResult;
      this.createdAt = revision.createdAt;
    }
  }
}
