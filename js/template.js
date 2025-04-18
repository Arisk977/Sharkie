/**
 * Returns the HTML template for the menu overlay with start and controls buttons.
 *
 * @returns {string} The HTML content for the menu overlay.
 */
function menuOverlayTemp() {
    return `<div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
    <div><img src="./assets/6.Botones/Start/1.png" id="start" onclick="clickStart()"></div>
    <div><img src="./assets/6.Botones/Controls/controls.png" id="controls" onclick="clickControls()"></div>`;
}

/**
 * Returns the HTML template for the instructions screen with a back button.
 *
 * @returns {string} The HTML content for the instructions screen.
 */
function instructionsTemp() {
    return `<div><h1>༄꩜𖦹SHARKIE𖦹꩜༄</h1></div>
        <div><img src="./assets/6.Botones/Instructions 1.png" id="instructions"></div>
        <div><img src="./assets/6.Botones/Controls/back-24838_640.png" alt="" id="back" onclick="clickBack()"></div>`
}

/**
 * Returns the HTML template for the impressum page with contact information.
 *
 * @returns {string} The HTML content for the impressum page.
 */
function impressumTemp() {
    return `<div id="impressum">
            <h1>Impressum</h1>
            <p>Aris Karamat <br>
                Schulstraße 8a <br>
                65520 Bad Camberg
            </p>

            <h4>Kontakt</h4>

            <p>
                Telefon: <a href="tel:+491746537693">0174 6537693</a> <br>
                Email: <a href="mailto: karamataris@gmail.com">karamataris@gmail.com</a>
            </p>
            
        </div>
        <div><img src="./assets/6.Botones/Controls/back-24838_640.png" alt="" id="back" onclick="clickBack()"></div>`
}