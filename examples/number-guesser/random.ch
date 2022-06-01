goto start;

function random;

if devicex=="web" External.Execute result = Math.floor(Math.random() * max);
if devicex!="web" result = 0;


return;