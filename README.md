# murmurLight 首頁製作

利用 GSAP 製作視差滾動

不設定螢幕寬度斷點，而是利用 CSS 媒體查詢做直式跟橫式版，接著再針對比例 ( aspect-ratio ) 做微調，任何尺寸都不會跑版

元素移動皆使用 background-position 與 background-size 調整，增加性能
