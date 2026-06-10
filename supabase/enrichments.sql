-- Fantasy AllProps — Event Enrichments
-- Run AFTER 20260610000001_enrich_events migration
-- Adds descriptions, website URLs, and pick options to all events

update public.events set
  description = 'The World Series of Poker Main Event culminates with the ESPN-televised final table in Las Vegas. With thousands of entrants, the field is impossible to narrow — this is a free-text pick for the player you think will take down the title.',
  website_url = 'https://www.wsop.com',
  options = NULL
where slug = 'aug-2026-wsop';

update public.events set
  description = 'The Commonwealth Games 2026 close in Glasgow, with the final medal table revealing which nation dominated the multi-sport competition. Pick which country finishes atop the overall medal count across all disciplines.',
  website_url = 'https://www.gc2026.com',
  options = '["Australia","England","Canada","India","South Africa","New Zealand","Scotland","Jamaica","Wales","Nigeria"]'::jsonb
where slug = 'aug-2026-commonwealth';

update public.events set
  description = 'A total solar eclipse crosses parts of Europe and North Africa on August 12, 2026 — a once-per-decade astronomical spectacle. Pop props will focus on weather, viewing conditions, and cultural moments around the event.',
  website_url = 'https://eclipse2026.org',
  options = NULL
where slug = 'aug-2026-eclipse';

update public.events set
  description = 'The Tour de France Femmes avec Zwift is the premier women''s stage race, contested over eight stages through France. Pick the overall GC winner from the world''s top female climbers and all-rounders.',
  website_url = 'https://www.letour.fr/en/race/tour-de-france-femmes',
  options = '["Demi Vollering","Annemiek van Vleuten","Elisa Longo Borghini","Cecilie Uttrup Ludwig","Ashleigh Moolman-Pasio","Juliette Labous","Lotte Kopecky","Kasia Niewiadoma","Niamh Fisher-Black","Puck Pieterse","Grace Brown","Pauliena Rooijakkers","Marlen Reusser","Kristen Faulkner","Silvia Persico"]'::jsonb
where slug = 'aug-2026-tdf-femmes';

update public.events set
  description = 'The 2026 European Athletics Championships brings together the continent''s fastest, strongest, and most agile athletes across track, field, and road events. Month picks focus on which nations lead the medals table.',
  website_url = 'https://www.european-athletics.com',
  options = '["Great Britain","France","Germany","Netherlands","Poland","Italy","Spain","Norway","Sweden","Portugal","Ukraine","Czech Republic","Belgium","Hungary","Finland"]'::jsonb
where slug = 'aug-2026-european-athletics';

update public.events set
  description = 'The International (TI15) is the Dota 2 world championship, held in Shanghai with a multi-million dollar prize pool. Pre-season picks lock in the team you believe will win the Aegis of Champions.',
  website_url = 'https://www.dota2.com/international',
  options = '["Team Liquid","OG","Evil Geniuses","Team Secret","Gaimin Gladiators","BetBoom Team","Tundra Esports","Cloud9","Natus Vincere","Virtus.pro","9Pandas","Team Falcons","Talon Esports","Xtreme Gaming","Azure Ray","Spirit"]'::jsonb
where slug = 'aug-2026-ti15';

update public.events set
  description = 'The US Open begins at Flushing Meadows on August 31, with singles draws for both tours. Your pre-season pick locks in before the draw — singles winners are resolved in September.',
  website_url = 'https://www.usopen.org',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'aug-2026-us-open-tennis-start';

update public.events set
  description = 'The FedEx Cup Playoffs culminate at East Lake Golf Club with the Tour Championship, where a points-handicap starting system determines the season-long champion on the PGA Tour. Pick the player who lifts the FedEx Cup.',
  website_url = 'https://www.pgatour.com/fedexcup',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'aug-2026-fedex-cup';

update public.events set
  description = 'The Edinburgh Comedy Award (formerly the Perrier Comedy Award) is the most prestigious prize in UK stand-up, presented at the Edinburgh Festival Fringe. Pop props open close to the ceremony and invite picks on which comedian takes the main award.',
  website_url = 'https://www.edfringe.com',
  options = NULL
where slug = 'aug-2026-edinburgh-comedy';

update public.events set
  description = 'The Premier League 2026-27 season kicks off in August. Your pre-season pick locks in before a ball is kicked — pick the club you believe will be crowned English champions in May 2027.',
  website_url = 'https://www.premierleague.com',
  options = '["Arsenal","Aston Villa","Bournemouth","Brentford","Brighton & Hove Albion","Chelsea","Crystal Palace","Everton","Fulham","Liverpool","Manchester City","Manchester United","Newcastle United","Nottingham Forest","Tottenham Hotspur","West Ham United","Wolverhampton Wanderers","Leeds United","Burnley","Sunderland"]'::jsonb
where slug = 'aug-2026-pl-opens';

update public.events set
  description = 'The Aki Basho is sumo''s September Grand Tournament, held over 15 days at the Ryogoku Kokugikan in Tokyo. The winner (yusho) is typically determined on Day 15 — with wrestlers drawn from Japan''s top division, free text is the right call here.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'sep-2026-aki-basho';

update public.events set
  description = 'The FIBA Women''s Basketball World Cup final is held in Germany, crowning the best national women''s basketball team on the planet. Pick the country you believe will win the gold medal.',
  website_url = 'https://www.fiba.basketball/womensbasketballworldcup',
  options = '["United States","Australia","Canada","France","Spain","Belgium","China","Germany","Japan","South Korea","Great Britain","Nigeria","Brazil","Serbia","Puerto Rico","Mali"]'::jsonb
where slug = 'sep-2026-fiba-women';

update public.events set
  description = 'Valorant Champions is the climax of the VCT season, where the best regional squads compete for the world title. Pick the team you think will be crowned Valorant world champion.',
  website_url = 'https://valorantesports.com',
  options = '["Sentinels","NRG Esports","Cloud9","100 Thieves","Loud","Fnatic","Team Liquid","G2 Esports","Paper Rex","Natus Vincere","Team Vitality","Evil Geniuses","Trace Esports","Bilibili Gaming","GenG Esports","Giants Gaming"]'::jsonb
where slug = 'sep-2026-valorant-champions';

update public.events set
  description = 'The NFL 2026 regular season kicks off in September. Lock in your pre-season Super Bowl LXI champion pick before Week 1 starts — the biggest single pick of the season.',
  website_url = 'https://www.nfl.com/super-bowl',
  options = '["Arizona Cardinals","Atlanta Falcons","Baltimore Ravens","Buffalo Bills","Carolina Panthers","Chicago Bears","Cincinnati Bengals","Cleveland Browns","Dallas Cowboys","Denver Broncos","Detroit Lions","Green Bay Packers","Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers","Los Angeles Rams","Miami Dolphins","Minnesota Vikings","New England Patriots","New Orleans Saints","New York Giants","New York Jets","Philadelphia Eagles","Pittsburgh Steelers","San Francisco 49ers","Seattle Seahawks","Tampa Bay Buccaneers","Tennessee Titans","Washington Commanders"]'::jsonb
where slug = 'sep-2026-nfl-kickoff';

update public.events set
  description = 'The US Open singles finals are contested at Arthur Ashe Stadium in September. Pick the men''s and women''s singles champions from the remaining draw.',
  website_url = 'https://www.usopen.org',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'sep-2026-us-open-winners';

update public.events set
  description = 'The 78th Primetime Emmy Awards celebrate the best in American television, with Drama Series and Comedy Series being the marquee picks. Pop props open once nominees are announced and close 24 hours before the ceremony.',
  website_url = 'https://www.emmys.com',
  options = NULL
where slug = 'sep-2026-emmys';

update public.events set
  description = 'The Venice Film Festival Golden Lion is cinema''s oldest major prize, awarded at the close of the festival on the Lido. Pop props invite picks on the film or director you believe the jury will honour.',
  website_url = 'https://www.labiennale.org/en/cinema',
  options = NULL
where slug = 'sep-2026-venice';

update public.events set
  description = 'The MTV Video Music Awards celebrate the best music videos of the year, with Video of the Year as the headline pick. Pop props open when the nominees are revealed and close before the live broadcast.',
  website_url = 'https://www.mtv.com/vma',
  options = NULL
where slug = 'sep-2026-vmas';

update public.events set
  description = 'The UEFA Champions League 2026-27 group stage begins in September. Lock in your pre-season pick for which club will lift the trophy in the final — the longest-horizon pick on the European club calendar.',
  website_url = 'https://www.uefa.com/uefachampionsleague',
  options = '["Real Madrid","Manchester City","Bayern Munich","Liverpool","Arsenal","Chelsea","Barcelona","Atletico Madrid","Inter Milan","AC Milan","Napoli","Juventus","Paris Saint-Germain","Borussia Dortmund","RB Leipzig","Bayer Leverkusen","Ajax","Porto","Benfica","Sporting CP","Feyenoord","PSV Eindhoven","Shakhtar Donetsk","Dinamo Zagreb","Celtic","Rangers","Red Bull Salzburg","Galatasaray","Fenerbahce","Lazio","Villarreal","Sevilla"]'::jsonb
where slug = 'sep-2026-ucl-groups';

update public.events set
  description = 'The College Football Playoff era resumes for the 2026 season. Your pre-season pick locks in the program you believe will win the CFP National Championship game played in January 2027.',
  website_url = 'https://collegefootballplayoff.com',
  options = '["Alabama","Georgia","Ohio State","Michigan","Texas","Notre Dame","Clemson","Oklahoma","USC","Oregon","Penn State","Tennessee","Florida State","LSU","Miami","Colorado","Washington","Utah","TCU","Kansas State","UCLA","Ole Miss","Iowa","Wisconsin"]'::jsonb
where slug = 'sep-2026-ncaa-football';

update public.events set
  description = 'Sweden holds its general election in September 2026, determining the composition of the Riksdag and who will form the next government. Pick which bloc — the centre-left or the centre-right — wins a parliamentary majority.',
  website_url = 'https://www.val.se/en',
  options = '["Sweden Democrats / centre-right bloc wins majority","Social Democrats / centre-left bloc wins majority","Hung parliament / no clear majority"]'::jsonb
where slug = 'sep-2026-sweden-election';

update public.events set
  description = 'The Booker Prize 2026 shortlist is announced in late September, narrowing the field from the longlist to six finalists. Pop props invite picks on which titles make the cut — a fun engagement hook for book lovers.',
  website_url = 'https://thebookerprizes.com',
  options = NULL
where slug = 'sep-2026-booker-shortlist';

update public.events set
  description = 'The MLB Postseason begins in October with Wild Card Series, then Division Series, Championship Series, and the World Series — the ultimate prize in baseball. Lock in your World Series champion pre-season for maximum points.',
  website_url = 'https://www.mlb.com/world-series',
  options = '["Arizona Diamondbacks","Atlanta Braves","Baltimore Orioles","Boston Red Sox","Chicago Cubs","Chicago White Sox","Cincinnati Reds","Cleveland Guardians","Colorado Rockies","Detroit Tigers","Houston Astros","Kansas City Royals","Los Angeles Angels","Los Angeles Dodgers","Miami Marlins","Milwaukee Brewers","Minnesota Twins","New York Mets","New York Yankees","Oakland Athletics","Philadelphia Phillies","Pittsburgh Pirates","San Diego Padres","San Francisco Giants","Seattle Mariners","St. Louis Cardinals","Tampa Bay Rays","Texas Rangers","Toronto Blue Jays","Washington Nationals"]'::jsonb
where slug = 'oct-2026-world-series';

update public.events set
  description = 'League of Legends Worlds is the annual world championship, the most-watched esports event on the planet. The tournament runs from October into November — lock in your champion before the group stage begins.',
  website_url = 'https://lolesports.com',
  options = '["T1","Gen.G","JDG Intel Esports Club","BiliBili Gaming","Weibo Gaming","LNG Esports","Top Esports","NRG Esports","Cloud9","Team Liquid","Fnatic","G2 Esports","KT Rolster","DRX","Team WE","100 Thieves"]'::jsonb
where slug = 'oct-2026-lol-worlds';

update public.events set
  description = 'Brazil''s general elections determine the President and Congress in a first-round vote in October 2026. If no presidential candidate clears 50%, a runoff follows later in the month. Pick who advances or wins outright.',
  website_url = 'https://www.tse.jus.br',
  options = '["Luiz Inácio Lula da Silva (PT)","Jair Bolsonaro (PL)","Other / Third-party candidate"]'::jsonb
where slug = 'oct-2026-brazil-round1';

update public.events set
  description = 'Quebec''s provincial general election determines who will form the next National Assembly government. The sovereignty question and CAQ v. PQ rivalry make this a compelling political prop.',
  website_url = 'https://www.electionsquebec.qc.ca/en/',
  options = '["Coalition Avenir Québec (CAQ)","Parti Québécois (PQ)","Québec solidaire (QS)","Quebec Liberal Party (PLQ)","Conservative Party of Quebec"]'::jsonb
where slug = 'oct-2026-quebec-election';

update public.events set
  description = 'The Ballon d''Or is football''s most coveted individual award, presented annually in Paris by France Football magazine. For its 70th anniversary edition, the ceremony moves to London — pick the player you believe the voters will crown.',
  website_url = 'https://www.francefootball.fr',
  options = '["Erling Haaland","Kylian Mbappe","Vinicius Jr","Jude Bellingham","Rodri","Lamine Yamal","Phil Foden","Florian Wirtz","Federico Valverde","Ruben Dias","Bukayo Saka","Declan Rice","Harry Kane","Robert Lewandowski","Neymar Jr","Raphinha","Gavi","Pedri","Dani Olmo","Toni Kross","Virgil van Dijk","Mohamed Salah","Trent Alexander-Arnold","Kevin De Bruyne","Marcus Rashford","Riyad Mahrez","Lionel Messi","Cristiano Ronaldo","Alexia Putellas","Aitana Bonmati"]'::jsonb
where slug = 'oct-2026-ballon-dor';

update public.events set
  description = 'The Nobel Peace Prize (October 9) and Nobel Prize in Literature (October 8) are announced from Oslo and Stockholm respectively. Both are notoriously unpredictable — free text is the right format for serious predictions.',
  website_url = 'https://www.nobelprize.org',
  options = NULL
where slug = 'oct-2026-nobels';

update public.events set
  description = 'If no candidate wins the Brazilian presidential election outright in October, a binary runoff between the top two candidates takes place on October 25. This pop prop opens only if a runoff is triggered.',
  website_url = 'https://www.tse.jus.br',
  options = NULL
where slug = 'oct-2026-brazil-runoff';

update public.events set
  description = 'The Rugby League World Cup 2026 kicks off in Australia, New Zealand, and Papua New Guinea. Pre-season picks lock in the nation you believe will lift the trophy at the final.',
  website_url = 'https://rlwc2026.com',
  options = '["Australia","New Zealand","England","Papua New Guinea","Samoa","Tonga","France","Fiji","Polynesia","Jamaica","Lebanon","Scotland","Ireland","Wales","Italy","Cook Islands"]'::jsonb
where slug = 'oct-2026-rugby-league-wc';

update public.events set
  description = 'The IRONMAN World Championship in Kailua-Kona, Hawaii is the pinnacle of triathlon — 2.4 miles of swimming, 112 miles of cycling, and a full marathon. Pick your men''s and women''s champions from the world''s top triathletes.',
  website_url = 'https://www.ironman.com/im-world-championship',
  options = '["Patrick Lange","Jan Frodeno","Sam Laidlow","Kristian Blummenfelt","Alistair Brownlee","Gustav Iden","Sebastian Kienle","Tim O''Donnell","Lionel Sanders","Denis Chevrot","Lucy Charles-Barclay","Chelsea Sodaro","Anne Haug","Laura Philipp","Kat Matthews","Paula Findlay","Sarah Crowley","Daniela Ryf","Skye Moench","Fenella Langridge"]'::jsonb
where slug = 'oct-2026-ironman';

update public.events set
  description = 'The Chicago Marathon is the sixth and penultimate World Marathon Major of the calendar year, held on the flat streets of the Windy City. Pick the men''s and women''s elite race winners.',
  website_url = 'https://www.chicagomarathon.com',
  options = NULL
where slug = 'oct-2026-chicago-marathon';

update public.events set
  description = 'The NBA 2026-27 season tips off in October. Pre-season picks lock in your MVP, Rookie of the Year, Defensive Player of the Year, and championship team picks before a single regular-season game is played.',
  website_url = 'https://www.nba.com',
  options = '["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia 76ers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards"]'::jsonb
where slug = 'oct-2026-nba-tipoff';

update public.events set
  description = 'The NHL 2026-27 regular season opens in October. Pre-season picks cover the Hart Trophy (MVP), Norris Trophy, Vezina Trophy, Calder Trophy, and — most importantly — the Stanley Cup champion.',
  website_url = 'https://www.nhl.com',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'oct-2026-nhl-opens';

update public.events set
  description = 'The 2026 US Midterm Elections put all 435 House seats, 35 Senate seats, and 39 governorships on the ballot. The key prop: which party controls the House and which controls the Senate after the results come in.',
  website_url = 'https://www.fec.gov',
  options = '["Democrats win House, Democrats win Senate","Republicans win House, Republicans win Senate","Democrats win House, Republicans win Senate","Republicans win House, Democrats win Senate"]'::jsonb
where slug = 'nov-2026-midterms';

update public.events set
  description = 'The Breeders'' Cup is American thoroughbred racing''s richest two-day championship event, held at a rotating US track. Monthly picks focus on the Classic (the main race) winner.',
  website_url = 'https://www.breeders-cup.com',
  options = NULL
where slug = 'nov-2026-breeders-cup';

update public.events set
  description = 'The Booker Prize 2026 winner is announced from the shortlist of six finalists in early November. Pick the title you believe the judges will select as the best novel written in English this year.',
  website_url = 'https://thebookerprizes.com',
  options = NULL
where slug = 'nov-2026-booker-winner';

update public.events set
  description = 'The New York City Marathon, the largest marathon in the world by entrants, is the seventh World Marathon Major of the year. Pop props open close to race day — pick the elite men''s and women''s winners.',
  website_url = 'https://www.nyrr.org/tcsnycmarathon',
  options = NULL
where slug = 'nov-2026-nyc-marathon';

update public.events set
  description = 'The League of Legends Worlds final is held at Barclays Center in Brooklyn, crowning the undisputed world champion. Monthly picks lock in your finalist and winner once the bracket is set.',
  website_url = 'https://lolesports.com',
  options = '["T1","Gen.G","JDG Intel Esports Club","BiliBili Gaming","Weibo Gaming","LNG Esports","Top Esports","NRG Esports","Cloud9","Team Liquid","Fnatic","G2 Esports","KT Rolster","DRX","Team WE","100 Thieves"]'::jsonb
where slug = 'nov-2026-lol-worlds-final';

update public.events set
  description = 'The ATP Finals in Turin brings together the world''s top eight men''s singles players for a round-robin and knockout format at the end of the season. Pick the player who wins the year-end championship.',
  website_url = 'https://www.atpfinals.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic"]'::jsonb
where slug = 'nov-2026-atp-finals';

update public.events set
  description = 'Dancing with the Stars US Season 35 finale airs on ABC in late November, crowning the celebrity and pro partner who earns the Mirrorball Trophy. Pop props open when the cast is revealed — pick the winner.',
  website_url = 'https://abc.com/shows/dancing-with-the-stars',
  options = NULL
where slug = 'nov-2026-dwts-finale';

update public.events set
  description = 'The São Paulo Grand Prix at Interlagos is a sprint-format weekend on the 2026 F1 calendar. Chaos often reigns at Interlagos — pick the race winner from the 2026 grid.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'nov-2026-f1-sao-paulo';

update public.events set
  description = 'The Las Vegas Grand Prix lights up the Strip on a Saturday night in November, with the fastest circuit on the calendar set against iconic neon backdrops. Pick the race winner from the 2026 grid.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'nov-2026-f1-las-vegas';

update public.events set
  description = 'I''m a Celebrity... Get Me Out of Here! UK Series 2026 launches on ITV in November, sending celebrities into the Australian jungle. Pop props open when the cast is announced — before a single trial airs.',
  website_url = 'https://www.itv.com/imacelebrity',
  options = NULL
where slug = 'nov-2026-im-a-celeb-launch';

update public.events set
  description = 'The Latin Grammy Awards celebrate the best in Latin music, with Album of the Year and Record of the Year as the flagship picks. Pre-season picks lock in before nominees are announced.',
  website_url = 'https://www.latingrammy.com',
  options = NULL
where slug = 'nov-2026-latin-grammys';

update public.events set
  description = 'The Macy''s Thanksgiving Day Parade is a New York City tradition broadcast live to millions. Pop props focus on parade curiosities — the last float through Herald Square, new balloon debuts, and celebrity performer picks.',
  website_url = 'https://www.macys.com/parade',
  options = NULL
where slug = 'nov-2026-macys-parade';

update public.events set
  description = 'The Kyushu Basho is sumo''s November Grand Tournament, held in Fukuoka — the last honbasho of the calendar year. The yusho winner is a free-text pick given the depth and unpredictability of the top division.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'nov-2026-kyushu-basho';

update public.events set
  description = 'Time magazine releases its Person of the Year 2026 shortlist in late November, opening the prediction market. Pop props focus on which names appear — pick who you think makes the final list.',
  website_url = 'https://time.com/person-of-the-year',
  options = NULL
where slug = 'nov-2026-time-poty-shortlist';

update public.events set
  description = 'The UK Snooker Championship in York is the second leg of snooker''s Triple Crown. Monthly picks lock in before the first round — pick the player who takes this prestigious title.',
  website_url = 'https://www.wst.tv/events/uk-championship',
  options = '["Ronnie O''Sullivan","Mark Selby","Judd Trump","Neil Robertson","Mark Williams","John Higgins","Barry Hawkins","Kyren Wilson","Ding Junhui","Luca Brecel","Si Jiahui","Zhang Anda","Mark Allen","Stephen Maguire","Ryan Day","Jack Lisowski","Stuart Bingham","Tom Ford","Gary Wilson","Shaun Murphy"]'::jsonb
where slug = 'nov-2026-uk-snooker';

update public.events set
  description = 'Time''s Person of the Year is one of the most-discussed media moments of December, recognising the individual who most influenced the world in the past twelve months. This is a free-text pick — the field is truly anyone on earth.',
  website_url = 'https://time.com/person-of-the-year',
  options = NULL
where slug = 'dec-2026-time-poty';

update public.events set
  description = 'Spotify Wrapped reveals the platform''s global most-streamed artist of the year in early December — verified directly via Spotify''s API. Pick which artist dominated streams worldwide across 2026.',
  website_url = 'https://spotify.com/wrapped',
  options = NULL
where slug = 'dec-2026-spotify-wrapped';

update public.events set
  description = 'The Heisman Trophy ceremony in New York City crowns college football''s best player. Pop props open when the finalist list is announced — typically three to five players — and close before the ceremony.',
  website_url = 'https://www.heismanttrophy.com',
  options = NULL
where slug = 'dec-2026-heisman';

update public.events set
  description = 'The WSL Pipeline Masters at Oahu''s North Shore is the finale of the Championship Tour, deciding the men''s and women''s world surfing titles. Pre-season picks lock in the overall world champion for each tour.',
  website_url = 'https://www.worldsurfleague.com',
  options = '["Griffin Colapinto","Ethan Ewing","Jack Robinson","Filipe Toledo","John John Florence","Italo Ferreira","Gabriel Medina","Kanoa Igarashi","Samuel Pupo","Ryan Callinan","Maxime Huscenot","Morgan Cibilic","Molly Picklum","Caitlin Simmers","Caroline Marks","Tatiana Weston-Webb","Johanne Defay","Bettylou Sakura Johnson","Isabella Nichols","Teresa Bonvalot"]'::jsonb
where slug = 'dec-2026-wsl-pipeline';

update public.events set
  description = 'The PDC World Darts Championship begins at Alexandra Palace in December and runs into January. Pre-season picks lock in the player you think will be world champion — the premier darts event of the year.',
  website_url = 'https://www.pdc.tv/world-championship',
  options = '["Luke Littler","Michael van Gerwen","Luke Humphries","Gerwyn Price","Peter Wright","Dimitri Van den Bergh","Michael Smith","Gary Anderson","Rob Cross","Joe Cullen","Nathan Aspinall","Jonny Clayton","Chris Dobey","Danny Noppert","Ryan Searle","Andrew Gilding","Mike de Decker","Josh Rock","Callan Rydz","Dave Chisnall"]'::jsonb
where slug = 'dec-jan-pdc-darts-start';

update public.events set
  description = 'The BBC Sports Personality of the Year is voted on by the British public and announced in December, celebrating the UK''s top sporting achievement of the year. Pre-season picks lock in early; the shortlist narrows the field by December.',
  website_url = 'https://www.bbc.co.uk/sport/sports-personality',
  options = NULL
where slug = 'dec-2026-bbc-spoty';

update public.events set
  description = 'The UK Christmas Number One is the most coveted chart position in British pop culture, revealed by the Official Charts Company the Friday before Christmas. This is a free-text pick — campaigns, X Factor winners, and viral releases all compete.',
  website_url = 'https://www.officialcharts.com',
  options = NULL
where slug = 'dec-2026-uk-christmas-1';

update public.events set
  description = 'The MLS Cup final is the championship game of Major League Soccer, pitting the Eastern and Western Conference champions. Pre-season picks lock in before the regular season begins.',
  website_url = 'https://www.mlssoccer.com/mlscup',
  options = '["Atlanta United FC","Austin FC","CF Montréal","Charlotte FC","Chicago Fire FC","FC Cincinnati","Colorado Rapids","Columbus Crew","D.C. United","FC Dallas","Houston Dynamo FC","Inter Miami CF","LA Galaxy","Los Angeles FC","Minnesota United FC","Nashville SC","New England Revolution","New York City FC","New York Red Bulls","Orlando City SC","Philadelphia Union","Portland Timbers","Real Salt Lake","San Jose Earthquakes","Seattle Sounders FC","Sporting Kansas City","St. Louis City SC","Toronto FC","Vancouver Whitecaps FC","San Diego FC"]'::jsonb
where slug = 'dec-2026-mls-cup';

update public.events set
  description = 'Survivor Season 51 culminates on CBS in December with a live finale. Pop props open when the cast is revealed at the start of the season — pick your winner before Tribal Council begins.',
  website_url = 'https://www.cbs.com/shows/survivor',
  options = NULL
where slug = 'dec-2026-survivor-s51';

update public.events set
  description = 'The Abu Dhabi Grand Prix at Yas Marina Circuit is the season finale of the F1 World Championship, where the Drivers'' and Constructors'' titles may still be on the line. Pre-season picks lock in the champion before Round 1.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'dec-2026-f1-abu-dhabi';

update public.events set
  description = 'Strictly Come Dancing''s Glitterball Trophy final on BBC One is the crown jewel of British reality TV. Pre-season picks lock in your winner before the series begins — the celeb and pro you think will dazzle the judges.',
  website_url = 'https://www.bbc.co.uk/programmes/b006mj3k',
  options = NULL
where slug = 'dec-2026-strictly-final';

update public.events set
  description = 'I''m a Celebrity''s King or Queen of the Jungle is crowned in the live December final on ITV. Pop props open once the final few celebrities remain — pick who the public will vote as their winner.',
  website_url = 'https://www.itv.com/imacelebrity',
  options = NULL
where slug = 'dec-2026-im-a-celeb-final';

update public.events set
  description = 'The NBA Christmas Day slate features five marquee matchups broadcast nationally — a league tradition since the 1940s. Pop props open for each game: pick the winner of each Christmas Day contest.',
  website_url = 'https://www.nba.com',
  options = '["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia 76ers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards"]'::jsonb
where slug = 'dec-2026-nba-christmas';

update public.events set
  description = 'The European Women''s Handball Championship final crowns the best national team in Europe. Monthly picks lock in the nation you believe will win gold at the continental championship.',
  website_url = 'https://www.eurohandball.com',
  options = '["Norway","Denmark","France","Netherlands","Sweden","Germany","Spain","Hungary","Romania","Croatia","Montenegro","Slovenia","Serbia","Czech Republic","Poland","Austria"]'::jsonb
where slug = 'dec-2026-euro-handball';

update public.events set
  description = 'The Sports Illustrated Sportsperson of the Year is one of American sports media''s most prestigious honours, revealed on the December SI cover. Pre-season picks lock in well before the shortlist is published.',
  website_url = 'https://www.si.com',
  options = NULL
where slug = 'dec-2026-si-sportsperson';

update public.events set
  description = 'The 84th Golden Globe Awards on CBS/Paramount+ open the prestige awards season, with Best Drama Series, Best Comedy Series, and Best Motion Picture among the headline picks. Pop props open once the nominees are announced.',
  website_url = 'https://www.goldenglobes.com',
  options = NULL
where slug = 'jan-2027-golden-globes';

update public.events set
  description = 'The Critics Choice Awards in January honour the best in film and television as voted by US and Canadian critics. Pop props focus on Best Picture and Best Drama/Comedy Series.',
  website_url = 'https://www.criticschoice.com',
  options = NULL
where slug = 'jan-2027-critics-choice';

update public.events set
  description = 'The Australian Open at Melbourne Park is the first Grand Slam of the year, played on hard courts in the Southern Hemisphere summer. Monthly picks lock in your men''s and women''s singles champions.',
  website_url = 'https://www.ausopen.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'jan-2027-aus-open';

update public.events set
  description = 'The United Cup is a mixed national-teams tennis event played across Australian cities in early January, pairing men''s and women''s singles and mixed doubles. Pick the winning nation.',
  website_url = 'https://www.unitedcup.com',
  options = '["Australia","United States","Spain","Italy","Great Britain","Poland","Germany","Czech Republic","Argentina","France","Greece","Canada"]'::jsonb
where slug = 'jan-2027-united-cup';

update public.events set
  description = 'The NHL Winter Classic is the league''s marquee outdoor regular-season game, played on New Year''s Day in front of massive crowds. Pop props open close to puck drop — pick the winning team.',
  website_url = 'https://www.nhl.com/fans/winter-classic',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'jan-2027-nhl-winter-classic';

update public.events set
  description = 'The Sundance Film Festival in Park City, Utah premieres the most anticipated independent films of the year, with jury prizes in dramatic and documentary categories. Pop props open when the programme is announced.',
  website_url = 'https://www.sundance.org',
  options = NULL
where slug = 'jan-2027-sundance';

update public.events set
  description = 'The PDC World Masters is a prestigious invitational darts tournament attracting top PDC and BDO players. Monthly picks lock in the champion from the elite field.',
  website_url = 'https://www.pdc.tv',
  options = '["Luke Littler","Michael van Gerwen","Luke Humphries","Gerwyn Price","Peter Wright","Dimitri Van den Bergh","Michael Smith","Gary Anderson","Rob Cross","Joe Cullen","Nathan Aspinall","Jonny Clayton","Chris Dobey","Danny Noppert","Ryan Searle","Andrew Gilding","Mike de Decker","Josh Rock","Callan Rydz","Dave Chisnall"]'::jsonb
where slug = 'jan-2027-pdc-world-masters';

update public.events set
  description = 'The College Football Playoff National Championship game crowns the undisputed NCAA Division I champion. Pre-season picks lock in before the regular season — your champion from the 12-team playoff.',
  website_url = 'https://collegefootballplayoff.com',
  options = '["Alabama","Georgia","Ohio State","Michigan","Texas","Notre Dame","Clemson","Oklahoma","USC","Oregon","Penn State","Tennessee","Florida State","LSU","Miami","Colorado","Washington","Utah","TCU","Kansas State","UCLA","Ole Miss","Iowa","Wisconsin"]'::jsonb
where slug = 'jan-2027-cfp-championship';

update public.events set
  description = 'The Hatsu Basho is sumo''s New Year Grand Tournament, the first of six honbasho, held at the Ryogoku Kokugikan in Tokyo over 15 days. The yusho winner is a free-text pick given the unpredictability of the top division.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'jan-2027-hatsu-basho';

update public.events set
  description = 'The Academy Award nominations are announced in January, typically three to four weeks before the ceremony. Pop props invite picks on which films earn the most nominations and which potential snubs or surprises emerge.',
  website_url = 'https://www.oscars.org',
  options = NULL
where slug = 'jan-2027-oscar-noms';

update public.events set
  description = 'The Traitors UK Series 5 on BBC One concludes with a live finale in late January — one of Britain''s most gripping reality competition formats. Pop props open once the cast is revealed.',
  website_url = 'https://www.bbc.co.uk/programmes/m001tbt3',
  options = NULL
where slug = 'jan-2027-traitors-uk';

update public.events set
  description = 'The Dakar Rally 2027 is a two-week off-road motorsport raid through Saudi Arabia, with competitors racing cars, motorcycles, trucks, and quads across extreme desert terrain. Pick the overall car and bike class winners.',
  website_url = 'https://www.dakar.com',
  options = NULL
where slug = 'jan-2027-dakar';

update public.events set
  description = 'The World Snooker Masters at Alexandra Palace is the most prestigious invitational event in snooker — the third leg of the Triple Crown. Monthly picks lock in the player you think will claim this elite title.',
  website_url = 'https://www.wst.tv/events/masters',
  options = '["Ronnie O''Sullivan","Mark Selby","Judd Trump","Neil Robertson","Mark Williams","John Higgins","Barry Hawkins","Kyren Wilson","Ding Junhui","Luca Brecel","Si Jiahui","Zhang Anda","Mark Allen","Stephen Maguire","Ryan Day","Jack Lisowski","Stuart Bingham","Tom Ford","Gary Wilson","Shaun Murphy"]'::jsonb
where slug = 'jan-2027-snooker-masters';

update public.events set
  description = 'Super Bowl LXI at SoFi Stadium in Inglewood — simulcast on ESPN and ABC for the first time — is the NFL''s championship game and America''s single biggest sporting event. Your pre-season pick locks in before Week 1 of the season.',
  website_url = 'https://www.nfl.com/super-bowl',
  options = '["Arizona Cardinals","Atlanta Falcons","Baltimore Ravens","Buffalo Bills","Carolina Panthers","Chicago Bears","Cincinnati Bengals","Cleveland Browns","Dallas Cowboys","Denver Broncos","Detroit Lions","Green Bay Packers","Houston Texans","Indianapolis Colts","Jacksonville Jaguars","Kansas City Chiefs","Las Vegas Raiders","Los Angeles Chargers","Los Angeles Rams","Miami Dolphins","Minnesota Vikings","New England Patriots","New Orleans Saints","New York Giants","New York Jets","Philadelphia Eagles","Pittsburgh Steelers","San Francisco 49ers","Seattle Seahawks","Tampa Bay Buccaneers","Tennessee Titans","Washington Commanders"]'::jsonb
where slug = 'feb-2027-super-bowl';

update public.events set
  description = 'The Super Bowl halftime show is the most-watched live music performance of the year. Pop props focus on the headline performer and whether a surprise guest joins the stage.',
  website_url = 'https://www.nfl.com/super-bowl',
  options = NULL
where slug = 'feb-2027-super-bowl-halftime';

update public.events set
  description = 'The 69th Grammy Awards at Crypto.com Arena — broadcasting on ABC for the first time since 1972 — is the premier night in recorded music. Pre-season picks lock in Album of the Year before nominees are announced.',
  website_url = 'https://www.grammy.com',
  options = NULL
where slug = 'feb-2027-grammys';

update public.events set
  description = 'The 80th BAFTA Film Awards at the Royal Festival Hall in London are the British film industry''s equivalent of the Oscars and a key predictor for the Academy Awards. Pop props focus on Best Film and Best Director.',
  website_url = 'https://www.bafta.org',
  options = NULL
where slug = 'feb-2027-baftas';

update public.events set
  description = 'The Berlin International Film Festival (Berlinale) is one of cinema''s Big Three festivals, awarding the Golden Bear to the year''s most acclaimed art-house release. Pop props open when the competition lineup is announced.',
  website_url = 'https://www.berlinale.de',
  options = NULL
where slug = 'feb-2027-berlin';

update public.events set
  description = 'The Westminster Kennel Club Dog Show is America''s most prestigious canine competition, held at Madison Square Garden. Pop props open the week of the show — pick the breed group or Best in Show winner.',
  website_url = 'https://www.westminsterkennelclub.org',
  options = '["Herding Group","Hound Group","Non-Sporting Group","Sporting Group","Terrier Group","Toy Group","Working Group"]'::jsonb
where slug = 'feb-2027-westminster';

update public.events set
  description = 'The NFL Scouting Combine in Indianapolis is where draft prospects showcase their athleticism ahead of the April Draft. Pop props focus on the fastest 40-yard dash time and first-day top performer.',
  website_url = 'https://www.nfl.com/combine',
  options = NULL
where slug = 'feb-2027-nfl-combine';

update public.events set
  description = 'The NHL Stadium Series features a regular-season outdoor game played in a non-hockey venue, creating spectacular atmospheres in football and baseball stadiums. Pop props open close to puck drop.',
  website_url = 'https://www.nhl.com/fans/stadium-series',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'feb-2027-nhl-stadium-series';

update public.events set
  description = 'The UFC''s marquee February card features a high-profile main event title or superfight. Pop props open the week of the card — pick the main event winner and method of victory.',
  website_url = 'https://www.ufc.com',
  options = NULL
where slug = 'feb-2027-ufc';

update public.events set
  description = 'The Pro Bowl Games replace the traditional all-star format with skills competitions and a flag football game the week before the Super Bowl. Pop props focus on the flag football winner (NFC vs AFC).',
  website_url = 'https://www.nfl.com/pro-bowl',
  options = '["NFC","AFC"]'::jsonb
where slug = 'feb-2027-pro-bowl';

update public.events set
  description = 'The Saudi Cup at King Abdulaziz Racecourse in Riyadh is the world''s richest horse race, with a $20 million purse. Monthly picks lock in the winning horse or connections.',
  website_url = 'https://www.saudicup.com',
  options = NULL
where slug = 'feb-2027-saudi-cup';

update public.events set
  description = 'The Daytona 500 is the "Great American Race" — the prestigious season-opener for NASCAR''s Cup Series at Daytona International Speedway. Monthly picks lock in your race winner from the full Cup grid.',
  website_url = 'https://www.daytona500.com',
  options = '["Kyle Larson","William Byron","Chase Elliott","Alex Bowman","Martin Truex Jr","Christopher Bell","Denny Hamlin","Joey Logano","Ryan Blaney","Brad Keselowski","Tyler Reddick","Austin Cindric","Bubba Wallace","Erik Jones","Michael McDowell","Todd Gilliland","Kevin Harvick","Aric Almirola","Corey LaJoie","Ricky Stenhouse Jr"]'::jsonb
where slug = 'feb-2027-daytona-500';

update public.events set
  description = 'The NBA All-Star Game brings together the league''s best players for a weekend of events including the Slam Dunk Contest and Three-Point Contest. Pop props focus on the All-Star Game winner (Team East vs Team West).',
  website_url = 'https://www.nba.com/allstar',
  options = '["Eastern Conference All-Stars","Western Conference All-Stars"]'::jsonb
where slug = 'feb-2027-nba-allstar';

update public.events set
  description = 'The Traitors US Season 5 on Peacock follows the hit format where Faithfuls must identify and banish the hidden Traitors. Pop props open when the celebrity cast is revealed.',
  website_url = 'https://www.peacocktv.com/watch-online/tv/the-traitors',
  options = NULL
where slug = 'feb-2027-traitors-us';

update public.events set
  description = 'The 32nd Screen Actors Guild Awards recognise outstanding performances across film and television, voted on by the actors themselves. Pop props focus on Outstanding Cast in a Motion Picture and the drama/comedy series ensemble awards.',
  website_url = 'https://www.sagawards.org',
  options = NULL
where slug = 'feb-2027-sag';

update public.events set
  description = 'The 99th Academy Awards at the Dolby Theatre in Hollywood is the pinnacle of the film awards season. Pre-season picks lock in Best Picture and Best Director before nominees are announced in January 2027.',
  website_url = 'https://www.oscars.org',
  options = NULL
where slug = 'mar-2027-oscars';

update public.events set
  description = 'March Madness — the NCAA Division I Men''s Basketball Tournament — runs from mid-March through the Final Four in Detroit in early April. Pre-season picks lock in your national champion before Selection Sunday.',
  website_url = 'https://www.ncaa.com/march-madness',
  options = '["Duke","Kentucky","Kansas","North Carolina","Gonzaga","Villanova","Michigan State","Indiana","Louisville","Connecticut","Syracuse","Florida","Michigan","Ohio State","Virginia","Arizona","Texas","UCLA","Baylor","Houston","Purdue","Tennessee","Alabama","Marquette","Creighton","Iowa State","Arkansas"]'::jsonb
where slug = 'mar-2027-ncaa-mens';

update public.events set
  description = 'The NCAA Division I Women''s Basketball Tournament runs in parallel with the men''s bracket, culminating at the Final Four in Columbus, Ohio. Pre-season picks lock in your national champion before Selection Sunday.',
  website_url = 'https://www.ncaa.com/march-madness',
  options = '["South Carolina","Iowa","LSU","Connecticut","Notre Dame","Stanford","Texas","Tennessee","Indiana","North Carolina State","Virginia Tech","Baylor","Kansas State","Colorado","Oregon","Maryland","Ohio State","Michigan","Villanova","Gonzaga"]'::jsonb
where slug = 'mar-2027-ncaa-womens';

update public.events set
  description = 'WrestleMania 43 becomes the first edition held outside North America, staged in Riyadh, Saudi Arabia. Pre-season picks lock in the main event matchup you expect and who walks out champion.',
  website_url = 'https://www.wwe.com/shows/wrestlemania',
  options = '["Cody Rhodes","Roman Reigns","CM Punk","Seth Rollins","Gunther","Sami Zayn","Kevin Owens","Drew McIntyre","Brock Lesnar","LA Knight","Rhea Ripley","Becky Lynch","Charlotte Flair","Bianca Belair","Bayley","Naomi"]'::jsonb
where slug = 'mar-2027-wrestlemania';

update public.events set
  description = 'The F1 2027 season opener returns to Bahrain International Circuit. Pop props open the week of the race — pick the race winner from the freshly-homologated 2027-spec cars.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'mar-2027-f1-opener';

update public.events set
  description = 'The Tokyo Marathon is the first World Marathon Major of the calendar year, held on the flat streets of central Tokyo. Pop props open close to race day — pick the elite men''s and women''s winners.',
  website_url = 'https://www.marathon.tokyo',
  options = NULL
where slug = 'mar-2027-tokyo-marathon';

update public.events set
  description = 'The Cheltenham Festival Gold Cup is National Hunt racing''s most prestigious prize, held at Cheltenham Racecourse over four days in March. Monthly picks lock in your Gold Cup winner from the top staying chasers.',
  website_url = 'https://www.cheltenham.co.uk',
  options = NULL
where slug = 'mar-2027-cheltenham';

update public.events set
  description = 'The Six Nations Championship 2027 concludes on Super Saturday in mid-March, with multiple matches played simultaneously to decide the Grand Slam, Championship, and Triple Crown. Pre-season picks lock in the tournament winner.',
  website_url = 'https://www.sixnations.com',
  options = '["England","France","Ireland","Italy","Scotland","Wales"]'::jsonb
where slug = 'mar-2027-six-nations';

update public.events set
  description = 'The BNP Paribas Open at Indian Wells is one of the biggest combined ATP/WTA events of the year, often called the "fifth Grand Slam." Monthly picks lock in your men''s and women''s singles winners.',
  website_url = 'https://www.bnpparibasopen.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'mar-2027-indian-wells';

update public.events set
  description = 'The Miami Open is a Masters 1000 / WTA 1000 event on the hard courts of Hard Rock Stadium, a key clay-court preparation event. Monthly picks lock in your men''s and women''s singles winners.',
  website_url = 'https://www.miamiopen.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'mar-2027-miami-open';

update public.events set
  description = 'The Haru Basho is sumo''s Spring Grand Tournament, held at Edion Arena Osaka over 15 days in March. The yusho winner is a free-text pick given the unpredictability of Japan''s top sumo division.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'mar-2027-haru-basho';

update public.events set
  description = 'Crufts is the world''s largest dog show, staged at the Birmingham NEC in March by the Kennel Club. Pop props invite picks on the Best in Show winner — announced on the Sunday evening of the four-day event.',
  website_url = 'https://www.crufts.org.uk',
  options = '["Afghan Hound","Border Collie","German Shepherd","Golden Retriever","Labrador Retriever","Miniature Poodle","Whippet","Flat-Coated Retriever","Welsh Terrier","Cocker Spaniel","Borzoi","Irish Setter"]'::jsonb
where slug = 'mar-2027-crufts';

update public.events set
  description = 'The FIDE Freestyle Chess World Championship uses a randomised starting position to test pure chess ability, removing the advantage of opening theory memorisation. Pre-season picks lock in before the bracket is set.',
  website_url = 'https://www.fide.com',
  options = '["Magnus Carlsen","Fabiano Caruana","Hikaru Nakamura","Alireza Firouzja","Ian Nepomniachtchi","Anish Giri","Levon Aronian","Viswanathan Anand","Richard Rapport","Wesley So","Shakhriyar Mamedyarov","Teimour Radjabov","Dmitry Andreikin","Vincent Keymer","Nodirbek Abdusattorov"]'::jsonb
where slug = 'mar-2027-chess';

update public.events set
  description = 'The Players Championship at TPC Sawgrass — with the famous island-green 17th hole — is the PGA Tour''s flagship event and its richest prize. Monthly picks lock in the winner from the world''s best field.',
  website_url = 'https://www.theplayersgolf.com',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'mar-2027-players-championship';

update public.events set
  description = 'The Boat Race between Oxford and Cambridge universities on the River Thames is a 174-year tradition and one of the oldest sporting rivalries in the world. Pop props open close to race day — it''s a binary winner.',
  website_url = 'https://www.theboatrace.org',
  options = '["Oxford","Cambridge"]'::jsonb
where slug = 'mar-2027-boat-race';

update public.events set
  description = 'The Masters Tournament at Augusta National is the first major of the golf season. Pick the outright winner from the world''s top players competing across four rounds on Augusta''s iconic course. Pre-season picks lock in maximum points.',
  website_url = 'https://www.masters.com',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'apr-2027-masters';

update public.events set
  description = 'The NCAA Men''s Final Four at Ford Field in Detroit decides the national champion across two games on Saturday and Monday. Pre-season picks lock in before Selection Sunday.',
  website_url = 'https://www.ncaa.com/march-madness',
  options = '["Duke","Kentucky","Kansas","North Carolina","Gonzaga","Villanova","Michigan State","Connecticut","Baylor","Houston","Purdue","Tennessee","Alabama","Iowa State","Arkansas","Creighton"]'::jsonb
where slug = 'apr-2027-ncaa-mens-final';

update public.events set
  description = 'The NCAA Women''s Final Four at Nationwide Arena in Columbus puts four remaining programs on the national stage to compete for the championship. Pre-season picks lock in before Selection Sunday.',
  website_url = 'https://www.ncaa.com/march-madness',
  options = '["South Carolina","Iowa","LSU","Connecticut","Notre Dame","Stanford","Texas","Tennessee","Indiana","North Carolina State","Baylor","Kansas State","Oregon","Maryland","Ohio State"]'::jsonb
where slug = 'apr-2027-ncaa-womens-final';

update public.events set
  description = 'The Voice US Season 30 finale on NBC features the final four artists competing for the title. Pop props open when the top four are announced — pick who wins the coaches'' and public vote.',
  website_url = 'https://www.nbc.com/the-voice',
  options = NULL
where slug = 'apr-2027-voice-finale';

update public.events set
  description = 'RuPaul''s Drag Race Season 19 finale on MTV crowns America''s Next Drag Superstar. Pop props open once the top five queens are revealed — pick who sashays away with the crown.',
  website_url = 'https://www.mtv.com/shows/rupauls-drag-race',
  options = NULL
where slug = 'apr-2027-drag-race';

update public.events set
  description = 'Married at First Sight Australia Season 14 on Channel 9 wraps with Final Vows and a reunion episode in April. Pop props open when the final couples are announced — pick who stays together.',
  website_url = 'https://9now.nine.com.au/married-at-first-sight',
  options = NULL
where slug = 'apr-2027-mafs';

update public.events set
  description = 'The Sidemen Charity Match 2027 at Wembley Stadium pits YouTube''s biggest creators against each other in an annual football match watched by millions live and online. Pop props focus on the winning team and top scorer.',
  website_url = 'https://www.youtube.com/sidemen',
  options = '["Sidemen FC","YouTubers XI"]'::jsonb
where slug = 'apr-2027-sidemen';

update public.events set
  description = 'The World Snooker Championship at the Crucible Theatre in Sheffield is the pinnacle of professional snooker — the third and final leg of the Triple Crown. Pre-season picks lock in the champion before the qualifying rounds.',
  website_url = 'https://www.wst.tv/events/world-championship',
  options = '["Ronnie O''Sullivan","Mark Selby","Judd Trump","Neil Robertson","Mark Williams","John Higgins","Barry Hawkins","Kyren Wilson","Ding Junhui","Luca Brecel","Si Jiahui","Zhang Anda","Mark Allen","Stephen Maguire","Ryan Day","Jack Lisowski","Stuart Bingham","Tom Ford","Gary Wilson","Shaun Murphy"]'::jsonb
where slug = 'apr-2027-world-snooker';

update public.events set
  description = 'The Grand National at Aintree is the world''s most famous steeplechase, run over 4 miles 2½ furlongs with 30 fences. Monthly picks lock in before declarations — pick the horse you think will survive and win.',
  website_url = 'https://www.thejockeyclub.co.uk/aintree/events-tickets/the-randox-grand-national-festival',
  options = NULL
where slug = 'apr-2027-grand-national';

update public.events set
  description = 'The 2027 NFL Draft is held in Washington DC on the National Mall — the first Draft in DC since 1941. Pop props open when the top prospects are evaluated — pick the #1 overall selection and your team''s first-round pick.',
  website_url = 'https://www.nfl.com/draft',
  options = NULL
where slug = 'apr-2027-nfl-draft';

update public.events set
  description = 'The Boston Marathon — the world''s oldest annual marathon and one of the six World Marathon Majors — is held on Patriots'' Day in April. Pop props open close to race morning — pick the elite men''s and women''s winners.',
  website_url = 'https://www.baa.org',
  options = NULL
where slug = 'apr-2027-boston-marathon';

update public.events set
  description = 'The London Marathon is the most popular World Marathon Major by elite field depth, held on the last Sunday of April through the streets of London. Pop props open close to race day — pick the elite winners.',
  website_url = 'https://www.londonmarathon.com',
  options = NULL
where slug = 'apr-2027-london-marathon';

update public.events set
  description = 'The World Marble Championship at Tinsley Green, West Sussex is a Good Friday tradition dating to 1932. The ultimate niche championship — pick the individual or team you expect to be crowned world marble champion.',
  website_url = 'https://www.worldmarbles.com',
  options = NULL
where slug = 'apr-2027-marbles';

update public.events set
  description = 'The WNBA Draft 2027 sees the top women''s college basketball prospects selected by WNBA franchises. Pop props focus on the #1 overall pick and which team selects first.',
  website_url = 'https://www.wnba.com/draft',
  options = NULL
where slug = 'apr-2027-wnba-draft';

update public.events set
  description = 'The NHL Stanley Cup Playoffs begin in April across four rounds, building to the Stanley Cup Final in June. Pre-season picks lock in your champion and Conn Smythe Trophy winner before the regular season.',
  website_url = 'https://www.nhl.com/playoffs',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'apr-2027-nhl-playoffs';

update public.events set
  description = 'The NBA Playoffs begin in April with the Play-In Tournament, building through four rounds to the NBA Finals in June. Pre-season picks lock in your champion and Finals MVP before the regular season.',
  website_url = 'https://www.nba.com/playoffs',
  options = '["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia 76ers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards"]'::jsonb
where slug = 'apr-2027-nba-playoffs';

update public.events set
  description = 'Coachella Valley Music and Arts Festival''s headliner lineup is typically revealed months in advance but confirmed by the festival itself. Pop props focus on the Sunday night headliner and most surprising supporting act.',
  website_url = 'https://www.coachella.com',
  options = NULL
where slug = 'apr-2027-coachella';

update public.events set
  description = 'The Met Gala on the first Monday in May is fashion''s biggest night, raising funds for the Metropolitan Museum''s Costume Institute. Pop props focus on the most-discussed celebrity look and the co-chair whose outfit best interprets the theme.',
  website_url = 'https://www.metmuseum.org/exhibitions/costume-institute',
  options = NULL
where slug = 'may-2027-met-gala';

update public.events set
  description = 'The Pulitzer Prizes are announced in the first week of May across 21 categories covering journalism, books, drama, and music. Pre-season picks lock in the Public Service and Feature Writing categories.',
  website_url = 'https://www.pulitzer.org',
  options = NULL
where slug = 'may-2027-pulitzers';

update public.events set
  description = 'The Kentucky Derby — "The Most Exciting Two Minutes in Sports" — is the first leg of American horse racing''s Triple Crown, run at Churchill Downs on the first Saturday in May. Monthly picks lock in before the final field is drawn.',
  website_url = 'https://www.kentuckyderby.com',
  options = NULL
where slug = 'may-2027-kentucky-derby';

update public.events set
  description = 'American Idol Season 25 finale on ABC airs in May, crowning the public''s favourite singer after months of live shows. Pop props open when the top five contestants are revealed.',
  website_url = 'https://abc.com/shows/american-idol',
  options = NULL
where slug = 'may-2027-american-idol';

update public.events set
  description = 'Survivor Season 52 finale on CBS airs in May, with the jury voting for the Sole Survivor. Pop props open when the final tribal council cast is set.',
  website_url = 'https://www.cbs.com/shows/survivor',
  options = NULL
where slug = 'may-2027-survivor';

update public.events set
  description = 'The Eurovision Song Contest 2027 Grand Final is hosted in Bulgaria (Sofia), gathering 26 nations for a live televised song competition voted on by national juries and the public. Pre-season picks lock in before the song releases.',
  website_url = 'https://eurovision.tv',
  options = '["Albania","Armenia","Australia","Austria","Azerbaijan","Belgium","Croatia","Cyprus","Czech Republic","Denmark","Estonia","Finland","France","Georgia","Germany","Greece","Hungary","Iceland","Ireland","Israel","Italy","Latvia","Lithuania","Luxembourg","Malta","Moldova","Montenegro","Netherlands","North Macedonia","Norway","Poland","Portugal","Romania","San Marino","Serbia","Slovenia","Spain","Sweden","Switzerland","Ukraine","United Kingdom"]'::jsonb
where slug = 'may-2027-eurovision';

update public.events set
  description = 'The Cannes Film Festival Palme d''Or is the highest prize in world cinema, awarded by an international jury at the end of the two-week festival on the French Riviera. Pop props open when the competition programme is announced.',
  website_url = 'https://www.festival-cannes.com',
  options = NULL
where slug = 'may-2027-cannes';

update public.events set
  description = 'The Giro d''Italia is the first of cycling''s three Grand Tours each season, raced over 21 stages through Italy in May and June. Pre-season picks lock in the overall GC winner before the race begins.',
  website_url = 'https://www.giroditalia.it/en',
  options = '["Jonas Vingegaard","Tadej Pogacar","Primoz Roglic","Remco Evenepoel","Carlos Rodriguez","Adam Yates","Simon Yates","Egan Bernal","David Gaudu","Enric Mas","Wilco Kelderman","Tom Pidcock","Mattias Skjelmose","Ben O''Connor","Felix Gall","Thibaut Pinot","Mikel Landa","Alejandro Valverde","Marc Soler","Guillaume Martin"]'::jsonb
where slug = 'may-2027-giro';

update public.events set
  description = 'The PGA Championship at Fields Ranch East in Frisco, Texas is the second major of the year, contested on a field open only to PGA professionals. Pre-season picks lock in before the Masters, for maximum points.',
  website_url = 'https://www.pgachampionship.com',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'may-2027-pga-championship';

update public.events set
  description = 'The Preakness Stakes at Pimlico Race Course is the second leg of the American Triple Crown, run over 1 3/16 miles on the third Saturday in May. Monthly picks lock in before the Kentucky Derby — a key Triple Crown sequential bet.',
  website_url = 'https://www.preaknessstakes.com',
  options = NULL
where slug = 'may-2027-preakness';

update public.events set
  description = 'The FA Cup Final at Wembley Stadium is the world''s oldest domestic cup competition and a showpiece occasion in the English football calendar. Pre-season picks lock in before the competition begins in August.',
  website_url = 'https://www.thefa.com/competitions/thefacup',
  options = '["Arsenal","Aston Villa","Bournemouth","Brentford","Brighton & Hove Albion","Chelsea","Crystal Palace","Everton","Fulham","Liverpool","Manchester City","Manchester United","Newcastle United","Nottingham Forest","Tottenham Hotspur","West Ham United","Wolverhampton Wanderers","Leeds United","Burnley","Sunderland"]'::jsonb
where slug = 'may-2027-fa-cup';

update public.events set
  description = 'The French Open (Roland-Garros) is the only Grand Slam played on clay, favouring baseline specialists and grinders. Pre-season picks lock in your champion before the draw — both men''s and women''s.',
  website_url = 'https://www.rolandgarros.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'may-2027-french-open-start';

update public.events set
  description = 'The Indian Premier League is the world''s richest domestic cricket tournament, with 10 franchises battling through a T20 format from March to May. Pre-season picks lock in the champion and Orange Cap (leading run-scorer) and Purple Cap (leading wicket-taker).',
  website_url = 'https://www.iplt20.com',
  options = '["Mumbai Indians","Chennai Super Kings","Royal Challengers Bengaluru","Kolkata Knight Riders","Delhi Capitals","Punjab Kings","Rajasthan Royals","Sunrisers Hyderabad","Gujarat Titans","Lucknow Super Giants"]'::jsonb
where slug = 'may-2027-ipl';

update public.events set
  description = 'The UEFA Champions League final is club football''s ultimate prize. Your pre-season pick from the group stage will have already locked in — the winner takes the biggest trophy in European football.',
  website_url = 'https://www.uefa.com/uefachampionsleague',
  options = '["Real Madrid","Manchester City","Bayern Munich","Liverpool","Arsenal","Chelsea","Barcelona","Atletico Madrid","Inter Milan","AC Milan","Napoli","Juventus","Paris Saint-Germain","Borussia Dortmund","RB Leipzig","Bayer Leverkusen","Ajax","Porto","Benfica","Sporting CP","Feyenoord","PSV Eindhoven","Shakhtar Donetsk","Dinamo Zagreb","Celtic","Rangers","Red Bull Salzburg","Galatasaray","Fenerbahce","Lazio","Villarreal","Sevilla"]'::jsonb
where slug = 'may-2027-ucl-final';

update public.events set
  description = 'UK local elections 2027 take place across councils in England on the first Thursday of May. Picks focus on the aggregate result — which party gains or loses the most councils overall.',
  website_url = 'https://www.electoralcommission.org.uk',
  options = '["Labour gains most councils","Conservative gains most councils","Liberal Democrats gain most councils","Reform UK gains most councils","No clear national swing"]'::jsonb
where slug = 'may-2027-uk-local-elections';

update public.events set
  description = 'The Cooper''s Hill Cheese Rolling and Wake in Gloucestershire is a beloved absurd tradition — competitors chase a 9 lb round of Double Gloucester cheese down a near-vertical hill. Pop props invite picks on the men''s and women''s race winners.',
  website_url = 'https://www.cheese-rolling.co.uk',
  options = NULL
where slug = 'may-2027-cheese-rolling';

update public.events set
  description = 'The Indianapolis 500 — "The Greatest Spectacle in Racing" — is one of the three jewels of motorsport''s Triple Crown, held on the Sunday of Memorial Day weekend at the Indianapolis Motor Speedway. Monthly picks lock in your race winner.',
  website_url = 'https://www.indianapolismotorspeedway.com',
  options = '["Scott Dixon","Will Power","Pato O''Ward","Josef Newgarden","Marcus Ericsson","Simon Pagenaud","Graham Rahal","Colton Herta","Alexander Rossi","Rinus VeeKay","Felix Rosenqvist","Christian Lundgaard","Helio Castroneves","Tony Kanaan","Ed Carpenter","Conor Daly"]'::jsonb
where slug = 'may-2027-indy-500';

update public.events set
  description = 'The Scripps National Spelling Bee in Washington DC is the premier spelling competition for American students in grades 1-8. Pop props open when the finalists are announced — pick who you think will win the championship.',
  website_url = 'https://www.spellingbee.com',
  options = NULL
where slug = 'may-2027-spelling-bee';

update public.events set
  description = 'The Europa League final is the championship match of UEFA''s second-tier club competition, traditionally held in May. Pre-season picks lock in your winner before the qualifying rounds begin.',
  website_url = 'https://www.uefa.com/uefaeuropaleague',
  options = '["Real Madrid","Manchester City","Bayern Munich","Liverpool","Arsenal","Chelsea","Barcelona","Atletico Madrid","Inter Milan","AC Milan","Napoli","Juventus","Paris Saint-Germain","Borussia Dortmund","RB Leipzig","Bayer Leverkusen","Ajax","Porto","Benfica","Sporting CP","Feyenoord","PSV Eindhoven","Shakhtar Donetsk","Dinamo Zagreb","Celtic","Rangers","Red Bull Salzburg","Galatasaray","Fenerbahce","Lazio","Villarreal","Sevilla"]'::jsonb
where slug = 'may-2027-europa-league';

update public.events set
  description = 'The UEFA Conference League final is the championship match of UEFA''s third-tier club competition, giving more clubs a route to European glory. Pre-season picks lock in your winner before the qualifying rounds.',
  website_url = 'https://www.uefa.com/uefaconferenceleague',
  options = '["Real Madrid","Manchester City","Bayern Munich","Liverpool","Arsenal","Chelsea","Barcelona","Atletico Madrid","Inter Milan","AC Milan","Napoli","Juventus","Paris Saint-Germain","Borussia Dortmund","RB Leipzig","Bayer Leverkusen","Ajax","Porto","Benfica","Sporting CP","Feyenoord","PSV Eindhoven","Shakhtar Donetsk","Dinamo Zagreb","Celtic","Rangers","Red Bull Salzburg","Galatasaray","Fenerbahce","Lazio","Villarreal","Sevilla","Fiorentina","Anderlecht","PAOK","Slavia Prague","Rapid Vienna"]'::jsonb
where slug = 'may-2027-conference-league';

update public.events set
  description = 'The UEFA Women''s Champions League final crowns the best women''s club side in Europe, a competition that has grown dramatically in profile and quality. Pre-season picks lock in your winner before the qualifying rounds.',
  website_url = 'https://www.uefa.com/womenschampionsleague',
  options = '["Barcelona","Chelsea","Lyon","Bayern Munich","Arsenal","Manchester City","Real Madrid","Paris Saint-Germain","Wolfsburg","Roma","Ajax","Brann","Manchester United","Atletico Madrid","Juventus","Benfica"]'::jsonb
where slug = 'may-2027-uwcl';

update public.events set
  description = 'The Natsu Basho is sumo''s Summer Grand Tournament, held at the Ryogoku Kokugikan in Tokyo over 15 days in May. The yusho winner is a free-text pick given the unpredictability of Japan''s top division.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'may-2027-natsu-basho';

update public.events set
  description = 'Apple''s Worldwide Developers Conference keynote in June is where the company unveils its major software and hardware announcements for the year. Pop props focus on the headline product reveal and which platform gets the biggest upgrade.',
  website_url = 'https://developer.apple.com/wwdc',
  options = NULL
where slug = 'jun-2027-wwdc';

update public.events set
  description = 'The 80th Tony Awards at Radio City Music Hall celebrate the best of Broadway''s 2026-27 season. Pre-season picks lock in Best Musical before the season''s shows have all opened.',
  website_url = 'https://www.tonyawards.com',
  options = NULL
where slug = 'jun-2027-tonys';

update public.events set
  description = 'The Monaco Grand Prix through the streets of the Principality is the most glamorous race on the F1 calendar and one of the sport''s most unpredictable circuits. Monthly picks lock in your race winner.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'jun-2027-monaco-gp';

update public.events set
  description = 'The NBA Finals 2027 pit the Eastern and Western Conference champions in a best-of-seven series for the Larry O''Brien Trophy. Pre-season picks lock in the champion and Finals MVP before tip-off of the regular season.',
  website_url = 'https://www.nba.com/playoffs',
  options = '["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia 76ers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards"]'::jsonb
where slug = 'jun-2027-nba-finals';

update public.events set
  description = 'The Stanley Cup Final 2027 is the NHL''s championship series, the longest and most gruelling playoff format in North American sport. Pre-season picks lock in the champion and Conn Smythe Trophy winner before the season begins.',
  website_url = 'https://www.nhl.com/playoffs',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'jun-2027-stanley-cup';

update public.events set
  description = 'The NBA Awards ceremony in June celebrates the season''s best performers — MVP, Rookie of the Year, Defensive Player of the Year, and Coach of the Year. Pre-season picks lock in these before the season tips off.',
  website_url = 'https://www.nba.com/awards',
  options = '["Atlanta Hawks","Boston Celtics","Brooklyn Nets","Charlotte Hornets","Chicago Bulls","Cleveland Cavaliers","Dallas Mavericks","Denver Nuggets","Detroit Pistons","Golden State Warriors","Houston Rockets","Indiana Pacers","Los Angeles Clippers","Los Angeles Lakers","Memphis Grizzlies","Miami Heat","Milwaukee Bucks","Minnesota Timberwolves","New Orleans Pelicans","New York Knicks","Oklahoma City Thunder","Orlando Magic","Philadelphia 76ers","Phoenix Suns","Portland Trail Blazers","Sacramento Kings","San Antonio Spurs","Toronto Raptors","Utah Jazz","Washington Wizards","Shai Gilgeous-Alexander","Victor Wembanyama","Jayson Tatum","Luka Doncic","Anthony Edwards","Giannis Antetokounmpo","Joel Embiid","Nikola Jokic","Donovan Mitchell","Tyrese Haliburton","Bam Adebayo","Devin Booker","Ja Morant","LeBron James","Kevin Durant","Kawhi Leonard"]'::jsonb
where slug = 'jun-2027-nba-awards';

update public.events set
  description = 'The NHL Awards ceremony in June celebrates the season''s best players — Hart Trophy (MVP), Norris Trophy (best defenseman), Vezina Trophy (best goalie), and Calder Trophy (best rookie). Pre-season picks lock in before the season begins.',
  website_url = 'https://www.nhl.com/awards',
  options = '["Anaheim Ducks","Boston Bruins","Buffalo Sabres","Calgary Flames","Carolina Hurricanes","Chicago Blackhawks","Colorado Avalanche","Columbus Blue Jackets","Dallas Stars","Detroit Red Wings","Edmonton Oilers","Florida Panthers","Los Angeles Kings","Minnesota Wild","Montreal Canadiens","Nashville Predators","New Jersey Devils","New York Islanders","New York Rangers","Ottawa Senators","Philadelphia Flyers","Pittsburgh Penguins","San Jose Sharks","Seattle Kraken","St. Louis Blues","Tampa Bay Lightning","Toronto Maple Leafs","Utah Hockey Club","Vancouver Canucks","Vegas Golden Knights","Washington Capitals","Winnipeg Jets"]'::jsonb
where slug = 'jun-2027-nhl-awards';

update public.events set
  description = 'The French Open finals at Roland-Garros are contested over the final weekend of the clay-court Grand Slam. Pop props open once the semi-finalists are set — pick the men''s and women''s champions.',
  website_url = 'https://www.rolandgarros.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'jun-2027-french-open-finals';

update public.events set
  description = 'The Belmont Stakes at Belmont Park is the final leg of the American Triple Crown — the longest and most demanding of the three races at 1½ miles. Monthly picks lock in once the Kentucky Derby and Preakness results are known.',
  website_url = 'https://www.belmontstakes.com',
  options = NULL
where slug = 'jun-2027-belmont';

update public.events set
  description = 'The U.S. Open Golf Championship at Pebble Beach Golf Links is the third major of the year, renowned for its brutal course setup and demanding par requirements. Pre-season picks lock in the champion before the Masters.',
  website_url = 'https://www.usopen.com',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'jun-2027-us-open-golf';

update public.events set
  description = 'Wimbledon Championships begins on the grass courts of the All England Club in late June — the most prestigious tournament in tennis. Pre-season picks lock in your men''s and women''s singles champions before the draw.',
  website_url = 'https://www.wimbledon.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'jun-2027-wimbledon-start';

update public.events set
  description = 'The NBA Draft is the entry point for college and international prospects into the league. Pop props focus on the #1 overall pick — announced on lottery night and confirmed on draft night.',
  website_url = 'https://www.nba.com/draft',
  options = NULL
where slug = 'jun-2027-nba-draft';

update public.events set
  description = 'The NHL Entry Draft is where the next generation of hockey stars enter the professional ranks. Pop props open when the draft order is set — pick the #1 overall selection.',
  website_url = 'https://www.nhl.com/draft',
  options = NULL
where slug = 'jun-2027-nhl-draft';

update public.events set
  description = 'Royal Ascot is Britain''s most prestigious flat racing festival, held over five days in the third week of June with the Queen''s (now King''s) Procession opening each day. Monthly picks focus on the Gold Cup winner.',
  website_url = 'https://www.ascot.com/royal-ascot',
  options = NULL
where slug = 'jun-2027-royal-ascot';

update public.events set
  description = 'The 24 Hours of Le Mans is the world''s oldest and most prestigious endurance race, held each June on the Circuit de la Sarthe. Monthly picks focus on the Hypercar class winner — the overall LMP-prototype victor.',
  website_url = 'https://www.24h-lemans.com',
  options = NULL
where slug = 'jun-2027-le-mans';

update public.events set
  description = 'IEM Cologne is the CS2 Major held at the LANXESS Arena in Cologne — one of esports'' most storied events with a €1.25M+ prize pool. Pre-season picks lock in the team you believe will claim the trophy.',
  website_url = 'https://www.eslgaming.com/iem-cologne',
  options = '["Natus Vincere","FaZe Clan","Vitality","G2 Esports","Team Liquid","Cloud9","MOUZ","Heroic","FURIA Esports","BIG","Astralis","NIP","Virtus.pro","OG","Monte","Complexity Gaming"]'::jsonb
where slug = 'jun-2027-iem-cologne';

update public.events set
  description = 'Love Island UK 2027 launches on ITV2 in early June, sending a new cast of singletons to a villa in search of romance. Pop props open on launch night — pick the couple you think will last.',
  website_url = 'https://www.itv.com/loveisland',
  options = NULL
where slug = 'jun-2027-love-island-launch';

update public.events set
  description = 'The UFC''s marquee June card features a high-profile main event — typically a championship fight or blockbuster superfight. Pop props open the week of the event — pick the main event winner.',
  website_url = 'https://www.ufc.com',
  options = NULL
where slug = 'jun-2027-ufc';

update public.events set
  description = 'The Henley Royal Regatta Grand Challenge Cup is the most prestigious open event at the world''s most famous rowing regatta, held on the Thames at Henley-on-Thames. Monthly picks lock in before the heat draws.',
  website_url = 'https://www.hrr.co.uk',
  options = NULL
where slug = 'jun-2027-henley';

update public.events set
  description = 'The FIFA Confederations Cup 2027 brings together the continental champions for an international tournament, serving as a World Cup warm-up competition. Pre-season picks lock in the champion from the field of qualified nations.',
  website_url = 'https://www.fifa.com/fifaplus/en/tournaments/mens/confederations-cup',
  options = '["Brazil","Argentina","France","Spain","England","Germany","Portugal","Italy","Netherlands","United States","Mexico","Japan","South Korea","Morocco","Senegal","Australia"]'::jsonb
where slug = 'jun-2027-confederations';

update public.events set
  description = 'Pride Month culminates on the last weekend of June with major parades in New York City and London. Pop props focus on notable cultural moments — attendance estimates, headlining performers, and significant announcements.',
  website_url = 'https://www.nycpride.org',
  options = NULL
where slug = 'jun-2027-pride';

update public.events set
  description = 'The Tour de France 2027 starts with the Grand Départ in Edinburgh — the first TDF start in Scotland. Pre-season picks lock in the overall GC winner from the world''s top climbers and all-rounders.',
  website_url = 'https://www.letour.fr/en',
  options = '["Jonas Vingegaard","Tadej Pogacar","Primoz Roglic","Remco Evenepoel","Carlos Rodriguez","Adam Yates","Simon Yates","Egan Bernal","David Gaudu","Enric Mas","Wilco Kelderman","Tom Pidcock","Mattias Skjelmose","Ben O''Connor","Felix Gall","Thibaut Pinot","Mikel Landa","Alejandro Valverde","Marc Soler","Guillaume Martin"]'::jsonb
where slug = 'jul-2027-tdf';

update public.events set
  description = 'The Wimbledon finals weekend at the All England Club features men''s and women''s singles, doubles, and mixed doubles finals on Centre Court. Pop props open once the semi-finalists are decided.',
  website_url = 'https://www.wimbledon.com',
  options = '["Jannik Sinner","Carlos Alcaraz","Novak Djokovic","Alexander Zverev","Daniil Medvedev","Casper Ruud","Andrey Rublev","Grigor Dimitrov","Hubert Hurkacz","Alex de Minaur","Taylor Fritz","Ben Shelton","Frances Tiafoe","Tommy Paul","Sebastian Korda","Ugo Humbert","Holger Rune","Arthur Fils","Lorenzo Musetti","Stefanos Tsitsipas","Jack Draper","Felix Auger-Aliassime","Tallon Griekspoor","Alejandro Davidovich Fokina","Sebastian Baez","Jiri Lehecka","Flavio Cobolli","Alexei Popyrin","Matteo Berrettini","Francisco Cerundolo","Tomas Martin Etcheverry","Jan-Lennard Struff","Lorenzo Sonego","Mariano Navone","Nuno Borges","Luciano Darderi","Luca Van Assche","Jakub Mensik","Giovanni Mpetshi Perricard","Miomir Kecmanovic","Aryna Sabalenka","Iga Swiatek","Coco Gauff","Elena Rybakina","Jasmine Paolini","Zheng Qinwen","Mirra Andreeva","Madison Keys","Emma Navarro","Daria Kasatkina","Paula Badosa","Barbora Krejcikova","Anna Kalinskaya","Donna Vekic","Linda Noskova","Beatriz Haddad Maia","Maria Sakkari","Caroline Wozniacki","Elina Svitolina","Victoria Azarenka","Jessica Pegula","Amanda Anisimova","Marketa Vondrousova","Sofia Kenin","Clara Tauson","Diana Shnaider","Yulia Putintseva","Liudmila Samsonova","Magda Linette","Katerina Siniakova","Varvara Gracheva","Ekaterina Alexandrova","Marie Bouzkova","Elise Mertens","Harriet Dart","Katie Boulter","Naomi Osaka","Sloane Stephens","Caroline Garcia","Alycia Parks"]'::jsonb
where slug = 'jul-2027-wimbledon-finals';

update public.events set
  description = 'The 155th Open Championship at St Andrews Old Course — 100 years after Bobby Jones''s famous Grand Slam — is golf''s oldest major and the fourth and final major of the season. Pre-season picks lock in the champion before the Masters.',
  website_url = 'https://www.theopen.com',
  options = '["Scottie Scheffler","Xander Schauffele","Rory McIlroy","Collin Morikawa","Viktor Hovland","Ludvig Åberg","Tommy Fleetwood","Jon Rahm","Patrick Cantlay","Wyndham Clark","Brian Harman","Max Homa","Hideki Matsuyama","Shane Lowry","Justin Thomas","Jordan Spieth","Brooks Koepka","Dustin Johnson","Cameron Smith","Tony Finau","Adam Scott","Corey Conners","Jason Day","Min Woo Lee","Tom Kim","Keegan Bradley","Nick Taylor","Sungjae Im","Seamus Power","Matt Fitzpatrick","Tyrrell Hatton","Russell Henley","Nick Dunlap","Akshay Bhatia","Jake Knapp","Harris English","Davis Thompson","Byeong Hun An","Stephan Jaeger","Si Woo Kim","Chris Kirk","Eric Cole","Ben Griffin","Joe Highsmith","Nicolai Højgaard","Rasmus Højgaard","Ryan Fox","Thomas Detry","Sepp Straka","Thriston Lawrence","Francesco Molinari","Sergio Garcia","Phil Mickelson","Bubba Watson","Will Zalatoris","Rickie Fowler","Cameron Young","Adam Hadwin","Kurt Kitayama","JT Poston"]'::jsonb
where slug = 'jul-2027-open-championship';

update public.events set
  description = 'The MLB All-Star Game at Wrigley Field in Chicago is the midsummer classic. Pop props open close to game day — pick the MVP and whether the American or National League wins.',
  website_url = 'https://www.mlb.com/all-star',
  options = '["American League","National League"]'::jsonb
where slug = 'jul-2027-mlb-allstar';

update public.events set
  description = 'The MLB Draft in July is where the top high school and college baseball prospects enter the professional pipeline. Pop props open when the draft order is known — pick the #1 overall selection.',
  website_url = 'https://www.mlb.com/draft',
  options = NULL
where slug = 'jul-2027-mlb-draft';

update public.events set
  description = 'The WSOP Main Event 2027 begins in Las Vegas, culminating with the ESPN-televised final table. With thousands of entrants, the champion is impossible to predict from the field — free text is the right format here.',
  website_url = 'https://www.wsop.com',
  options = NULL
where slug = 'jul-2027-wsop';

update public.events set
  description = 'Love Island UK 2027 final airs in late July after an eight-week run on ITV2. Pop props open once the final four couples are announced — pick your winners.',
  website_url = 'https://www.itv.com/loveisland',
  options = NULL
where slug = 'jul-2027-love-island-final';

update public.events set
  description = 'The Wife Carrying World Championships in Sonkajärvi, Finland on the first weekend of July pit couples against each other in a bizarre but beloved obstacle race. Pop props invite picks on the winning nation.',
  website_url = 'https://www.eukonkanto.fi/en',
  options = '["Finland","Estonia","Latvia","Lithuania","Russia","USA","Germany","Other"]'::jsonb
where slug = 'jul-2027-wife-carrying';

update public.events set
  description = 'Nathan''s Famous International Hot Dog Eating Contest on the Fourth of July at Coney Island is the most-watched competitive eating event on the planet. Pop props focus on the total dogs-and-buns consumed by the winner.',
  website_url = 'https://nathansfamous.com/hot-dog-eating-contest',
  options = NULL
where slug = 'jul-2027-nathans-hotdogs';

update public.events set
  description = 'The Henley Royal Regatta on the Thames is the world''s premier rowing regatta, attracting crews from across the globe. Monthly picks focus on the Grand Challenge Cup — the premier eights event.',
  website_url = 'https://www.hrr.co.uk',
  options = NULL
where slug = 'jul-2027-henley-regatta';

update public.events set
  description = 'The British Grand Prix at Silverstone is F1''s home race, with the most knowledgeable and passionate fans on the calendar. Monthly picks lock in your race winner from the 2027 grid.',
  website_url = 'https://www.formula1.com',
  options = '["Max Verstappen (Red Bull)","Liam Lawson (Red Bull)","Lewis Hamilton (Ferrari)","Charles Leclerc (Ferrari)","George Russell (Mercedes)","Andrea Kimi Antonelli (Mercedes)","Lando Norris (McLaren)","Oscar Piastri (McLaren)","Fernando Alonso (Aston Martin)","Lance Stroll (Aston Martin)","Esteban Ocon (Haas)","Oliver Bearman (Haas)","Pierre Gasly (Alpine)","Jack Doohan (Alpine)","Nico Hulkenberg (Sauber/Audi)","Gabriel Bortoleto (Sauber/Audi)","Yuki Tsunoda (Racing Bulls)","Isack Hadjar (Racing Bulls)","Alexander Albon (Williams)","Carlos Sainz (Williams)"]'::jsonb
where slug = 'jul-2027-f1-british-gp';

update public.events set
  description = 'The Nagoya Basho is sumo''s summer Grand Tournament, held in Nagoya''s Dolphins Arena over 15 days in July. The yusho winner is a free-text pick given the competitive and unpredictable nature of the top division.',
  website_url = 'https://www.sumo.or.jp/en/',
  options = NULL
where slug = 'jul-2027-nagoya-basho';

update public.events set
  description = 'The Emmy nominations announcement in July reveals which shows and performances are in contention for the September ceremony. Pop props invite picks on the most-nominated show and who gets the headline Drama and Comedy nominations.',
  website_url = 'https://www.emmys.com',
  options = NULL
where slug = 'jul-2027-emmy-noms';

update public.events set
  description = 'The Booker Prize 2027 longlist — the "Booker Dozen" of 12-13 novels — is revealed in July. Pop props invite picks on which titles make the longlist and which author earns their first nomination.',
  website_url = 'https://thebookerprizes.com',
  options = NULL
where slug = 'jul-2027-booker-longlist';

update public.events set
  description = 'The Esports World Cup in Riyadh is a multi-game mega-event expanding annually, with the world''s best teams competing across titles from League of Legends to CS2. Monthly picks focus on the overall Club Championship standings winner.',
  website_url = 'https://esportsworldcup.com',
  options = '["Team Liquid","Cloud9","Fnatic","G2 Esports","Natus Vincere","T1","Gen.G","Team Falcons","LOUD","Sentinels","Evil Geniuses"]'::jsonb
where slug = 'jul-2027-esports-world-cup';

update public.events set
  description = 'The Tour de France Femmes 2027 follows the men''s race, contested over eight mountain stages through France. Pre-season picks lock in the GC winner from the world''s best female climbers.',
  website_url = 'https://www.letour.fr/en/race/tour-de-france-femmes',
  options = '["Demi Vollering","Annemiek van Vleuten","Elisa Longo Borghini","Cecilie Uttrup Ludwig","Lotte Kopecky","Kasia Niewiadoma","Niamh Fisher-Black","Puck Pieterse","Grace Brown","Pauliena Rooijakkers","Marlen Reusser","Silvia Persico","Sofia Bertizzolo","Juliette Labous","Elisa Chabbey"]'::jsonb
where slug = 'jul-2027-tdf-femmes';
