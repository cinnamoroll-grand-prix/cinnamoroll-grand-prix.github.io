const getSortedPlayersByGame = (gameName) => {
    const playerScores = [];

    // Extract data for each player
    for (const playerName in players) {
        if (players[playerName][gameName]) {
            const scores = players[playerName][gameName].scores;
            const averageScore = avg(scores);
            playerScores.push({
                name: playerName,
                score: averageScore
            });
        }
    }

    // Sort by average score (highest first)
    return playerScores.sort((a, b) => b.score - a.score);
}

const smx_overall = document.getElementById("smx-overall");
const pump_overall = document.getElementById("pump-overall");

const populateLeaderboards = () => {
    // Get sorted players for SMX
    const smxPlayers = getSortedPlayersByGame("smx");

    // Clear existing content
    smx_overall.innerHTML = "";

    // Create accordion container for SMX
    const smxAccordion = document.createElement('div');
    smxAccordion.className = 'accordion';

    // Populate SMX leaderboard with accordions
    smxPlayers.forEach(player => {
        const playerData = players[player.name];
        if (playerData.smx) {
            const accordion = generatePlayerAccordion(
                player.name,
                playerData.smx.scores,
                playerData.smx.difficulty,
                smx_songs,
                generateSmxDifficulty,
                smx_songs_data,
                'smx'
            );
            smxAccordion.appendChild(accordion);
        }
    });

    smx_overall.appendChild(smxAccordion);

    // Get sorted players for Pump
    const pumpPlayers = getSortedPlayersByGame("pump");

    // Clear existing content
    pump_overall.innerHTML = "";

    // Create accordion container for Pump
    const pumpAccordion = document.createElement('div');
    pumpAccordion.className = 'accordion';

    // Populate Pump leaderboard with accordions
    pumpPlayers.forEach(player => {
        const playerData = players[player.name];
        if (playerData.pump) {
            const accordion = generatePlayerAccordion(
                player.name,
                playerData.pump.scores,
                playerData.pump.difficulty,
                pump_songs,
                generatePumpDifficulty,
                pump_songs_data,
                'pump'
            );
            pumpAccordion.appendChild(accordion);
        }
    });

    pump_overall.appendChild(pumpAccordion);
}

const initializeTabs = () => {
    const tabsContainer = document.getElementById("tabs");
    const detailedLeaderboard = document.getElementById("detailed-leaderboard");

    // Clear existing tabs
    tabsContainer.innerHTML = "";

    // Create SMX tab
    const smxTab = document.createElement("li");
    smxTab.className = "nav-item";
    const smxLink = document.createElement("a");
    smxLink.className = "nav-link active";
    smxLink.textContent = "SMX";
    smxLink.dataset.game = "smx";
    smxTab.appendChild(smxLink);

    // Create Pump tab
    const pumpTab = document.createElement("li");
    pumpTab.className = "nav-item";
    const pumpLink = document.createElement("a");
    pumpLink.className = "nav-link";
    pumpLink.textContent = "Pump";
    pumpLink.dataset.game = "pump";
    pumpTab.appendChild(pumpLink);

    tabsContainer.appendChild(smxTab);
    tabsContainer.appendChild(pumpTab);

    // Add click event listeners
    smxLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Update active states
        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        smxLink.classList.add("active");
        // Render SMX detailed leaderboard
        renderDetailedLeaderboard("smx");
    });

    pumpLink.addEventListener("click", (e) => {
        e.preventDefault();
        // Update active states
        document.querySelectorAll(".nav-link").forEach(link => link.classList.remove("active"));
        pumpLink.classList.add("active");
        // Render Pump detailed leaderboard
        renderDetailedLeaderboard("pump");
    });

    // Initialize with SMX tab active
    renderDetailedLeaderboard("smx");
}

const renderDetailedLeaderboard = (gameName) => {
    const detailedLeaderboard = document.getElementById("detailed-leaderboard");
    const sortedPlayers = getSortedPlayersByGame(gameName);

    // Clear existing content
    detailedLeaderboard.innerHTML = "";

    // Determine which data and generator to use
    let songNames, jacketData, difficultyGenerator;

    if (gameName === "smx") {
        songNames = smx_songs;
        jacketData = smx_songs_data;
        difficultyGenerator = generateSmxDifficulty;
    } else {
        songNames = pump_songs;
        jacketData = pump_songs_data;
        difficultyGenerator = generatePumpDifficulty;
    }

    // Generate table using common function
    const table = generateScoreTable(sortedPlayers, songNames, gameName, difficultyGenerator, jacketData);
    detailedLeaderboard.appendChild(table);
}

// Initialize carousel
const carouselElement = document.getElementById('carousel');
const carouselImages = [
    'gfx/cgp2/cgp2overallgrouppic.jpg',
    'gfx/cgp2/cgp2smxgrouppic.jpg',
    'gfx/cgp2/cgp2pumpgrouppic.jpg'
];
generateBootstrapCarousel(carouselElement, carouselImages);

// Initialize scroll progress
initializeCinnamorollScrollProgress();

populateLeaderboards();
initializeTabs();