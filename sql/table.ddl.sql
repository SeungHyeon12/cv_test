    -- 학습자 정보
CREATE TABLE student (
    id CHAR(26) PRIMARY KEY, -- ULID
    name VARCHAR(100) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 제출물
CREATE TABLE submission (
    id CHAR(26) PRIMARY KEY, -- ULID
    student_id CHAR(26) NOT NULL REFERENCES students(id) ON DELETE CASCADE,
    component_type VARCHAR(100) NOT NULL, -- 예: Essay Writing
    submit_text TEXT NOT NULL, -- 제출 텍스트
    status VARCHAR(50), -- 처리 상태
    score INTEGER, -- 평가 점수
    result JSONB, -- 평가 결과
    created_at TIMESTAMP DEFAULT NOW()
    updated_at TIMESTAMP
);

-- 제출 미디어
CREATE TABLE submission_media (
    id CHAR(26) PRIMARY KEY, -- ULID
    submission_id CHAR(26) NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    video_url TEXT NOT NULL, -- binary -> URL로 저장
    audio_url TEXT,
    metadata JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 평가/재평가 로그
CREATE TABLE submission_log (
    id CHAR(26) PRIMARY KEY, -- ULID
    submission_id CHAR(26) NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    log_type VARCHAR(50),
    latency INTEGER,
    trace_id UUID,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 재평가 요청 + 결과
CREATE TABLE revision (
    id CHAR(26) PRIMARY KEY, -- ULID
    submission_id CHAR(26) NOT NULL REFERENCES submissions(id) ON DELETE CASCADE,
    request_reason TEXT,
    revised_result JSONB,
    requested_at TIMESTAMP DEFAULT NOW(),
    processed_at TIMESTAMP
);

-- 기간별 통계 테이블s
CREATE TABLE stat (
    id CHAR(26) PRIMARY KEY, -- ULID
    period_type VARCHAR(10) CHECK (period_type IN ('daily', 'weekly', 'monthly')),
    period_start DATE,
    period_end DATE,
    stat_data JSONB,
    created_at TIMESTAMP DEFAULT NOW()
);