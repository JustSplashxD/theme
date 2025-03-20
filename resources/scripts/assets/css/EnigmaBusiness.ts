import tw from 'twin.macro';
import { createGlobalStyle } from 'styled-components/macro';

export default createGlobalStyle`
:root {
    --gradient:linear-gradient(to right,#59A3FF,#59A3FF);
    --text:#eee;
    --second-text:#ccc;
    --placeholder:#6c6c6c;

    --700:hsl(0, 0%, 13%);
    --800:hsl(0, 0%, 9%);
    --900:hsl(0, 0%, 7%);
}

::-webkit-scrollbar {
    width:5px;
    height:3px;
}
::-webkit-scrollbar-track {
    background:var(--900);
}
::-webkit-scrollbar-thumb {
    background:var(--700);
    border-radius:0;
}

body {
  background-image: url('https://cdn.discordapp.com/attachments/1169010619815567503/1173222686374232154/minecraft-wallpaper-90.png?ex=65632bc5&is=6550b6c5&hm=01380ced8927bdb007dd9cad4fa152b70d280eba85b684d14b9df96d37be7ec6&');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
}
input,textarea {
    border:none !important;
    outline:none !important;
    box-shadow:none !important;
    border-radius:8px !important;
}
input::placeholder {
    color:var(--placeholder);
    font-size:14px;
}
label {
    background:var(--900) !important;
}
label::before {
    background:var(--700) !important;
    border:0 !important;
}
input[type="checkbox"]:checked + label {
    background:var(--gradient) !important;
}
select, textarea {
    outline:none !important;
    border:none !important;
}

.leftMenu {
    min-width:240px;
    max-width:240px;
    height:100vh;
    position:relative;
    display:block;
}
.leftMenuFixed {
    position:fixed;
    width:240px;
    height:100%;
    box-sizing:border-box;
    padding:30px 0 15px;
    background-color: rgb(0 0 0 / 20%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    z-index:1;
}
.leftLogo {
    padding:0 20px;
}
.leftMenuContent {
    height:100%;
}
.leftMenuContent > * {
    border:none !important;
    box-shadow:none !important;
    display:flex;
    align-items:center;
    min-width:100%;
    min-height:54px;
    background:transparent !important;
    box-sizing:border-box;
    padding:0 25px !important;
    position:relative;
    color:white;
    stroke:rgba(255,255,255,.7);
    opacity:.7;
}
.leftMenuContent > *:hover,
.leftMenuContent > *:hover::before {
    opacity:1;
}
.leftMenuContent > *.active,
.leftMenuContent > *.active::before {
    opacity:1;
}
.leftMenuContent > *::before {
    content:'';
    position:absolute;
    width:215px;
    height:42px;
	left:10px;
    border-radius:8px 8px 8px 8px;
    background:#3b3b3b69;
    transition:.2s;
    opacity:0;
}
.subcategory {
    opacity:1;
    font-size:14px;
    font-weight:bold;
    margin-top:25px !important;
    margin-bottom:8px !important;
    min-height:fit-content !important;
}
.subcategory::before {
    background:transparent !important;
}
.topMenuMain {
    width:calc(100vw - 240px);
    position:fixed;
    top:0;
    left:240px;
    background-color: rgb(0 0 0 / 20%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    z-index:9;
    padding:0 35px;
    height:68px;
    display:flex;
    align-items:center;
    justify-content:space-between;
}
.mainContent {
    width:100%;
    max-width:calc(100% - 240px);
    margin:0 auto;
    box-sizing:border-box;
    padding:68px 50px 0;
    position:relative;
}
.bg_home_section {
    position:absolute;
    top:64px;
    left:0;
    box-sizing:border-box;
    padding:0 35px;
}
.bg_home_section::before {
    content:'';
    display:block;
    position:absolute;
    width:100%;
    height:350px;
    left:0;
}
.searchInput {
    position:absolute;
    top:-22px;
}
.servers_content {
    margin-left:-15px;
	max-width: 1600px;
    box-sizing:border-box;
    padding:25px;
	position: absolute;
    height: auto;
    min-height: 200px;
    border-radius:15px;
    background-color: rgb(0 0 0 / 8%);
    backdrop-filter: blur(15px);
}
.server_left_content {
    width:305px;
    margin-left:-15px;
}
.server_left_block {
    width:100%;
    min-height:100px;
    margin-bottom:10px;
    background-color: rgb(0 0 0 / 30%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    border-radius:15px;
    box-sizing:border-box;
    padding:25px;
}
.server_right_content {
    width:calc(100vw - 240px - 72px - 320px);
    margin-left:15px;
    box-sizing:border-box;
    padding:25px;
    background-color: rgb(0 0 0 / 30%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    min-height:300px;
    border-radius:15px;
}
.server_progress_main_page {
    width:90px;
    height:8px;
    background:rgba(255,255,255,.1);
}
.server_progress_main_page::-moz-progress-bar,
.server_progress_main_page::-webkit-progress-value {
    background:white;
}
.homeBg {
    width:calc(100% + 74px);
    margin-left:-50px;
    margin-bottom:70px;
    position:relative;
}
.homeBg h1,.homeBg h2 {
    margin-left:50px;
    z-index:1;
    position:relative;
}
.homeBg h1 {
    font-size:30px;
    color:var(--text);
    font-weight:800;
    line-height:120%;
}
.homeBg h2 {
    font-size:18px;
    color:var(--second-text);
    font-weight:400;
    line-height:100%;
}
.waves {
    position:absolute;
    width:100%;
    overflow-x:hidden;
    height:135px;
    overflow:hidden;
    left:0;
    top:0;
    display:flex;
    z-index:0;
}
.waves svg {
    min-width:974px;
    height:218px;
    margin-top:-115px;
}
.waves svg:nth-child(even) {
    transform:scaleX(-1);
}
.waves::after {
    content:'';
    position:absolute;
    width:100%;
    height:135px;
    background: linear-gradient(to right,#171717 1%,transparent 15%),linear-gradient(to left,#171717 1%,transparent 15%), linear-gradient(to top,#171717 25%,transparent 100%);
}
.userAvatar {
    width:100%;
    height:100%;
    border-radius:inherit;
}
.clear {
    clear:both;
}
.homeServers {
    width:calc(100% - 55px);
    box-sizing:border-box;
    float:left;
}
.homeAds {
    width:300px;
    box-sizing:border-box;
    float:right;
}
.homeServers h2 {
    text-transform:uppercase;
    font-weight:bold;
    color:var(--text);
    margin-bottom:10px;
}
.chart_sm {
    position:relative;
}
.chart_full {
    display:none;
    position:absolute;
    top:50px;
    right:0;
}
.chart_sm:hover .chart_full {
    display:block;
    animation:.2s chartFade forwards;
}
@keyframes chartFade {
    from {
        opacity:0;
        transform:translateY(10px);
    }
    to {
        opacity:1;
        transform:translateY(0px);
    }
}
.account_bg {
    width:100%;
    height:250px;
    position:absolute;
    top:64px;
    left:0;
    box-sizing:border-box;
    padding:25px 25px 0;
    display:flex;
    align-items:end;
    
}

.server_menu_left_items {
    opacity:.7;
    transition:.2s;
}
.server_menu_left_items:hover {
    opacity:1;
}
.server_menu_left_items.active {
    opacity:1;
}
.tarifBox {
    display:flex;
    justify-content:space-between;
    margin:0 0 40px;
}
.tarif {
    background:var(--700);
    width:24%;
    box-sizing:border-box;
    padding:10px;
    border-radius:10px;
    display:flex;
    flex-wrap:wrap;
    align-items:center;
    justify-content:center;
    text-align:center;
    border-bottom:3px solid var(--900);
}
.tarif img {
    width:40%;
    margin:0 30%;
    clear:both;
    margin-top:10px;
    margin-bottom:15px;
}
.tarif p {
    font-size:14px;
    font-weight:400;
    line-height:100%;
    margin-top:10px;
    color:var(--second-text);
}
.tarif a {
    width:90%;
    background:var(--800);
    box-sizing:border-box;
    padding:10px;
    text-align:center;
    border-radius:10px;
    font-size:14px;
    text-transform:uppercase;
    margin-top:15px;
    color:var(--text);
}
.tarif h2 {
    width:100%;
    text-align:center;
}
.searchInput input {
    min-width:400px !important;
    box-sizing:border-box !important;
    padding-left:40px !important;
}
.searchInput svg {
    position:absolute;
    margin-left:15px;
    margin-top:14px;
    color:var(--placeholder);
}
.serverRow {
    padding:0 !important;
    border:none !important;
    background:transparent !important;
    display:flex !important;
    justify-content:space-between !important;
}
.serverRowDetails {
    min-width:120px;
}
.serverIcon {
    min-width:46px;
    max-width:46px;
    height:46px;
    border-radius:10px;
    display:flex;
    justify-content:center;
    align-items:center;
    background:var(--700);
}
.btn {
    background:var(--700);
    box-sizing:border-box;
    padding:6px 12px;
    text-align:center;
    border-radius:10px;
    font-size:14px;
    color:var(--text);
}
.status-bar {
    min-width: 8px;
    min-height:8px;
    max-width: 8px;
    max-height:8px;
}
.serverDetails {
    display:flex;
}
.serverDetails > p {
    color:var(--second-text);
    ${tw`mr-5`};
}
.serverDetails > p > svg {
    ${tw`mr-1`};
}
.footer {
    opacity:.5;
    position:absolute;
    right:0;
    width:calc(100vw - 220px);
    margin-left:-25px;
    background:var(--900);
    padding:10px 0;
}
.stats_icon {
    position:absolute;
    width:75px;
    opacity:.5;
    right:-35px;
    top:10px;
}
.power_btn {
    width:100px;
    height:100px;
    border-radius:10px !important;
    margin-bottom:5px;
    outline:none !important;
    box-shadow:none !important;
    background:var(--900) !important;
    border:2px solid transparent;
    transition:.15s !important;
    transition-timing-function:linear !important;
    display:flex !important;
    flex-wrap:wrap !important;
    align-items:center !important;
    align-content:center !important;
    justify-content:center !important;
    color:var(--text) !important;
    position:relative !important;
}
.power_btn svg {
    width:26px !important;
    height:auto;
    margin-bottom:10px;
}
.power_btn span {
    width:100%;
    display:block;
    position:relative;
    font-weight:400 !important;
    font-size:12px !important;
    opacity:.3;
    position:absolute;
    bottom:5px;
}
.power_btn.btn_start:hover {
    border:2px solid rgba(37, 99, 235, 1) !important;
}
.power_btn.btn_restart:hover {
    border:2px solid darkorange;
}
.power_btn.btn_stop {
    border:2px solid rgba(220, 38, 38, .5);
}
.power_btn.btn_stop:hover {
    background:rgba(220, 38, 38, .5) !important;
}
.backdrop {
    background:rgba(0,0,0,.5);
    backdrop-filter:blur(5px);
    border-radius:10px !important;
}
.modal_components > div > div > .bg-gray-700 {
    background:var(--800) !important;
}
.modal_components label {
    background:transparent !important;
    border:none !important;
}
.modal_components input[type="checkbox"] + label {
    background-color: rgb(0 0 0 / 30%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
}
.modal_components input[type="checkbox"]:checked + label {
    background:var(--gradient) !important;
}
.greyBox input,
.greyBox textarea,
.greyBox select,
.greyBox code {
    background:var(--800) !important;
}
.greyBox input[type="checkbox"]:checked {
    background:var(--placeholder) !important;
}
.greyBox label {
    background:transparent !important;
}
.accountAva {
    width:125px;
    height:125px;
    margin-right:20px;
    border:7px solid #0a0a0a;
    border-radius:15px;
    overflow:hidden;
    margin-bottom:-40px;
}
.accountAva * {
    border-radius:0 !important;
}
.role {
    background:#0a0a0a;
    border-radius:5px;
    font-size:11px;
    font-weight:400;
    padding:2px 7px;
    max-height:fit-content;
}
.accountBlocks {
    width:calc(100% + 40px);
    margin-left:-20px;
}
.accountContainer {
    background-color: rgb(0 0 0 / 30%);
    -webkit-backdrop-filter: blur(15px);
    backdrop-filter: blur(15px);
    width:fit-content;
    height:fit-content;
    border-radius:8px;
    box-sizing:border-box;
    padding:15px 15px 20px;
}
.accountContainer input,
.accountContainer textarea,
.accountContainer select,
.accountContainer code {
    background:var(--800) !important;
}
.accountContainer input[type="checkbox"]:checked {
    background:var(--placeholder) !important;
}
.accountContainer label {
    background:transparent !important;
}
.accountSubmenu {
    width:100%;
    display:flex;
    align-items:center;
    margin-bottom:-50px;
    margin-top:25px;
}
.accountSubmenu > p {
    margin-right:15px;
    cursor:pointer;
    padding-bottom:6px;
    margin-bottom:5px;
}
.accountSubmenu .active {
    box-shadow:inset 0 -2px #565656;
}
.accountSettings {
    position:relative;
    width:100%;
    box-sizing:border-box;
    padding:10px 15px 15px;
}
.dopSettings {
    margin-top:-8px;
    padding:3px 8px;
    border-radius:5px;
    background:var(--700);
    display:flex;
    align-items:center;
    cursor:pointer;
    margin-left:3px;
}
.closeDop {
    height:fit-content;
    width:20px;
    height:20px;
    display:flex;
    align-items:center;
    justify-content:center;
    font-size:12px;
    align-content:center;
    border-radius:5px;
    background:hsl(0, 0%, 22.4%);
    margin-left:5px;
}
.authBg {
    width:100vw;
    height:100%;
}
.authBg::after {
    content:'';
    position:absolute;
    width:100vw;
    height:100vh;
    background:linear-gradient(to top, transparent, black);
    top:0;
    z-index:1;
}
.authContainer {
    width:50vw;
    min-height:100vh;
    display:flex;
    align-items:center;
    margin:0 auto;
}
.logo-container {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .logo-container img {
    margin-right: 0.5rem;
  }
  
  .logo-name {
    font-size: 20px;
    font-family: inherit;
    color: var(--text-neutral-300); /* Use the text-neutral-300 color */
  }
  .discordIcon {
    margin-left: auto;
    margin-right: 20px;
  }
  #discordIcon {
    margin-left:auto;
    margin-right:20px;
  }

.loginBox {
    width:460px;
    margin:0 auto;
    box-sizing:border-box;
    padding:60px 30px;
    background-color: rgb(0 0 0 / 51%);
    border-radius:25px;
    z-index:2;
}
.loginBox label {
    background:transparent !important;
    border:none !important;
    color:var(--text) !important;
    margin-top:0 !important;
}
.loginBox a {
    color:var(--text) !important;
}
.loginBox input {
    background:var(--700) !important;
    color:white !important;
}
.loginBox button {
    background:var(--700) !important;
    border-radius:10px !important;
    border:2px solid #2b2b2d !important
}
.loginBox button:hover {
    background:var(--700) !important;
}
.mobileMenuOpen {
    width:44px;
    height:44px;
    border-radius:8px;
    background:var(--700);
    justify-content:center;
    align-items:center;
    z-index:9999999;
    position:fixed;
    top:10px;
    right:15px;
    display:none;
}
.searchBar {
    width:400px;
}

@media(max-device-width:1200px) {
    .homeAds {
        display:none;
    }
    .homeServers {
        width:100%;
    }
}
@media(max-device-width:1050px) {
    .mainContent {
        width:100%;
        min-width:100vw;
        padding:68px 0 0;
    }
    .bg_home_section {
        padding:0 20px;
    }
    .topMenuMain {
        width:100%;
        left:0 !important;
    }
    .chart_sm {
        display:none;
    }
    .server_right_content {
        width:calc(100vw - 240px - 72px);
    }
    .leftMenu {
        left:-221px;
        position:absolute;
        z-index:99999;
    }
    .closed {
        left:-241px !important;
    }
    .opened {
        left:0 !important;
    }
    .mobileMenuOpen {
        display:flex;
    }
    .power_btn {
        width:80px;
        height:80px;
    }
    .footer {
        width:100% !important;
        margin-left:0 !important;
    }
    .accountBlocks {
        flex-wrap:wrap;
    }
    .accountContainer,
    .accountContAdapt {
        min-width:fit-content !important;
        width:100% !important;
    }
    .accountRight {
        margin-left:0;
        margin-top:10px;
    }
}
@media(max-device-width:750px) {
    .serverRow > div:nth-child(2) {
        display:none !important;
    }
    .tarifBox {
        flex-wrap:wrap;
    }
    .tarif {
        width:49%;
        margin-bottom:10px;
    }
    .switcher {
        top:-34px !important;
    }
    .searchInput {
        width:100%;
    }
    .searchInput input {
        min-width:100% !important;
    }
    .serverPowers {
        display:flex !important;
        width:100% !important;
        margin-bottom:10px;
    }
    .consoleAdapt {
        display:block !important;
        margin-top:12px;
    }
    .power_btn {
        display:flex !important;
        align-items:center;
        flex-wrap:nowrap !important;
        width:fit-content !important;
        height:fit-content !important;
        margin-right:10px;
        margin-bottom:0;
    }
    .power_btn svg {
        width:18px !important;
        margin:0 8px 0 0;
    }
    .power_btn span {
        width:fit-content !important;
        position:relative !important;
        height:16px;
    }
    .serverMore {
        display:none;
    }
    .authContainer {
        width:100vw;
    }
    .authContainer:after {
        display:none;
    }
}
@media(max-device-width:640px) {
    .serverPowers {
        justify-content:flex-start;
        column-gap:5px;
    }
    .serverDetailsBlockAdapt {
        grid-template-columns:repeat(3, minmax(0, 1fr));
    }
    .servers_content {
        width:calc(100vw - 240px - 72px);
        margin-left:-15px;
        box-sizing:border-box;
        padding:25px;
		background-color: rgb(0 0 0 / 30%);
		-webkit-backdrop-filter: blur(15px);
		backdrop-filter: blur(15px);
        min-height:300px;
        border-radius:15px;
    }
    .server_left_content {
        width:305px;
        margin-left:-15px;
    }
    .server_left_block {
        width:100%;
        min-height:100px;
        margin-bottom:10px;
		background-color: rgb(0 0 0 / 30%);
		-webkit-backdrop-filter: blur(15px);
		backdrop-filter: blur(15px);
        border-radius:15px;
        box-sizing:border-box;
        padding:25px;
    }
    .server_right_content {
        width:calc(100vw - 240px - 72px - 320px);
        margin-left:15px;
        box-sizing:border-box;
        padding:25px;
		background-color: rgb(0 0 0 / 30%);
		-webkit-backdrop-filter: blur(15px);
		backdrop-filter: blur(15px);
        min-height:300px;
        border-radius:15px;
    }
    .accountAva {
        margin-left:-10px;
    }
    .accountBlocks {
        box-sizing:border-box;
        padding:0 25px;
    }
    .searchBar {
        width:calc(100vw - 90px);
    }
    .serverList {
        width:calc(100% + 40px);
        margin-left:-20px;
    }
}
`;