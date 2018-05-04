/**
 * User Model class
 * 
 * A custom User model which is used to facilitate the creation of User objects
 *  which are bound to some of the pages and makes User Setting storage easier.
 * 
 * This class will only ever be instantiated when there is a currently logged in Firebase user,
 * i.e. AfAuthProvider.authenticated returns true, and AfAuthProvider.getEmail() returns that user's email
 * 
 * For this reason, email is required in the class constructor
 */

export class User {
    // User objects will only be created when there is a logged in user
    constructor(
        email: string
    ) {
        this.email = email
    }

    // this will be assigned after object creation, will be retrieved from afAuth service
    email: string;
    // application display name, used instead of email if set
    username: string;
    // determines which view is set as default for the user - defaults to false if unset in storage
    listView: boolean;
    // TODO: unused right now - should perform similar to above but saved as string value, e.g. commonAsc, scientificDesc
    sortType: string;

}