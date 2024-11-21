import AccessControl from 'accesscontrol';
const ac = new AccessControl();

ac.grant('student')
  .readOwn('profile')
  .updateOwn('profile');

ac.grant('admin')
  .extend('student')  // Inherits permissions from 'student'
  .readAny('profile')
  .updateAny('profile')
  .deleteAny('profile')
  .createAny('course')
  .readAny('course')
  .updateAny('course')
  .deleteAny('course')
  .readAny('booking')
  .updateAny('booking')
  .deleteAny('booking');

export default ac;
