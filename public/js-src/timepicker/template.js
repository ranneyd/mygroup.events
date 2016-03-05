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

export default template;
