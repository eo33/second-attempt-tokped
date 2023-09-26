# Tokopedia contact app

Second attempt at Tokopedia Contact App.

## Main functionalities to implement

### 1. Contact list (DONE):
As a user, I can see my favorite contact on top of the contact list, followed by 10 regular contacts on the initial page load.

#### Acceptance criteria
- For each contact, show info at least the name and phone number.
- The Contact List page should have pagination functionality.
- The user should be able to add a regular contact to the favorite list, and the favorite contact will be removed from the regular contact list
- The user should be able to add a new contact to the list
- The user should be able to delete a contact from the list
- The user should be able to search for contact

### 2. Form contact (DONE):
As a user, I can submit new contact

#### Acceptance criteria
- Contact Name must be unique and doesn’t have a special Character
- The number can be multiple

## Optional functionalities / tasks to implement

### 1. Edit contact (DONE): 
The user should be able to edit the contact 

### 2. Form edit contact (DONE):
As a user, I can submit edited existing contact

#### Acceptance criteria
- The user should be able to see current contact information
- Contact Name must be unique and doesn’t have a special Character

### 3. Refractor code (DONE):
Modularize different parts of the component to make it more readable

### 4. Custom: Selected contact (IN PROGRESS):
As a user, I want to be able to see the contact details of the first contact appearing on the screen:
- The selected contact should be highlighted to show it is currently being selected. (DONE)
- After creating a new user using the Add button, user should see the details of the newly created contact. (DONE)
- After clicking on the Fav button or Back button, user should see the details of the first appearing contact.
- Update the page of the selected contact

### Use the following tech (IN PROGRESS):
- CSS-in-JS using Emotion
- Unit testing with Jest and React [testing library](https://testing-library.com/)
- Web capabilities [link](https://developer.chrome.com/blog/fugu-status/)

## Bugs 
1. When you delete a contact in mobile mode, the contact details are shown, when it should have been the list of cotnacts.