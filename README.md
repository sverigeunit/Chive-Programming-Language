# Chive Programming Language
<a href="url"><img src="./img/logo.png" height="175" width="175" ></a><br>
The chive programming language is a write once, run anywhere programming language in a bite sized package. It has syntax similar to BASIC which means that anyone can learn chive easily. Not only that but chive is really small. Its web release is only 6kb!!!

Chive is under minimal development during the moment. I made it to learn cross platform programming and it has picked up a small following since. Currently there is one release for the web although the windows and linux releases are coming out soon. 

Chive is built with python, javascript, and c++. The javascript interpreter is finished. The python interpreter is also finished. The c++ interpreter is also in the works and it aims at being a faster then the python executable interpreter.
## Usage
To use chive you need to make a main.ch file and a include.ch file. The main.ch file will include all of your code while the include.ch file will point to library that you will be using. To use chive on the web you will need to create a index.html file that points to your code and chive.js . A tutorial for this is in ./docs

To use chive on your desktop move the interpreter(chive.exe) to your location of your main.ch code and run it. The interpreter uses a terminal unlike the web version which doesn't include one. You can use the packager.exe to make an executable or web build of your chive app. The packager is still in production and is frankly un-needed

F for fortran is making a tutorial series!
<a href="[http://www.youtube.com/watch?feature=player_embedded&v=nTQUwghvy5](https://www.youtube.com/embed/smIqx5xYX3Q)Q" target="_blank">
 <img src="http://img.youtube.com/vi/nTQUwghvy5Q/mqdefault.jpg" alt="Watch the video" width="240" height="180" border="10" />
</a>
## Syntax
Like I said earlier the syntax is just like BASIC but **easier**. Everything is done by simple commands which simplify's software development. Here is an example of a simple calculator made with chive:

    label start;
    set number1 0;
    set number2 0;
    input number1 "Number 1:";
    input number2 "Number 2:";
    convint number1;convint number2;
    print number1 + number2;
    label end;
Or a simple fibonacci program:

    label start;
    set number 0;
    input number "Enter the number of terms: ";
    convint number;
    if number==0 goto end;
    set n1 0;set n2 1;set nextTerm 0;
    print "Fibonacci Series:";
    set i 1;
    while i<=number;
    print n1;
    set nextTerm n1 + n2;
    set n1 n2;
    set n2 nextTerm;
    set i i+1;
    end;
    label end;


## Building

See the documentation for building the python or c++ source code. The javascript source code doesn't need to be built but it is advised to minify the code.
## To-Do

 - [X] Build Desktop Executables
 - [X] Add Examples
 - [ ] Add Documentation
 - [ ] Finish C++ Intepreter
 - [ ] Make Desktop Graphics Library

