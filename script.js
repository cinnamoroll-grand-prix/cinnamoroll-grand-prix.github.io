const leaderboard = document.getElementById("leaderboard");
for (const course of courses) {
  const li = document.createElement("li");
  li.className = "course accordion";

  const courseNameHeader = document.createElement("h2");
    courseNameHeader.textContent = course.name;
  li.appendChild(courseNameHeader);

  const divider = document.createElement("p");
  divider.textContent = "───── ⋆⋅☆⋅⋆ ─────";
  li.appendChild(divider);

  for (const data of course.data) {
    const avg = Math.floor(data.scores.reduce((prev, score) => { return prev + score.score; }, 0) / data.scores.length);
    data.avg = avg;
  }
  course.data.sort((a, b) => b.avg - a.avg);
  
  for (const [i, data] of course.data.entries()) {
    const playerAccordion = document.createElement("div");
    playerAccordion.className = "accordion-item";

    const accordionHeader = document.createElement("h3");
    accordionHeader.className = "accordion-header";
    headerButton = document.createElement("button");
    headerButton.className = "accordion-button collapsed";
    headerButton.setAttribute("type", "button");
    headerButton.setAttribute("data-bs-toggle", "collapse");
    headerButton.setAttribute("data-bs-target", `#collapse-${course.id}-${data.player}`);
    headerButton.setAttribute("aria-expanded", "false");
    headerButton.setAttribute("aria-controls", `collapse-${course.id}-${data.player}`);

    const rank = document.createElement("span");
    rank.textContent = `#${i + 1}`;
    rank.className = "rank";
    headerButton.appendChild(rank);

    const playerName = document.createElement("span");
    playerName.textContent = data.player;
    playerName.className = "player";
    headerButton.appendChild(playerName);

    const avg = document.createElement("span");
    avg.textContent = data.avg;
    avg.className = "avg";
    headerButton.appendChild(avg);

    if (i == 0) {
        headerButton.style.background = "linear-gradient(to right, #f6d4e3, #fefbba, #d1ebf6, #b0daec, #4cb4f0)";
        headerButton.style.fontSize = "24px";
    } else if (i == 1) {
        headerButton.style.backgroundColor = "rgba(246, 212, 227, 0.5)";
        headerButton.style.fontSize = "21px";
    } else if (i == 2) {
        headerButton.style.backgroundColor = "rgba(254, 251, 186, 0.5)";
        headerButton.style.fontSize = "18px";
    }

    accordionHeader.appendChild(headerButton);

    const accordionBody = document.createElement("div");
    accordionBody.className = "accordion-collapse collapse";
    accordionBody.id = `collapse-${course.id}-${data.player}`;
    accordionBody.setAttribute("data-bs-parent", `leaderboard`);

    const accordionBodyContent = document.createElement("div");
    accordionBodyContent.className = "accordion-body";

    console.log(data);
    console.log(data.scores);
    for (const [index, score] of data.scores.entries()) {
      const scoreElement = document.createElement("div");
      
      const songName = document.createElement("span");
        songName.textContent = `${course.songs[index]}`;
        songName.className = "song-name";
        scoreElement.appendChild(songName);

        const difficulty = document.createElement("span");
        difficulty.className = "difficulty";

        const difficultyTextLeft = document.createElement("span");
        difficultyTextLeft.textContent = `(${score.difficulty}`;
        difficulty.appendChild(difficultyTextLeft);

        const difficultyIcon = document.createElement("img");
        if (data.isDouble) {
          difficultyIcon.src = "gfx/full.webp";
        } else if (score.difficulty < 19) {
          difficultyIcon.src = "gfx/hard.webp";
        } else if (score.difficulty >= 19) {
          difficultyIcon.src = "gfx/wild.webp";
        }
        difficultyIcon.className = "difficulty-icon";
        difficulty.appendChild(difficultyIcon);
        
        const difficultyTextRight = document.createElement("span");
        difficultyTextRight.textContent = ")";
        difficulty.appendChild(difficultyTextRight);

        scoreElement.appendChild(difficulty);

        const songScore = document.createElement("span");
        songScore.textContent = `${score.score}`;
        songScore.className = "song-score";
        scoreElement.appendChild(songScore);

      accordionBodyContent.appendChild(scoreElement);
    }

    accordionBody.appendChild(accordionBodyContent);

    playerAccordion.appendChild(accordionHeader);
    playerAccordion.appendChild(accordionBody);

    li.appendChild(playerAccordion);
  }

  leaderboard.appendChild(li);
}