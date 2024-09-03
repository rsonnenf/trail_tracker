-- Mitchell Smith and Robert Sonnenfelt
-- 2/15/2024
-- Database Queries for Trail Report Website

/*Citation SQL 
Date 2/15/2024
Adapted syntax from Oregon State CS340 Explorations
Source URL: https://canvas.oregonstate.edu/courses/1946034*/


-- : character is being used to 
-- signify the variables that will have data from the backend programming language

-- get all users' IDs and names to populate a user dropdown
SELECT userID, userName FROM Users


-- get all reports' IDs, activities, distances, titles, and dates and join with Users.Username to provide more readable data to populate a reports dropdown
SELECT Reports.reportID, Reports.title, Reports.activity, Reports.distance, Reports.description, Reports.reportDate, Users.userName 
FROM Reports 
LEFT JOIN Users ON Reports.userID = Users.UserID;


-- Get all from Comments and left join with users
SELECT Comments.commentID, Comments.commentText, Comments.commentDate, Comments.reportID, Comments.userID 
FROM Comments 
LEFT JOIN Users on Comments.userID = Users.UserID;

--get all trail names from trails table to populate a trails dropdown
SELECT trailName FROM Trails

-- get all data from comments
SELECT * FROM comments

-- get all data from trails table
SELECT * FROM Trails

-- get all data from Trails_has_Reports table
SELECT * FROM Trails_has_Reports

-- insert entries into Trails table
INSERT INTO Trails (trailName, region, length, elevationGain, description) 
VALUES ('${data.trailNameInput}', '${data['regionInput']}', '${data['lengthInput']}', '${data['elevationInput']}', '${data['descriptionInput']}');


-- insert entries into Reports table
INSERT INTO Reports (activity, title, distance, description, reportDate, userID) 
VALUES ('${data.activityInput}', '${data.titleInput}', '${data['distanceInput']}',  '${data.descriptionInput}', '${data.reportDateInput}', '${data.userIDInput}');

-- insert entries into Users table
INSERT INTO Users (userName, age) 
VALUES ('${data.userNameInput}', '${data['ageInput']}');

-- insert entries into Comments table
INSERT INTO Comments (commentText, commentDate, reportID, userID) 
VALUES ('${data.commentTextInput}', '${data.commentDateInput}',  '${data.reportIDInput}', '${data.userIDInput}');

-- insert entries into Trails_has_Reports
INSERT INTO Trails_has_Reports (trailID, reportID) 
VALUES ('${data.trailIDInput}', '${data.reportIDInput}');



--Update a trail
--First get current trail data
SELECT trailId, trailName, region, length, elevationGain, description, picture
FROM Trails
WHERE trailID = :trailID_selected_from_trail_page

--Then update using data from input form
UPDATE Trails
SET trailName = :trailNameInput, region = :regionInput, length = :lengthInput, elevationGain = :elevationGainInput,
description = :descriptionInput, picture = : pictureInput
WHERE trailId = :trailID_from_trail_update_form

-- Update a report (question marks will have values passed in on server side)
UPDATE Reports SET activity = ?, title = ?, distance = ?, description = ?, reportDate=?, userID = ? WHERE reportID = ?;



-- Delete a trail
DELETE FROM Trails WHERE trailID = ${data.trailID};

--Delete a report
DELETE FROM Reports WHERE reportID = ${data.reportID};