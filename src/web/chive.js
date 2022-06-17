//pre definitions
var devicex = "web";
var rx;
var tx;
var conx = 1;
var dx = 1;
var interval = 100000000000000000;
var key;
var local_name = [];

async function run(line, code) {
    line = line.split(" ").map(l => l.trim())
    if (line[0].startsWith("\n")) {
        line[0] = line[0].replaceAll("\n", "")
    }
    if (line[0] == "fun") {
        rx = ix;
        var g = 0;
        while (code[g].replaceAll("\n", "") != "function " + line[1]) {
            g += 1;
        }
        ix = g;
    }
    if (line[0] == "goto") {
        var l = line[1];
        var j = 0;
        while (j < code.length) {
            if (code[j].replaceAll("\n", "").startsWith("label " + l)) {
                ix = j;
            }
            j += 1;
        }
    }
    if (line[0] == "return") {
        var x = 0;
        while(x != local_name.length){
          eval("delete window.this_" + local_name[x])
          x += 1;
        }
        ix = rx;
    }
    if (line[0] == "jump") {
        ix = ix + parseInt(line[1])
    }
    if (line[0] == "convint") {
        eval(line[1] + " = " + "parseInt(" + line[1] + ");")
    }
    if (line[1] == "constr") {
        eval(line[1] + " = " + "String(" + line[1] + ");")
    }
    if (line[0] == "print") {
        line.shift();
        line = line.join(" ");
        alert(eval(line))
    }
    if (line[0] == "input") {
        var v = line[1];
        line.shift();
        line.shift();
        line = line.join(" ");
        eval(v + " = prompt(" + line + ");");
    }
    if (line[0] == "if") {
        if (eval(line[1])) {
            line.shift();
            line.shift();
            line = line.join(" ");
            code[ix] = line;
            ix = ix - 1;
        }
    }
    if (line[0] == "set") {
        var f = line[1]
        line.shift();
        line.shift();
        line = line.join(" ");
        eval("window."+f+" = "+line)
    }
    if(line[0] == "this_set"){
      var f = line[1]
        line.shift();
        line.shift();
        line = line.join(" ");
        eval("window.this_" + f + " = " + line + ";")
        local_name.push(f);
    }
    if (line[0] == "External.Execute") {
        line.shift();
        eval(line.join(" ").replaceAll(":::", ";"))
    }
    if (line[0] == "while") {
        if (!eval(line[1])) {
            while (!code[ix].replaceAll("\n", "").startsWith("end")) {
                ix += 1;
            }
        }
    }
    if (line[0] == "end") {
        var loc = ix;
        var j = ix;
        while (!code[j].replaceAll("\n", "").startsWith("while")) {
            j -= 1;
        }
        var g = code[j].replaceAll("\n", "");
        g = g.split(" ");
        if (eval(g[1])) {
            ix = j;
        } else {
            ix = loc;
        }   
    }
    if(line[0] == "writef"){
      var f = line[1];
      line.shift();
      line.shift();
      line = line.join(" ")
      localStorage.setItem(eval(f), line)
    }
    if(line[0] == "readf"){
      eval("window."+line[1] + " = " + localStorage.getItem(eval(line[2])))
    }
    if(line[0] == "External.Canvas.Init"){
      screen = document.getElementById("ccanvas");
      ctx = screen.getContext("2d");
    }
    if(line[0] == "External.Canvas.Line"){
      ctx.strokeStyle = eval(line[5]);
      ctx.lineWidth = eval(line[6]);
      ctx.moveTo(eval(line[1]), eval(line[2]));
      ctx.lineTo(eval(line[3]), eval(line[4]));
      ctx.stroke();
    }
    if(line[0] == "External.Canvas.Clear"){
      ctx.clearRect(0, 0, screen.width, screen.height);
    }
    if(line[0] == "External.Canvas.Rect"){
      ctx.beginPath();
      ctx.strokeStyle = eval(line[5])
      ctx.fillStyle = eval(line[6])
      ctx.lineWidth = eval(line[7])
     ctx.rect(eval(line[1]), eval(line[2]), eval(line[3]), eval(line[4]));
      ctx.fillRect(eval(line[1]), eval(line[2]), eval(line[3]), eval(line[4]));
    ctx.stroke();
    } 
    if(line[0] == "External.System.Image"){
      eval(line[1] + " = new Image();")
      eval(line[1] + ".src = " + line[2]);
    }
    if(line[0] == "External.Canvas.Image"){
      ctx.drawImage(eval(line[1]), eval(line[2]), eval(line[3]), eval(line[4]), eval(line[5]));
        
    }
}
var ix = 0;

// trim function
function trimCode(code){
    return code.split(/;|:/g).map(l => {
        var newLine = "";
        var actualContent = false;
        for(var i = 0; i < l.length; i++){
            if(actualContent){
                newLine += l[i];
            }else if(l[i] != ' ' && l[i] != '\t' && l[i] != '' && l[i] != '\n' && l[i] != '\r'){
                actualContent = true;
                newLine += l[i];
            }else if(l[i] == '\n'){
                newLine += '\n';
            }
        }
        return newLine;
    }).join(';');
}

//interpret code
function compile(code) {

    // remove all white spaces at the start of a sentence

    var trimmed = trimCode(code);

    //run code
    code = trimmed.split(";");
    ix = 0;
    while (ix < code.length) {
        var line = code[ix];

        run(line, code)

        if (conx == 1) {

            ix++;
        }
    }
  setInterval(function () {goto("update")}, interval);
}




//load scripts from html tags


function tagload(t) {
    var fx = document.getElementsByTagName("cscript")[0];
    fx = fx.outerHTML;
    fx = fx.replace(`<cscript src="`, "");
    fx = fx.replace(`"></cscript>`, "")

    var url = fx;

    var jsonFile = new XMLHttpRequest();
    jsonFile.open("GET", url, true);
    jsonFile.send();
    jsonFile.onreadystatechange = function() {
        if (jsonFile.readyState == 4 && jsonFile.status ==
            200) {
            tx = t + ";\n" + jsonFile.responseText;
            interpret(tx);
        }
    }

}
var screen;
var ctx;
async function loadfunc() {
    
    var fx = document.getElementsByTagName("include")[0] || "noInclude";
    if(fx != "noInclude"){
        fx = fx.outerHTML;
        fx = fx.replace(`<include src="`, "");
        fx = fx.replace(`"></include>`, "")
        var lx = await fetch(fx).then(x => x.text());
        lx = lx.split(";")
        var i = 0;
        while (i < lx.length - 1) {
            tx = await fetch(lx[i]).then(x => x.text()) + tx;

            i++;
        }


        tagload(tx);
    }
}
window.onload = loadfunc();
/*window.onload = function(){
  setTimeout(function(){interpret(tx)}, 1000);
}*/

function goto(code) {
    interpret('goto ' + code + ";" + '\n;' + tx)
}
document.onkeydown = function(evt) {
    evt = evt || window.event;
    var charCode = evt.keyCode || evt.which;
    var charStr = String.fromCharCode(charCode);
    key = charStr
};
document.onkeyup = function(evt) {
    key = "";
};