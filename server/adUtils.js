// adUtils.js
import ActiveDirectory from 'activedirectory2';
import { ldapConfig } from './adConfig.js';

//Set up Active Directory instance
const ad = new ActiveDirectory({
  url: ldapConfig.url,
  baseDN: ldapConfig.baseDN,
  username: ldapConfig.username,
  password: ldapConfig.password,
});

// Updated checkIfUserExists to return a Promise
const checkIfUserExists = (username) => {
  return new Promise((resolve, reject) => {
    ad.findUser(username, (err, user) => {
      if (err) {
        reject(`Error: ${err}`);  // Reject if there's an error
      } else if (user) {
        resolve(true);  // Resolve with `true` if user is found
      } else {
        resolve(false);  // Resolve with `false` if user is not found
      }
    });
  });
};

// Function to create a user in Active Directory
// const createUser = (username, firstName, lastName, email, password) => {
//   const userAttributes = {
//     cn: `${firstName} ${lastName}`,        // Common Name
//     sn: lastName,                          // Surname
//     givenName: firstName,                  // Given Name
//     mail: email,                           // Email
//     userPrincipalName: `${username}@yourdomain.com`, // User Principal Name (email format)
//     sAMAccountName: username,              // Login username (sAMAccountName)
//     userPassword: password,                // Password
//     accountExpires: 0,                     // 0 means no expiration
//     enabled: true,                         // Account enabled
//   };

//   return new Promise((resolve, reject) => {
//     ad.addUser('CN=Users,DC=yourdomain,DC=com', username, userAttributes, (err, result) => {
//       if (err) {
//         console.log(`Error creating user: ${err}`);
//         reject(err);  // Reject the promise if there's an error
//       } else {
//         console.log('User created successfully:', result);
//         resolve(result);  // Resolve the promise if the user is created
//       }
//     });
//   });
// };

// Function to create a user in Active Directory
const createUser = (username, password, firstName, lastName) => {
  return new Promise((resolve, reject) => {
    const newUser = {
      sAMAccountName: username,
      userPrincipalName: `${username}@domain.com`, // Change domain name as necessary
      cn: `${firstName} ${lastName}`,
      givenName: firstName,
      sn: lastName,
      displayName: `${firstName} ${lastName}`,
      mail: `${username}@domain.com`, // Change domain name as necessary
      userPassword: password,
      objectClass: ['top', 'person', 'organizationalPerson', 'user'],
      enabled: true,
      accountExpires: 0,  // 0 means the account doesn't expire
      passwordNeverExpires: true,  // Set the password to never expire
      cannotChangePassword: false,
      homeDirectory: 'C:\\Users\\' + username,
      profilePath: 'C:\\Users\\' + username,
      homeDrive: 'H:',
      description: 'Created by RemoteX'
    };

    ad.add('CN=' + newUser.sAMAccountName + ',CN=Users,' + ldapConfig.baseDN, newUser, (err, result) => {
      if (err) {
        console.error('Error creating user:', err);
        reject(err);
      } else {
        console.log('User created successfully:', result);
        resolve(result);
      }
    });
  });
};

export { checkIfUserExists, createUser };
