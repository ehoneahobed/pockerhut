const jwt = require('jsonwebtoken');
const User = require('../models/User');

// verify if the user trying to access a given resource has a valid token
const verifyToken = (req, res, next) => {
    const authHeader = req.headers.token;

    if(authHeader) {
        const token = authHeader.split(" ")[1];
        jwt.verify(token, process.env.JWT_SECRET_KEY, (error, user) => {
            if (error) {
                res.status(403).json("Token is not valid");
            }
            else {
                req.user = user;
                next();
            }
        })
    }
    else {
        return res.status(401).json("You are not allowed to take this action!");
    }
}

// verify the user and see if they have the right authority to perform a given action
const verifyTokenAndAuthorization = (req, res, next) => {
    verifyToken(req, res, async () => {
        // Check if the user is the resource owner
        if (req.user.id === req.params.id) {
            next();
            return;
        }

        // If not the resource owner, check for admin or superadmin roles
        if (req.user.isAdmin || req.user.role === 'admin' || req.user.role === 'superadmin') {
            try {
                // Find the user by their ID to check if their access has been revoked
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json('User not found');
                }

                // Check if the user's access is revoked
                if (user.isAccessRevoked) {
                    return res.status(403).json('Your access has been revoked');
                }

                next(); // Proceed if the user is an admin or superadmin and their access is not revoked
            } catch (error) {
                res.status(500).json('Server error');
            }
        } else {
            res.status(403).json("You don't have the requisite permissions!");
        }
    });
};


// verify if the action is being taken by an Admin
const verifyTokenAndAdmin = (req, res, next) => {
    verifyToken(req, res, async () => {
        if (req.user.isAdmin || req.user.role === 'admin' || req.user.role === 'superadmin') {
            try {
                // Find the user by their ID to check if their access has been revoked
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json('User not found');
                }
                
                // Check if the user's access is revoked
                if (user.isAccessRevoked) {
                    return res.status(403).json('Your access has been revoked');
                }

                next(); // Proceed if the user is an admin and their access is not revoked
            } catch (error) {
                res.status(500).json('Server error');
            }
        } else {
            res.status(403).json('You are not allowed to do that');
        }
    });
};

// verify if the action is being taken by a Super Admin
const verifyTokenAndSuperAdmin = (req, res, next) => {
    verifyToken(req, res, async () => {
        if (req.user.role === 'superadmin') {
            try {
                // Find the user by their ID to check if their access has been revoked
                const user = await User.findById(req.user.id);
                if (!user) {
                    return res.status(404).json('User not found');
                }
                
                // Check if the user's access is revoked
                if (user.isAccessRevoked) {
                    return res.status(403).json('Your access has been revoked');
                }

                next(); // Proceed if the user is a superadmin and their access is not revoked
            } catch (error) {
                res.status(500).json('Server error');
            }
        } else {
            res.status(403).json('Only Super Admins are allowed to do that');
        }
    });
};

module.exports = { verifyToken, verifyTokenAndAuthorization, verifyTokenAndAdmin, verifyTokenAndSuperAdmin }