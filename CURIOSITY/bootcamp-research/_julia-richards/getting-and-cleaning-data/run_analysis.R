##This looks at data taken using the Samsung II to track activity in a test group. 
##Load the libraries that will be used for the project
library(data.table)
library(dplyr)

##download zip file containing data and assign to a variable
zipUrl <- "https://d396qusza40orc.cloudfront.net/getdata%2Fprojectfiles%2FUCI%20HAR%20Dataset.zip"
zipFile <- "UCI HAR Dataset.zip"

if (!file.exists(zipFile)) {
  download.file(zipUrl, zipFile, mode = "wb")
}

# unzip zip file containing data and check if data directory already exists or not
dataPath <- "UCI HAR Dataset"
if (!file.exists(dataPath)) {
  unzip(zipFile)
}

##Read the data to familiarize with the contents, note that train and test have seperate files
featureNames <- read.table("UCI HAR Dataset/features.txt")
activityLabels <- read.table("UCI HAR Dataset/activity_labels.txt", header = FALSE)
##Train
subjectTrain <- read.table("UCI HAR Dataset/train/subject_train.txt", header = FALSE)
activityTrain <- read.table("UCI HAR Dataset/train/y_train.txt", header = FALSE)
featuresTrain <- read.table("UCI HAR Dataset/train/X_train.txt", header = FALSE)
##Test
subjectTest <- read.table("UCI HAR Dataset/test/subject_test.txt", header = FALSE)
activityTest <- read.table("UCI HAR Dataset/test/y_test.txt", header = FALSE)
featuresTest <- read.table("UCI HAR Dataset/test/X_test.txt", header = FALSE)

##Bind the rows of corresponding Train and Test data

subject <- rbind(subjectTrain, subjectTest)
activity <- rbind(activityTrain, activityTest)
features <- rbind(featuresTrain, featuresTest)

##Bind the columns to have the data all in one data set

colnames(features) <- t(featureNames[2])
colnames(activity) <- "Activity"
colnames(subject) <- "Subject"
allData <- cbind(features,activity,subject)

##Filter mean and std from the columns
columnsWithMeanSTD <- grep(".*Mean.*|.*Std.*", names(allData), ignore.case=TRUE)

##Add columns activity and subject
requiredColumns <- c(columnsWithMeanSTD, 562, 563)
dim(allData)

##Create a new variable with the extracted data containing mean and std
##Look at the dimension
extractedData <- allData[,requiredColumns]
dim(extractedData)

##Change activity to a character from numeric type

extractedData$Activity <- as.character(extractedData$Activity)
for (i in 1:6){
extractedData$Activity[extractedData$Activity == i] <- as.character(activityLabels[i,2])
}

##Make a factor
extractedData$Activity <- as.factor(extractedData$Activity)

##List the names of the current variables in the dataset

names(extractedData)

##Replace the appreviations to more descriptive data names

names(extractedData)<-gsub("Acc", "Accelerometer", names(extractedData))
names(extractedData)<-gsub("Gyro", "Gyroscope", names(extractedData))
names(extractedData)<-gsub("BodyBody", "Body", names(extractedData))
names(extractedData)<-gsub("Mag", "Magnitude", names(extractedData))
names(extractedData)<-gsub("^t", "Time", names(extractedData))
names(extractedData)<-gsub("^f", "Frequency", names(extractedData))
names(extractedData)<-gsub("tBody", "TimeBody", names(extractedData))
names(extractedData)<-gsub("-mean()", "Mean", names(extractedData), ignore.case = TRUE)
names(extractedData)<-gsub("-std()", "STD", names(extractedData), ignore.case = TRUE)
names(extractedData)<-gsub("-freq()", "Frequency", names(extractedData), ignore.case = TRUE)
names(extractedData)<-gsub("angle", "Angle", names(extractedData))
names(extractedData)<-gsub("gravity", "Gravity", names(extractedData))

##Print the new names
names(extractedData)

##Create a second  independent tidy data set with the average of each variable for each activity and each subject
extractedData$Subject <- as.factor(extractedData$Subject)
extractedData <- data.table(extractedData)

tidyData <- aggregate(. ~Subject + Activity, extractedData, mean)
tidyData <- tidyData[order(tidyData$Subject,tidyData$Activity),]
write.table(tidyData, file = "tidy.txt", row.names = FALSE)