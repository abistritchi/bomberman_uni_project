# Let's Bomb

## 1. Spielbeschreibung/Spielverlauf

Dies ist das Konzept für ein 2D Top-Down an Bomberman angelehnte- Spiel, welches im Multiplayermodus gespielt werden kann. Pro Spiel treten 4 Spieler gleichzeitig gegeneinander an. Jeder Spieler hat vor Spielbeginn die Möglichkeit einen Username festzulegen. Jedes Spiel findet auf einem Spielfeld vorbestimmter Größe statt. Die Spieler versuchen sich anfangs durch das legen von Bomben immer mehr Bereiche des labyrinthartigen Spielfelds zu erschließen. Ist diese erste Hürde erreicht geht es jetzt darum, die anderen Mitspieler durch explodierenden Bombem vom Feld zu schaffen. Hinter einigen Wänden verstecken sich Bonusgegenstände, sogenannte Power-ups. Schaltet man diese durch explodierende Bomben fei, werden dem Spieler unterschiedliche Upgrades angeboten, die ihm gewissen Vorteile bieten können, um somit länger auf dem Spielfeld zu "überleben". Da es sich um ein Kompetitives Spiel handelt, gewinnt der Spieler der am Ende alle anderen Spieler vom Spielfeld weggebombt hat.

## 2. Spielregeln

1. Jeder Spieler hat eine unbestimmte Anzahl an Bomben. Anfangs kann nur eine Bombe auf einaml geworfen werden, erst nachdem die erste Bombe explodiert, kann die nächste abgeworfen werden. Die Bomben dienen dazu sich einen Weg frei zu machen und gleichzeitig die anderen Spieler zu besiegen. Zu Beachten ist, dass jede Bombe nach einer bestimmten Zeit explodiert und somit der Spieler genügent Zeit hat der Explosion zu entfliehen. Denn auch die eigene Spielfigur kann von seinen Bomben getroffen werden.
2. In den Blöcken(versteckt), die durch Bombenexplosion zerstört werden können,  befinden sich Powerups, die von jedem Spieler eingesammelt werden können. Ein eingesammeltes Power-up ist dabei nur für eine bestimmte Zeit gültig.
3. Zu beginn des Spiels haben alle Spieler 3 Leben. Wird ein Spieler von einer explodierenden Bombe getroffen, wird ein Leben abgezogen. Verliehrt ein Spieler alle 3 Leben, hat er somit verloren.  

## 3. Spieloberfläche

3.1. Unserinterface  
  Jeder Spieler sieht neben dem aktuellen Spielfeld auch weitere Hilfsele-
mente. Dazu gehören:
* Lebensanzeige, wo jeder Spieler über seinen aktuellen Lebensstatus, sowie den von den Gegner informiert wird. Diese wird durch drei Herzen dargestellt.
* Aktuelles Power-up, zeig an welcher eingesammelter Bonusgegenstad grade aktiv ist und wie lange dieser noch gültig ist.

Das Spielfeld wird als graues Quadrat mit Gittermuster in schwarzen linien dargestellt. Bomben erhalten ihr typisches Bombendesign mit zündschnurr und deren Explosion wird als Flammen in den Richtungen der Explosionsreichweite angezeigt. Power-ups werden für die Spieler deutlich gekennzeichnet sein. Die Blöcke werden alle, ob zersörbar oder unzerstörbar, in der sleben Farbe dargestellt, damit sie nicht unterscheidbar sind. Jeder Spieler steuert seine Figur in einer anderen Farbe.

3.2. Spielfeldaufbau (fest)  
  Das Spielfeld besteht aus einer Anordnung von zerstörbaren und unzerstörbaren Wänden. Das Spielfeld selbst wird als Quadrat mit Gitteraster dargestellt, auf dem sich unterschiedliche Objekte befinden. Diese wären einerseits die Wände, die aus einezlnen Blöcke zusammengesetz sind. Außerdem sind die Spieler und deren abgeworfenen Bomben, sowie die Power-ups darauf zu finden. Im weitern Abschnit werden diese Objekte kurz näher erleutert.
	
3.2.1 Arten von Blöcken:  
Die auf dem Spielfeld dargestellten Blöcke dienen dem Spieler als Hindernis, das zu entfernen ist. Alle Blöcke befinden sich bei jedem Spiel in der selben Postion. Dabei gibt es jedoch zwei Arten von Blöcken die zu unterscheiden sind: 
  * Blöcke, die man mit einer Bombe entfernen kann
      * davon zufallsgenerierte, die Powerups geben
  * Blöcke die durch einer Bombe nicht zertsört werden
   
3.2.2. Bomben:
  Im Spiel gibt es für jeden Spieler nur eine Art von Bombe. Beim legen einer Bombe wird diese nach einer bestimmten Zeit explodieren. Die Explosion wird durch Feuerstrahlen in alle vier Richtungen des zweidimensionalen Raums dargestellt. Dabei beträgt anfangs die Explosionsreichweite jeweil ein Quadrat oberhalb, unterhalb, rechts, links und dem Quadrat, wo die Bombe gelegt wurde. Spieler (auch die eigene Spielfigur), entfernbare Blöcke und Power-ups, die sich in der Explosionsreichweite befinden werden zerstört. 
  Zu beachten ist dabei, dass eine Spieler eine Bombe nicht überqueren kann, sie ist quasi ein Hindernis im Labyrinth.
  Im weiten Verlauf des Spiels, wird dem Spieler die möglichkeit geboten, die reichweite der Bombe durch ein Power-up (siehe unten) zu vergrößern.
   		
## 4. Steuerung
Die Steuerung wird mit einem EventListener auf dem dem
keyDown bzw keyUp Event umgesetzt. Dabei kann die Spielfigur über die Pfeiltasten gesteuert werden. Mit der Eingabe ArrowUp soll die Figur sich nach oben bewegen, mit der Taste ArrowLeft bewegt man die Figur nach links, mit der Taste ArrowRight wird nach rechts gelenkt und mit der Taste ArrowDown bewegt sich die Figur nach unten. Mit der space Taste kann jeder Spieler eine Bombe ablegen (sofern vorhanden). Die Spielfigur bewegt sich solange in eine Richtung, bis eine der Pfeiltasten losgelassen wird. Stößt eine Figur auf ein Hindernis, bleibt sie am selben Punkt stehen.

## 5. Power Ups (zufällig generiert?)
  Es gibt mehrere Arten von Powerups , die unter den Blöcken verteilt sind und dem Spieler beim Einsammeln eine bestimmte Fähigkeit oder einen Bonus verleihen. Die eingesammelten Power-ups sind wie folg definiert:
        
        * Schnelligkeit: Diese Power-up bietet dem Spieler die Möglichkeit sich schneller auf dem spielfeld zu bewegen. Dargestellt wird dieser gegenstand als Turnschuh.

        * größere Bomben: Die Bomben haben mit diesem Power-up eine größere Reichweite der Explosion. Die Dargestellt erfolg als Flamme

        * Unverwundbarkeit: Sammelt ein Spieler diesen Bonusgegenstand ein, können ihm in der gültigen zeit, Bomben keinen Schaden zufügen. Die Spielfigut ist unverwundbar.
        Dargestellt als Rüstung

        * Plus Bomben: am Anfang des Spiels darf jeder Spieler auf einmal nur eine Bombe werfen, dann wartet man bis die Bombe explodiert und dann die nächste werfen. Durch diesen Power-up, darf man bis immer plus eine zusätzliche Bombe gleichzeitig legen. Je mehr Plusbomben man einsammelt, desto mehr Bomben darf man gleichzeitig legen
        WICHTIG: Diese Power-up ist der ganzen Spielzeit gültig!
        Dargestellt als Bomben mit einem Pluszeichen
        
        *Leben: Mit diesem Power-up, bekommt der Spieler zu seinen drei Anfangsleben einen zusätlichen Lebenspunkt. Diese Power-up ist währden der ganzen Spielzet gültig
        Dargestellt als Herz mit einem Pluszeichen
  
  Alle Effekte der Power-ups gelten nur für eine festgelegte Zeit (Vorschlag 10s).

## 6. Mögliche Probleme
Während eines Spiels kann es passieren, dass einer der Spieler seine Internetverindung verliert. Ist dies der Fall wird nicht das komplette Spiel abgebrochen, sondern einfach nur dieser Spieler entfernt. Gibt es zu viele Spieler, die dem Spielrunde beitreten wollen, werden mehrere Spiele mit jeweils 4 Spielern gestartet.


## 7. Weitere Implementierungsideen
Interessant wäre es eine KI zu implementieren, damit, falls  es vorkommen sollte, dass nur ein Spieler existiert, dieser im Singleplayermodus gegen einen computer-gesteuerten
Bot antreten kann. 
Eine weiter Idee ist die implementiereung einer Lobby, wo man zwischen drei unterschiedlichen Spielfeldern entscheiden kann, damit es mehr abwechslung gibt.


