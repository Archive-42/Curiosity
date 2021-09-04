##Coursera Programming Assignment 2


## Make a matrix that can be inverted
##set the value of the matrix
##get the value of the matrix
##set the value of the inverse
##get the value of the inverse

makeCacheMatrix <- function(x = matrix()) {
        im <- NULL
        set <- function(y) {
                ## define values that vary from the current set envrionment
                x <<- y
                im <<- NULL
        }
        get <- function() x
        setinverse <- function(inverse) im <<- inverse
        getinverse <- function() im
        list(set = set, get = get,
             setinverse = setinverse,
             getinverse = getinverse)
}


## This function will solve for inverse of the matrix defined in makeCacheMatrix

cacheSolve <- function(x, ...) {
        ##If the inverse has been calculated then return the value and write the message getting cached data
        im <- x$getinverse()
        if(!is.null(im)) {
                message("getting cached data")
                return(im)
        }
        ##If the invserse hasn't been previously calculated, caluculate it now
        data <- x$get()
        im <- solve(data, ...)
        x$setinverse(im)
        im
}
        ## This will return a matrix that is the inverse of 'x'
