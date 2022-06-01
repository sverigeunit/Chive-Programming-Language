//pre definitions
var devicex = "web";


var rx;
var tx;
var conx = 1;
var dx = 1;




//compile code
async function run(line, code) {

    line = line.split(" ")
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
        eval("window." + f + " = " + line + ";")
    }

    //External functions

    if (line[0] == "External.Execute") {
        line.shift();
        eval(line.join(" ").replaceAll(":::", ";"))
    }

    if (line[0] == "while") {
        if (eval(line[1])) {

        } else {
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




}
var ix = 0;
//compile code
function compile(code) {

    //run code
    code = code.split(";");
    ix = 0;
    while (ix < code.length) {
        var line = code[ix];

        run(line, code)

        if (conx == 1) {

            ix++;
        }
    }
}




//load scripts from html tags


function tagload(t) {
    //load main chocolate file
    //team copy and pasted half of it. ;) we didnt even work with json
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
            compile(tx);
        }
    }

}
async function loadfunc() {
    var fx = document.getElementsByTagName("include")[0];
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
window.onload = loadfunc();
/*window.onload = function(){
  setTimeout(function(){compile(tx)}, 1000);
}*/

function goto(code) {
    compile('goto ' + code + ";" + '\n;' + tx)
}