import time;
devicex = "pc";
interval = 1000000000;
code = [""];
ix = 0;
rx = 0;
tx = 0;
conx = 1;
dx = 1;
def run(line):
    global ix;
    global code;
    global rx;
    line = line.split(" ")
    if (line[0].startswith("\n")):
        line[0] = line[0].replace("\n", "")
    if (line[0] == "set"):
        f = line[1]
        line.pop(0)
        line.pop(0)
        line = " ".join(line)
        exec("global " + f,globals());
        exec(f + " = " + line + ";", globals())  
    if (line[0] == "print"):
        line.pop(0);
        line = " ".join(line);
        print(eval(line))
    if (line[0] == "input"):
        v = line[1];
        line.pop(0);
        line.pop(0);
        line = " ".join(line);
        exec(v + " = input(" + line + ");",globals());
    if (line[0] == "convint"):
        exec(line[1] + " = " + "int(" + line[1] + ");",globals())
    if (line[0] == "constr"):
        exec(line[1] + " = " + "str(" + line[1] + ");",globals())
    if (line[0] == "goto"):
        l = line[1];
        j = 0;
        while (j < len(code)):
            if (code[j].replace("\n", "").startswith("label " + l)):
                ix = j;
                return ix;
            j += 1; 
    if (line[0] == "if"):
        if (eval(line[1])):
            line.pop(0);
            line.pop(0);
            line = " ".join(line);
            code[ix] = line;
            ix = ix - 1;
    if (line[0] == "fun"):
        rx = ix;
        g = 0;
        while (code[g].replace("\n", "") != "function " + line[1]):
            g += 1;
        ix = g;
    if (line[0] == "return"):
        ix = rx;
    if (line[0] == "External.Execute"):
        line.pop(0);
        exec(" ".join(line).replace(":::", ";"),globals())
    if (line[0] == "while") :
        if (eval(line[1])) :
            jhasd = 0;
        else:
            while (code[ix].replace("\n", "").startswith("end") == False):
                ix += 1;
    if (line[0] == "end") :
        loc = ix;
        j = ix;
        while (code[j].replace("\n", "").startswith("while") == False) :
            j -= 1;
        g = code[j].replace("\n", "");
        g = g.split(" ");
        if (eval(g[1])) :
            ix = j;
        else:
            ix = loc;  
    if(line[0] == "writef"):
      f = line[1];
      line.pop(0);
      line.pop(0);
      line = " ".join(line)
      s = open(eval(f),"w");
      s.write(eval(line));
      s.close;
    if(line[0] == "readf"):
      s = open(eval(line[2]),"r");
      f = s.read();
      s.close;
      exec(line[1] + " = '" + f + "'",globals())  
    return;
f = open("./include.ch","r")
contents = f.read();
f.close;
contents = contents.split("\n")
for x in contents:
    f = open(x,"r")
    co = f.read().split(";");
    f.close;
    code = code + co;
f = open("main.ch","r");
co = f.read().split(";");
f.close;
code = code + co;
while ix < len(code):
    run(code[ix])
    ix = ix + 1;