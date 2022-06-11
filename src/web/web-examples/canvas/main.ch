label start;
;; Preload image from url. ;;
set cat "";
External.System.Image cat "./cat.jpg";
External.Canvas.Init;
External.Canvas.Clear;
set catx 0;
set caty 0;
;; Set repeat interval to every 1 milliseconds ;;
set interval 1;
label update;
;; Clear screen ;;
External.Canvas.Clear;
;; draw basic shapes ;;
External.Canvas.Line 0 0 50 50 "#FF0000" 5;
External.Canvas.Rect 100 0 100 100 "blue" "red" 20;
External.Canvas.Image cat catx caty 100 100;
;; keyboard input ;;
if key=="D" set catx catx+0.1;
if key=="A" set catx catx-0.1;
if key=="W" set caty caty-0.1;
if key=="S" set caty caty+0.1;
label end;




