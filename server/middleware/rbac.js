import ac from '../config/accessControl';

function checkAccess(action, resource) {
  return function(req, res, next) {
    const permission = ac.can(req.user.role)[action](resource);
    if (permission.granted) {
      next();
    } else {
      res.status(403).json({ message: 'Access Denied: You do not have sufficient permissions to perform this action.' });
    }
  };
}

export default checkAccess;
