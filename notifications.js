async function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

let inFunction = false

async function hideNotif(notif) {
    if (notif.dataset.isHiding === "true") {
        return
    } else {
        notif.dataset.isHiding = "true"
    }

    let hideAnim = notif.animate(
        [
            { transform: 'translateY(0)', opacity: 1 },
            { transform: 'translateY(20px)', opacity: 0 }
        ],
        {
            fill: "forwards",
            easing: "ease",
            duration: 300
        }
    )

    hideAnim.play()

    await sleep(300)
    notif.remove()
}

async function insertNotification(type, text, duration) {

    // Remove existing notifications to prevent stacking
    const container = document.getElementById("standartNotifications");
    while (container.firstChild) {
        container.removeChild(container.firstChild);
    }

    let randomId = "noti-" + Math.round(Math.random() * 2000000)

    let notification = document.createElement('div')
    notification.classList.add("notification")
    notification.classList.add(type)
    notification.id = randomId

    // Title
    let titleDiv = document.createElement('div');
    titleDiv.classList.add('notification-title');
    titleDiv.innerText = 'BENACHRICHTIGUNG';
    notification.appendChild(titleDiv);

    // Progress Bar
    let progressContainer = document.createElement('div');
    progressContainer.classList.add('notification-progress-container');
    let progressBar = document.createElement('div');
    progressBar.classList.add('notification-progress-bar');
    
    // Animate progress bar
    progressBar.animate([
        { width: '0%' },
        { width: '100%' }
    ], {
        duration: duration * 1000,
        easing: 'linear'
    });

    progressContainer.appendChild(progressBar);
    notification.appendChild(progressContainer);

    // Text
    let textDiv = document.createElement('div');
    textDiv.classList.add('notification-text');
    textDiv.innerHTML = text;
    notification.appendChild(textDiv);

    document.getElementById("standartNotifications").appendChild(notification)

    // Loop removed as we now only allow one notification at a time

    await sleep(duration * 1000) 
    if (document.getElementById(randomId)) {
        hideNotif(document.getElementById(randomId))
    } 

}