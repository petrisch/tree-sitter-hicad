==================
Return advanced
==================


REM ***************************************************************************************
REM                              Aufruf von externen Programmen
REM ---------------------------------------------------------------------------------------
REM                              zentrale Datei für alle Aufrufe
REM
REM  Parameter	K99	Nummer für externes Programm
REM
REM		$ZAPF	Makro-Pfad
REM
REM  zurück	-
REM
REM  ExtProg.MAC  | Kunde:
REM ***************************************************************************************
REM  created	05.10.2004  DN							| X - 1210.45
REM  modified	10.04.2005  DN	div. Änderungen
REM ***************************************************************************************

START   59
OPTION 2 59
SAUS


REM *** Parameter vorbelegen ***

REM * Name Makro ext. Programmliste lesen *
$T500:=ExtProgListe
$T500:=$ZAPF+$T500


REM *** Absolut-Pfad ermitteln ***
PFD $ZAPF
$PFAD:=$@9


REM *** Programmliste lesen ***

CALL $T500

REM wait $prog
IF $PROG <> "xxxx" THEN

   REM ALT10
   OPTION  30   0
   REM     Dateiname :

   IF K99 <= 500 THEN

      STRING  $PROG
      STRING  RET

   ELSE

      STRING  startPROCCA

      REM     Parameterliste ( max 80. Char.)
      STRING  $PROG

   IFEND

IFEND


8000:REM ***

DEL $PFAD
DEL $PROG
DEL $T500


9000:END

---

(source_file [0, 0] - [68, 8]
  (comment [0, 0] - [0, 92])
  (comment [1, 0] - [1, 64])
  (comment [2, 0] - [2, 92])
  (comment [3, 0] - [3, 65])
  (comment [4, 0] - [4, 4])
  (comment [5, 0] - [5, 48])
  (comment [6, 0] - [6, 4])
  (comment [7, 0] - [7, 22])
  (comment [8, 0] - [8, 4])
  (comment [9, 0] - [9, 14])
  (comment [10, 0] - [10, 4])
  (comment [11, 0] - [11, 27])
  (comment [12, 0] - [12, 92])
  (comment [13, 0] - [13, 48])
  (comment [14, 0] - [14, 45])
  (comment [15, 0] - [15, 92])
  (macro_definition [16, 0] - [68, 8]
    (ERROR [17, 0] - [17, 11]
      (num_value [17, 7] - [17, 8]))
    (macro_body [18, 0] - [18, 5]
      (expression [18, 0] - [18, 5]
        (keyword [18, 0] - [18, 4])
        (attribute [18, 4] - [18, 5])))
    (comment [21, 0] - [21, 33])
    (comment [23, 0] - [23, 44])
    (macro_body [24, 0] - [24, 19]
      (definition [24, 0] - [24, 19]
        (char_definition [24, 0] - [24, 19]
          (char_variable [24, 0] - [24, 2])
          (ERROR [24, 2] - [24, 5]
            (num_value [24, 2] - [24, 5]))
          (char_value [24, 7] - [24, 19]))))
    (macro_body [25, 0] - [25, 7]
      (definition [25, 0] - [25, 7]
        (char_definition [25, 0] - [25, 7]
          (char_variable [25, 0] - [25, 2])
          (ERROR [25, 2] - [25, 5]
            (num_value [25, 2] - [25, 5]))
          (char_value [25, 7] - [25, 7]))))
    (ERROR [25, 7] - [29, 9]
      (char_variable [25, 7] - [25, 12])
      (ERROR [25, 12] - [25, 13])
      (char_variable [25, 13] - [25, 15])
      (num_value [25, 15] - [25, 18])
      (comment [28, 0] - [28, 35])
      (ERROR [29, 0] - [29, 3])
      (char_variable [29, 4] - [29, 9]))
    (macro_body [30, 0] - [30, 7]
      (definition [30, 0] - [30, 7]
        (char_definition [30, 0] - [30, 7]
          (char_variable [30, 0] - [30, 5])
          (char_value [30, 7] - [30, 7]))))
    (ERROR [30, 7] - [35, 10]
      (char_variable [30, 7] - [30, 8])
      (ERROR [30, 8] - [30, 9])
      (num_value [30, 9] - [30, 10])
      (comment [33, 0] - [33, 32])
      (ERROR [35, 0] - [35, 4])
      (char_variable [35, 5] - [35, 7])
      (num_value [35, 7] - [35, 10]))
    (comment [37, 0] - [37, 15])
    (ERROR [38, 0] - [68, 5]
      (comparison [38, 3] - [38, 10]
        (char_comparison [38, 3] - [38, 10]
          (char_variable [38, 3] - [38, 8])
          (comparative_operator [38, 9] - [38, 10])
          (char_value [38, 10] - [38, 10])))
      (ERROR [38, 10] - [44, 16]
        (ERROR [38, 12] - [38, 18])
        (comment [40, 3] - [40, 13])
        (ERROR [41, 3] - [41, 17]
          (num_value [41, 16] - [41, 17]))
        (comment [42, 3] - [42, 23])
        (ERROR [44, 6] - [44, 7])
        (num_value [44, 7] - [44, 9])
        (num_value [44, 13] - [44, 16]))
      (ERROR [46, 6] - [65, 3]
        (ERROR [46, 6] - [46, 12])
        (char_variable [46, 14] - [46, 19])
        (ERROR [47, 6] - [51, 25])
        (comment [53, 6] - [53, 46])
        (ERROR [54, 6] - [54, 12])
        (char_variable [54, 14] - [54, 19])
        (num_value [61, 0] - [61, 4])
        (ERROR [61, 4] - [61, 5])
        (comment [61, 5] - [61, 13])
        (ERROR [63, 0] - [63, 3])
        (char_variable [63, 4] - [63, 9])
        (ERROR [64, 0] - [64, 3])
        (char_variable [64, 4] - [64, 9])
        (ERROR [65, 0] - [65, 3]))
      (char_variable [65, 4] - [65, 6])
      (num_value [65, 6] - [65, 9])
      (num_value [68, 0] - [68, 4])
      (ERROR [68, 4] - [68, 5]))))
