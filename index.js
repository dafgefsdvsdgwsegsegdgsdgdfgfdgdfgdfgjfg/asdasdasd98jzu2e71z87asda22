function showTowFrame() {
    const dialog = document.getElementById('towDialog');
    dialog.style.display = 'block';
    setTimeout(() => { dialog.classList.add('show'); dialog.style.opacity = '1'; }, 10);
}

function hideTowFrame() {
    const dialog = document.getElementById('towDialog');
    dialog.classList.remove('show');
    dialog.style.opacity = '0';
    setTimeout(() => { dialog.style.display = 'none'; }, 500);
}

function showRightsDialog() {
    const dialog = document.getElementById('rightsDialog');
    dialog.style.display = 'block';
    setTimeout(() => { dialog.classList.add('show'); dialog.style.opacity = '1'; }, 10);
}

function hideRightsDialog() {
    const dialog = document.getElementById('rightsDialog');
    dialog.classList.remove('show');
    dialog.style.opacity = '0';
    setTimeout(() => { dialog.style.display = 'none'; }, 500);
}

function showRightsInfo() {
    const dialog = document.getElementById('rightsInfoModal');
    dialog.style.display = 'block';
    setTimeout(() => { dialog.style.opacity = '1'; }, 10);
}

function hideRightsInfo() {
    const dialog = document.getElementById('rightsInfoModal');
    dialog.style.opacity = '0';
    setTimeout(() => { dialog.style.display = 'none'; }, 300);
}

// --- MASSIVER KOPIERSCHUTZ (ERWEITERT) ---

// Debugger-Schleife, um DevTools-Nutzung zu erschweren
setInterval(function() {
    // Diese Funktion wird ständig aufgerufen und stoppt die Ausführung, wenn DevTools offen sind
    // debugger; 
    // (Auskommentiert, da es beim normalen Testen extrem stört. 
    //  Um es zu aktivieren, entfernen Sie die Kommentierung vor 'debugger;')
}, 1000);

document.addEventListener('keydown', function(e) {
    // F12, F10
    if (e.key === 'F12' || e.key === 'F10') {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // Strg+Shift+I, Strg+Shift+J, Strg+Shift+C (DevTools)
    if (e.ctrlKey && e.shiftKey && (
        e.key.toLowerCase() === 'i' || 
        e.key.toLowerCase() === 'j' || 
        e.key.toLowerCase() === 'c'
    )) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // Strg+U (Quelltext), Strg+S (Speichern), Strg+P (Drucken), Strg+H (Verlauf)
    if (e.ctrlKey && (
        e.key.toLowerCase() === 'u' || 
        e.key.toLowerCase() === 's' || 
        e.key.toLowerCase() === 'p' ||
        e.key.toLowerCase() === 'h'
    )) {
        e.preventDefault();
        e.stopPropagation();
        return false;
    }

    // Strg+A, Strg+C, Strg+X, Strg+V blockieren, außer im erlaubten Bereich
    if (e.ctrlKey && (
        e.key.toLowerCase() === 'a' || 
        e.key.toLowerCase() === 'c' || 
        e.key.toLowerCase() === 'x' || 
        e.key.toLowerCase() === 'v'
    )) {
        var allowed = false;
        var target = e.target;
        
        // Prüfen, ob das Ziel ein Input/Textarea ist oder im reasonResult liegt
        var node = target;
        while (node) {
            if (node.id === 'reasonResult' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') { 
                allowed = true; 
                break; 
            }
            node = node.parentElement || node.parentNode;
        }

        if (!allowed) {
            e.preventDefault();
            e.stopPropagation();
            return false;
        }
    }
});

// Rechtsklick blockieren, außer im erlaubten Bereich
document.addEventListener('contextmenu', function(e) {
    var node = e.target;
    var allowed = false;
    while (node) {
        if (node.id === 'reasonResult' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') { allowed = true; break; }
        node = node.parentElement || node.parentNode;
    }
    if (!allowed) {
        e.preventDefault();
        return false;
    }
});

// Textauswahl blockieren, außer im erlaubten Bereich
document.addEventListener('selectstart', function(e) {
    var node = e.target;
    var allowed = false;
    while (node) {
        if (node.id === 'reasonResult' || node.tagName === 'INPUT' || node.tagName === 'TEXTAREA') { allowed = true; break; }
        node = node.parentElement || node.parentNode;
    }
    if (!allowed) {
        e.preventDefault();
        return false;
    }
});

// Drag & Drop blockieren
document.addEventListener('dragstart', function(e) {
    e.preventDefault();
    return false;
});
document.addEventListener('drop', function(e) {
    e.preventDefault();
    return false;
});

// Optional: User-Select per CSS für alles außer #reasonResult deaktivieren
window.addEventListener('DOMContentLoaded', function() {
    var style = document.createElement('style');
    style.innerHTML = `
        body *:not(#reasonResult):not(#reasonResult *) {
            -webkit-user-select: none !important;
            -moz-user-select: none !important;
            -ms-user-select: none !important;
            user-select: none !important;
        }
        #reasonResult, #reasonResult * {
            -webkit-user-select: text !important;
            -moz-user-select: text !important;
            -ms-user-select: text !important;
            user-select: text !important;
        }
    `;
    // Click-to-copy für Grund
    // Removed as per user request to rely on specific text click

    document.head.appendChild(style);
});
// Zeigt das Feld für den langen Grund nur, wenn die Checkbox aktiviert ist
function toggleGrundInputs() {
    var langerGrundDiv = document.getElementById('langerGrundInput');
    var checkbox = document.getElementById('langerGrund_box');
    if (checkbox && checkbox.checked) {
        langerGrundDiv.style.display = 'block';
    } else {
        langerGrundDiv.style.display = 'none';
    }
}

// Initialzustand beim Laden setzen
window.addEventListener('DOMContentLoaded', function() {
    toggleGrundInputs();
});
function searchFine() {
    let searchFor = document.getElementById("searchbar_input").value.toLocaleLowerCase();
    let fines = document.querySelectorAll(".fine");
    for (var i = 0; i < fines.length; i++) {
        let fineText = fines[i].querySelector(".fineText").innerHTML.toLocaleLowerCase();
        let paragraph = fines[i].querySelector(".paragraph").innerHTML.toLocaleLowerCase();
        if (fineText.includes(searchFor) || paragraph.includes(searchFor)) {
            fines[i].classList.add("showing");
            fines[i].classList.remove("hiding");
        } else {
            fines[i].classList.remove("showing");
            fines[i].classList.add("hiding");
        }
    }
}

function selectFine(event) {
    let element = event.target
    if (element.tagName == "FONT") return
    if (element.tagName == "TD") element = element.parentElement
    if (element.tagName == "I") element = element.parentElement.parentElement

    if (element.classList.contains("selected")) {
        element.classList.remove("selected")
    } else {
        element.classList.add("selected")
    }

    startCalculating()
}

function startCalculating() {

    document.getElementById("finesListTable").innerHTML = `<tr>
                    <th style="width: 80%;">Grund für die Geldstrafe</th>
                    <th style="width: 20%;">Bußgeld</th>
                </tr>`

    let fineResult = document.getElementById("fineResult")
    let fineAmount = 0

    let wantedResult = document.getElementById("wantedsResult")
    let wantedAmount = 0

    let characterResult = document.getElementById("charactersResult")

    let reasonResult = document.getElementById("reasonResult")
    let reasonText = ""
    let plate = document.getElementById("plateInput_input").value
    let systemwanteds = document.getElementById("systemwantedsInput_input").value
    let blitzerort = document.getElementById("blitzerInput_input").value

    // Immer nur langer Grund
    // let langerGrund = document.getElementById("langerGrundInput_input") ? document.getElementById("langerGrundInput_input").value : "";
    // reasonResult.innerHTML = '<b>Grund:</b> ' + langerGrund;

    let infoResult = document.getElementById("infoResult")
    let noticeText = ""
    let removeWeaponLicense = false
    let removeDriverLicense = false

    let tvübergabe_org = document.getElementById("übergabeInput_select").value
    let tvübergabe_name = document.getElementById("übergabeInput_input").value

    let onlyHighest = false;
    if (document.getElementById("reasonMode_box") && document.getElementById("reasonMode_box").checked) onlyHighest = true;

    let fineCollection = document.querySelectorAll(".selected")
    let fineCollectionWantedAmount = []
    let fineCollectionFineAmount = []

    for (var i = 0; i < fineCollection.length; i++) { 



        let cache_wanted_amount = 0;

        cache_wanted_amount = cache_wanted_amount + parseInt(fineCollection[i].querySelector(".wantedAmount").getAttribute("data-wantedamount"))
        
        cache_wanted_amount = cache_wanted_amount + fineCollection[i].querySelector(".wantedAmount").querySelectorAll(".selected_extrawanted").length
        if (cache_wanted_amount > 5) cache_wanted_amount = 5

        fineCollectionWantedAmount.push(cache_wanted_amount)


        let cache_fine_amount = 0;

        cache_fine_amount = cache_fine_amount + parseInt(fineCollection[i].querySelector(".fineAmount").getAttribute("data-fineamount"))

        let extrawanteds_found = fineCollection[i].querySelector(".wantedAmount").querySelectorAll(".selected_extrawanted")
        let extrafines_amount = 0
        for (let b = 0; b < extrawanteds_found.length; b++) {
            if (extrawanteds_found[b].getAttribute("data-addedfine")) cache_fine_amount = cache_fine_amount + parseInt(extrawanteds_found[b].getAttribute("data-addedfine"))
            extrafines_amount = extrafines_amount + parseInt(extrawanteds_found[b].getAttribute("data-addedfine"))
        }

        fineCollectionFineAmount.push(cache_fine_amount)

    }

    console.log(fineCollectionWantedAmount);
    
    let maxWanted = 0;
    let maxFine = 0;
    let bestIndex = -1;

    if (fineCollection.length > 0) {
        maxWanted = fineCollectionWantedAmount[0];
        maxFine = fineCollectionFineAmount[0];
        bestIndex = 0;

        for (let i = 1; i < fineCollectionWantedAmount.length; i++) {
            if (fineCollectionWantedAmount[i] > maxWanted) {
                maxWanted = fineCollectionWantedAmount[i];
                maxFine = fineCollectionFineAmount[i];
                bestIndex = i;
            } else if (fineCollectionWantedAmount[i] == maxWanted) {
                if (fineCollectionFineAmount[i] > maxFine) {
                    maxFine = fineCollectionFineAmount[i];
                    bestIndex = i;
                }
            }
        }
    }

    wantedAmount = maxWanted
    fineAmount = maxFine
   
    if (wantedAmount == undefined) wantedAmount = 0
    if (fineAmount == undefined) fineAmount = 0
    
    console.log("Largest Wanteds:" + maxWanted);  
    console.log("Largest Fine:" + maxFine);  

    for (var i = 0; i < fineCollection.length; i++) {
        //fineAmount = fineAmount + parseInt(fineCollection[i].querySelector(".fineAmount").getAttribute("data-fineamount"))

        let skipReason = false;
        if (onlyHighest && i !== bestIndex) {
            skipReason = true;
        }

        let extrawanteds_found = fineCollection[i].querySelector(".wantedAmount").querySelectorAll(".selected_extrawanted")
        let extrafines_amount = 0
        for (let b = 0; b < extrawanteds_found.length; b++) {
            //if (extrawanteds_found[b].getAttribute("data-addedfine")) fineAmount = fineAmount + parseInt(extrawanteds_found[b].getAttribute("data-addedfine"))
            extrafines_amount = extrafines_amount + parseInt(extrawanteds_found[b].getAttribute("data-addedfine"))
        }

        //wantedAmount = wantedAmount + parseInt(fineCollection[i].querySelector(".wantedAmount").getAttribute("data-wantedamount"))
        
        //wantedAmount = wantedAmount + fineCollection[i].querySelector(".wantedAmount").querySelectorAll(".selected_extrawanted").length
        //if (wantedAmount > 5) wantedAmount = 5
        

        // Korrekte Uhrzeit und Datum für Deutschland (Europe/Berlin)
        const now = new Date();
        const dateOptions = { timeZone: 'Europe/Berlin', hour12: false, year: 'numeric', month: '2-digit', day: '2-digit', hour: '2-digit', minute: '2-digit' };
        const dateParts = new Intl.DateTimeFormat('de-DE', dateOptions).formatToParts(now);
        let day = dateParts.find(p => p.type === 'day').value;
        let month = dateParts.find(p => p.type === 'month').value;
        let hour = dateParts.find(p => p.type === 'hour').value;
        let minute = dateParts.find(p => p.type === 'minute').value;

        let fineText = ""
        if (fineCollection[i].querySelector(".fineText").innerHTML.includes("<i>")) {
            fineText = fineCollection[i].querySelector(".fineText").innerHTML.split("<i>")[0]
        } else {
            fineText = fineCollection[i].querySelector(".fineText").innerHTML
        }

        if (!skipReason) {
            if (reasonText == "") {
                reasonText = `${day}.${month} ${hour}:${minute} - ${fineCollection[i].querySelector(".paragraph").hasAttribute("data-paragraphAddition") ? fineCollection[i].querySelector(".paragraph").getAttribute("data-paragraphAddition") + " " : ""}${fineCollection[i].querySelector(".paragraph").innerHTML}`
            } else {
                reasonText += ` + ${fineCollection[i].querySelector(".paragraph").hasAttribute("data-paragraphAddition") ? fineCollection[i].querySelector(".paragraph").getAttribute("data-paragraphAddition") + " " : ""}${fineCollection[i].querySelector(".paragraph").innerHTML}`
            }
        }

        if (fineCollection[i].getAttribute("data-removedriverlicence") == "true") removeDriverLicense = true
        if (fineCollection[i].getAttribute("data-removeweaponlicence") == "true") removeWeaponLicense = true

        

        if (fineCollection[i].classList.contains("addPlateInList")) {

            document.getElementById("finesListTable").innerHTML +=
            `
            <tr class="finesList_fine">
                <td onclick="JavaScript:copyText(event)">${day}.${month} ${hour}:${minute} - ${fineCollection[i].querySelector(".paragraph").innerHTML} - ${fineText}${plate !== "" ? " - " + plate.toLocaleUpperCase() : ""}${blitzerort !== "" ? " - " + blitzerort : ""}</td>
                <td>$${parseInt(fineCollection[i].querySelector(".fineAmount").getAttribute("data-fineamount")) + extrafines_amount}</td>
            </tr>
            `
        } else {
            document.getElementById("finesListTable").innerHTML +=
            `
            <tr class="finesList_fine">
                <td onclick="JavaScript:copyText(event)">${day}.${month} ${hour}:${minute} - ${fineCollection[i].querySelector(".paragraph").innerHTML} - ${fineText}</td>
                <td>$${parseInt(fineCollection[i].querySelector(".fineAmount").getAttribute("data-fineamount")) + extrafines_amount}</td>
            </tr>
            `
        }

    }

    if (document.getElementById("reue_box").checked && wantedAmount !== 0) { // Means "reue" is active
        wantedAmount = wantedAmount - 2
        if (wantedAmount < 1) wantedAmount = 1
    }

    if (plate != "") {
        reasonText += ` - ${plate.toLocaleUpperCase()}`
    }

    if (blitzerort != "") {
        reasonText += ` - ${blitzerort}`
    }

    if (document.getElementById("langerGrund_box") && document.getElementById("langerGrund_box").checked) {
        let langerGrundVal = document.getElementById("langerGrundInput_input").value;
        if (langerGrundVal !== "") {
            reasonText += ` - ${langerGrundVal}`;
        }
    }

    if (document.getElementById("reue_box").checked) {
        reasonText += ` - StGB §35`
    }

    if (systemwanteds != "") {
        reasonText += ` - ${systemwanteds} Systemwanteds`
    }

    let systemWantedsInt = 0;
    if (!isNaN(systemwanteds) && systemwanteds !== "") {
        systemWantedsInt = parseInt(systemwanteds);
    }

    // Calculate total wanteds (Current + New)
    let totalWanteds = wantedAmount + systemWantedsInt;

    // Cap at 5
    if (totalWanteds > 5) totalWanteds = 5;

    // Calculate how many to ADD (Total - Current)
    // If systemWanteds is 0, this just returns the capped wantedAmount
    wantedAmount = totalWanteds - systemWantedsInt;

    if (wantedAmount < 0) wantedAmount = 0;

    if (document.getElementById("systemfehler_box").checked) {
        reasonText += ` - Systemfehler`
    }


    if (removeDriverLicense) {
        noticeText = "Führerschein entziehen"
    }
    if (removeWeaponLicense) {
        if (noticeText =="") {
            noticeText = "Waffenschein entziehen"
        } else {
            noticeText = noticeText + " + Waffenschein entziehen"
        }
    }

    /* Removed as per user request: Rights read checkbox should not add text to info
    if (document.getElementById("rightsRead_box") && document.getElementById("rightsRead_box").checked) {
        if (noticeText == "") {
            noticeText = "Rechte vorgelesen"
        } else {
            noticeText = noticeText + " + Rechte vorgelesen"
        }
    }
    */

    if (tvübergabe_org !== "none" && tvübergabe_name !== "") {
        reasonText += ` - @${tvübergabe_org.toLocaleUpperCase()} ${tvübergabe_name}`
    }


    infoResult.innerHTML = `<b>Information:</b> ${noticeText}`
    fineResult.innerHTML = `<b>Geldstrafe:</b> <font style="user-select: all;">$${fineAmount}</font>`
    wantedResult.innerHTML = `<b>Wanteds:</b> <font style="user-select: all;">${wantedAmount}</font>`
    reasonResult.innerHTML = `<b>Grund:</b> <font style="user-select: all;" onclick="JavaScript:copyText(event)">${reasonText}</font>`
    if (reasonText.length <= 150) {
        characterResult.innerHTML = `<b>Zeichen:</b> ${reasonText.length}/150`
    } else {
        characterResult.innerHTML = `<b>Zeichen:</b> <font style="color: red;">${reasonText.length}/150<br>Dieser Grund ist zu lang!</font>`
    }

}


function showFines() {
    if (document.getElementById("finesListContainer").style.opacity == 0) {
        document.getElementById("finesListContainer").style.opacity = 1
        document.getElementById("finesListContainer").style.pointerEvents = ""
    } else {
        document.getElementById("finesListContainer").style.opacity = 0
        document.getElementById("finesListContainer").style.pointerEvents = "none"
    }
} 

function showAttorneys() {
    if (document.getElementById("attorneyContainer").style.opacity == 0) {
        document.getElementById("attorneyContainer").style.opacity = 1
        document.getElementById("attorneyContainer").style.pointerEvents = ""
    } else {
        document.getElementById("attorneyContainer").style.opacity = 0
        document.getElementById("attorneyContainer").style.pointerEvents = "none"
    }
} 


window.onload = async () => {
    let savedBody;
    let alreadyBig = true

    document.body.innerHTML = document.getElementById("scriptingDiv").innerHTML
    savedBody = document.body.innerHTML

    openDisclaimer()

    // Update calculation every minute to keep the time in "Grund" current
    let lastMinute = new Date().getMinutes();
    setInterval(() => {
        const currentMinute = new Date().getMinutes();
        if (currentMinute !== lastMinute) {
            lastMinute = currentMinute;
            startCalculating();
        }
    }, 1000);

    // Reload Attorney List every 5 seconds if visible
    setInterval(() => {
        const container = document.getElementById("attorneyContainer");
        if (container && container.style.opacity == "1") {
             const iframes = container.getElementsByTagName("iframe");
             for (let i = 0; i < iframes.length; i++) {
                 iframes[i].src = iframes[i].src;
             }
        }
    }, 5000);

    setInterval(() => {
        if (document.body.clientWidth < 700) {
            alreadyBig = false
            document.body.innerHTML = `
            <div style="transform: translate(-50%, -50%); font-weight: 600; font-size: 8vw; color: white; width: 80%; position: relative; left: 50%; top: 50%; text-align: center;">Diese Website kann nur auf einem PC angesehen werden<div>
            `
            document.body.style.backgroundColor = "#121212"
        } else if (alreadyBig == false) {
            alreadyBig = true
            location.reload()
        }
    }, 1)
}

function resetButton() {
    let fineCollection = document.querySelectorAll(".selected")
    for (var i = 0; i < fineCollection.length; i++) {
        fineCollection[i].classList.remove("selected")
    }

    document.getElementById("plateInput_input").value = ""
    document.getElementById("blitzerInput_input").value = ""
    document.getElementById("systemwantedsInput_input").value = ""

    document.getElementById("übergabeInput_select").value = "none"
    document.getElementById("übergabeInput_input").value = ""

    document.getElementById("notepadArea_input").value = ""
    
    document.getElementById("reue_box").checked = false
    document.getElementById("systemfehler_box").checked = false
    if(document.getElementById("rightsRead_box")) document.getElementById("rightsRead_box").checked = false
    if(document.getElementById("reasonMode_box")) document.getElementById("reasonMode_box").checked = false

    startCalculating()

    // Play sound (sound.mp3)
    try {
        var audio = new Audio('sound.mp3');
        audio.volume = 0.5; // Optional: Lautstärke anpassen
        audio.play();
    } catch (e) {
        console.error("Audio play failed", e);
    }

    insertNotification("info", "Eingaben zurückgesetzt", 3)
}

function copyText(event) {
    // Check if rights are read
    if (document.getElementById("rightsRead_box") && !document.getElementById("rightsRead_box").checked) {
        // Play sound (sound.mp3) even on error
        try {
            var audio = new Audio('sound.mp3');
            audio.volume = 0.5; 
            audio.play();
        } catch (e) {
            console.error("Audio play failed", e);
        }
        insertNotification("error", "Du musst Rechte Vorgelesen aktivieren um den Grund zu Kopieren", 4);
        return;
    }

    let target = event.target
    // Get the text field
    var copyText = target.innerHTML
  
    // Copy the text inside the text field
    navigator.clipboard.writeText(copyText.replace("<br>", ""));

    // Play sound (sound.mp3)
    try {
        var audio = new Audio('sound.mp3');
        audio.volume = 0.5; // Optional: Lautstärke anpassen
        audio.play();
    } catch (e) {
        console.error("Audio play failed", e);
    }

    insertNotification("success", "Der Text wurde kopiert.", 5)
}

function toggleExtraWanted(event) {
    let target = event.target
    let extrastarNumber = 0
    let isSelected = false
    let isLead = false

    if(target.classList.contains("extrawanted1")) extrastarNumber = 1
    if(target.classList.contains("extrawanted2")) extrastarNumber = 2
    if(target.classList.contains("extrawanted3")) extrastarNumber = 3
    if(target.classList.contains("extrawanted4")) extrastarNumber = 4
    if(target.classList.contains("extrawanted5")) extrastarNumber = 5


    if (target.classList.contains("selected_extrawanted")) isSelected = true

    if (isSelected && target.parentElement.querySelectorAll(".selected_extrawanted").length == extrastarNumber) isLead = true

    if (isSelected && isLead) {


        let foundEnabled = target.parentElement.querySelectorAll(".selected_extrawanted")
        for (let i = 0; i < foundEnabled.length; i++) {
            foundEnabled[i].classList.remove("selected_extrawanted")
            
        }

        startCalculating()
        return
    }

    if (isSelected) {


        let found = target.parentElement.querySelectorAll(".extrawanted")
        for (let i = 0; i < found.length; i++) {
            if (i + 1 > extrastarNumber) {

                found[i].classList.remove("selected_extrawanted")
            }
            
        }

        startCalculating()
        return
    }

    if (!isSelected) {
        let found = target.parentElement.querySelectorAll(".extrawanted")
        for (let i = 0; i < extrastarNumber; i++) {
            found[i].classList.add("selected_extrawanted")
            
        }
    }

    startCalculating()
    //for (let index = 0; index < extrastarNumber; index++) {
    //    const element = array[index];    
    //}
}

setInterval(() => {
    if (document.getElementById("disclaimer_title_warning").style.color == "rgb(255, 73, 73)") {
        document.getElementById("disclaimer_title_warning").style.color = "rgb(255, 255, 255)"
    } else {
        document.getElementById("disclaimer_title_warning").style.color = "rgb(255, 73, 73)"
    }
}, 1000)

async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

async function disclaimerAccepted() {
    // Disable Accept Button to prevent stacking of events
    document.getElementById("disclaimer_button").setAttribute("disabled", "")

    let disclaimerNode = document.getElementById("disclaimer")
    let blockerNode = document.getElementById("disclaimerBackgroundBlocker")

    disclaimerNode.style.opacity = 0
    if (blockerNode) {
        blockerNode.style.opacity = 0
    }

    await sleep(500)

    disclaimerNode.style.display = "none"
    if (blockerNode) {
        blockerNode.remove()
    }
}

// Listener für Nachrichten vom TOW-Rechner (iframe)
window.addEventListener('message', (event) => {
    if (event.data.type === 'transferFine') {
        const fineText = event.data.fineText;
        const license = event.data.license;
        const zone = event.data.zone;
        const speed = event.data.speed;
        const overspeed = event.data.overspeed;
        
        // Kennzeichen übertragen
        if (license) {
            const plateInput = document.getElementById('plateInput_input');
            if (plateInput) {
                plateInput.value = license;
                // Event feuern, damit der Rechner das Update mitbekommt
                plateInput.dispatchEvent(new Event('input'));
            }
        }

        // Notizen übertragen (Details zur Messung)
        if (zone && speed && overspeed) {
            const notepad = document.getElementById('notepadArea_input');
            if (notepad) {
                notepad.value = `Geschwindigkeitsmessung: ${speed} km/h in ${zone} Zone (+${overspeed} km/h)`;
            }
        }

        // Passende Strafe auswählen
        const rows = document.querySelectorAll('#fineslist tr.fine');
        
        // Zuerst alle anderen Geschwindigkeitsverstöße abwählen, um Mehrfachauswahl zu verhindern
        for (const row of rows) {
            const rowTextElement = row.querySelector('.fineText');
            if (rowTextElement) {
                const text = rowTextElement.innerText.trim();
                if (text.startsWith("Geschwindigkeitsüberschreitung") && row.classList.contains('selected')) {
                    row.click(); // Deselect
                }
            }
        }

        // Dann die richtige Strafe auswählen
        for (const row of rows) {
            const rowTextElement = row.querySelector('.fineText');
            // Robuster Vergleich: Leerzeichen entfernen
            if (rowTextElement && rowTextElement.innerText.replace(/\s/g, '') === fineText.replace(/\s/g, '')) {
                // Wenn noch nicht ausgewählt, anklicken
                if (!row.classList.contains('selected')) {
                    row.click();
                }
                
                // Zur Zeile scrollen
                row.scrollIntoView({ behavior: 'smooth', block: 'center' });
                break;
            }
        }
        
        // Frame schließen
        hideTowFrame();
    }
});

async function openDisclaimer() {
    await sleep(500) // Let the page load

    let disclaimerNode = document.getElementById("disclaimer")
    disclaimerNode.style.opacity = 1
}
