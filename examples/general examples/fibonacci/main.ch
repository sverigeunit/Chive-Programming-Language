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