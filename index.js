let fs = require("fs");
var java = require("java");

java.asyncOptions = {
  asyncSuffix: undefined, // Don't generate node-style methods taking callbacks
  syncSuffix: "", // Sync methods use the base name(!!)
  promiseSuffix: "Promise", // Generate methods returning promises, using the suffix Promise.
  promisify: require("util").promisify // Needs Node.js version 8 or greater, see comment below
};

java.classpath.push("biometric.jar");
java.classpath.push("dpuareu.jar");

var fileData = fs.readFileSync("./finger/1.png");
var fileData2 = fs.readFileSync("./finger/2.png");

let bs64file1 = fileData.toString("base64");
let bs64file2 = fileData2.toString("base64");
// console.log(fileData);

java.callStaticMethod(
  "com.Verification",
  "CompareString",
  bs64file1,
  bs64file2,
  function(err, results) {
    console.log(results);
    if (err) return console.log(err);
  }
);
