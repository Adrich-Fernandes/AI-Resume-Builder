CREATE DATABASE IF NOT EXISTS resume_builder;
USE resume_builder;

CREATE TABLE IF NOT EXISTS users (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  name        VARCHAR(100) NOT NULL,
  email       VARCHAR(150) NOT NULL UNIQUE,
  password    VARCHAR(255) NOT NULL,
  created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS resumes (
  id            INT AUTO_INCREMENT PRIMARY KEY,
  user_id       INT NOT NULL,
  filename      VARCHAR(255) NOT NULL,
  raw_text      LONGTEXT NOT NULL,
  uploaded_at   TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS analyses (
  id                INT AUTO_INCREMENT PRIMARY KEY,
  resume_id         INT NOT NULL,
  user_id           INT NOT NULL,
  job_description   TEXT NOT NULL,
  match_score       INT DEFAULT 0,
  summary           TEXT,
  suggestions_add   JSON,
  suggestions_remove JSON,
  suggestions_keep  JSON,
  created_at        TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (resume_id) REFERENCES resumes(id) ON DELETE CASCADE,
  FOREIGN KEY (user_id)   REFERENCES users(id)   ON DELETE CASCADE
);