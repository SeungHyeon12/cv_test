import {
  Entity,
  Column,
  PrimaryColumn,
  CreateDateColumn,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { SubmissionEntity } from './submission.entity';
import { SubmissionMedia } from 'src/domain/vo/submissionMedia';

@Entity('submission_media')
export class SubmissionMediaEntity {
  @PrimaryColumn({ type: 'char', length: 26 })
  id: string;

  @Column({ name: 'submission_id', type: 'char', length: 26 })
  submissionId: string;

  @OneToOne(
    () => SubmissionEntity,
    (submission) => submission.submissionMedia,
    {
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'submission_id' })
  submission: SubmissionEntity;

  @Column({ name: 'video_url', type: 'text', nullable: true })
  videoUrl?: string;

  @Column({ name: 'audio_url', type: 'text', nullable: true })
  audioUrl?: string;

  @Column({ type: 'jsonb', nullable: true })
  metadata?: Record<string, any>;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  constructor(submissionMedia: SubmissionMedia) {
    if (submissionMedia) {
      this.id = submissionMedia.id;
      this.submissionId = submissionMedia.submissionId;
      this.videoUrl = submissionMedia.videoUrl;
      this.audioUrl = submissionMedia.audioUrl;
      this.metadata = submissionMedia.metadata;
      this.createdAt = submissionMedia.createdAt;
    }
  }
}
