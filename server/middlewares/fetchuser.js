const jwt = require('jsonwebtoken');
const JWT_SECRET = "AamnaAlakaFatimaApekshaDarshana";

const fetchuser = (req, res, next) => {
    const token = req.header('auth-token');

    // Check if token exists
    if (!token) {
        console.error('Token not found in request headers');
        return res.status(401).json({ error: 'Please authenticate using a valid token' });
    }

    try {
        // Verify the token
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded.user; // Attach user details to request object
        // console.log('User details attached:', req.user);
        next(); // Move to the next middleware or route handler
    } catch (error) {
        console.error('Error verifying token:', error.message);
        return res.status(500).send('Internal Server Error');
    }
};

module.exports = fetchuser;
