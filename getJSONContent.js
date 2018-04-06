/* 思路分解： （代码执行成功后分析）
*  - 目的：读到一批json文件的内容，集合到一个json文件里;
*  - 步骤分解：
*     1. 被执行的：一个文件夹中的多个文件，过滤出json，排除其他格式;
*     2. 执行结果：一个json文件
*     3. json文件特征：后缀".json"，格式为json，这次具体是数组格式；
*/    


/* 关于json格式的看法：
*
*  一方面，从结果来看，两个json文件，都是以数组格式写入。
*  另一方面，JSON = JavaScript Object Notation，中心词是object。
*  
*  由此，
*  jsonfile将数组写入json文件，代表json格式是以广义的对象为基础，
*  包括一般对象({}格式)和特殊对象 —— 数组([]格式) 。 
*/  


var fs = require('fs');

var jsonfile = require('jsonfile');

var pathString = '../Github/words-from-the-heart/';

var writePathString = './all_words.json';

var errorPathString = './error_data.json';


fs.readdir(pathString, function(err, files) {
  if (err) {
    console.log('读取文件失败');
    return;
  }

  
  var jsonFiles = [];
  for (var i = 0; i < files.length; i++) {
    if (files[i].includes('.json')) {
      jsonFiles.push(files[i]);
    }
  }

  
  var jsonList = [];
  var errorFiles = [];
  for (var i = 0; i < jsonFiles.length; i++) {
    try {
       
      var content = jsonfile.readFileSync(pathString + jsonFiles[i]);
      // 之前定义地址时末尾少了“/”，导致读不出。
      // 注意文件路径的变量表示方式。提取共同点+遍历特征。
      
      jsonList.push(content); 
      // push的content是属性值; files[i]指属性值。

    } catch (err) {
 
      errorFiles.push(jsonFiles[i]);
    }
  }

 
  jsonfile.writeFileSync(writePathString, jsonList);
  
  jsonfile.writeFileSync(errorPathString, errorFiles);


});

