# Gruppe L, 9 August 2020


## Let's Bomb


## 1.  Spiel Start
Um das Spiel zu starten muss man:
* cd \Letsbomb
* npm install 
* npm install express
* npm install serve-favicon  (serve-favicon installieren)
* npm install socket.io
* node .\server.js eingeben
* Spiel befindet sich auf dem http://localhost:3000/
* Man kann mehrere Tabs öffnen und seine Nahme eingeben. 
* Wenn man auf “Space” drückt, fängt das Spiel an. Dann können keine weiteren Spielen sich einloggen. 


## 2.   Spielbeschreibung & Spielverlauf
Dies ist das Konzept für ein 2D Top-Down an Bomberman angelehntes Spiel, welches im Multiplayermodus gespielt werden kann. Pro Spiel treten bis zu 4 Spieler gleichzeitig gegeneinander an. Jeder Spieler hat vor Spielbeginn die Möglichkeit einen Username festzulegen. Jedes Spiel findet auf einem Spielfeld vorbestimmter Größe statt. Die Spieler versuchen sich anfangs durch das legen von Bomben immer mehr Bereiche des labyrinthartigen Spielfelds zu erschließen. Ist diese erste Hürde erreicht geht es jetzt darum, die anderen Mitspieler durch explodierenden Bomben vom Feld zu schaffen. Hinter einigen Blöcken verstecken sich Bonusgegenstände, sogenannte Power-ups. Schaltet man diese durch Aufsammeln frei, werden dem Spieler unterschiedliche Upgrades angeboten, die ihm gewissen Vorteile bieten können, um somit länger auf dem Spielfeld zu "überleben". Da es sich um ein Kompetitives Spiel handelt, gewinnt der Spieler der am Ende alle anderen Spieler vom Spielfeld weg-gebombt hat.


## 3.   Spielregeln
* 1. Jeder Spieler hat eine unbestimmte Anzahl an Bomben. Die Bomben dienen dazu sich einen Weg frei zu machen und gleichzeitig die anderen Spieler zu besiegen. Zu Beachten ist, dass jede Bombe nach einer bestimmten Zeit explodiert und somit der Spieler genügend Zeit hat der Explosion zu entfliehen. Denn auch die eigene Spielfigur kann von den eigenen Bomben getroffen werden.
* 2. In den Blöcken(versteckt), die durch Bombenexplosion zerstört werden können, befinden sich Powerups, die von jedem Spieler eingesammelt werden können. Manche eingesammelte Power-ups sind dabei nur für eine bestimmte Zeit gültig.
* 3. Zu Beginn des Spiels haben alle Spieler 3 Leben. Wird ein Spieler von einer explodierenden Bombe getroffen, wird ein Leben abgezogen. Verliert ein Spieler alle 3 Leben, hat er somit verloren.
Wenn ein Spieler verliert wird er als tote Figur bezeichnet und kann nicht mehr an dem Spiel teilnehmen.


## 4.   Spieloberfläche
* Jeder Spieler sieht neben dem aktuellen Spielfeld auch weitere Hilfselemente. Dazu gehören:

* Lebensanzeige, wo jeder Spieler über seinen aktuellen. Lebensstatus, sowie den von den Gegner informiert wird. Diese wird durch Herzen oben von dem Spieler dargestellt.

* Charakter des Spielers (Katze, Hähnchen, Fuchs, Mäuschen)

* Das Spielfeld selbst wird als graues Quadrat mit Gittermuster mit schwarzen Linien dargestellt. Bomben erhalten ihr typisches Bombendesign mit Zündschnur und deren Explosion wird als blinken von deren angezeigt.

* Power-ups werden für die Spieler deutlich gekennzeichnet sein.



## 5.   Steuerung
Player Bewegung:  Pfeiltasten
Bomben legen: Leertaste


## 6.   Powerups
* •  Schnelligkeit(Turnschuh) : Schneller laufen für 10s; 
* •  Bombenlevel(Flamme): Bomben haben für 10s größeren Explosionsradius 
* •  Plus Leben(Herz mit Bombe):  Player bekommt zusätzliches Leben
* •  God Mod(gelbe Weste): größere Bomben + 10 Plus Leben +  größere Bomben. (Dauert 10 Sekunden)