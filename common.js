const avg = (arr) => arr.reduce((acc, c) => acc + c, 0) / arr.length

const generateBootstrapCarousel = (element, imageSources) => {
    // Create carousel container
    const carousel = document.createElement('div');
    carousel.className = 'carousel slide';
    carousel.dataset.bsRide = 'carousel';

    // Create unique ID for this carousel
    const carouselId = `carousel-${Date.now()}`;
    carousel.id = carouselId;

    // Create carousel indicators
    const carouselIndicators = document.createElement('div');
    carouselIndicators.className = 'carousel-indicators';

    imageSources.forEach((src, index) => {
        const indicator = document.createElement('button');
        indicator.type = 'button';
        indicator.dataset.bsTarget = `#${carouselId}`;
        indicator.dataset.bsSlideTo = index;
        if (index === 0) {
            indicator.className = 'active';
            indicator.setAttribute('aria-current', 'true');
        }
        indicator.setAttribute('aria-label', `Slide ${index + 1}`);
        carouselIndicators.appendChild(indicator);
    });

    // Create carousel inner container
    const carouselInner = document.createElement('div');
    carouselInner.className = 'carousel-inner';

    // Create slides
    imageSources.forEach((src, index) => {
        const carouselItem = document.createElement('div');
        carouselItem.className = index === 0 ? 'carousel-item active' : 'carousel-item';

        const img = document.createElement('img');
        img.src = src;
        img.className = 'd-block';
        img.style.width = '100%';
        img.style.height = '400px';
        img.style.objectFit = 'cover';
        img.style.maxWidth = '800px';
        img.style.margin = '0 auto';

        carouselItem.appendChild(img);
        carouselInner.appendChild(carouselItem);
    });

    // Create previous control
    const prevButton = document.createElement('button');
    prevButton.className = 'carousel-control-prev';
    prevButton.type = 'button';
    prevButton.dataset.bsTarget = `#${carouselId}`;
    prevButton.dataset.bsSlide = 'prev';

    const prevIcon = document.createElement('span');
    prevIcon.className = 'carousel-control-prev-icon';
    prevIcon.setAttribute('aria-hidden', 'true');

    const prevText = document.createElement('span');
    prevText.className = 'visually-hidden';
    prevText.textContent = 'Previous';

    prevButton.appendChild(prevIcon);
    prevButton.appendChild(prevText);

    // Create next control
    const nextButton = document.createElement('button');
    nextButton.className = 'carousel-control-next';
    nextButton.type = 'button';
    nextButton.dataset.bsTarget = `#${carouselId}`;
    nextButton.dataset.bsSlide = 'next';

    const nextIcon = document.createElement('span');
    nextIcon.className = 'carousel-control-next-icon';
    nextIcon.setAttribute('aria-hidden', 'true');

    const nextText = document.createElement('span');
    nextText.className = 'visually-hidden';
    nextText.textContent = 'Next';

    nextButton.appendChild(nextIcon);
    nextButton.appendChild(nextText);

    // Assemble carousel
    carousel.appendChild(carouselIndicators);
    carousel.appendChild(carouselInner);
    carousel.appendChild(prevButton);
    carousel.appendChild(nextButton);

    // Clear element and add carousel
    element.innerHTML = '';
    element.appendChild(carousel);
}

const generatePumpDifficulty = (difficulty) => {
    // Extract the letter and number from the difficulty string (e.g., "S15" -> "S" and "15")
    const letter = difficulty.charAt(0).toLowerCase();
    const number = difficulty.slice(1);

    const span = document.createElement('span');
    span.className = 'pump-difficulty';
    span.textContent = number;

    // Style based on the letter
    if (letter === 's') {
        span.style.cssText = `
            background-color: #ff4444;
            border: 2px solid #cc0000;
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        `;
    } else if (letter === 'd') {
        span.style.cssText = `
            background-color: #44ff44;
            border: 2px solid #008800;
            color: white;
            border-radius: 50%;
            width: 30px;
            height: 30px;
            display: inline-flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
        `;
    }

    return span;
}

const generateSmxDifficulty = (difficultyString) => {
    // Extract the letter and number from the difficulty string (e.g., "W20" -> "W" and "20")
    const letter = difficultyString.charAt(0).toLowerCase();
    const number = difficultyString.slice(1);

    // Map letters to image filenames
    const difficultyMap = {
        'b': 'beginner',
        'e': 'easy',
        'h': 'hard',
        'w': 'wild',
        'd': 'dual',
        'f': 'full'
    };

    // Get the corresponding image filename
    const imageName = difficultyMap[letter];

    if (!imageName) {
        console.warn(`Unknown difficulty letter: ${letter}`);
        return difficultyString; // Return original string if mapping not found
    }

    // Create inline element with number and image
    const span = document.createElement('span');
    span.className = 'smx-difficulty';

    // Add the number
    const numberSpan = document.createElement('span');
    numberSpan.className = 'difficulty-number';
    numberSpan.textContent = number;

    // Add the image
    const img = document.createElement('img');
    img.src = `gfx/common/smx/${imageName}.webp`;
    img.alt = imageName;
    img.className = 'difficulty-icon';

    span.appendChild(numberSpan);
    span.appendChild(img);

    return span;
}

const generatePlayerScoreData = (scores, difficulties, songNames, difficultyGenerator, jacketData) => {
    const rows = [];

    for (let i = 0; i < scores.length; i++) {
        const row = document.createElement('div');
        row.className = 'player-score-row';
        row.style.alignItems = 'center';

        // Set background image if jacket data is available
        if (jacketData && jacketData[songNames[i]] && jacketData[songNames[i]].jacketSrc) {
            row.style.backgroundImage = `url(${jacketData[songNames[i]].jacketSrc})`;
            row.style.backgroundSize = 'cover';
            row.style.backgroundPosition = 'center';
            row.style.backgroundRepeat = 'no-repeat';
        }

        // Song name
        const songNameSpan = document.createElement('span');
        songNameSpan.className = 'song-name';
        songNameSpan.textContent = songNames[i];

        // Difficulty with image (using the passed function)
        const difficultyElement = difficultyGenerator(difficulties[i]);

        // Score
        const scoreSpan = document.createElement('span');
        scoreSpan.className = 'song-score';
        scoreSpan.textContent = scores[i].toLocaleString();

        row.appendChild(songNameSpan);
        row.appendChild(difficultyElement);
        row.appendChild(scoreSpan);

        rows.push(row);
    }

    return rows;
}

const generatePlayerAccordion = (playerName, scores, difficulties, songNames, difficultyGenerator, jacketData, gameType) => {
    // Calculate average score
    const averageScore = avg(scores);

    // Create accordion item
    const accordionItem = document.createElement('div');
    accordionItem.className = 'accordion-item';

    // Create unique ID for this accordion
    const accordionId = `accordion-${gameType}-${playerName.replace(/\s+/g, '-').toLowerCase()}`;

    // Create accordion header
    const accordionHeader = document.createElement('h2');
    accordionHeader.className = 'accordion-header';

    const accordionButton = document.createElement('button');
    accordionButton.className = 'accordion-button collapsed';
    accordionButton.type = 'button';
    accordionButton.setAttribute('data-bs-toggle', 'collapse');
    accordionButton.setAttribute('data-bs-target', `#${accordionId}`);
    accordionButton.setAttribute('aria-expanded', 'false');
    accordionButton.setAttribute('aria-controls', accordionId);

    // Button content: player name and average score
    const buttonContentDiv = document.createElement('div');
    buttonContentDiv.className = 'd-flex w-100 justify-content-between';

    const playerNameSpan = document.createElement('span');
    playerNameSpan.className = 'player-name';
    playerNameSpan.textContent = playerName;

    const averageSpan = document.createElement('span');
    averageSpan.className = 'player-average pe-2';
    averageSpan.textContent = `Avg: ${Math.round(averageScore).toLocaleString()}`;

    buttonContentDiv.appendChild(playerNameSpan);
    buttonContentDiv.appendChild(averageSpan);
    accordionButton.appendChild(buttonContentDiv);
    accordionHeader.appendChild(accordionButton);

    // Create accordion collapse body
    const accordionCollapse = document.createElement('div');
    accordionCollapse.id = accordionId;
    accordionCollapse.className = 'accordion-collapse collapse';

    const accordionBody = document.createElement('div');
    accordionBody.className = 'accordion-body';

    // Generate score data using the helper function
    const scoreRows = generatePlayerScoreData(scores, difficulties, songNames, difficultyGenerator, jacketData);
    scoreRows.forEach(row => accordionBody.appendChild(row));

    accordionCollapse.appendChild(accordionBody);

    // Assemble accordion item
    accordionItem.appendChild(accordionHeader);
    accordionItem.appendChild(accordionCollapse);

    return accordionItem;
}

const generateScoreTable = (initialPlayers, songNames, gameName, difficultyGenerator, jacketData) => {
    // State management for sorting and column visibility
    let sortConfig = { column: 'player', direction: 'asc' };
    let currentPlayers = [...initialPlayers];
    let visibleColumns = [...songNames]; // All columns visible by default

    // Default sort by player name ascending
    currentPlayers.sort((a, b) => a.name.localeCompare(b.name));

    // Create table
    const table = document.createElement('table');
    table.className = 'table table-bordered mt-3';

    // Function to update table body
    const updateTableBody = () => {
        const tbody = table.querySelector('tbody');
        tbody.innerHTML = '';

        currentPlayers.forEach(player => {
            const playerData = players[player.name];
            if (playerData[gameName]) {
                const row = document.createElement('tr');

                // Player name cell
                const playerCell = document.createElement('td');
                playerCell.textContent = player.name;
                playerCell.className = 'player-name-cell';
                row.appendChild(playerCell);

                // Score cells for visible songs only
                songNames.forEach((songName, index) => {
                    if (visibleColumns.includes(songName)) {
                        const scoreCell = document.createElement('td');
                        scoreCell.className = 'score-cell';

                        // Create container for difficulty and score
                        const cellContainer = document.createElement('div');
                        cellContainer.className = 'score-cell-content';

                        // Add difficulty element
                        const difficultyElement = difficultyGenerator(playerData[gameName].difficulty[index]);

                        // Add score
                        const scoreSpan = document.createElement('div');
                        scoreSpan.textContent = playerData[gameName].scores[index].toLocaleString();
                        scoreSpan.className = 'score-value';

                        cellContainer.appendChild(difficultyElement);
                        cellContainer.appendChild(scoreSpan);
                        scoreCell.appendChild(cellContainer);

                        row.appendChild(scoreCell);
                    }
                });

                tbody.appendChild(row);
            }
        });
    };

    // Function to update header indicators
    const updateHeaderIndicators = () => {
        // Reset all headers
        table.querySelectorAll('th').forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
        });

        // Add indicator to current sort column
        if (sortConfig.column === 'player') {
            const playerHeader = table.querySelector('.player-header');
            if (playerHeader) {
                playerHeader.classList.add(sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        } else {
            const songIndex = songNames.indexOf(sortConfig.column);
            if (songIndex !== -1 && visibleColumns.includes(sortConfig.column)) {
                const visibleHeaders = table.querySelectorAll('.song-header');
                const visibleSongIndex = visibleColumns.indexOf(sortConfig.column);
                if (visibleHeaders[visibleSongIndex]) {
                    visibleHeaders[visibleSongIndex].classList.add(sortConfig.direction === 'asc' ? 'sort-asc' : 'sort-desc');
                }
            }
        }
    };

    // Create header row
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');

    // Player name header with click handler
    const playerHeader = document.createElement('th');
    playerHeader.textContent = 'Player';
    playerHeader.className = 'player-header sortable-header player-header-no-bg';
    playerHeader.style.cursor = 'pointer';

    playerHeader.addEventListener('click', () => {
        if (sortConfig.column === 'player') {
            sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
        } else {
            sortConfig.column = 'player';
            sortConfig.direction = 'asc';
        }

        // Sort players by name
        currentPlayers.sort((a, b) => {
            const comparison = a.name.localeCompare(b.name);
            return sortConfig.direction === 'asc' ? comparison : -comparison;
        });

        updateTableBody();
        updateHeaderIndicators();
    });

    headerRow.appendChild(playerHeader);

    // Store references to headers for visibility toggling
    let songHeaders = [];

    // Song headers with click handlers
    songNames.forEach((songName, songIndex) => {
        const songHeader = document.createElement('th');
        songHeader.textContent = songName;
        songHeader.className = 'song-header sortable-header';
        songHeader.style.cursor = 'pointer';

        if (jacketData && jacketData[songName] && jacketData[songName].jacketSrc) {
            songHeader.style.backgroundImage = `url(${jacketData[songName].jacketSrc})`;
            songHeader.style.backgroundSize = 'cover';
            songHeader.style.backgroundPosition = 'center';
            songHeader.style.backgroundRepeat = 'no-repeat';
        }

        songHeader.addEventListener('click', () => {
            if (sortConfig.column === songName) {
                sortConfig.direction = sortConfig.direction === 'asc' ? 'desc' : 'asc';
            } else {
                sortConfig.column = songName;
                sortConfig.direction = 'desc'; // Default to highest scores first
            }

            // Sort players by this song's score
            currentPlayers.sort((a, b) => {
                const playerAData = players[a.name];
                const playerBData = players[b.name];

                if (!playerAData[gameName] || !playerBData[gameName]) return 0;

                const scoreA = playerAData[gameName].scores[songIndex];
                const scoreB = playerBData[gameName].scores[songIndex];

                const comparison = scoreA - scoreB;
                return sortConfig.direction === 'asc' ? comparison : -comparison;
            });

            updateTableBody();
            updateHeaderIndicators();
        });

        // Store reference for visibility toggling
        songHeaders.push(songHeader);
        headerRow.appendChild(songHeader);
    });

    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create initial table body
    const tbody = document.createElement('tbody');
    table.appendChild(tbody);

    // Initial render
    updateTableBody();
    updateHeaderIndicators();

    // Create column toggle controls
    const controlsContainer = document.createElement('div');
    controlsContainer.className = 'table-controls mb-3';

    const controlsTitle = document.createElement('h6');
    controlsTitle.textContent = 'Show/Hide Columns:';
    controlsTitle.className = 'mb-2';
    controlsContainer.appendChild(controlsTitle);

    const checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'form-check-container d-flex flex-wrap gap-3';

    songNames.forEach(songName => {
        const checkWrapper = document.createElement('div');
        checkWrapper.className = 'form-check form-check-inline';

        const checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.className = 'form-check-input';
        checkbox.id = `col-${songName.replace(/\s+/g, '-').toLowerCase()}`;
        checkbox.checked = true; // All checked by default
        checkbox.dataset.songName = songName;

        const label = document.createElement('label');
        label.className = 'form-check-label';
        label.htmlFor = checkbox.id;
        label.textContent = songName;

        checkbox.addEventListener('change', (e) => {
            const songName = e.target.dataset.songName;
            if (e.target.checked) {
                // Add column back
                if (!visibleColumns.includes(songName)) {
                    visibleColumns.push(songName);
                }
            } else {
                // Remove column
                visibleColumns = visibleColumns.filter(col => col !== songName);
            }
            updateTableHeaders();
            updateTableBody();
            updateHeaderIndicators();
        });

        checkWrapper.appendChild(checkbox);
        checkWrapper.appendChild(label);
        checkboxContainer.appendChild(checkWrapper);
    });

    controlsContainer.appendChild(checkboxContainer);

    // Update table headers function to handle visibility
    const updateTableHeaders = () => {
        const headerRow = table.querySelector('thead tr');
        headerRow.innerHTML = '';

        // Always add player header
        headerRow.appendChild(playerHeader);

        // Add visible song headers
        songHeaders.forEach((header, index) => {
            const songName = songNames[index];
            if (visibleColumns.includes(songName)) {
                headerRow.appendChild(header);
            }
        });
    };

    // Wrap table in responsive container
    const tableWrapper = document.createElement('div');
    tableWrapper.className = 'table-wrapper';

    tableWrapper.appendChild(controlsContainer);
    tableWrapper.appendChild(table);

    return tableWrapper;
}

const initializeCinnamorollScrollProgress = () => {
    // Create scroll progress container
    const progressContainer = document.createElement('div');
    progressContainer.className = 'cinnamoroll-scroll-progress';
    progressContainer.style.cssText = `
        position: fixed;
        bottom: 20px;
        left: 0;
        right: 0;
        height: 150px;
        z-index: 1000;
        pointer-events: none;
    `;

    // Create cinnamoroll character
    const cinnamoroll = document.createElement('img');
    cinnamoroll.className = 'cinnamoroll-character';
    cinnamoroll.src = 'gfx/common/cinnamorollwalk.png';
    cinnamoroll.style.cssText = `
        position: absolute;
        left: 30px;
        top: 0;
        width: 150px;
        height: 150px;
        transition: left 0.1s ease-out;
    `;

    // Create goal flag
    const goalFlag = document.createElement('img');
    goalFlag.className = 'goal-flag';
    goalFlag.src = 'gfx/common/goalflag.png';
    goalFlag.style.cssText = `
        position: absolute;
        right: 30px;
        top: 0;
        width: 150px;
        height: 150px;
    `;

    progressContainer.appendChild(cinnamoroll);
    progressContainer.appendChild(goalFlag);
    document.body.appendChild(progressContainer);

    // Scroll progress handler
    const handleScroll = () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = Math.min(scrollTop / docHeight, 1);

        // Calculate position between start (30px) and goal flag position
        const containerWidth = window.innerWidth;
        const startPosition = 30; // 30px from left
        const endPosition = containerWidth - 30 - 150 - 150; // 30px from right - flag width - cinnamoroll width
        const currentPosition = startPosition + (scrollPercent * (endPosition - startPosition));

        cinnamoroll.style.left = currentPosition + 'px';

        // Switch to happy cinnamoroll when reached the goal
        if (scrollPercent >= 0.98) { // Switch very close to the end
            cinnamoroll.src = 'gfx/common/happycinnamoroll.png';
        } else {
            cinnamoroll.src = 'gfx/common/cinnamorollwalk.png';
        }
    };

    // Add scroll event listener
    window.addEventListener('scroll', handleScroll);

    // Initial call to set position
    handleScroll();
}