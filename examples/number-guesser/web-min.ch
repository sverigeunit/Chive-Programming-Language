if devicex!="web" print "The web library is only for web browsers";
if devicex!="web" goto end;
goto start;
function web.getbyid;
if devicex!="web" goto end;
External.Execute element = document.getElementById(id);
return;