type Level = string[]

// prettier-ignore
const emptyLevel: Level = [
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      ',
  '                                      '
]

// prettier-ignore
const level0: Level = [
  '    F    W     ',
  '  [////]       ',
  '      C        ',
  '   P         G ',
  '[/////]   [///]',
]

// prettier-ignore
const level1:Level=[
  '                 W      C             ',
  '               [////]                 ',
  '     C      W  O     O                 ',
  '   F                     F    F    G  ',
  '[//]       [////]   [////]   [//////] ',
  '    O   O                             ',
  ' P        W                           ',
  '[///]  [//]                           ',
  ]

// prettier-ignore
const level2: Level =[
  ' P                     [//]       G   ',
  '[/]    O   W        O     C     [/]   ',
  '         [//]     [//]                ',
  '      F                     W  W      ',
  ' O  [//]      W    C       [///]      ',
  '         O  [///]     []  O        O  ',
  '[]               C            C       ',
  '         [/]            [/]      [/]  '
]

// prettier-ignore
const level3: Level = [
  '       O                                    ',
  '              C       O                 O   ',
  '      [///]                 O      [////]   ',
  '           [///]       F  [//]              ',
  '                   [///]      [///]         ',
  '             F                              ',
  '         [///]           O              G   ',
  '      O       C    O               [////]   ',
  '  P                     F  W                ',
  '[//////]       [///]  [////]                '
]

// prettier-ignore
const level4: Level = [
  '                C       O  O         F              C                   ',
  '        C    C                   [//////]           W                G  ',
  '      C           O    [/////]        C        [///////]    C    [////] ',
  '                                                     C                  ',
  '  P      F     W    W              O       F     F         F            ',
  '[////////]  [///////]             [/]    [////////////////////]         '
]

const Levels: Level[] = [level0, level1, level2, level3, level4]
export default Levels
