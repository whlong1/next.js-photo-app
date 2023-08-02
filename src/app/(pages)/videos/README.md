# Videos

Description

## Required Features

• Filter results by attributes

• Sort results

• Add videos to playlist

## Issues

• Basic querying by genres works, but when a new video is added, the previous cached results are still present until refresh. 
  Currently the VideoList and SearchFilterBar are server components, with filters applied using links. 
  Making these client side might open up more options and resolve any caching issues.