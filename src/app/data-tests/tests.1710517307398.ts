export const dataTests = {"userMail":"manyl.tidjani@etu.univ-grenoble-alpes.fr","version":3,"mutants":[],"suites":[{"label":"Tests isValid état intial de jeu","LtestIds":["KfUrI82hToC2jEwXOogd","DLgrqbfhVNXjFZa1zsIT"],"id":"fz7FqJdvkOxVz5vzYQvi","tests":[{"id":"KfUrI82hToC2jEwXOogd","expect":{"valid":true},"op":"isValid","params":[{"grid":[[],[],[],[],[],[],[]],"turn":"P1"}],"comment":"Etat de jeu (state) initial valide :  \n  -> Tour de jeu au joueur P1 \n  -> Aucun jeton dans le plateau "},{"comment":"Colonne 1 pleine","id":"DLgrqbfhVNXjFZa1zsIT","expect":{"valid":false,"reason":"column 1 has too much tokens"},"params":[{"grid":[["P1","P2","P1","P2","P1","P2","P1"],[],[],[],[],[],[]],"turn":"P1"}],"op":"isValid"}]}],"canObserveString":"[]","canObserve":"[]","evals":[-1,{"play":[0,0],"isValid":[0,0],"winner":[0,0]},{"play":[0,0],"isValid":[0,0],"winner":[0,0]}]}