

-------------------------------------------------------------------------------
--  attendance info
-------------------------------------------------------------------------------
CREATE TABLE ATTENDANCE_INFO(
        ID BIGINT NOT NULL,
	NAME VARCHAR(200),
	CREATE_TIME DATETIME,
	STATUS VARCHAR(50),
	TYPE VARCHAR(50),
	CATALOG VARCHAR(100),
	USER_ID VARCHAR(50),
	TENANT_ID VARCHAR(64),
        CONSTRAINT PK_ATTENDANCE_INFO PRIMARY KEY(ID)
);

