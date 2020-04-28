/* ##########
Email: Solace127@gmail.com
Coded by: Corey
Creation Date: 04/26/2020
Last Modified: 04/26/2020
######## */

//* Hard coded values that Devolopers set
const ATTACK_VALUE_MAX = 10;
const STRONG_ATTACK_VALUE_MAX = 16;
const MONSTER_ATTACK_VALUE_MAX = 13;
const HEAL_VALUE = 15;

//* Static values that we use as developers
const MODE_ATTACK = 0;
const MODE_STRONG_ATTACK = 1;
const LOG_EVENT_PLAYER_ATTACK = "PLAYER_ATTACK";
const LOG_EVENT_PLAYER_STRONG_ATTACK = "PLAYER_STRONG_ATTACK";
const LOG_EVENT_PLAYER_HEAL = "PLAYER_HEAL";
const LOG_EVENT_MONSTER_ATTACK = "MONSTER_ATTACK";
const LOG_EVENT_GAME_OVER = "GAME_OVER";

let battleLog = [];
let lastLoggedEntry;

function getMaxHealthValues() {
    const enteredValue = prompt("Maximum life for you and the monster.", "100");
    const parsedValue = parseInt(enteredValue);

    if (isNaN(chosenMaxLife) || chosenMaxLife <= 0) {
        throw { message: "Invalid user input, not a number!" };
    }
    return parsedValue;
}
let chosenMaxLife;

try {
    chosenMaxLife = getMaxHealthValues();
} catch (error) {
    console.log(error);
    chosenMaxLife = 100;
    alert("You entered something wrong, we will default to 100 health.");
    // throw error;
} // finally {}

let currentMonsterHealth = chosenMaxLife;
let currentPlayerHealth = chosenMaxLife;
let hasBonusLife = true;

adjustHealthBars(chosenMaxLife);

function writeToLog(event, value, monsterHealth, playerHealth) {
    let logEntry = {
        event: event,
        value: value,
        finalMonsterHealth: monsterHealth,
        finalPlayerHealth: playerHealth,
    };

    if (event === LOG_EVENT_PLAYER_ATTACK) {
        logEntry.target = "MONSTER";
    } else if (event === LOG_EVENT_PLAYER_STRONG_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: "MONSTER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (event === LOG_EVENT_MONSTER_ATTACK) {
        logEntry = {
            event: event,
            value: value,
            target: "PLAYER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (event === LOG_EVENT_PLAYER_HEAL) {
        logEntry = {
            event: event,
            value: value,
            target: "PLAYER",
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    } else if (event === LOG_EVENT_GAME_OVER) {
        logEntry = {
            event: event,
            value: value,
            finalMonsterHealth: monsterHealth,
            finalPlayerHealth: playerHealth,
        };
    }
    battleLog.push(logEntry);
}

function reset() {
    currentMonsterHealth = chosenMaxLife;
    currentPlayerHealth = chosenMaxLife;
    resetGame(chosenMaxLife);
}

function endRound() {
    const initialPlayerHealth = currentPlayerHealth;
    const playerDamage = dealPlayerDamage(MONSTER_ATTACK_VALUE_MAX);
    currentPlayerHealth -= playerDamage;
    writeToLog(
        LOG_EVENT_MONSTER_ATTACK,
        playerDamage,
        currentMonsterHealth,
        currentPlayerHealth
    );
    if (currentPlayerHealth <= 0 && hasBonusLife) {
        hasBonusLife = false;
        removeBonusLife();
        currentPlayerHealth = initialPlayerHealth;
        setPlayerHealth(initialPlayerHealth);
        alert("You would be dead, but you're bonus life saved you!");
    }

    // Can use a switch case here, instead of explicit if statements.
    if (currentMonsterHealth <= 0 && currentPlayerHealth >= 0) {
        alert("You win!");
        writeToLog(
            LOG_EVENT_GAME_OVER,
            "PLAYER WON",
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    } else if (currentPlayerHealth <= 0 && currentMonsterHealth >= 0) {
        alert("You lose");
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            "MONSTER WON",
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    } else if (currentMonsterHealth <= 0 && currentPlayerHealth <= 0) {
        alert("It's a draw");
        writeToLog(
            LOG_EVENT_MONSTER_ATTACK,
            "Draw",
            currentMonsterHealth,
            currentPlayerHealth
        );
        reset();
    }
}

function attackMonster(mode) {
    //Ternary operator/expression (single line if statement)
    const maxDamage =
        mode === MODE_ATTACK ? ATTACK_VALUE_MAX : STRONG_ATTACK_VALUE_MAX;
    const logEvent =
        mode === MODE_ATTACK
            ? LOG_EVENT_PLAYER_ATTACK
            : LOG_EVENT_PLAYER_STRONG_ATTACK;
    /* explicit if statements
    let maxDamage;
    let logEvent;
    if (mode === MODE_ATTACK) {
        maxDamage = ATTACK_VALUE_MAX;
        logEvent = LOG_EVENT_PLAYER_ATTACK;
    } else if (mode === MODE_STRONG_ATTACK) {
        maxDamage = STRONG_ATTACK_VALUE_MAX;
        logEvent = LOG_EVENT_PLAYER_STRONG_ATTACK;
    } else {
        return;
    } 
*/
    const damage = dealMonsterDamage(maxDamage);
    currentMonsterHealth -= damage;
    writeToLog(logEvent, damage, currentMonsterHealth, currentPlayerHealth);
    endRound();
}
function attackHandler() {
    attackMonster(MODE_ATTACK);
}

function strongAttackHandler() {
    attackMonster(MODE_STRONG_ATTACK);
}

function healPlayerHandler() {
    let healValue;
    if (currentPlayerHealth >= chosenMaxLife - HEAL_VALUE) {
        alert("You can't heal to more than your max initial health.");
        healValue = chosenMaxLife - currentPlayerHealth;
    } else {
        healValue = HEAL_VALUE;
    }
    increasePlayerHealth(healValue);
    currentPlayerHealth += healValue;
    writeToLog(
        LOG_EVENT_PLAYER_HEAL,
        healValue,
        currentMonsterHealth,
        currentPlayerHealth
    );
    endRound();
}

function showLogHandler() {
    /*     for (let i = 0; i < battleLog.length; i++) {
        console.log("-----------");
        console.log(battleLog[i]);
    } */
    let i = 0;
    for (const logEntry of battleLog) {
        if (
            (!lastLoggedEntry && lastLoggedEntry !== 0) ||
            lastLoggedEntry < i
        ) {
            // This is for arrays only, and does not hold an index value like the classic for loop does.
            console.log(`#${i}`);
            for (const key in logEntry) {
                // For gettings things out of an object.
                console.log(`${key} => ${logEntry[key]}`);
            }
            lastLoggedEntry = i;
            break;
        }
        i++;
    }
}

attackBtn.addEventListener("click", attackHandler);
strongAttackBtn.addEventListener("click", strongAttackHandler);
healBtn.addEventListener("click", healPlayerHandler);
logBtn.addEventListener("click", showLogHandler);
