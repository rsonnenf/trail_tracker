-- Mitchell Smith and Robert Sonnenfelt
-- 2/7/2024
-- Database for Trail Report Website

/*Citation SQL 
Date 2/7/2024
Adapted syntax from Oregon State CS340 Explorations
Source URL: https://canvas.oregonstate.edu/courses/1946034*/

SET FOREIGN_KEY_CHECKS=0;

-- Creation of Trails table
CREATE OR REPLACE TABLE Trails(
    trailID int not NULL AUTO_INCREMENT,
    trailName varchar(50),
    region varchar(50) not NULL,
    length int not NULL,
    elevationGain int not NULL,
    description varchar(2000),
    picture BLOB,
    PRIMARY KEY (trailID)
);

-- Users table definition
CREATE OR REPLACE TABLE Users(
    userID int not NULL AUTO_INCREMENT,
    userName varchar(250),
    age int,
    PRIMARY KEY (userID)
);

-- Reports table definition
CREATE OR REPLACE TABLE Reports(
    reportID int not NULL AUTO_INCREMENT,
    title varchar(50) not NULL,
    activity varchar(250) not NULL,
    distance int NULL,
    description varchar(2500) not NULL,
    reportDate datetime not NULL,
    userID int NULL,
    PRIMARY KEY (reportID),
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE SET NULL
);

-- Intersection table for trails and reports M:N relationship
CREATE OR REPLACE TABLE Trails_has_Reports(
    trailReportID int not NULL AUTO_INCREMENT,
    trailID int not NULL,
    reportID int not NULL,
    PRIMARY KEY (trailReportID),
    FOREIGN KEY (trailID) REFERENCES Trails(trailID) ON DELETE CASCADE,
    FOREIGN KEY (reportID) REFERENCES Reports(reportID) ON DELETE CASCADE
);


-- Comments table definiton
CREATE OR REPLACE TABLE Comments(
    commentID int not NULL AUTO_INCREMENT,
    commentText varchar(1000),
    commentDate datetime,
    reportID int not NULL,
    userID int not NULL,
    PRIMARY KEY (commentID),
    FOREIGN KEY (reportID) REFERENCES Reports(reportID) ON DELETE CASCADE,
    FOREIGN KEY (userID) REFERENCES Users(userID) ON DELETE CASCADE
);

-- Inserts to populate tables with sample data
INSERT INTO Trails (trailName, region, length, elevationGain, description, picture)
VALUES ('Leif Ericson', 'Portland', 10, 200, 'Scenic trail in the hills', NULL);

INSERT INTO Trails (trailName, region, length, elevationGain, description, picture)
VALUES ('Wildwood', 'Portland', 20, 1600, 'Challenging trail with great views', NULL);

INSERT INTO Trails (trailName, region, length, elevationGain, description, picture)
VALUES ('Mirror Lake', 'Mt. Hood', 4, 400, 'A trail near the lake', NULL);

INSERT INTO Users (userName, age)
VALUES ('Sam Case', 32);

INSERT INTO Users (userName, age)
VALUES ('Josh Jones', 27);

INSERT INTO Users (userName, age)
VALUES ('Sarah Smith', 45);

INSERT INTO Reports (activity, title, distance, description, reportDate, userID)
VALUES ('Hiking','Forest Park Walk', 5, 'Nice Weather', '2024-02-06', 1);

INSERT INTO Reports (activity, title, distance, description, reportDate, userID)
VALUES ('Trail Running','Forest Park Run', 8, 'Had a nice run', '2024-02-07', 2);

INSERT INTO Reports (activity, title, distance, description, reportDate, userID)
VALUES ('Bird Watching', 'Trillium Birding!', 5, 'Saw lots of birds', '2024-02-08', 1);

INSERT INTO Comments (commentText, userID, commentDate, reportID)
VALUES ('Thanks for the report.', 2, '2024-02-06', 1);

INSERT INTO Comments (commentText, userID, commentDate, reportID)
VALUES ('I really like this trail.', 3, '2024-02-07', 2);

INSERT INTO Comments (commentText, userID, commentDate, reportID)
VALUES ('Very helpful.', 1, '2024-02-08', 1);

INSERT INTO Trails_has_Reports (trailID, reportID)
VALUES (1, 1);

INSERT INTO Trails_has_Reports (trailID, reportID)
VALUES (1, 2);

INSERT INTO Trails_has_Reports (trailID, reportID)
VALUES (2, 2);

INSERT INTO Trails_has_Reports (trailID, reportID)
VALUES (2, 3);