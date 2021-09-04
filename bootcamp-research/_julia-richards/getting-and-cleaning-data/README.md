# Getting and Cleaning Data - Coursera/JHU Project
## This repo was built for the course project of the "Getting and Cleaning Data" course.

Project Summary
The goal of this project is to create a tidy data data set with the help of R to analyze experimental results which were captured in the Human Activity Recognition Using Smartphones](http://archive.ics.uci.edu/ml/datasets/Human+Activity+Recognition+Using+Smartphones) study.
The run_analysis.R script is used on the following dataset(https://d396qusza40orc.cloudfront.net/getdata%2Fprojectfiles%2FUCI%20HAR%20Dataset.zip) 



Repo Components
This repository contians several files to complete the required criteria
CodeBook.md - This outlines the data and the varialbes, as well as specific transformations
README.md - This provides information on the contents of the repo
run_analysis.R - This is the script run to complete the analysis of the data
tidy.txt - This is the final and clean data output from the script

 Steps completed in run_analysis.R:

1. Merges the training and the test sets to create one data set.
2. Extracts only the measurements on the mean and standard deviation for each measurement.
3. Uses descriptive activity names to name the activities in the data set
4. Appropriately labels the data set with descriptive variable names.
5. From the data set in step 4, creates a second, independent tidy data set with the average of each    variable for each activity and each subject.
