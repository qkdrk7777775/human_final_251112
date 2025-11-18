CREATE TABLE `user_base_info` (
	`id2`	INT	NULL	COMMENT 'auto increment 적용',
	`gender`	str	NULL,
	`age`	int	NULL,
	`height`	float	NULL,
	`weight`	float	NULL
);

CREATE TABLE `admin_user` (
	`id`	INT	NULL	COMMENT 'auto increment 적용'
);

CREATE TABLE `user` (
	`id`	INT	NULL	COMMENT 'auto increment 적용',
	`email`	str	NULL,
	`password`	str	NULL	COMMENT '암호화된 문자열',
	`type`	str	NULL,
	`created_at`	date	NULL,
	`points`	int	NULL,
	`is_public`	int	NULL
);

CREATE TABLE `unsubscribe_user` (
	`id`	INT	NULL	COMMENT 'auto increment 적용'
);

CREATE TABLE `subscribe_user` (
	`id`	INT	NULL	COMMENT 'auto increment 적용',
	`expires_at`	date	NULL,
	`subscribed_at`	date	NULL
);

CREATE TABLE `post` (
	`id`	INT	NOT NULL,
	`user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`title`	str	NULL,
	`contents`	str	NOT NULL,
	`create_at`	date	NULL	COMMENT 'auto increment',
	`updated_at`	date	NULL,
	`is_public`	int	NULL	DEFAULT 1	COMMENT '-1은 관리자가 비공개한 경우'
);

CREATE TABLE `comment` (
	`id`	INT	NOT NULL,
	`id2`	INT	NOT NULL,
	`comment_user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`comment`	str	NULL
);

CREATE TABLE `ROM_history` (
	`id`	INT	NOT NULL,
	`user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`measured_at`	date	NULL
);

CREATE TABLE `base_exercises` (
	`id`	INT	NOT NULL,
	`name`	str	NULL,
	`type`	str	NULL
);

CREATE TABLE `reported_posts` (
	`id`	INT	NOT NULL,
	`user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`comments`	str	NULL,
	`reported_at`	date	NULL
);

CREATE TABLE `post_reactions` (
	`id`	INT	NOT NULL,
	`user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`reaction_type`	str	NULL
);

CREATE TABLE `Untitled` (
	`exercise_id`	INT	NOT NULL,
	`curriculum_id`	int	NULL,
	`sets`	int	NULL,
	`times`	int	NULL
);

CREATE TABLE `base_meals` (
	`id`	int	NOT NULL,
	`name`	calories	NULL
);

CREATE TABLE `Untitled3` (
	`id`	INT	NULL	COMMENT 'auto increment 적용',
	`Field`	date	NULL
);

CREATE TABLE `user_detail_info` (
	`id`	INT	NULL	COMMENT 'auto increment 적용',
	`goal`	str	NULL,
	`job`	str	NULL,
	`activity_level`	str	NULL,
	`activity_duration`	datetime	NULL,
	`sleep_duration`	datetime	NULL,
	`chronotype`	str	NULL,
	`disease`	str	NULL,
	`equipment`	str	NULL,
	`food_restrictions`	str	NULL	COMMENT '비건',
	`water_intake`	int	NULL	COMMENT 'ml단위'
);

CREATE TABLE `qna` (
	`id`	int	NOT NULL,
	`user_id`	INT	NULL	COMMENT 'auto increment 적용',
	`title`	str	NULL,
	`contants`	str	NULL
);

ALTER TABLE `user_base_info` ADD CONSTRAINT `PK_USER_BASE_INFO` PRIMARY KEY (
	`id2`
);

ALTER TABLE `admin_user` ADD CONSTRAINT `PK_ADMIN_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `user` ADD CONSTRAINT `PK_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `unsubscribe_user` ADD CONSTRAINT `PK_UNSUBSCRIBE_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `subscribe_user` ADD CONSTRAINT `PK_SUBSCRIBE_USER` PRIMARY KEY (
	`id`
);

ALTER TABLE `post` ADD CONSTRAINT `PK_POST` PRIMARY KEY (
	`id`,
	`user_id`
);

ALTER TABLE `comment` ADD CONSTRAINT `PK_COMMENT` PRIMARY KEY (
	`id`,
	`id2`,
	`comment_user_id`
);

ALTER TABLE `ROM_history` ADD CONSTRAINT `PK_ROM_HISTORY` PRIMARY KEY (
	`id`,
	`user_id`
);

ALTER TABLE `base_exercises` ADD CONSTRAINT `PK_BASE_EXERCISES` PRIMARY KEY (
	`id`
);

ALTER TABLE `reported_posts` ADD CONSTRAINT `PK_REPORTED_POSTS` PRIMARY KEY (
	`id`,
	`user_id`
);

ALTER TABLE `post_reactions` ADD CONSTRAINT `PK_POST_REACTIONS` PRIMARY KEY (
	`id`,
	`user_id`
);

ALTER TABLE `Untitled` ADD CONSTRAINT `PK_UNTITLED` PRIMARY KEY (
	`exercise_id`
);

ALTER TABLE `base_meals` ADD CONSTRAINT `PK_BASE_MEALS` PRIMARY KEY (
	`id`
);

ALTER TABLE `Untitled3` ADD CONSTRAINT `PK_UNTITLED3` PRIMARY KEY (
	`id`
);

ALTER TABLE `user_detail_info` ADD CONSTRAINT `PK_USER_DETAIL_INFO` PRIMARY KEY (
	`id`
);

ALTER TABLE `qna` ADD CONSTRAINT `PK_QNA` PRIMARY KEY (
	`id`,
	`user_id`
);

ALTER TABLE `user_base_info` ADD CONSTRAINT `FK_user_TO_user_base_info_1` FOREIGN KEY (
	`id2`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `admin_user` ADD CONSTRAINT `FK_user_TO_admin_user_1` FOREIGN KEY (
	`id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `unsubscribe_user` ADD CONSTRAINT `FK_user_TO_unsubscribe_user_1` FOREIGN KEY (
	`id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `subscribe_user` ADD CONSTRAINT `FK_user_TO_subscribe_user_1` FOREIGN KEY (
	`id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `post` ADD CONSTRAINT `FK_user_TO_post_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_post_TO_comment_1` FOREIGN KEY (
	`id2`
)
REFERENCES `post` (
	`id`
);

ALTER TABLE `comment` ADD CONSTRAINT `FK_user_TO_comment_1` FOREIGN KEY (
	`comment_user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `ROM_history` ADD CONSTRAINT `FK_user_TO_ROM_history_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `reported_posts` ADD CONSTRAINT `FK_post_TO_reported_posts_1` FOREIGN KEY (
	`id`
)
REFERENCES `post` (
	`id`
);

ALTER TABLE `reported_posts` ADD CONSTRAINT `FK_post_TO_reported_posts_2` FOREIGN KEY (
	`user_id`
)
REFERENCES `post` (
	`user_id`
);

ALTER TABLE `post_reactions` ADD CONSTRAINT `FK_post_TO_post_reactions_1` FOREIGN KEY (
	`id`
)
REFERENCES `post` (
	`id`
);

ALTER TABLE `post_reactions` ADD CONSTRAINT `FK_post_TO_post_reactions_2` FOREIGN KEY (
	`user_id`
)
REFERENCES `post` (
	`user_id`
);

ALTER TABLE `Untitled` ADD CONSTRAINT `FK_base_exercises_TO_Untitled_1` FOREIGN KEY (
	`exercise_id`
)
REFERENCES `base_exercises` (
	`id`
);

ALTER TABLE `Untitled3` ADD CONSTRAINT `FK_user_TO_Untitled3_1` FOREIGN KEY (
	`id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `user_detail_info` ADD CONSTRAINT `FK_user_TO_user_detail_info_1` FOREIGN KEY (
	`id`
)
REFERENCES `user` (
	`id`
);

ALTER TABLE `qna` ADD CONSTRAINT `FK_user_TO_qna_1` FOREIGN KEY (
	`user_id`
)
REFERENCES `user` (
	`id`
);

