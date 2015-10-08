/**
 * Created by ovel on 18.09.2015.
 */

"use strict";

var redis = require('redis'),
    client = redis.createClient();

client.on("error", function (err) {
  console.log("Error: " + err);
});

client.set('myKey', 'Hello Redis', function (err, repl) {
  if (err) {
    console.log('Что то случилось при записи: ' + err);
    client.quit();
  } else {

    client.get('myKey', function (err, repl) {

      client.quit();
      if (err) {
        console.log('Что то случилось при чтении: ' + err);
      } else if (repl) {
        // Ключ найден
        console.log('Ключ: ' + repl);
      } else {
        // Ключ ненайден
        console.log('Ключ ненайден.');
      };
    });
  };
});

//# sourceMappingURL=client-compiled.js.map