/**
 * Created by nirav on 09-03-2017.
 */
var isRealString = (str) => {
    return typeof str === 'string' && str.trim().length>0;
};

module.exports = {isRealString};