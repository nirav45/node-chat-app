/**
 * Created by nirav on 10-03-2017.
 */
function myTrim(x) {
    return x.replace(/^\s+|\s+$/gm,'');
}
var name = "  Nirav    Patel  ";
var name2 = "  Nirav      Patel  ";

var name = name.trim();
var name3 = name2.replace(' ', '').trim();
console.log(myTrim(name));
//console.log(name2.replace(' ',''));
console.log(name3);

var str = '/var/www/site/Brand    new      document.   docx';

console.log( str.replace(' ', '') );
