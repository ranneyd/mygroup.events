const template = `
<div class="mtp-overlay" style="display:none">
    <div class="mtp-wrapper">
        <div class="mtp-display">
            <span class="mtp-display__time">12:00</span>
            <span class="mtp-display__meridiem">am</span>
        </div><!-- END .mtp-display -->
        <div class="mtp-picker">
            <div class="mtp-meridiem">
                <span class="mtp-clock--active">am</span>
                <span>pm</span>
            </div><!-- END .mtp-meridiem -->
            <div class="mtp-clock">
                <div class="mtp-clock__center"></div>
                <div class="mtp-clock__hand"></div>
                <ul class="mtp-clock__time mtp-clock__outer mtp-clock__hours" style="display:none">
                    <li>3</li>
                    <li>4</li>
                    <li>5</li>
                    <li>6</li>
                    <li>7</li>
                    <li>8</li>
                    <li>9</li>
                    <li>10</li>
                    <li>11</li>
                    <li class="mtp-clock--active">12</li>
                    <li>1</li>
                    <li>2</li>
                </ul>
                <ul class="mtp-clock__time mtp-clock__outer mtp-clock__minutes" style="display:none">
                    <li>15</li>
                    <li>20</li>
                    <li>25</li>
                    <li>30</li>
                    <li>35</li>
                    <li>40</li>
                    <li>45</li>
                    <li>50</li>
                    <li>55</li>
                    <li class="mtp-clock--active">0</li>
                    <li>5</li>
                    <li>10</li>
                </ul>
                <ul class="mtp-clock__time mtp-clock__hours-military" style="display:none">
                    <div class="mtp-clock__inner">
                        <li>3</li>
                        <li>4</li>
                        <li>5</li>
                        <li>6</li>
                        <li>7</li>
                        <li>8</li>
                        <li>9</li>
                        <li>10</li>
                        <li>11</li>
                        <li class="mtp-clock--active">00</li>
                        <li>1</li>
                        <li>2</li>
                    </div>
                    <div class="mtp-clock__outer">
                        <li>15</li>
                        <li>16</li>
                        <li>17</li>
                        <li>18</li>
                        <li>19</li>
                        <li>20</li>
                        <li>21</li>
                        <li>22</li>
                        <li>23</li>
                        <li>12</li>
                        <li>13</li>
                        <li>14</li>
                    </div>
                </ul>
            </div><!-- END .mtp-clock -->
            <div class="mtp-actions">
                <button type="button" class="mtp-actions__button mtp-actions__cancel">Cancel</button>
                <button type="button" class="mtp-actions__button mtp-actions__back" style="display:none">Back</button>
                <button type="button" class="mtp-actions__button mtp-actions__ok">OK</button>
            </div><!-- END .mtp-actions -->
        </div><!-- END .mtp-picker -->
    </div><!-- END .mtp-wrapper -->
</div><!-- END .mtp-overlay -->
`;
/**
 * Object.assign polyfill
 *
 * @param {object} target Target object to merge properties onto
 * @param {...object} sources  Source object to merge properties from
 * @return {object} Target object with merged properties
 */
function assign(target, ...sources) {
    if (target === 'undefined' || target === null) {
        throw new TypeError('Cannot convert first argument to object');
    }

    const to = Object(target);

    for (let inc = 0; inc < sources.length; inc += 1) {
        let nextSource = sources[inc];

        if (nextSource === 'undefined' || nextSource === null) {
            continue;
        }

        nextSource = Object(nextSource);

        const keysArray = Object.keys(nextSource);

        for (let nextIndex = 0, len = keysArray.length; nextIndex < len; nextIndex += 1) {
            const nextKey = keysArray[nextIndex];
            const desc = Object.getOwnPropertyDescriptor(nextSource, nextKey);

            if (desc !== 'undefined' && desc.enumerable) {
                to[nextKey] = nextSource[nextKey];
            }
        }
    }

    return to;
}

class TimePicker {

    /**
     * Initialize new TimePicker instance
     *
     * @return {TimePicker} New TimePicker instance
     */
    constructor() {
        this.template = template;
        this.setupTemplate();
        this.currentStep = 0;
        this.defaultOptions = {};
        // `standard` or `military` display hours
        this.defaultOptions.timeFormat = 'standard';
        this.cachedEls = {};
        this.cachedEls.overlay = document.getElementsByClassName('mtp-overlay')[0];
        this.cachedEls.wrapper = this.cachedEls.overlay.getElementsByClassName('mtp-wrapper')[0];
        this.cachedEls.picker = this.cachedEls.wrapper.getElementsByClassName('mtp-picker')[0];
        this.cachedEls.meridiem = this.cachedEls.wrapper.getElementsByClassName('mtp-meridiem')[0];
        this.cachedEls.meridiemSpans = this.cachedEls.meridiem.getElementsByTagName('span');
        this.cachedEls.displayTime = this.cachedEls.wrapper.getElementsByClassName('mtp-display__time')[0];
        this.cachedEls.displayMeridiem = this.cachedEls.wrapper.getElementsByClassName('mtp-display__meridiem')[0];
        this.cachedEls.buttonCancel = this.cachedEls.picker.getElementsByClassName('mtp-actions__cancel')[0];
        this.cachedEls.buttonBack = this.cachedEls.picker.getElementsByClassName('mtp-actions__back')[0];
        this.cachedEls.buttonOk = this.cachedEls.picker.getElementsByClassName('mtp-actions__ok')[0];
        this.cachedEls.clockHours = this.cachedEls.picker.getElementsByClassName('mtp-clock__hours')[0];
        this.cachedEls.clockMinutes = this.cachedEls.picker.getElementsByClassName('mtp-clock__minutes')[0];
        this.cachedEls.clockMilitaryHours = this.cachedEls.picker.getElementsByClassName('mtp-clock__hours-military')[0];
        this.cachedEls.clockHand = this.cachedEls.picker.getElementsByClassName('mtp-clock__hand')[0];
        this.cachedEls.clockHoursLi = this.cachedEls.clockHours.getElementsByTagName('li');
        this.cachedEls.clockMinutesLi = this.cachedEls.clockMinutes.getElementsByTagName('li');
        this.cachedEls.clockMilitaryHoursLi = this.cachedEls.clockMilitaryHours.getElementsByTagName('li');

        this.setEvents();

        return this;
    }

    /**
     * Bind event to the input element to open when `focus` event is triggered
     *
     * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
     * @param {object} options Options to merged with defaults and set to input element object
     * @return {void}
     */
    bindInput(inputEl, options = {}) {
        const element = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);

        element.mtpOptions = assign({}, this.defaultOptions, options);
        element.addEventListener('focus', event => this.showEvent(event));
    }

    /**
     * Open picker with the input provided in context without binding events
     *
     * @param {string|HTMLElement} inputEl Selector element to be queried or existing HTMLElement
     * @param {object} options Options to merged with defaults and set to input element object
     * @return {void}
     */
    openOnInput(inputEl, options = {}) {
        this.inputEl = inputEl instanceof HTMLElement ? inputEl : document.querySelector(inputEl);
        this.inputEl.mtpOptions = assign({}, this.defaultOptions, options);
        this.show();
    }

    /**
     * Setup the template in DOM if not already
     *
     * @return {void}
     */
    setupTemplate() {
        if (!this.isTemplateInDOM()) {
            document.body.insertAdjacentHTML('beforeend', template);
        }
    }

    /**
     * Set the events on picker elements
     *
     * @return {void}
     */
    setEvents() {
        if (!this.hasSetEvents()) {
            // close
            this.cachedEls.overlay.addEventListener('click', event => this.hideEvent(event));
            this.cachedEls.buttonCancel.addEventListener('click', event => this.hideEvent(event));

            // next/prev step actions
            this.cachedEls.buttonOk.addEventListener('click', () => this.changeStep(this.currentStep + 1));
            this.cachedEls.buttonBack.addEventListener('click', () => this.changeStep(0));

            // meridiem select events
            [].forEach.call(this.cachedEls.meridiemSpans, span => {
                span.addEventListener('click', event => this.meridiemSelectEvent(event));
            });

            // time select events
            [].forEach.call(this.cachedEls.clockHoursLi, hour => {
                hour.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.cachedEls.clockHours, this.cachedEls.clockHoursLi, 0);
                });
            });
            [].forEach.call(this.cachedEls.clockMinutesLi, minute => {
                minute.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.cachedEls.clockMinutes, this.cachedEls.clockMinutesLi, 1);
                });
            });
            [].forEach.call(this.cachedEls.clockMilitaryHoursLi, hour => {
                hour.addEventListener('click', event => {
                    this.timeSelectEvent(event, this.cachedEls.clockMilitaryHours, this.cachedEls.clockMilitaryHoursLi, 0);
                });
            });

            this.cachedEls.wrapper.classList.add('mtp-events-set');
        }
    }

    /**
     * Show the picker in the DOM
     *
     * @return {void}
     */
    show() {
        const isMilitaryFormat = this.isMilitaryFormat();

        // blur input to prevent onscreen keyboard from displaying
        this.inputEl.blur();
        this.toggleHoursVisible(true, isMilitaryFormat);
        this.toggleMinutesVisible();
        this.setDisplayTime(isMilitaryFormat ? '00' : '12', 0);
        this.setDisplayTime('0', 1);

        this.cachedEls.displayMeridiem.style.display = isMilitaryFormat ? 'none' : 'inline';
        this.cachedEls.meridiem.style.display = isMilitaryFormat ? 'none' : 'block';
        this.cachedEls.overlay.style.display = 'block';
    }

    /**
     * Event handle for input focus
     *
     * @param {Event} event Event object passed from listener
     * @return {void}
     */
    showEvent(event) {
        this.inputEl = event.target;
        this.show();
    }

    /**
     * Hide the picker in the DOM
     *
     * @return {void}
     */
    hide() {
        this.cachedEls.overlay.style.display = 'none';
        this.inputEl.dispatchEvent(new Event('blur'));
        this.resetState();
    }

    /**
     * Hide the picker element on the page
     *
     * @param {Event} event Event object passed from event listener callback
     * @return {void}
     */
    hideEvent(event) {
        event.stopPropagation();

        // only allow event based close if event.target contains one of these classes
        // hack to prevent overlay close event from triggering on all elements
        const allowedClasses = ['mtp-overlay', 'mtp-actions__cancel'];
        const classList = event.target.classList;

        allowedClasses.some(allowedClass => {
            if (classList.contains(allowedClass)) {
                this.hide();
                return true;
            }
        });
    }

    /**
     * Reset picker state to defaults
     *
     * @return {void}
     */
    resetState() {
        this.currentStep = 0;
        this.toggleHoursVisible(true, this.isMilitaryFormat());
        this.toggleMinutesVisible();
        this.cachedEls.clockHoursLi[9].dispatchEvent(new Event('click'));
        this.cachedEls.clockMinutesLi[9].dispatchEvent(new Event('click'));
        this.cachedEls.clockMilitaryHoursLi[9].dispatchEvent(new Event('click'));
        this.cachedEls.meridiemSpans[0].dispatchEvent(new Event('click'));
    }

    /**
     * Set the displayed time, which will be used to fill input value on completetion
     *
     * @param {string} value Newly selected time value
     * @param {integer} index Index of value to replace [0 = hours, 1 = minutes]
     * @return {void}
     */
    setDisplayTime(value, index) {
        const time = this.cachedEls.displayTime.innerHTML.split(':');

        // prepend with zero if selecting minutes and value is single digit
        time[index] = index === 1 && value < 10 ? `0${value}` : value;
        this.cachedEls.displayTime.innerHTML = time.join(':');
    }

    /**
     * Rotate the hand element to selected time
     *
     * @param {integer} nodeIndex Index of active element
     * @return {void}
     */
    rotateHand(nodeIndex = 9) {
        // rotation is done in increments of 30deg
        // nodeIndex 0 is 3 elements behind 0deg so subtract 90 from the sum
        const rotateDeg = nodeIndex * 30 - 90;
        const styleVal = `rotate(${rotateDeg}deg)`;

        this.cachedEls.clockHand.style.transform = styleVal;
        this.cachedEls.clockHand.style['-webkit-transform'] = styleVal;
        this.cachedEls.clockHand.style['-ms-transform'] = styleVal;
    }

    /**
     * Change to the specified step
     *
     * @param {integer} step Index of step to change to
     * @return {void}
     */
    changeStep(step) {
        const isMilitaryFormat = this.isMilitaryFormat();
        const hourEls = isMilitaryFormat ? this.cachedEls.clockMilitaryHoursLi : this.cachedEls.clockHoursLi;
        const minuteEls = this.cachedEls.clockMinutesLi;
        const changeStepAction = [
            () => {
                this.toggleHoursVisible(true, isMilitaryFormat);
                this.toggleMinutesVisible();
                this.rotateHand(this.getActiveIndex(hourEls));
            },
            () => {
                this.toggleHoursVisible();
                this.toggleMinutesVisible(true);
                this.rotateHand(this.getActiveIndex(minuteEls));
            },
            () => {
                this.timeSelected();
                this.hide();
            },
        ][step];

        this.currentStep = step;
        changeStepAction();
    }

    /**
     * Toggle hour (both military and standard) clock visiblity in DOM
     *
     * @param {boolean} isVisible Is clock face toggled visible or hidden
     * @param {boolean} isMilitaryFormat Is using military hour format
     * @return {void}
     */
    toggleHoursVisible(isVisible = false, isMilitaryFormat = false) {
        this.cachedEls.clockHours.style.display = isVisible && !isMilitaryFormat ? 'block' : 'none';
        this.cachedEls.clockMilitaryHours.style.display = isVisible && isMilitaryFormat ? 'block' : 'none';
    }

    /**
     * Toggle minute clock visiblity in DOM
     *
     * @param {boolean} isVisible Is clock face toggled visible or hidden
     * @return {void}
     */
    toggleMinutesVisible(isVisible = false) {
        this.cachedEls.clockMinutes.style.display = isVisible ? 'block' : 'none';
        this.cachedEls.buttonBack.style.display = isVisible ? 'inline-block' : 'none';
    }

    /**
     * Get the active time element index
     *
     * @param {HTMLCollection} timeEls Collection of time elements to find active in
     * @return {integer} Active element index
     */
    getActiveIndex(timeEls) {
        let activeIndex = 0;

        [].some.call(timeEls, (timeEl, index) => {
            if (timeEl.classList.contains('mtp-clock--active')) {
                activeIndex = index;
                return true;
            }
        });

        return activeIndex > 11 ? activeIndex - 12 : activeIndex;
    }

    /**
     * Set selected time to input element
     *
     * @return {void}
     */
    timeSelected() {
        const time = this.cachedEls.displayTime.innerHTML;
        const meridiem = this.isMilitaryFormat() ? '' : this.cachedEls.displayMeridiem.innerHTML;
        const timeValue = `${time} ${meridiem}`;

        this.inputEl.value = timeValue.trim();
        this.inputEl.dispatchEvent(new Event('input'));
    }

    /**
     * Set active clock face element
     *
     * @param {Element} containerEl New active elements .parentNode
     * @param {Element} activeEl Element to set active
     * @return {void}
     */
    setActiveEl(containerEl, activeEl) {
        const activeClassName = 'mtp-clock--active';
        const currentActive = containerEl.getElementsByClassName(activeClassName)[0];

        currentActive.classList.remove(activeClassName);
        activeEl.classList.add(activeClassName);
    }

    /**
     * Meridiem select event handler
     *
     * @param {Evenet} event Event object passed from listener
     * @return {void}
     */
    meridiemSelectEvent(event) {
        const activeClassName = 'mtp-clock--active';
        const element = event.target;
        const currentActive = this.cachedEls.meridiem.getElementsByClassName(activeClassName)[0];
        const value = element.innerHTML;

        if (!currentActive.isEqualNode(element)) {
            currentActive.classList.remove(activeClassName);
            element.classList.add(activeClassName);
            this.cachedEls.displayMeridiem.innerHTML = value;
        }
    }

    /**
     * Time select event handler
     *
     * @param {Event} event Event object passed from listener
     * @param {HTMLElement} containerEl Element containing time list elements
     * @param {HTMLCollection} listEls Collection of list elements
     * @param {integer} displayIndex Index at which selected time should display [1: hours, 2: minutes]
     * @return {void}
     */
    timeSelectEvent(event, containerEl, listEls, displayIndex) {
        event.stopPropagation();

        const newActive = event.target;

        this.setActiveEl(containerEl, newActive);
        this.setDisplayTime(newActive.innerHTML, displayIndex);
        this.rotateHand(this.getActiveIndex(listEls));
    }

    /**
     * Check if picker set to military time mode
     *
     * @return {boolean} Is in military time mode
     */
    isMilitaryFormat() {
        return Boolean(this.inputEl.mtpOptions.timeFormat === 'military');
    }

    /**
     * Check if picker object has already set events on picker elements
     *
     * @return {boolean} Has events been set on picker elements
     */
    hasSetEvents() {
        return this.cachedEls.wrapper.classList.contains('mtp-events-set');
    }

    /**
     * Check if template has already been appended to DOM
     *
     * @return {boolean} Is template in DOM
     */
    isTemplateInDOM() {
        return Boolean(document.getElementsByClassName('mtp-overlay')[0]);
    }
}

window.TimePicker = new TimePicker();
