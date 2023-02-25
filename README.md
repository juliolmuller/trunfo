<h1 title="Move.It" align="center">
  <img src="./public/favicon.ico" width="32px" alt="Trunfo" style="position: relative; top: 4px;" />
  Trunfo
</h1>

<!--
<p align="center">
  <a href="#trophy-lessons-learned">Lessons Learned</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#rocket-technologies--resources">Technologies</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#hammer-setting-up-the-environment">Environment Setup</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#zap-features-implementations">Features</a>
</p>

<p align="center">
  <img src="https://img.shields.io/static/v1?labelColor=000000&color=8257E5&label=created%20at&message=april%202021" alt="Creation Date" />

  <img src="https://img.shields.io/github/last-commit/juliolmuller/podcastr?label=updated%20at&labelColor=000000&color=8257E5" alt="Update Date" />

  <img src="https://img.shields.io/static/v1?labelColor=000000&color=8257E5&label=PRs&message=welcome" alt="Pull Requests Welcome" />

  <img src="https://img.shields.io/github/license/juliolmuller/podcastr?labelColor=000000&color=8257E5" alt="Project License" />
</p> 
-->

## Glossary

- **Game:** jogo
- **Match:** partida
- **Round:** rodada
- **Turn:** jogada, vez

## Domain

- 1 **game** has `n` matches, being `n >= 1`;
- 1 **match** has `n` roundss, being `n >= 1`;
- The **round** is directly proportional to the number of cards distributed to a player in a **match**. Therefore, if `c` is the amount of cars per player and `r` the amount of rounds, `r = c` will always be true;
