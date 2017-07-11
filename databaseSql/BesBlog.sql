set character_set_database=utf8;

-- 博主用户表
create table t_user
(
	uid			char(15) primary key,
	email		varchar(50) unique not null,
	nickname	varchar(30) binary unique not null,
	password 	char(41) not null,
	photo		varchar(40) default 'default.png',
	personinfo	varchar(300),
	bloginfo	varchar(300),
	regtime		datetime default now(),
	active		int default 0 not null
);

-- 订阅表
create table t_subscription
(
	subscriberid	char(15),
	objectid		char(15),
	subtime			datetime not null default now(),
	constraint pk_subscription primary key(subscriberid,objectid),
	constraint fk_subscription_uid1 foreign key(subscriberid) references t_user(uid) ,
	constraint fk_subscription_uid2 foreign key(objectid) references t_user(uid)
);

-- 文章表
create table t_article
(
	aid			char(17) primary key,
	uid			char(15) not null,
	title		varchar(100),
	content		text,
	planTxt		text,
	establishtime	datetime default now(),
	edittime	datetime default now(),
	cread		int not null default 0,
	ccomment	int not null default 0,
	crecomendation	int not null default 0,
	status		char(1) not null,
	checkstatus char(1) not null default "0",
	constraint fk_article_uid foreign key(uid) references t_user(uid)
);

-- 评论表
create table comment
(
	cid			char(17) primary key,
	uid			char(15) not null,
	aid			char(17) not null,
	objectcid	char(17) ,
	content		text,
	time		datetime default now(),
	cfloor		int,
	cunit		int,
	type		char(1) not null,
	status		char(1) not null default '1',
	constraint fk_comment_uid foreign key(uid) references t_user(uid),
	constraint fk_comment_aid foreign key(aid) references t_article(aid)
);

create table activecode
(
	code		char(82) primary key,
	email		varchar(50) not null,
	invalidtime	datetime not null 
);



drop table activecode;
drop table comment;
drop table t_article;
drop table t_subscription;
drop table t_user;


-- 测试数据

-- 添加用户


-- 添加3篇文章
-- 已发布


-- 草稿


-- 添加4条评论
-- 

CREATE TABLE `download` (
  `id` char(15) NOT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE `login` (
  `id` char(15) NOT NULL,
  `ip` varchar(255) DEFAULT NULL,
  `time` datetime DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;






