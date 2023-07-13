DROP TABLE IF EXISTS card;
DROP TABLE IF EXISTS category;
DROP TABLE IF EXISTS user_account;
DROP TABLE IF EXISTS action;

CREATE TABLE card
(
    id           BIGINT       NOT NULL AUTO_INCREMENT,
    title        VARCHAR(64)  NOT NULL,
    content      VARCHAR(255) NOT NULL,
    created_at   TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    modified_at  TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(0) ON UPDATE CURRENT_TIMESTAMP(0),
    category_id  BIGINT       NOT NULL,
    prev_card_id BIGINT       NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE category
(
    id              BIGINT      NOT NULL AUTO_INCREMENT,
    name            VARCHAR(64) NOT NULL,
    user_account_id BIGINT      NOT NULL,
    PRIMARY KEY (`id`)
);

CREATE TABLE user_account
(
    id         BIGINT       NOT NULL AUTO_INCREMENT,
    login_id   VARCHAR(64)  NOT NULL,
    password   VARCHAR(512) NOT NULL,
    nickname   VARCHAR(64)  NOT NULL,
    image_url  VARCHAR(512) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    PRIMARY KEY (`id`)
);

CREATE TABLE action
(
    id                   BIGINT      NOT NULL AUTO_INCREMENT,
    action_name          VARCHAR(64) NOT NULL,
    card_name            VARCHAR(64) NOT NULL,
    origin_category_name VARCHAR(64) NOT NULL,
    target_category_name VARCHAR(64) NOT NULL,
    created_at           TIMESTAMP   NOT NULL DEFAULT CURRENT_TIMESTAMP(0),
    user_id              BIGINT      NOT NULL,
    PRIMARY KEY (`id`)
);
