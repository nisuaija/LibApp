
## Login view
To keep track of a logged in user, I create a random session token when logging in. Saving it in database and in the browsers local memory, then those tokens will be compared to log in user even without the login view if user hasn't signed out from
the last session.

![image](https://github.com/nisuaija/LibApp/assets/57667279/8ce88622-b145-4f91-bf83-2eb04a838d58)

## Create account view
I add a salt (random string) to end of a password and hash the whole string before posting account information to database.

![image](https://github.com/nisuaija/LibApp/assets/57667279/670bd5ed-9769-4db6-b488-d4ab61589bdc)

## Wishlist view
Shows users wishlisted books from database, bookmark color indicates if the book is available in the local library. (Using Finna API to check the availability in Joensuu library)

![image](https://github.com/nisuaija/LibApp/assets/57667279/8f5dcf1d-214c-42c8-b2f8-a4143efb6633)

## Wishlist 2
Clicking a book will bring up more information. (Reviews not implemented fully)

![image](https://github.com/nisuaija/LibApp/assets/57667279/3d882680-06d6-41ec-a459-7906c97a7b37)


## Adding a book to wishlist view
Gets book data from Finna API with search query, gets book cover from Google Books API and dublicates all of this information to POSTGRE database for later use if Add to Wishlist is clicked.

![image](https://github.com/nisuaija/LibApp/assets/57667279/073e8b95-cbe3-4485-b1c4-da0002f14c85)


## Moving book to current reads
![image](https://github.com/nisuaija/LibApp/assets/57667279/708d6aa3-2ebc-428c-b42f-19bbbb7824fe)

## Current reads view
Shows the current progress of a book you are currently reading. Changing any values here (dates, page progress) will automatically update the database.

![image](https://github.com/nisuaija/LibApp/assets/57667279/073808eb-0311-4a75-846e-bc0cdadf7e84)

## Finishing a book
Clicking the checkmark icon will bring up this window.

![image](https://github.com/nisuaija/LibApp/assets/57667279/74616966-5a40-4b33-951d-94737f90db30)

## Adding a review
This window will pop up after finishing the book.

![image](https://github.com/nisuaija/LibApp/assets/57667279/be194d1b-b703-4dc4-9fff-c33b9c3c7454)

## History view
Here you can see books which you have finished. List is sortable by all the fields.

![image](https://github.com/nisuaija/LibApp/assets/57667279/8bf72dcb-62d7-4760-9144-fa7981033376)

## History view 2
Clicking an entry in the list will bring up more information about the entry. If you added a review you can see it on the right.

![image](https://github.com/nisuaija/LibApp/assets/57667279/b85efc1d-3b7a-42a6-b850-f2c970d4f4ff)


## Review
Clicking show more button on the review window will bring up the full review. Here you can also edit the review if needed.

![image](https://github.com/nisuaija/LibApp/assets/57667279/1c2e9d0f-f3f8-4a83-953e-a099b931caad)


## Planned features which are not yet implemented
- Possibility to see all the user reviews for a specific book.
- Reporting naughty reviews
- Admin tools for receiving reports and removing users/reviews.
- Stats view for more information about your reading history.
- User info in the top of the left sidebar.



