const auth = async (req,res,next) => {
    console.log('hello');
    next();
}

module.exports = auth;