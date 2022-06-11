label start;
writef "./text.txt" "hello world";
set fx "";
readf fx "./text.txt";
print fx;
label end;