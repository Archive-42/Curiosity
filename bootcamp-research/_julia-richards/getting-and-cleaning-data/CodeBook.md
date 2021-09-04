# Code book

This code book outlines the variables, the data, and transformations used in the `run_analysis.R` to produce the data in `tidy.txt`

# Variables

Subject - This identifties the subject with values 1 - 30 as an interger data type

Activity - There are 6 types of actitvies defined as a string data type 
They are:
1. WALKING: subject was walking
2. WALKING_UPSTAIRS: subject was walking upstairs
3. WALKING_DOWNSTAIRS: subject was walking downstairs
4. SITTING: subject was sitting
5. STANDING: subject was standing
6. LAYING: subject was laying

A video of the recorded activity types can be found here: https://www.youtube.com/watch?v=XOEN9W05_4A
More information on the study design can be found here: http://archive.ics.uci.edu/ml/datasets/Human+Activity+Recognition+Using+Smartphones 


# Measurements

These variables are all of the mean values for the corresponding measurement based on the subject and the activity.  These are all of data type numeric. 

- tBodyAccmeanX
- tBodyAccmeanY
- tBodyAccmeanZ
- tBodyAccstdX
- tBodyAccstdY
- tBodyAccstdZ
- tGravityAccmeanX
- tGravityAccmeanY
- tGravityAccmeanZ
- tGravityAccstdX
- tGravityAccstdY
- tGravityAccstdZ
- tBodyAccJerkmeanX
- tBodyAccJerkmeanY
- tBodyAccJerkmeanZ
- tBodyAccJerkstdX
- tBodyAccJerkstdY
- tBodyAccJerkstdZ
- tBodyGyromeanX
- tBodyGyromeanY
- tBodyGyromeanZ
- tBodyGyrostdX
- tBodyGyrostdY
- tBodyGyrostdZ
- tBodyGyroJerkmeanX
- tBodyGyroJerkmeanY
- tBodyGyroJerkmeanZ
- tBodyGyroJerkstdX
- tBodyGyroJerkstdY
- tBodyGyroJerkstdZ
- tBodyAccMagmean
- tBodyAccMagstd
- tGravityAccMagmean
- tGravityAccMagstd
- tBodyAccJerkMagmean
- tBodyAccJerkMagstd
- tBodyGyroMagmean
- tBodyGyroMagstd
- tBodyGyroJerkMagmean
- tBodyGyroJerkMagstd
- fBodyAccmeanX
- fBodyAccmeanY
- fBodyAccmeanZ
- fBodyAccstdX
- fBodyAccstdY
- fBodyAccstdZ
- fBodyAccJerkmeanX
- fBodyAccJerkmeanY
- fBodyAccJerkmeanZ
- fBodyAccJerkstdX
- fBodyAccJerkstdY
- fBodyAccJerkstdZ
- fBodyGyromeanX
- fBodyGyromeanY
- fBodyGyromeanZ
- fBodyGyrostdX
- fBodyGyrostdY
- fBodyGyrostdZ
- fBodyAccMagmean
- fBodyAccMagstd
- fBodyBodyAccJerkMagmean
- fBodyBodyAccJerkMagstd
- fBodyBodyGyroMagmean
- fBodyBodyGyroMagstd
- fBodyBodyGyroJerkMagmean
- fBodyBodyGyroJerkMagstd
