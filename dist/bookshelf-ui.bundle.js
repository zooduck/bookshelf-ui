webpackJsonp([0],{"./src/index.js":function(o,e,t){"use strict";t("./src/styles/main.scss"),t("./src/scripts/zoobooks.js");var r=t("./src/scripts/bookLookup.service.js"),n=t("./src/scripts/addBookToLibrary.service.js"),s=t("./src/scripts/dom.service.js"),i=t("./src/scripts/loader.service.js"),a=t("./src/scripts/alert.service.js");t("./src/scripts/main.js"),zoobooks().elements().forms.addBook.ctrls.findBookByISBN.addEventListener("click",function(o){var e=this,t=zoobooks().elements().forms.addBook.keys.bookISBN.value.replace(/\-/g,""),n=zoobooks().elements().forms.addBook.keys.bookTitle.value,c=zoobooks().elements().forms.addBook.keys.bookAuthors.value;t||n||(0,a.alertService)().raise({key:"ISBN_OR_TITLE_REQUIRED"}),(0,i.loader)().setLoading(),(0,r.findBookByISBN)(t,n,c).then(function(o){var r=JSON.parse(o);if(r.error||0==r.totalItems)(0,a.alertService)().raise({key:"BOOK_SEARCH_ERROR"}),(0,i.loader)().setLoaded();else{var u=new RegExp(""+n,"i"),l=new RegExp(""+c,"i"),d=r.items.reverse().filter(function(o){return o.volumeInfo.title.match(u)&&o.volumeInfo.authors&&o.volumeInfo.authors.find(function(o){return o.match(l)})}),f=d.find(function(o){return o.volumeInfo.subtitle&&o.volumeInfo.subtitle.match(/a novel/i)});d=d.filter(function(o){return o.volumeInfo.imageLinks&&o.volumeInfo.industryIdentifiers});var k=f||d[0]||r.items[0],m=[k.volumeInfo.author||k.volumeInfo.authors.toString()];zoobooks().bookSearchAPI__SET({query:{isbn:t,title:n,author:c},results:r,bookData:k}),zoobooks().importData__SET(k),console.log("zoobooks().bookSearchAPI()",zoobooks().bookSearchAPI()),console.log("zoobooks().importData()",zoobooks().importData()),zoobooks().elements().forms.addBook.keys.bookThumbnail.style.backgroundImage='url("'+k.volumeInfo.imageLinks.thumbnail+'")',zoobooks().elements().forms.addBook.keys.bookISBN.value=k.volumeInfo.industryIdentifiers[0].identifier,zoobooks().elements().forms.addBook.keys.bookTitle.value=k.volumeInfo.title,zoobooks().elements().forms.addBook.keys.bookAuthors.value=m,(0,s.buttonHiddenStateToggle)(e),(0,s.buttonHiddenStateToggle)(zoobooks().elements().forms.addBook.ctrls.addBookToLibrary),(0,a.alertService)().raise({key:"BOOK_SEARCH_SUCCESS"}),(0,i.loader)().setLoaded()}},function(o){console.log(o)})}),zoobooks().elements().forms.addBook.ctrls.addBookToLibrary.addEventListener("click",function(o){(0,n.addBookToLibrary)(zoobooks().importData())})},"./src/scripts/addBookToLibrary.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.addBookToLibrary=function(o){alert("add title: "+o.title+" isbn: "+o.industryIdentifiers[0].identifier+" to library"),console.log(o)}},"./src/scripts/alert.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.alertService=function(){return function(){return{raise:function(){var o=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{key:"GENERIC_ERROR",msg:""};console.warn("ALERT => "+o.key)}}}}()},"./src/scripts/bookLookup.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0}),e.findBookByISBN=void 0;var r=t("./src/scripts/http.service.js");e.findBookByISBN=function(o,e,t){var n="https://www.googleapis.com/books/v1/volumes?q=isbn:"+o+"&maxResults=20",s="https://www.googleapis.com/books/v1/volumes?q="+e+" "+t+"&maxResults=20";return new Promise(function(t,i){(0,r.$http)("GET",n).then(function(n){var i=JSON.parse(n);if(!o||0==i.totalItems&&e){(0,r.$http)("GET",s).then(function(o){t(o)},function(o){console.log(o)})}else t(n)},function(o){i(o),console.log(o)})})}},"./src/scripts/dom.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.buttonHiddenStateToggle=function(o){o.classList.toggle("hidden")}},"./src/scripts/http.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.$http=function(o,e){var t=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,r=arguments.length>3&&void 0!==arguments[3]?arguments[3]:[];return new Promise(function(n,s){var i=new XMLHttpRequest;i.onerror=function(o){var e=["ERR_CONNECTION_REFUSED","ERR_NAME_NOT_RESOLVED","ERR_BLOCKED_BY_CLIENT","ERR_TUNNEL_CONNECTION_FAILED"],t="The connection failed with one of the following errors: "+e.join("|");s({error:{info:t},info:"Could not determine the type of error. Please check the data property of this object for a list of possible errors",data:e})},i.open(o,e);var a=!0,c=!1,u=void 0;try{for(var l,d=r[Symbol.iterator]();!(a=(l=d.next()).done);a=!0){var f=l.value,k=f[0],m=f[1];i.setRequestHeader(k,m)}}catch(o){c=!0,u=o}finally{try{!a&&d.return&&d.return()}finally{if(c)throw u}}i.send(t),i.onload=function(){n(i.responseText)}})}},"./src/scripts/loader.service.js":function(o,e,t){"use strict";Object.defineProperty(e,"__esModule",{value:!0});e.loader=function(){return function(){return{setLoading:function(){zoobooks().elements().loader.removeAttribute("hidden")},setLoaded:function(){zoobooks().elements().loader.setAttribute("hidden","hidden")}}}}()},"./src/scripts/main.js":function(o,e,t){"use strict";var r={getBooks:"https://zoobooks-api.herokuapp.com/",addBook:"https://zoobooks-api.herokuapp.com/add_book/",deleteBook:"https://zoobooks-api.herokuapp.com/delete_book/"},n=new XMLHttpRequest;n.open("GET",r.getBooks),n.send(),n.onload=function(){var o=JSON.parse(n.responseText);console.log(o);var e=!0,t=!1,r=void 0;try{for(var i,a=o[Symbol.iterator]();!(e=(i=a.next()).done);e=!0){var c=i.value;for(var u in c)c[u]=c[u]||"N/A";s(c)}}catch(o){t=!0,r=o}finally{try{!e&&a.return&&a.return()}finally{if(t)throw r}}};var s=function(o){var e=document.querySelector("books"),t=document.getElementById("bookTemplate"),r=t.cloneNode(!0);r.removeAttribute("template");var n=r.querySelector("[isbn]"),s=r.querySelector("[title]"),i=r.querySelector("[authors]"),a=r.querySelector("[thumbnailanchor]"),c=r.querySelector("[thumbnail]"),u=r.querySelector("[description]");a.setAttribute("href",o.google_preview_link),"N/A"!==o.google_thumbnail&&(c.style.backgroundImage='url("'+o.google_thumbnail+'")'),n.innerHTML="<strong>ISBN:</strong> "+o.isbn,s.innerHTML=o.title,i.innerHTML=o.authors.length>1?"<strong>Authors:</strong> ":"<strong>Author:</strong> ",i.innerHTML+=o.authors.map(function(o){return o.name}).join(", "),o.description?u.innerHTML=o.description:u.hidden=!0,e.appendChild(r)}},"./src/scripts/zoobooks.js":function(o,e,t){"use strict";var r=function(){var o={},e={query:{isbn:"",title:"",author:""},results:[]};return function(){return{bookSearchAPI__SET:function(o){for(var t in o)e[t]=o[t]},bookSearchAPI:function(){return e},importData:function(){return o},importData__SET:function(e){o=e},elements:function(){return{loader:document.getElementById("loader"),forms:{addBook:{form:document.getElementById("form__addBook"),keys:{bookISBN:document.querySelector("[form__add-book__book-isbn]"),bookTitle:document.querySelector("[form__add-book__book-title]"),bookAuthors:document.querySelector("[form__add-book__book-authors]"),bookThumbnail:document.querySelector("[form__add-book__book-thumbnail]")},ctrls:{findBookByISBN:document.getElementById("ctrl__findBookByISBN"),addBookToLibrary:document.getElementById("ctrl__addBookToLibrary")}}}}}}}}();window.zoobooks=r},"./src/styles/main.scss":function(o,e){},0:function(o,e,t){o.exports=t("./src/index.js")}},[0]);