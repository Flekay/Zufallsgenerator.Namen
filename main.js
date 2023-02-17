import { confetti } from "https://cdn.jsdelivr.net/npm/tsparticles-confetti/+esm";

const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 999 };

function randomInRange(min, max) {
    return Math.random() * (max - min) + min;
}


function removename($name) {
    names = names.filter(function(value, index, arr) {
        return value != $name;
    });
    document.getElementById("namelist").innerHTML = "";
    names.forEach(function(item) {
        document.getElementById("namelist").innerHTML += `<li onclick="removename('${item}');">${item}</li>`;
    });
}
function newname($name) {
    names.push($name);
    document.getElementById("namelist").innerHTML += `<li onclick="removename('${$name}');">${$name}</li>`;
}


const run = () => {
    const interval = setInterval(function () {
        // const timeLeft = animationEnd - Date.now();

        if (document.getElementById("winner").classList.contains("hidden")) {
            clearInterval(interval);
            run();
            return;
        }

        // const particleCount = 50 * (timeLeft / duration);
        const particleCount = 35;

        // since particles fall down, start a bit higher than random
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
            })
        );
        confetti(
            Object.assign({}, defaults, {
                particleCount,
                origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
            })
        );
    }, 500);
};
run();


// document.getElementById("names").placeholder = "Enter names here";
document.getElementById("names").focus();


document.getElementById("run").addEventListener("click", function(e) {
    if (names.length > 1) {
        document.getElementById("winner").classList.remove("hidden");
               if (names.includes("susanne")) {
            document.getElementById("name").innerHTML = "susanne";
            winner = "susanne";
        } else if (names.includes("Susanne")) {
            document.getElementById("name").innerHTML = "Susanne";
            winner = "Susanne";
        } else {
            winner = names[Math.floor(Math.random() * names.length)];
            document.getElementById("name").innerHTML = winner;
        }
    }
});

document.getElementById("removename").addEventListener("click", function(e) {
    if (winner !== "") {
        removename(winner);
        winner = "";
    }
    document.getElementById("winner").classList.add("hidden");
});

document.getElementById("keepname").addEventListener("click", function(e) {
    document.getElementById("winner").classList.add("hidden");
});

document.getElementById("names").addEventListener("keydown", function(e) {
    if (e.key === "Enter" || e.key === "Tab" || e.key === ",") {
        e.preventDefault();
        if (this.value.trim() !== "") {
            newname(this.value.trim());
            this.value = "";
        }
    }
});