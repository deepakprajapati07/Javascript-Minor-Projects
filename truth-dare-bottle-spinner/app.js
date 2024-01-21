let goBtn = document.querySelector("#go");
let peopleInfo = document.querySelector(".peopleInfo");
let circleContainer = document.querySelector(".container");

const getRandomColorGenerator = (() => {
    const colors = [
        "#1f78b4", "#33a02c", "#e31a1c", "#ff7f00", "#6a3d9a",
        "#a6cee3", "#b2df8a", "#fb9a99", "#fdbf6f", "#cab2d6",
        "#008080", "#cc6600", "#9966cc", "#c2c2f0", "#ff6666",
        "#9a6324", "#2ca02c", "#ffcc99", "#ff5733", "#b15928"
    ];    

    let colorIndex = 0;

    return () => {
        const randomColor = colors[colorIndex];
        colorIndex = (colorIndex + 1) % colors.length;
        return randomColor;
    };
})();

function resetImagePosition(image, angleOfFirstSector, svgHeight, svgWidth) {
    let centerX = svgWidth / 2;
    let centerY = svgHeight / 2;
    image.setAttribute("transform", `rotate(${angleOfFirstSector} ${centerX} ${centerY})`);
}

function createCircleSVG(personList, svgHeight, svgWidth) {
    // Create an SVG of the circle shape with the initial color as red
    let svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("height", svgHeight);
    svg.setAttribute("width", svgWidth);

    let circleRadius = Math.min(svgHeight, svgWidth) / 2;

    let circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
    circle.setAttribute("cx", svgWidth / 2);
    circle.setAttribute("cy", svgHeight / 2);
    circle.setAttribute("r", circleRadius);
    circle.setAttribute("fill", "red");

    svg.appendChild(circle);

    // Partition the circle into equal parts and fill each part with different colors
    let angleStep = 360 / personList.length;
    for (let i = 0; i < personList.length; i++) {
        let startAngle = i * angleStep;
        let endAngle = (i + 1) * angleStep;

        // Calculate the coordinates for the arc of each sector
        let x1 = svgWidth / 2 + Math.cos(startAngle * Math.PI / 180) * circleRadius;
        let y1 = svgHeight / 2 + Math.sin(startAngle * Math.PI / 180) * circleRadius;
        let x2 = svgWidth / 2 + Math.cos(endAngle * Math.PI / 180) * circleRadius;
        let y2 = svgHeight / 2 + Math.sin(endAngle * Math.PI / 180) * circleRadius;

        // Create a path for each sector
        let sector = document.createElementNS("http://www.w3.org/2000/svg", "path");
        sector.setAttribute("d", `M${svgWidth / 2},${svgHeight / 2} L${x1},${y1} A${circleRadius},${circleRadius} 0 ${(endAngle - startAngle > 180) ? 1 : 0} 1 ${x2},${y2} Z`);
        sector.setAttribute("fill", getRandomColorGenerator());

        // Create and append text labels to each sector
        let text = document.createElementNS("http://www.w3.org/2000/svg", "text");
        let textAngle = (startAngle + endAngle) / 2;
        let textX = svgWidth / 2 + Math.cos(textAngle * Math.PI / 180) * (circleRadius * 0.8); // Adjust the radius for text positioning
        let textY = svgHeight / 2 + Math.sin(textAngle * Math.PI / 180) * (circleRadius * 0.8); // Adjust the radius for text positioning
        text.setAttribute("x", textX);
        text.setAttribute("y", textY);
        text.setAttribute("text-anchor", "middle");
        text.setAttribute("dominant-baseline", "middle");
        text.setAttribute("fill", "white");
        text.textContent = personList[i]; // Set the text content to the person's name

        svg.appendChild(sector);
        svg.appendChild(text);
    }

    return svg;
}

function createBorderPath(personList, svgHeight, svgWidth) {
    let centerX = svgWidth / 2;
    let centerY = svgHeight / 2;
    let circleRadius = Math.min(svgHeight, svgWidth) / 2;

    // Create a path to draw the borders between sectors
    let borderPath = document.createElementNS("http://www.w3.org/2000/svg", "path");
    let angleStep = 360 / personList.length;
    let borderPathString = "";

    for (let i = 0; i < personList.length; i++) {
        let angle = i * angleStep;
        let x = centerX + Math.cos(angle * Math.PI / 180) * circleRadius;
        let y = centerY + Math.sin(angle * Math.PI / 180) * circleRadius;
        borderPathString += `M${centerX},${centerY} L${x},${y} `;
    }

    borderPathString += "Z";
    borderPath.setAttribute("d", borderPathString);
    borderPath.setAttribute("stroke", "black");
    borderPath.setAttribute("stroke-width", "2");
    borderPath.setAttribute("fill", "none");

    return borderPath;
}

function createImage(totalSectors, svgHeight, svgWidth) {
    let centerX = svgWidth / 2;
    let centerY = svgHeight / 2;

    let image = document.createElementNS("http://www.w3.org/2000/svg", "image");
    // Here svgHeight = 400 and svgWidth = 400
    // So, centerX = 200 and centerY = 200
    image.setAttribute("x", centerX - 75); // Adjust based on image width
    image.setAttribute("y", centerY - 75); // Adjust based on image height
    image.setAttribute("width", "150");
    image.setAttribute("height", "150");
    image.setAttribute("href", "bottle.png");

    let angleStep = 360 / totalSectors;
    let existingTilt = 45;
    let randomSector = Math.floor(Math.random() * totalSectors);
    let rotationAngle = angleStep * randomSector + existingTilt;

    // Rotate the image by the calculated angle around its center
    image.setAttribute("transform", `rotate(${rotationAngle} ${centerX} ${centerY})`);

    return image;
}

// Helper function to get the current rotation angle from the transform attribute
function getCurrentRotation(element) {
    let transformString = element.getAttribute("transform");
    let match = transformString.match(/rotate\(([^)]+)\)/);
    return match ? parseFloat(match[1]) : 0;
}

let handler3 = (personList, svgHeight, svgWidth) => {

    let totalSectors = personList.length;
    let angleStep = 360 / totalSectors;

    let numberOfRotations = 2;
    const randomAngle = (Math.floor(Math.random() * (numberOfRotations * 360)) + 1) * angleStep;

    let image = document.querySelector("image");
    let centerX = svgWidth / 2;
    let centerY = svgHeight / 2;

    // Disable spin button
    let spinBtn = document.querySelector("#spin");
    spinBtn.disabled = true;

    image.animate(
        [
            { transform: `rotate(${getCurrentRotation(image)}deg)`, transformOrigin: "center center" },
            { transform: `rotate(${randomAngle}deg)`, transformOrigin: "center center" }
        ],
        { duration: 2000, easing: 'ease-out' } 
    );

    setTimeout(() => {
        // Enable spin button after animation
        spinBtn.disabled = false;
        image.setAttribute("transform", `rotate(${randomAngle} ${centerX} ${centerY})`);
    }, 2000);
};

let handler2 = () => {
    let temp = document.querySelectorAll(".person");
    let personList = Array.from(temp).map(input => input.value);

    peopleInfo.style.display = "none";
    circleContainer.style.display = "flex";

    // Create the SVG of the circle
    let svgHeight = 400;
    let svgWidth= 400;
    let svg = createCircleSVG(personList, svgHeight, svgWidth);

    let borderPath = createBorderPath(personList, svgHeight, svgWidth);
    svg.appendChild(borderPath);

    let totalSectors = personList.length;
    let image = createImage(totalSectors, svgHeight, svgWidth);
    svg.appendChild(image);
    circleContainer.insertBefore(svg, circleContainer.firstChild);

    let spinBtn = document.querySelector("#spin");
    spinBtn.addEventListener("click", () => handler3(personList, svgHeight, svgWidth));    

    let resetBtn = document.querySelector("#resetBtn");
    let angleOfFirstSector = 45;
    resetBtn.addEventListener("click", () => resetImagePosition(image, angleOfFirstSector, svgHeight, svgWidth));

    let participantsBtn = document.querySelector("#participantsBtn");
    participantsBtn.addEventListener("click", () => {
        location.reload();
    })
}

let handler1 = () => {
    let peopleCount = document.querySelector("#count").value;
    let inputContainer = document.querySelector(".inputContainer");

    inputContainer.style.display = "none";

    let count = Number(peopleCount);

    if (count > 1) {
        let heading = document.createElement("h2");
        heading.innerText = "Participants";
        heading.style.marginBottom = "10px";
        peopleInfo.appendChild(heading);

        for(let i=1; i<=count; i++) {
            let newInput = document.createElement("input");
            newInput.type = "text";
            newInput.placeholder = "Name";
            newInput.className = "person";
            peopleInfo.appendChild(newInput);
        }
    
        let playBtn = document.createElement("button");
        playBtn.innerText = "Let's Play!";
        playBtn.id = "playBtn";
        playBtn.style.marginTop = "20px";
        peopleInfo.appendChild(playBtn);

        let participantsBtn1 = document.createElement("button");
        participantsBtn1.innerText = "Reset Participants";
        participantsBtn1.id = "participantsBtn1";
        participantsBtn1.style.marginBottom = "50px";
        peopleInfo.appendChild(participantsBtn1);
    
        playBtn.addEventListener("click", handler2);

        participantsBtn1.addEventListener("click", () => {
            location.reload();
        })
    }
    else {
        // Use a confirm dialog to display the message
        if (confirm("There should be more than one participants to play the game. Do you want to restart?")) {
            // Go back to the initial state by reloading the page
            location.reload();
        }
    }
}

goBtn.addEventListener("click", handler1);
