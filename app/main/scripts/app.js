!function(){"use strict";angular.module("BlurAdmin.theme",["toastr","chart.js","angular-chartist","angular.morris-chart","textAngular","BlurAdmin.theme.components","BlurAdmin.theme.inputs"])}(),function(){"use strict";angular.module("BlurAdmin.theme.components",[])}(),function(){"use strict";angular.module("BlurAdmin.theme.inputs",[])}(),angular.module("BlurAdmin",["ngAnimate","ui.bootstrap","ui.sortable","ui.router","ngTouch","toastr","smart-table","xeditable","ui.slimscroll","ngJsTree","angular-progress-button-styles","BlurAdmin.theme"]),function(){"use strict";function e(e,n,i){i.decorator("$uiViewScroll",t)}function t(e,t,n){return function(i){n.hasAttr(i,"autoscroll-body-top")?t():e(i)}}e.$inject=["baConfigProvider","colorHelper","$provide"],t.$inject=["$delegate","$anchorScroll","baUtil"],angular.module("BlurAdmin.theme").config(e)}(),function(){"use strict";function e(e){var r={theme:{blur:!1},colors:{default:t.default,defaultText:t.defaultText,border:t.border,borderDark:t.borderDark,primary:n.primary,info:n.info,success:n.success,warning:n.warning,danger:n.danger,primaryLight:e.tint(n.primary,30),infoLight:e.tint(n.info,30),successLight:e.tint(n.success,30),warningLight:e.tint(n.warning,30),dangerLight:e.tint(n.danger,30),primaryDark:e.shade(n.primary,15),infoDark:e.shade(n.info,15),successDark:e.shade(n.success,15),warningDark:e.shade(n.warning,15),dangerDark:e.shade(n.danger,15),dashboard:{blueStone:i.blueStone,surfieGreen:i.surfieGreen,silverTree:i.silverTree,gossip:i.gossip,white:i.white}}};return r.changeTheme=function(e){angular.merge(r.theme,e)},r.changeColors=function(e){angular.merge(r.colors,e)},r.$get=function(){return delete r.$get,r},r}e.$inject=["colorHelper"];var t={default:"#ffffff",defaultText:"#666666",border:"#dddddd",borderDark:"#aaaaaa"},n={primary:"#209e91",info:"#2dacd1",success:"#90b900",warning:"#dfb81c",danger:"#e85656"},i={blueStone:"#005562",surfieGreen:"#0e8174",silverTree:"#6eba8c",gossip:"#b9f2a1",white:"#10c4b5"};angular.module("BlurAdmin.theme").provider("baConfig",e)}(),function(){"use strict";function e(e,t,n){function i(e){return e.toString(16)}function r(e){return parseInt(e,16)}for(var a="#",s=1;s<7;s+=2){var o=r(e.substr(s,2)),l=r(t.substr(s,2)),u=i(Math.floor(l+(o-l)*(n/100)));a+=("0"+u).slice(-2)}return a}var t="assets/img/";angular.module("BlurAdmin.theme").constant("layoutSizes",{resWidthCollapseSidebar:1200,resWidthHideSidebar:500}).constant("layoutPaths",{images:{root:t,profile:t+"app/profile/",amMap:"assets/img/theme/vendor/ammap//dist/ammap/images/",amChart:"assets/img/theme/vendor/amcharts/dist/amcharts/images/"}}).constant("colorHelper",{tint:function(t,n){return e("#ffffff",t,n)},shade:function(t,n){return e("#000000",t,n)}})}(),function(){"use strict";function e(e,t,n,i,r,a,s){var o=[i.loadAmCharts(),e(3e3)],l=s;l.blur&&(l.mobile?o.unshift(i.loadImg(n.images.root+"blur-bg-mobile.jpg")):(o.unshift(i.loadImg(n.images.root+"blur-bg.jpg")),o.unshift(i.loadImg(n.images.root+"blur-bg-blurred.jpg")))),r.all(o).then(function(){t.$pageFinishedLoading=!0}),e(function(){t.$pageFinishedLoading||(t.$pageFinishedLoading=!0)},7e3),t.$baSidebarService=a}e.$inject=["$timeout","$rootScope","layoutPaths","preloader","$q","baSidebarService","themeLayoutSettings"],angular.module("BlurAdmin.theme").run(e)}(),function(){"use strict";function e(e){var t=/android|webos|iphone|ipad|ipod|blackberry|windows phone/.test(navigator.userAgent.toLowerCase()),n=t?"mobile":"",i=e.theme.blur?"blur-theme":"";return angular.element(document.body).addClass(n).addClass(i),{blur:e.theme.blur,mobile:t}}e.$inject=["baConfig"],angular.module("BlurAdmin.theme").service("themeLayoutSettings",e)}(),function(){"use strict";function e(e){angular.extend(e,{closeButton:!0,closeHtml:"<button>&times;</button>",timeOut:5e3,autoDismiss:!1,containerId:"toast-container",maxOpened:0,newestOnTop:!0,positionClass:"toast-top-right",preventDuplicates:!1,preventOpenDuplicates:!1,target:"body"})}e.$inject=["toastrConfig"],angular.module("BlurAdmin.theme.components").config(e)}(),function(){"use strict";function e(e){return{link:function(t,n){e(function(){function t(t){e(function(){n.html(t)},30)}var i=n.attr("new-value"),r=parseInt(n.html());if(i>r)for(var a=r;a<=i;a++)t(a);else for(var s=r;s>=i;s--)t(s);e(function(){n.next().find("i").addClass("show-arr")},500)},3500)}}}e.$inject=["$timeout"],angular.module("BlurAdmin.theme").directive("animatedChange",e)}(),function(){"use strict";function e(){return{restrict:"A",link:function(e,t){t.bind("keydown",function(e){var t=e.target;$(t).height(0);var n=$(t)[0].scrollHeight;n=n<16?16:n,$(t).height(n)}),setTimeout(function(){var e=t;$(e).height(0);var n=$(e)[0].scrollHeight;n=n<16?16:n,$(e).height(n)},0)}}}angular.module("BlurAdmin.theme").directive("autoExpand",e)}(),function(){"use strict";function e(e,t){return{link:function(n,i,r){var a=t(r.autoFocus);n.$watch(a,function(t){t===!0&&e(function(){i[0].focus(),i[0].select()})}),i.bind("blur",function(){n.$apply(a.assign(n,!1))})}}}e.$inject=["$timeout","$parse"],angular.module("BlurAdmin.theme").directive("autoFocus",e)}(),function(){"use strict";function e(){return{restrict:"AE",templateUrl:function(e,t){return t.includeWithScope}}}angular.module("BlurAdmin.theme").directive("includeWithScope",e)}(),function(){"use strict";function e(e){return{restrict:"EA",template:"<div></div>",replace:!0,scope:{min:"=",max:"=",type:"@",prefix:"@",maxPostfix:"@",prettify:"=",prettifySeparator:"@",grid:"=",gridMargin:"@",postfix:"@",step:"@",hideMinMax:"@",hideFromTo:"@",from:"=",to:"=",disable:"=",onChange:"=",onFinish:"=",values:"=",timeout:"@"},link:function(t,n){n.ionRangeSlider({min:t.min,max:t.max,type:t.type,prefix:t.prefix,maxPostfix:t.maxPostfix,prettify_enabled:t.prettify,prettify_separator:t.prettifySeparator,grid:t.grid,gridMargin:t.gridMargin,postfix:t.postfix,step:t.step,hideMinMax:t.hideMinMax,hideFromTo:t.hideFromTo,from:t.from,to:t.to,disable:t.disable,onChange:t.onChange,onFinish:t.onFinish,values:t.values}),t.$watch("min",function(t){e(function(){n.data("ionRangeSlider").update({min:t})})},!0),t.$watch("max",function(t){e(function(){n.data("ionRangeSlider").update({max:t})})}),t.$watch("from",function(t){e(function(){n.data("ionRangeSlider").update({from:t})})}),t.$watch("to",function(t){e(function(){n.data("ionRangeSlider").update({to:t})})}),t.$watch("disable",function(t){e(function(){n.data("ionRangeSlider").update({disable:t})})})}}}e.$inject=["$timeout"],angular.module("BlurAdmin.theme").directive("ionSlider",e)}(),function(){"use strict";function e(){return{link:function(e,t){t.bind("change",function(t){e.file=(t.srcElement||t.target).files[0],e.getFile()})}}}angular.module("BlurAdmin.theme").directive("ngFileSelect",e)}(),function(){"use strict";function e(){return{scope:{scrollPosition:"=",maxHeight:"="},link:function(e){$(window).on("scroll",function(){var t=$(window).scrollTop()>e.maxHeight;t!==e.prevScrollTop&&e.$apply(function(){e.scrollPosition=t}),e.prevScrollTop=t})}}}angular.module("BlurAdmin.theme").directive("scrollPosition",e)}(),function(){"use strict";function e(){return{scope:{trackWidth:"=",minWidth:"="},link:function(e,t){e.trackWidth=$(t).width()<e.minWidth,e.prevTrackWidth=e.trackWidth,$(window).resize(function(){var n=$(t).width()<e.minWidth;n!==e.prevTrackWidth&&e.$apply(function(){e.trackWidth=n}),e.prevTrackWidth=n})}}}angular.module("BlurAdmin.theme").directive("trackWidth",e)}(),function(){"use strict";function e(e,t){return{restrict:"A",link:function(n,i){var r=1e3;t.$pageFinishedLoading&&(r=100),e(function(){i.removeClass("full-invisible"),i.addClass("animated zoomIn")},r)}}}e.$inject=["$timeout","$rootScope"],angular.module("BlurAdmin.theme").directive("zoomIn",e)}(),function(){"use strict";function e(e){var t={},n=0,i=100,r=!1;return{setProgress:function(e){if(e>i)throw Error("Progress can't be greater than max");n=e},getProgress:function(){return n},open:function(){if(r)throw Error("Progress modal opened now");t=e.open({animation:!0,templateUrl:"app/pages/ui/modals/progressModal/progressModal.html",size:"sm",keyboard:!1,backdrop:"static"}),r=!0},close:function(){if(!r)throw Error("Progress modal is not active");t.close(),r=!1}}}e.$inject=["$uibModal"],angular.module("BlurAdmin.theme").factory("baProgressModal",e)}(),function(){"use strict";function e(){this.isDescendant=function(e,t){for(var n=t.parentNode;null!=n;){if(n==e)return!0;n=n.parentNode}return!1},this.hexToRGB=function(e,t){var n=parseInt(e.slice(1,3),16),i=parseInt(e.slice(3,5),16),r=parseInt(e.slice(5,7),16);return"rgba("+n+", "+i+", "+r+", "+t+")"},this.hasAttr=function(e,t){var n=$(e).attr(t);return"undefined"!=typeof n&&n!==!1}}angular.module("BlurAdmin.theme").service("baUtil",e)}(),function(){"use strict";function e(e){var t=function(e,t,n){return function(){n.$apply(function(){t.resolve(e.result)})}},n=function(e,t,n){return function(){n.$apply(function(){t.reject(e.result)})}},i=function(e,t){return function(e){t.$broadcast("fileProgress",{total:e.total,loaded:e.loaded})}},r=function(e,r){var a=new FileReader;return a.onload=t(a,e,r),a.onerror=n(a,e,r),a.onprogress=i(a,r),a},a=function(t,n){var i=e.defer(),a=r(i,n);return a.readAsDataURL(t),i.promise};return{readAsDataUrl:a}}e.$inject=["$q"],angular.module("BlurAdmin.theme").service("fileReader",e)}(),function(){"use strict";function e(e){return{loadImg:function(t){var n=e.defer(),i=new Image;return i.src=t,i.onload=function(){n.resolve()},n.promise},loadAmCharts:function(){var t=e.defer();return AmCharts.ready(function(){t.resolve()}),t.promise}}}e.$inject=["$q"],angular.module("BlurAdmin.theme").service("preloader",e)}(),function(){"use strict";function e(e){return{start:function(t,n,i){function r(){return t(n,i)}var a=r();angular.element(e).bind("focus",function(){a&&t.cancel(a),a=r()}),angular.element(e).bind("blur",function(){a&&t.cancel(a)})}}}e.$inject=["$window"],angular.module("BlurAdmin.theme").service("stopableInterval",e)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/theme/components/backTop/backTop.html",controller:function(){$("#backTop").backTop({position:200,speed:100})}}}angular.module("BlurAdmin.theme.components").directive("backTop",e)}(),function(){"use strict";function e(e,t){return angular.extend({},e,{template:function(n,i){var r='<div  class="panel '+(t.theme.blur?"panel-blur":"")+" full-invisible "+(i.baPanelClass||"");return r+='" zoom-in '+(t.theme.blur?"ba-panel-blur":"")+">",r+=e.template(n,i),r+="</div>"}})}e.$inject=["baPanel","baConfig"],angular.module("BlurAdmin.theme").directive("baPanel",e)}(),function(){"use strict";function e(){return{restrict:"A",transclude:!0,template:function(e,t){var n='<div class="panel-body" ng-transclude></div>';if(t.baPanelTitle){var i='<div class="panel-heading clearfix"><h3 class="panel-title">'+t.baPanelTitle+"</h3></div>";n=i+n}return n}}}angular.module("BlurAdmin.theme").factory("baPanel",e)}(),function(){"use strict";function e(e,t,n){var i;return e.bodyBgLoad().then(function(){i=e.getBodyBgImageSizes()}),t.addEventListener("resize",function(){i=e.getBodyBgImageSizes()}),{restrict:"A",link:function(r,a){function s(){i&&a.css({backgroundSize:Math.round(i.width)+"px "+Math.round(i.height)+"px",backgroundPosition:Math.floor(i.positionX)+"px "+Math.floor(i.positionY)+"px"})}n.$isMobile||(e.bodyBgLoad().then(function(){setTimeout(s)}),t.addEventListener("resize",s),r.$on("$destroy",function(){t.removeEventListener("resize",s)}))}}}e.$inject=["baPanelBlurHelper","$window","$rootScope"],angular.module("BlurAdmin.theme").directive("baPanelBlur",e)}(),function(){"use strict";function e(e){var t=e.defer(),n=getComputedStyle(document.body,":before"),i=new Image;i.src=n.backgroundImage.replace(/url\((['"])?(.*?)\1\)/gi,"$2"),i.onerror=function(){t.reject()},i.onload=function(){t.resolve()},this.bodyBgLoad=function(){return t.promise},this.getBodyBgImageSizes=function(){var e=document.documentElement.clientWidth,t=document.documentElement.clientHeight;if(!(e<=640)){var n,r,a=i.height/i.width,s=t/e;return s>a?(n=t,r=t/a):(r=e,n=e*a),{width:r,height:n,positionX:(e-r)/2,positionY:(t-n)/2}}}}e.$inject=["$q"],angular.module("BlurAdmin.theme").service("baPanelBlurHelper",e)}(),function(){"use strict";function e(e){return angular.extend({},e,{link:function(e,t,n){t.addClass("panel panel-white"),n.baPanelClass&&t.addClass(n.baPanelClass)}})}e.$inject=["baPanel"],angular.module("BlurAdmin.theme").directive("baPanelSelf",e)}(),function(){"use strict";function e(e,t,n,i){var r=$(window);return{restrict:"E",templateUrl:"app/theme/components/baSidebar/ba-sidebar.html",controller:"BaSidebarCtrl",link:function(i,a){function s(i){n.isDescendant(a[0],i.target)||i.originalEvent.$sidebarEventProcessed||t.isMenuCollapsed()||!t.canSidebarBeHidden()||(i.originalEvent.$sidebarEventProcessed=!0,e(function(){t.setMenuCollapsed(!0)},10))}function o(){var e=t.shouldMenuBeCollapsed(),n=l();e==t.isMenuCollapsed()&&i.menuHeight==n||i.$apply(function(){i.menuHeight=n,t.setMenuCollapsed(e)})}function l(){return a[0].childNodes[0].clientHeight-84}i.menuHeight=a[0].childNodes[0].clientHeight-84,r.on("click",s),r.on("resize",o),i.$on("$destroy",function(){r.off("click",s),r.off("resize",o)})}}}e.$inject=["$timeout","baSidebarService","baUtil","layoutSizes"],angular.module("BlurAdmin.theme.components").directive("baSidebar",e)}(),function(){"use strict";function e(){var e=[];this.addStaticItem=function(){e.push.apply(e,arguments)},this.$get=["$state","layoutSizes",function(t,n){function i(){function i(){return t.get().filter(function(e){return e.sidebarMeta}).map(function(e){var t=e.sidebarMeta;return{name:e.name,title:e.title,level:(e.name.match(/\./g)||[]).length,order:t.order,icon:t.icon,stateRef:e.name}}).sort(function(e,t){return 100*(e.level-t.level)+e.order-t.order})}function r(){return window.innerWidth<=n.resWidthCollapseSidebar}function a(){return window.innerWidth<=n.resWidthHideSidebar}var s=r();this.getMenuItems=function(){var t=i(),n=t.filter(function(e){return 0==e.level});return n.forEach(function(e){var n=t.filter(function(t){return 1==t.level&&0===t.name.indexOf(e.name)});e.subMenu=n.length?n:null}),n.concat(e)},this.shouldMenuBeCollapsed=r,this.canSidebarBeHidden=a,this.setMenuCollapsed=function(e){s=e},this.isMenuCollapsed=function(){return s},this.toggleMenuCollapsed=function(){s=!s},this.getAllStateRefsRecursive=function(e){function t(e){e.subMenu&&e.subMenu.forEach(function(e){e.stateRef&&n.push(e.stateRef),t(e)})}var n=[];return t(e),n}}return new i}],this.$get.$inject=["$state","layoutSizes"]}angular.module("BlurAdmin.theme.components").provider("baSidebarService",e)}(),function(){"use strict";function e(e,t){e.menuItems=t.getMenuItems(),e.defaultSidebarState=e.menuItems[0].stateRef,e.hoverItem=function(t){e.showHoverElem=!0,e.hoverElemHeight=t.currentTarget.clientHeight;var n=66;e.hoverElemTop=t.currentTarget.getBoundingClientRect().top-n},e.$on("$stateChangeSuccess",function(){t.canSidebarBeHidden()&&t.setMenuCollapsed(!0)})}e.$inject=["$scope","baSidebarService"],angular.module("BlurAdmin.theme.components").controller("BaSidebarCtrl",e)}(),function(){"use strict";function e(e){return{restrict:"A",link:function(t,n){n.on("click",function(n){n.originalEvent.$sidebarEventProcessed=!0,t.$apply(function(){e.toggleMenuCollapsed()})})}}}function t(e){return{restrict:"A",link:function(t,n){n.on("click",function(n){n.originalEvent.$sidebarEventProcessed=!0,e.isMenuCollapsed()||t.$apply(function(){e.setMenuCollapsed(!0)})})}}}function n(){return{restrict:"A",controller:"BaSidebarTogglingItemCtrl"}}function i(e,t,n,i,r){function a(e){return e&&l.some(function(t){return 0==e.name.indexOf(t)})}var s=this,o=s.$$menuItem=e.$eval(n.baSidebarTogglingItem);if(o&&o.subMenu&&o.subMenu.length){s.$$expandSubmenu=function(){console.warn("$$expandMenu should be overwritten by baUiSrefTogglingSubmenu")},s.$$collapseSubmenu=function(){console.warn("$$collapseSubmenu should be overwritten by baUiSrefTogglingSubmenu")};var l=r.getAllStateRefsRecursive(o);s.$expand=function(){s.$$expandSubmenu(),t.addClass("ba-sidebar-item-expanded")},s.$collapse=function(){s.$$collapseSubmenu(),t.removeClass("ba-sidebar-item-expanded")},s.$toggle=function(){t.hasClass("ba-sidebar-item-expanded")?s.$collapse():s.$expand()},a(i.current)&&t.addClass("ba-sidebar-item-expanded"),e.$on("$stateChangeStart",function(e,n){!a(n)&&t.hasClass("ba-sidebar-item-expanded")&&(s.$collapse(),t.removeClass("ba-sidebar-item-expanded"))}),e.$on("$stateChangeSuccess",function(e,n){a(n)&&!t.hasClass("ba-sidebar-item-expanded")&&(s.$expand(),t.addClass("ba-sidebar-item-expanded"))})}}function r(e){return{restrict:"A",require:"^baSidebarTogglingItem",link:function(e,t,n,i){i.$$expandSubmenu=function(){t.slideDown()},i.$$collapseSubmenu=function(){t.slideUp()}}}}function a(e){return{restrict:"A",require:"^baSidebarTogglingItem",link:function(t,n,i,r){n.on("click",function(){e.isMenuCollapsed()?(t.$apply(function(){e.setMenuCollapsed(!1)}),r.$expand()):r.$toggle()})}}}e.$inject=["baSidebarService"],t.$inject=["baSidebarService"],i.$inject=["$scope","$element","$attrs","$state","baSidebarService"],r.$inject=["$state"],a.$inject=["baSidebarService"],angular.module("BlurAdmin.theme.components").directive("baSidebarToggleMenu",e).directive("baSidebarCollapseMenu",t).directive("baSidebarTogglingItem",n).controller("BaSidebarTogglingItemCtrl",i).directive("baUiSrefTogglingSubmenu",r).directive("baUiSrefToggler",a)}(),function(){"use strict";function e(){return{restrict:"E",transclude:!0,templateUrl:"app/theme/components/baWizard/baWizard.html",controllerAs:"$baWizardController",controller:"baWizardCtrl"}}angular.module("BlurAdmin.theme.components").directive("baWizard",e)}(),function(){"use strict";function e(e){function t(){n.progress=(n.tabNum+1)/n.tabs.length*100}var n=this;n.tabs=[],n.tabNum=0,n.progress=0,n.addTab=function(e){e.setPrev(n.tabs[n.tabs.length-1]),n.tabs.push(e),n.selectTab(0)},e.$watch(angular.bind(n,function(){return n.tabNum}),t),n.selectTab=function(e){n.tabs[n.tabNum].submit(),n.tabs[e].isAvailiable()&&(n.tabNum=e,n.tabs.forEach(function(e,t){t==n.tabNum?e.select(!0):e.select(!1)}))},n.isFirstTab=function(){return 0==n.tabNum},n.isLastTab=function(){return n.tabNum==n.tabs.length-1},n.nextTab=function(){n.selectTab(n.tabNum+1)},n.previousTab=function(){n.selectTab(n.tabNum-1)}}e.$inject=["$scope"],angular.module("BlurAdmin.theme.components").controller("baWizardCtrl",e)}(),function(){"use strict";function e(){return{restrict:"E",transclude:!0,require:"^baWizard",scope:{form:"="},templateUrl:"app/theme/components/baWizard/baWizardStep.html",link:function(e,t,n,i){function r(t){t?e.selected=!0:e.selected=!1}function a(){e.form&&e.form.$setSubmitted(!0)}function s(){return!e.form||e.form.$valid}function o(){return!u.prevTab||u.prevTab.isComplete()}function l(e){u.prevTab=e}e.selected=!0;var u={title:n.title,select:r,submit:a,isComplete:s,isAvailiable:o,prevTab:void 0,setPrev:l};i.addTab(u)}}}angular.module("BlurAdmin.theme.components").directive("baWizardStep",e)}(),function(){"use strict";function e(e,t){return{restrict:"E",templateUrl:"app/theme/components/contentTop/contentTop.html",link:function(e){e.$watch(function(){e.activePageTitle=t.current.title})}}}e.$inject=["$location","$state"],angular.module("BlurAdmin.theme.components").directive("contentTop",e)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/theme/components/pageTop/pageTop.html"}}angular.module("BlurAdmin.theme.components").directive("pageTop",e)}(),function(){"use strict";function e(e){return{restrict:"E",templateUrl:"app/theme/components/progressBarRound/progressBarRound.html",link:function(t,n,i){function r(){var i=n.find("#loader")[0];i.setAttribute("stroke-dasharray",180*e.getProgress()*Math.PI/100+", 20000"),t.progress=e.getProgress()}t.baProgressDialog=e,t.$watch(function(){return e.getProgress()},r)}}}e.$inject=["baProgressModal"],angular.module("BlurAdmin.theme.components").directive("progressBarRound",e)}(),function(){"use strict";function e(){return{restrict:"E",templateUrl:"app/theme/components/msgCenter/msgCenter.html",controller:"MsgCenterCtrl"}}angular.module("BlurAdmin.theme.components").directive("msgCenter",e)}(),function(){"use strict";function e(e,t){e.users={0:{name:"Vlad"},1:{name:"Kostya"},2:{name:"Andrey"},3:{name:"Nasta"}},e.notifications=[{userId:0,template:"&name posted a new article.",time:"1 min ago"},{userId:1,template:"&name changed his contact information.",time:"2 hrs ago"},{image:"assets/img/shopping-cart.svg",template:"New orders received.",time:"5 hrs ago"},{userId:2,template:"&name replied to your comment.",time:"1 day ago"},{userId:3,template:"Today is &name's birthday.",time:"2 days ago"},{image:"assets/img/comments.svg",template:"New comments on your post.",time:"3 days ago"},{userId:1,template:"&name invited you to join the event.",time:"1 week ago"}],e.messages=[{userId:3,text:"After you get up and running, you can place Font Awesome icons just about...",time:"1 min ago"},{userId:0,text:"You asked, Font Awesome delivers with 40 shiny new icons in version 4.2.",time:"2 hrs ago"},{userId:1,text:"Want to request new icons? Here's how. Need vectors or want to use on the...",time:"10 hrs ago"},{userId:2,text:"Explore your passions and discover new ones by getting involved. Stretch your...",time:"1 day ago"},{userId:3,text:"Get to know who we are - from the inside out. From our history and culture, to the...",time:"1 day ago"},{userId:1,text:"Need some support to reach your goals? Apply for scholarships across a variety of...",time:"2 days ago"},{userId:0,text:"Wrap the dropdown's trigger and the dropdown menu within .dropdown, or...",time:"1 week ago"}],e.getMessage=function(n){var i=n.template;return(n.userId||0===n.userId)&&(i=i.replace("&name","<strong>"+e.users[n.userId].name+"</strong>")),t.trustAsHtml(i)}}e.$inject=["$scope","$sce"],angular.module("BlurAdmin.theme.components").controller("MsgCenterCtrl",e)}(),function(){"use strict";function e(){return{restrict:"EA",scope:{ngModel:"="},templateUrl:"app/theme/components/widgets/widgets.html",replace:!0}}angular.module("BlurAdmin.theme.components").directive("widgets",e)}(),function(){"use strict";function e(e){return function(t){return e.images.root+t}}e.$inject=["layoutPaths"],angular.module("BlurAdmin.theme").filter("appImage",e)}(),function(){"use strict";function e(e){return function(t){return e.images.root+"theme/icon/kameleon/"+t+".svg"}}e.$inject=["layoutPaths"],angular.module("BlurAdmin.theme").filter("kameleonImg",e)}(),function(){"use strict";function e(e){return function(t,n){return n=n||"png",e.images.profile+t+"."+n}}e.$inject=["layoutPaths"],angular.module("BlurAdmin.theme").filter("profilePicture",e)}(),function(){"use strict";function e(){return function(e){return e?String(e).replace(/<[^>]+>/gm,""):""}}angular.module("BlurAdmin.theme").filter("plainText",e)}(),function(){"use strict";function e(){return{templateUrl:"app/theme/inputs/baSwitcher/baSwitcher.html",scope:{switcherStyle:"@",switcherValue:"="}}}angular.module("BlurAdmin.theme.inputs").directive("baSwitcher",e)}(),!function(e){e.fn.backTop=function(t){var n=this,i=e.extend({position:400,speed:500,color:"white"},t),r=i.position,a=i.speed,s=i.color;n.addClass("white"==s?"white":"red"==s?"red":"green"==s?"green":"black"),n.css({right:40,bottom:40,position:"fixed"}),e(document).scroll(function(){var t=e(window).scrollTop();t>=r?n.fadeIn(a):n.fadeOut(a)}),n.click(function(){e("html, body").animate({scrollTop:0},{duration:1200})})}}(jQuery),angular.module("BlurAdmin").run(["$templateCache",function(e){e.put("app/theme/components/backTop/backTop.html",'<i class="fa fa-angle-up back-top" id="backTop" title="Back to Top"></i>'),e.put("app/theme/components/baSidebar/ba-sidebar.html",'<aside class="al-sidebar" ng-swipe-right="$baSidebarService.setMenuCollapsed(false)" ng-swipe-left="$baSidebarService.setMenuCollapsed(true)" ng-mouseleave="hoverElemTop=selectElemTop"><ul class="al-sidebar-list" slimscroll="{height: \'{{menuHeight}}px\'}" slimscroll-watch="menuHeight"><li ng-repeat="item in ::menuItems" class="al-sidebar-list-item" ng-class="::{\'with-sub-menu\': item.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="item"><a ng-mouseenter="hoverItem($event, item)" ui-state="item.stateRef || \'\'" ng-href="{{::(item.fixedHref ? item.fixedHref: \'\')}}" ng-if="::!item.subMenu" class="al-sidebar-list-link"><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span></a> <a ng-mouseenter="hoverItem($event, item)" ng-if="::item.subMenu" class="al-sidebar-list-link" ba-ui-sref-toggler=""><i class="{{ ::item.icon }}"></i><span>{{ ::item.title }}</span> <b class="fa fa-angle-down" ui-sref-active="fa-angle-up" ng-if="::item.subMenu"></b></a><ul ng-if="::item.subMenu" class="al-sidebar-sublist" ng-class="{\'slide-right\': item.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-repeat="subitem in ::item.subMenu" ng-class="::{\'with-sub-menu\': subitem.subMenu}" ui-sref-active="selected" ba-sidebar-toggling-item="subitem" class="ba-sidebar-sublist-item"><a ng-mouseenter="hoverItem($event, item)" ng-if="::subitem.subMenu" ba-ui-sref-toggler="" class="al-sidebar-list-link subitem-submenu-link"><span>{{ ::subitem.title }}</span> <b class="fa" ng-class="{\'fa-angle-up\': subitem.expanded, \'fa-angle-down\': !subitem.expanded}" ng-if="::subitem.subMenu"></b></a><ul ng-if="::subitem.subMenu" class="al-sidebar-sublist subitem-submenu-list" ng-class="{expanded: subitem.expanded, \'slide-right\': subitem.slideRight}" ba-ui-sref-toggling-submenu=""><li ng-mouseenter="hoverItem($event, item)" ng-repeat="subSubitem in ::subitem.subMenu" ui-sref-active="selected"><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::subSubitem.disabled" class="al-sidebar-list-link">{{ ::subSubitem.title }}</a> <a ng-mouseenter="hoverItem($event, item)" ui-state="subSubitem.stateRef || \'\'" ng-if="::!subSubitem.disabled" ng-href="{{::(subSubitem.fixedHref ? subSubitem.fixedHref: \'\')}}">{{::subSubitem.title }}</a></li></ul><a ng-mouseenter="hoverItem($event, item)" href="" ng-if="::(!subitem.subMenu && subitem.disabled)" class="al-sidebar-list-link">{{ ::subitem.title }}</a> <a ng-mouseenter="hoverItem($event, item)" target="{{::(subitem.blank ? \'_blank\' : \'_self\')}}" ng-if="::(!subitem.subMenu && !subitem.disabled)" ui-state="subitem.stateRef || \'\'" ng-href="{{::(subitem.fixedHref ? subitem.fixedHref: \'\')}}">{{ ::subitem.title}}</a></li></ul></li></ul><div class="sidebar-hover-elem" ng-style="{top: hoverElemTop + \'px\', height: hoverElemHeight + \'px\'}" ng-class="{\'show-hover-elem\': showHoverElem }"></div></aside>'),e.put("app/theme/components/baWizard/baWizard.html",'<div class="ba-wizard"><div class="ba-wizard-navigation-container"><div ng-repeat="t in $baWizardController.tabs" class="ba-wizard-navigation {{$baWizardController.tabNum == $index ? \'active\' : \'\'}}" ng-click="$baWizardController.selectTab($index)">{{t.title}}</div></div><div class="progress ba-wizard-progress"><div class="progress-bar progress-bar-danger active" role="progressbar" aria-valuemin="0" aria-valuemax="100" ng-style="{width: $baWizardController.progress + \'%\'}"></div></div><div class="steps" ng-transclude=""></div><nav><ul class="pager ba-wizard-pager"><li class="previous"><button ng-disabled="$baWizardController.isFirstTab()" ng-click="$baWizardController.previousTab()" type="button" class="btn btn-primary"><span aria-hidden="true">&larr;</span> previous</button></li><li class="next"><button ng-disabled="$baWizardController.isLastTab()" ng-click="$baWizardController.nextTab()" type="button" class="btn btn-primary">next <span aria-hidden="true">&rarr;</span></button></li></ul></nav></div>'),e.put("app/theme/components/baWizard/baWizardStep.html",'<section ng-show="selected" class="step" ng-transclude=""></section>'),e.put("app/theme/components/contentTop/contentTop.html",'<div class="content-top clearfix"><h1 class="al-title">{{ activePageTitle }}</h1><ul class="breadcrumb al-breadcrumb"><li><a href="#/dashboard">Home</a></li><li>{{ activePageTitle }}</li></ul></div>'),e.put("app/theme/components/msgCenter/msgCenter.html",'<ul class="al-msg-center clearfix"><li uib-dropdown=""><a href="" uib-dropdown-toggle=""><i class="fa fa-bell-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Notifications</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in notifications"><div class="img-area"><img ng-class="{\'photo-msg-item\' : !msg.image}" ng-src="{{::( msg.image || (users[msg.userId].name | profilePicture) )}}"></div><div class="msg-area"><div ng-bind-html="getMessage(msg)"></div><span>{{ msg.time }}</span></div></a></div><a href="">See all notifications</a></div></li><li uib-dropdown=""><a href="" class="msg" uib-dropdown-toggle=""><i class="fa fa-envelope-o"></i><span>5</span><div class="notification-ring"></div></a><div uib-dropdown-menu="" class="top-dropdown-menu"><i class="dropdown-arr"></i><div class="header clearfix"><strong>Messages</strong> <a href="">Mark All as Read</a> <a href="">Settings</a></div><div class="msg-list"><a href="" class="clearfix" ng-repeat="msg in messages"><div class="img-area"><img class="photo-msg-item" ng-src="{{::( users[msg.userId].name | profilePicture )}}"></div><div class="msg-area"><div>{{ msg.text }}</div><span>{{ msg.time }}</span></div></a></div><a href="">See all messages</a></div></li></ul>'),e.put("app/theme/components/pageTop/pageTop.html",'<div class="page-top clearfix" scroll-position="scrolled" max-height="50" ng-class="{\'scrolled\': scrolled}"><a href="#/dashboard" class="al-logo clearfix"><span>Blur</span>Admin</a> <a href="" class="collapse-menu-link ion-navicon" ba-sidebar-toggle-menu=""></a><div class="search"><i class="ion-ios-search-strong" ng-click="startSearch()"></i> <input id="searchInput" type="text" placeholder="Search for..."></div><div class="user-profile clearfix"><div class="al-user-profile" uib-dropdown=""><a uib-dropdown-toggle="" class="profile-toggle-link"><img ng-src="{{::( \'Nasta\' | profilePicture )}}"></a><ul class="top-dropdown-menu profile-dropdown" uib-dropdown-menu=""><li><i class="dropdown-arr"></i></li><li><a href="#/profile"><i class="fa fa-user"></i>Profile</a></li><li><a href=""><i class="fa fa-cog"></i>Settings</a></li><li><a href="" class="signout"><i class="fa fa-power-off"></i>Sign out</a></li></ul></div><msg-center></msg-center></div></div>'),e.put("app/theme/components/progressBarRound/progressBarRound.html",'<svg class="center-block progress-bar-round" width="200" height="200"><circle cx="100" cy="100" r="90" fill="none" stroke="#F8F8FF" stroke-width="8"></circle><circle cx="100" cy="100" r="90" fill="none" id="loader" class="" stroke="#209e91" stroke-width="8" stroke-dasharray="0,20000" transform="rotate(-90,100,100)" stroke-linecap="round"></circle><text text-anchor="middle" class="loading" x="100" y="90">Loading...</text><text class="percentage" text-anchor="middle" x="100" y="130">{{progress}}%</text></svg>'),e.put("app/theme/components/widgets/widgets.html",'<div class="widgets"><div ng-repeat="widgetBlock in ngModel" ng-class="{\'row\': widgetBlock.widgets.length > 1}"><div ng-repeat="widgetCol in widgetBlock.widgets" ng-class="{\'col-md-6\': widgetBlock.widgets.length === 2}" ng-model="widgetCol" class="widgets-block"><div ba-panel="" ba-panel-title="{{::widget.title}}" ng-repeat="widget in widgetCol" ba-panel-class="with-scroll {{widget.panelClass}}"><div ng-include="widget.url"></div></div></div></div></div>'),e.put("app/theme/inputs/baSwitcher/baSwitcher.html",'<label class="switcher-container"><input type="checkbox" ng-model="switcherValue"><div class="switcher" ng-class="::switcherStyle"><div class="handle-container"><span class="handle handle-on">ON</span> <span class="handle"></span> <span class="handle handle-off">OFF</span></div></div></label>');
}]);
//# sourceMappingURL=../maps/scripts/app-bdd9b64b63.js.map
