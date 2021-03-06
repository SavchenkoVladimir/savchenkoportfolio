'use strict';

/*
  The StepBack class hangs event listener on a page's object and brings page back after click on the object. 
  It adopts the object css selector and steps quantity.
*/
function StepBack(){
  this.step;
  this.object;
}
StepBack.prototype.go = function(objectSelector, stepsQuantity){
  var self = this;
  this.object = document.body.querySelector(objectSelector);
  this.step = stepsQuantity;
  
  $(this.object).click(function(event){
    window.history.go(self.step);    
  });
}

/*
  The Reload() class hangs an event listener on a page's object and reload the page after click on the object.
  It adopts the css object  selector.
*/
function Reload(objectSelector){
  this.object;
}
Reload.prototype.execute = function(objectSelector){
  this.object = document.body.querySelector(objectSelector);
  
  $(this.object).click(function(){
    location.reload();    
  });
}

/*
  Class InsertCurrenDate adopts two arguments: the node contains inception year and 
  the node where current year will be displayed if the these years are different.
*/
function InsertCurrenDate(beginPlace, currentPlace){
  this._beginYear = $(beginPlace).html();
  this._currentYear = new Date().getFullYear();
}
InsertCurrenDate.prototype.write = function(){
  if( this._beginYear != this._currentYear ){
    $(currentPlace).html( '- ' + this._currentYear);
  }
};

/*
  The class soft Displaying displays a page softly after the page is completely downloaded. 
  It adopts page's element selector and displaying time.
*/
function softDisplaying(elemSelector, time){
  var self = this;
  this.element = document.querySelector(elemSelector);
  this.time = time;

  this.display = function(){
    document.addEventListener("DOMContentLoaded", function(){$(self.element).fadeIn(self.time);});
  }
}

/* 
  The class  GlueElementTop keeps element visible on the top of screen. It adopts element id.
*/
function GlueElementTop(elementId){
  this.element = document.getElementById(elementId);  
  this.elementMetrics = getComputedStyle(this.element);
  this.marginTop = this.elementMetrics.marginTop;
  this.elementHeight = this.elementMetrics.height;
  this.parent = this.element.parentElement;
  this.deputy;
}
GlueElementTop.prototype.createDeputy = function(){
    this.deputy = document.createElement('div');
    this.deputy.setAttribute('id', 'clone');
    this.deputy.style.minHeight = this.elementHeight;
    this.deputy.style.marginTop = this.marginTop;
    return this.deputy;
}
GlueElementTop.prototype.glue = function(){
  var self = this;
  
    window.addEventListener('scroll', function(){
    if( window.scrollY >= parseInt(self.marginTop) ){
      $(self.element).css({'position': 'fixed', 'margin-top': 0, 'top': 0, 'z-index': 100});
      if( !document.getElementById('clone') ){
        $(self.parent).prepend(self.createDeputy());
      }
    }
    if( window.scrollY <= parseInt(self.marginTop) ){
      $(self.element).css({'position': '', 'margin-top': '', 'top': '', 'z-index': ''});
      if( $("#clone") ){
        $("#clone").remove();
      }      
    }    
  });
}

/*
  The class GlueElementBottom glues element to bottom of document.
*/
function GlueElementBottom(sectionSelector, freeSpace){
  this.section = document.body.querySelector(sectionSelector);
  this.freeSpace = freeSpace;
  this.sectionHeight;
  this.documentHeight;
  this.windowHeight;
}
GlueElementBottom.prototype.glue = function(){
  var self = this;
  this.windowHeight = $(window).height();
  this.documentHeight = $('body').height();
  this.sectionHeight = (this.windowHeight - this.freeSpace) + 'px';

  if( this.windowHeight > this.documentHeight ){
    $(self.section).css('min-height', self.sectionHeight);
  }else{
    $(self.section).css('min-height', '');
  }
}

/* 
  Class movingSun moves the Sun object when the mouse changes its location on the Y axis
*/
function MoveingSun(sunId){
  this.sun = sunId;
  this.mouseHeight;
  this.screenWidth;
  this.screenHeight;
  this.marginTop;
  this.marginLeft;
  
  this.move();
} 
MoveingSun.prototype.move = function(){
  var self = this;

  $(window).mousemove(function(event){
    self.mouseHeight = event.clientY;
    self.screenWidth = $(window).width();
    self.screenHeight = $(window).height();
    self.marginTop = parseInt((self.mouseHeight * 100) / self.screenHeight);
    self.marginLeft = - parseInt((self.mouseHeight * 100) / self.screenHeight);
    if( self.marginTop ){
      $(this.sun).fadeIn(1000);
      $(this.sun).css({'margin-top': self.marginTop, 'margin-left': self.marginLeft, 'left':'10%'});
    }
  });
}

/*
  The class SiningStar displays and hide a star on the page background in random place.
  The class adopts time of displaying and div class name.
*/
function ShiningStar(time, divClass){
  this.time = time;
  this.element;
  this.windowWidth;
  this.windowHeight;
  this.divClass = divClass;
  
  this.createStar();
}
ShiningStar.prototype.createStar = function(){
  this.element = document.createElement('div');
  this.element.setAttribute('class', this.divClass);
  document.body.appendChild(this.element);
}
ShiningStar.prototype.displayStar = function(){
  this.windowWidth = $(window).width();
  this.windowHeight = $(window).height();
      
  this.element.style.top = (parseInt(Math.random() * this.windowHeight)) + 'px';
  this.element.style.left = (parseInt(Math.random() * this.windowWidth)) + 'px';
      
  $(this.element).fadeIn( (this.time / 2) - 250 );
}
ShiningStar.prototype.hideStar = function(){
  var self = this;  
  setTimeout(function(){ $(self.element).fadeOut( (self.time / 2) - 250 );  }, self.time / 2);
}
ShiningStar.prototype.all = function(){
  this.displayStar();
  this.hideStar();
}
ShiningStar.prototype.run = function(){
  var self = this;
  setInterval(function(){ self.all(); }, self.time);
}

/* 
  The class DescribeRef adopts reference selector and description address. 
  The class depicts description when reference is mouseover and remove description after mouseleave. 
*/
function DescribeRef(refSelector, descrAddress){
  this.elementsCollection = document.body.querySelectorAll(refSelector);
  this.descrAddress = descrAddress;
  this.element;
  this.definition;
  this.coords;
  this.arrow;
  this.image;
  this.windowCoord;
  this.windowWidth;
  this.windowHeight;
}
/* This method defines reference's coordinates and depict a hint under or over the reference depend on top and left value.*/
DescribeRef.prototype.depict = function(){
  var self = this;
  
  $(this.elementsCollection).mouseover(function(event){
    self.element = event.target;
    self.coords = $(self.element).offset();
    
    self.windowCoord = self.element.getBoundingClientRect();
    self.windowWidth = $(window).width();
    self.windowHeight = $(window).height();
    
    if( ((self.windowWidth - self.windowCoord.right) < 150) || ((self.windowHeight - self.windowCoord.bottom) < 100) ){
      self.depictTop();
    }else{
      self.depictBottom();
    }
    $(self.definition).fadeIn(500);
  });    
  self.clear();
}
/* This method depicts a hint over the reference. */
DescribeRef.prototype.depictTop = function(){
  var self = this;
  
  self.definition = document.createElement('div');
  $(self.definition).attr('class', 'definition');
  $(self.definition).css({ 'top': self.coords.top - 75,
    'left': self.coords.left - 100
  });
    
  self.image = document.createElement('img');
  $(self.image).attr('src', self.descrAddress);    
  $(self.image).attr('class', 'innerImage');    
  $(self.definition).append(self.image);
        
  self.arrow = document.createElement('div');
  $(self.arrow).attr('class', 'pointerBottom');
  $(self.definition).append(self.arrow);

  $('body').append(self.definition);
}
/* This method depicts a hint under the reference. */
DescribeRef.prototype.depictBottom = function(){
    var self = this;

    self.definition = document.createElement('div');
    $(self.definition).attr('class', 'definition');
    $(self.definition).css({ 'top': self.coords.top + self.element.offsetHeight,
      'left': self.coords.left + 30
    });
    
    self.arrow = document.createElement('div');
    $(self.arrow).attr('class', 'pointerTop');
    $(self.definition).append(self.arrow);
    
    self.image = document.createElement('img');
    $(self.image).attr('src', self.descrAddress);    
    $(self.image).attr('class', 'innerImage');    
    $(self.definition).append(self.image);
  
    $('body').append(self.definition);  
}
/* This method hides a hint after mouseout. */
DescribeRef.prototype.clear = function(){
  var self = this;
  
  $(this.elementsCollection).mouseout(function(){
    $(self.definition).remove();
  });
}

/*
  The class MakingContactsPage creates a contacts page.
  The contacts page being downloaded with AJAX and cover current page
*/
function MakingContactsPage(refSelector, pageAddress, errorPageAddress){
  this.refElem = document.body.querySelector(refSelector);
  this.pageAddress = pageAddress;
  this.errorPageAddress = errorPageAddress;
  this.submitButton;
  this.container;
  this.cover;
  this.page;
  this.scripsAddress;
  this.scriptsContainer;
  this.inputElement;
  this.userName = null;
  this.userEmai = null;
  this.userMessage = null;
  this.warningCont;
  this.prevSibling;
  this.sendData;
  this.handlerAddress;
  this.warningDiv;
  this.buttonYes;
  this.buttonNo;
}
/* The method makes container for contacts page. */
MakingContactsPage.prototype.makeContainer = function(){
  this.container = document.createElement('div');
    $(this.container).attr('id', 'receiver');
    $('body').prepend(this.container);
}
/* This method receives the contacts page by AJAX query and execute main class methods. */
MakingContactsPage.prototype.loadPage = function(){
  var self = this;
  
  $(this.refElem).click(function(){
    self.makeContainer();
 
    $.ajaxSetup({
      type: 'POST',
      url: self.pageAddress,
      dataType: 'html',
      async: true,
      timeout: 10000
    });
    $.ajax({
      success: function(data){
        $(self.container).html(data);
        self.displayPage('#cover', '#contactPage');
        self.makeSize();
        self.loadScripts('../js/contacts.js');
      },
      error: function(){
      window.location = self.errorPageAddress;
    }      
    });
    return false;
  });
}
/* The method displays contacts page softly. */
MakingContactsPage.prototype.displayPage = function(coverSelector, pageSelector){
  var self = this;
  this.cover = document.body.querySelector(coverSelector);
  this.page = document.body.querySelector(pageSelector);
  
  $(self.cover).fadeIn(1000);
  $(self.page).fadeIn(3000);
}
/* This method makes the contacts page size depends on screen size. */
MakingContactsPage.prototype.makeSize = function(){

  if( $(window).width() > 700 ){
    $(this.page).css({'margin-left': $(window).width()/4, 'margin-top': '5%'});
    $('body').css('overflow-x', 'hidden');
  }
  if( $(window).height() > 700 ){
    $('body').css('overflow-y', 'hidden');
  }
  if( $(window).width() < 700){
    $(this.cover).css('width', '970px');
  }
  $(this.cover).css('height', $('body').height());
}
/* The method adopts a scripts address and load the script in the contacts page. */
MakingContactsPage.prototype.loadScripts = function(scriptsAddress){
  var self = this;
  this.scripsAddress = scriptsAddress;
  this.scriptsContainer = document.createElement('div');

  $.ajaxSetup({
    type: 'POST',
    async: true,
    url: self.scripsAddress,
    dataType: 'script',
    timeout: 10000
  });
  $.ajax({
    error: function(){
    window.location = self.errorPageAddress;
  }
  }); 
}
/* This method listens input events and changes class property values after an input field has been changed. */
MakingContactsPage.prototype.setProperty = function(){
  var self =  this;

  document.body.addEventListener('input', changePropertyValue);

  function changePropertyValue(event){

    self.inputElement = event.target;
    var name = $(self.inputElement).attr('name');
    
    switch(name){
      case ('name'): self.userName = $(self.inputElement).val();
        break;
      case ('email'): self.userEmail = $(self.inputElement).val();
        break;
      case ('message'): self.userMessage = $(self.inputElement).val();
        break;
    }
  }
}
/* The method returns either true if username is not empty or false if empty. */
MakingContactsPage.prototype.nameValidate = function(){
  if(this.userName){
    return true;    
  }else{
    return false;
  }
}
/* The method returns either true if userEmail has @ and dot after it or false if they are absent. */
MakingContactsPage.prototype.emailValidate = function(){
  if( this.userEmail ){
    if( this.userEmail.match(/.+@.+\..+/i) ){
    return true;  
  }    
  }else{
    return false;
  }
}
/* The method returns either true if userMessage is not empty or false if empty. */
MakingContactsPage.prototype.messageValidate = function(){
  if(this.userMessage){
    return true;    
  }else{
    return false;
  }
}
/* The method paints an input field either red if data is not valid or green if valid. */
MakingContactsPage.prototype.painting = function(){
  var self = this;

  document.body.addEventListener('input', paintInputField);
  
  function paintInputField(event){
    var elemName = $(self.inputElement).attr('name');

    function validate(elem){
      if( elem == 'name' ){
        return self.nameValidate();
      }else if( elem == 'email' ){
        return self.emailValidate();
      }else if( elem == 'message' ){
        return self.messageValidate();
      }      
    }
   
   if( !validate(elemName) ){
      $(event.target).css({'background-color':'rgb(255, 244, 242)', 'border-color':'rgb(255, 160, 160)'});
    }
    if( validate(elemName) ){
      $(event.target).css({'background-color':'rgb(240, 255, 240)', 'border-color':'rgb(100, 200, 100)'});
    }
  }
}
/* The method unblocks the send button if the typed values are allowed. */
MakingContactsPage.prototype.buttonUnblock = function(buttonSelector){
  var self = this;
  this.submitButton = document.body.querySelector(buttonSelector);

  document.body.addEventListener('input', unblockButton);
  
  function unblockButton(){
    if( self.nameValidate() && self.emailValidate() && self.messageValidate() ){
      self.submitButton.removeAttribute('disabled');
      self.submitButton.style.cursor = 'pointer';
  }else{
      self.submitButton.setAttribute('disabled', 'true');
      self.submitButton.style.cursor = '';
    }
  }
}
/* The method sends a letter. It adopts a button selector, a script handler address and warning div selector. */
MakingContactsPage.prototype.send = function(handlerAddress, respContId){
  var self = this;
  this.handlerAddress = handlerAddress;
  this.respCont = document.body.querySelector(respContId);

  $(self.submitButton).click(function(event){
    self.sendData = JSON.stringify(self, ['userName', 'userEmail', 'userMessage']);

    $.ajaxSetup({
      type: 'POST',
      data: {'data': self.sendData},
      dataType: 'text',
      url: handlerAddress,
      timeout: 15000,
      async: true
    });
    $.ajax({      
      success: function(data){
        makeContainer();
        $(self.respCont).html(data);
        setTimeout(containerBlur, 7000, 1000);
        self.userName = self.userEmail = self.userMessage = null;
      },
      error: function(){
        self.userName = self.userEmail = self.userMessage = null;
        window.location = self.errorPageAddress;
      }
    });
  });
  
  function makeContainer(){
    self.prevSibling = self.respCont.previousElementSibling;
    self.respCont.style.left = parseInt(self.prevSibling.getBoundingClientRect().left) + 100 + 'px';
    self.respCont.style.top = parseInt((self.prevSibling.getBoundingClientRect().top) - 105) + 'px';
    $(self.respCont).fadeIn(2000);
  }
  
  function containerBlur(time){
    $(self.respCont).fadeOut(time);
    $(self.respCont).html();
  }
}
/* The method closes the contact page. It adopts a button id and warning div id. */
MakingContactsPage.prototype.close = function(buttId, divId){
  var self = this;
  this.button = document.body.querySelector(buttId);
  this.warningDiv = document.body.querySelector(divId);
  
  $(this.button).click(function(){
    if( self.userName != null || self.userEmail != null || self.userMessage != null){
      self.warningDiv.style.top = parseInt(self.button.getBoundingClientRect().top) + 30 + 'px';
      self.warningDiv.style.left = parseInt(self.button.getBoundingClientRect().left) - 290 + 'px';
      $(self.warningDiv).fadeIn(1000);
      
      this.buttonYes = $(self.warningDiv).children()[1];
      $(this.buttonYes).click(function(){
        self.userName = self.userEmail = self.userMessage = null;
        $('#cover').fadeOut(1000);
        setTimeout(function(){  $('#receiver').remove(); }, 2000);        
      });
          
      this.buttonNo = $(self.warningDiv).children()[2];
      $(this.buttonNo).click(function(){
        $(self.warningDiv).fadeOut(1000);
        return false;
      });  
    }else{
      $('#cover').fadeOut(1000);
      $('body').css({'overflow': ''});
      setTimeout(function(){  $('#receiver').remove(); }, 2000);
    }
  });
}

/*
  The class repeatTheWords deploys the same name page.
*/
function RepeatTheWords(divSelector, address){
  this.section = document.body.querySelector(divSelector);
  this.address = address;
  this.scriptsAddress;
  this.button;
  this.timeGap;
  this.parent;
  this.child;
  this.children;
  this.parentHeight;    
  this.divHeight;
  this.heightStep;
  this.engWordPlace;
  this.rusWordPlace;
  this.tipPlace;
  this.parentElem;
  this.click;
  this.counter = 0;
  this.wordsKit;
  this.resArr = [];
  this.changeIdTimeout;
  this.setTiptimeout;
  this.paintAnswerTimeout;
  this.disableBlockTimeout;
  this.resHeader;
  this.table;
  this.tHead;
  this.stat;
  this.engWord;
  this.answ;
  this.rightAnsw;
  this.intervalId;
  this.wordsAddress;
  this.words;
  this.wordsArr;
  this._resElem;
  this.tr;
  this.tdStat;
  this.simpleTd;
  this.userAnsw;
  this.right;
  this.agan;
  this.back;
  this.ansversCont;
  this.errorPageAddress;
}
/* This method loads HTML, create the page DOM and load scripts page. */
RepeatTheWords.prototype.load = function(buttonIdentifyer, scriptsAddress){
  var self = this;
  this.scriptsAddress = scriptsAddress;
  this.button = document.body.querySelector(buttonIdentifyer);
  
  $(this.button).click(function(){
  
    $.ajaxSetup({
      type: 'POST',
      async: true,
      url: self.address,
      dataType: 'html',
      timeout: 10000
    });
    $.ajax({
      success: function(data){        
        $(self.section).html(data);        
        loadScript();                
      },
      error: function(){
        window.location = self.errorPageAddress;
      }
    });
  });
  
  function loadScript(){
    $.ajaxSetup({
      type: 'POST',
      async: true,
      url: self.scriptsAddress,
      dataType: 'script',
      timeout: 10000
    });
    $.ajax({
      error: function(){
        window.location = self.errorPageAddress;
      }
    });
  }
}
/* The method adopts runtime and div identifier.
It finds the single child and make it's height from 0 to his max height in 50 iterations. */
RepeatTheWords.prototype.showTime = function(timeLength, divParentId, divChildId){
  var self = this;
  this.timeGap = timeLength / 50;
  this.parent = document.getElementById(divParentId);
  this.child = document.getElementById(divChildId);
  this.parentHeight = this.parent.offsetHeight;
    
  this.divHeight = 0;
  this.heightStep = self.parentHeight / 50;

  this.heightChanging = function(){
    self.divHeight += self.heightStep;
    self.child.style.height = parseInt(self.divHeight) + 'px';    
    if( self.divHeight >= self.parentHeight ){
      clearInterval(self.intervalId);
    }
  }
  this.intervalId = setInterval(self.heightChanging, 100);
}
/* The method adopts a three elements array, an english word place identifier and identifiers of two russian words places.
First array element is placed in english word place. Second and third elements are placed at russian words places in 
random order. The place where second element is placed get id=1(true). The place where second element is placed get id=0. */
RepeatTheWords.prototype.placeWords = function(wordsArr, englishPlace, russianPlace, tipPlace){
  var self = this;
  this.engWordPlace = document.body.querySelector(englishPlace);
  this.rusWordPlace = document.body.querySelectorAll(russianPlace);
  this.tipPlace = document.body.querySelector(tipPlace);

  if(wordsArr == null){
    self.showResults('.repeatTheWords', 'Your answers are next:');
  }else{
    
    this.engWordPlace.textContent = wordsArr[0];
    this.tipPlace.textContent = 'Try answer';
  
    this.rand = Math.round(Math.random());
    
    if(this.rand === 1){
      this.rusWordPlace[0].textContent = wordsArr[1];
      this.rusWordPlace[0].setAttribute('id', 1);
  
      this.rusWordPlace[1].textContent = wordsArr[2];
      this.rusWordPlace[1].setAttribute('id', 0);
    }
    
    if(this.rand === 0){
      this.rusWordPlace[0].textContent = wordsArr[2];
      this.rusWordPlace[0].setAttribute('id', 0);
  
      this.rusWordPlace[1].textContent = wordsArr[1];
      this.rusWordPlace[1].setAttribute('id', 1);
    }
  }
}
/* The method adopts parent node identifier and return its children collection. */
RepeatTheWords.prototype.getChildren = function(divSelector){
  this.parentElem = document.body.querySelector(divSelector);
  return $(this.parentElem).children();
}
/* The method adopts two buttons identifiers and DOM node identifier. When these buttons are pressed the click event is generated on that node's children. */
RepeatTheWords.prototype.clickGeneration = function(butt1, butt2, divSelector){
  var self = this;
  this.children = this.getChildren(divSelector);

  this.click = new MouseEvent('click');
  
  $(document).keydown(function(event){
    if( event.which == butt1){
      self.children[0].dispatchEvent(self.click);
    }
    if( event.which == butt2){
      self.children[2].dispatchEvent(self.click);
    }
  });
}
/* The method paints a block either green or brown color depends on it has adopt true or false. */
RepeatTheWords.prototype.paintAnswer = function(answer, divSelector){
  var div = document.body.querySelector(divSelector);
  if(answer){
    $(div).css({'color': 'rgb(255, 255, 255)', 'background': 'rgb(19, 221, 33)', 'border': '0'}).html('&#10003;');
  }
  if(!answer){
    $(div).css({'color': 'rgb(255, 255, 255)', 'background': 'rgb(239, 148, 67)', 'border': '0'}).html('&#10007;');
  }
  function resetColor(div){
    $(div).css({'color': 'rgb(150, 150, 150)', 'background': '', 'border': ''}).html('?');
  }
  this.paintAnswerTimeout = setTimeout(resetColor, 500, div);
}
/* The method changes id=1 to id=2 when the time is over. */
RepeatTheWords.prototype.changeId = function(time){
  var div = document.getElementById('1');
  function change(){
    div.setAttribute('id', '0');
  }
  this.changeIdTimeout = setTimeout(change, time); //!!!
}
/* The method set a bottoms tip. */
RepeatTheWords.prototype.setTip = function(divSelector, time){  
  function setTip(divSelector){
    var div = document.body.querySelector(divSelector);
    $(div).html('Your time is over');
  }
  this.setTiptimeout = setTimeout(setTip, time, divSelector); //!!!
}
/* The method makes responses array. */
RepeatTheWords.prototype.makeResArray = function(currentArr, answer){
  var elem = currentArr;
  elem.push(answer);
  this.resArr.push(elem);
}
/* The method paints the text of div in gray after the time is over. */
RepeatTheWords.prototype.disableBlock = function(divId, timeMs, name){
  var block = document.body.querySelector(name);
  if(block){
    block.removeAttribute('name');
  }  
  
  function disable(divId){
    var div = document.getElementById(divId);        
    div.setAttribute('name', 'disabled');
  }
  this.disableBlockTimeout = setTimeout(disable, timeMs, divId);
}
/* The method takes results array and depict the result table. */
RepeatTheWords.prototype.showResults = function(divSelector, captionText){
  var div = document.body.querySelector(divSelector);
  
  this.resHeader = document.createElement('div');
  $(this.resHeader).attr('class', 'res');
  
  this.table = document.createElement('table');
  $(this.table).attr('class', 'res');
  $(this.resHeader).append(this.table);

  this.caption = document.createElement('caption');
  $(this.caption).attr('class', 'res').html(captionText);
  $(this.table).prepend(this.caption);
  
  this.tbody = document.createElement('tbody');
  $(this.table).append(this.tbody);
  
  this.tHead = document.createElement('tr');
  $(this.tHead).attr('class', 'tHead');
  $(this.tbody).append(this.tHead);
  
  this.stat = document.createElement('th');
  $(this.stat).html('Status');
  $(this.tHead).append(this.stat);
  
  this.engWord = document.createElement('th');
  $(this.engWord).html('English word');
  $(this.tHead).append(this.engWord);
  
  this.answ = document.createElement('th');
  $(this.answ).html('Your answer');
  $(this.tHead).append(this.answ);
  
  this.rightAnsw = document.createElement('th');
  $(this.rightAnsw).html('Right answer');
  $(this.tHead).append(this.rightAnsw);
  
  for( var i = 0; i <= (this.resArr.length - 1); i++ ){
    this._resElem = this.resArr[i];
    
    this.tr = document.createElement('tr');
    
    this.tdStat = document.createElement('td');    
    if( this._resElem[3] == true ){
      $(this.tdStat).html('&#10003').attr('class', 'green');
    }else{
      $(this.tdStat).html('&#10007;').attr('class', 'red');
    }
    $(this.tr).append(this.tdStat);
    
    this.simpleTd = document.createElement('td');
    $(this.simpleTd).html(this._resElem[0]);
    $(this.tr).append(this.simpleTd);
    
    this.userAnsw = document.createElement('td');
    if( this._resElem[3] == true ){
      $(this.userAnsw).html(this._resElem[1]);
    }else{
      $(this.userAnsw).html(this._resElem[2]).attr('class', 'lineThrough');
    }
    $(this.tr).append(this.userAnsw);
    
    this.right = document.createElement('td');
    $(this.right).html(this._resElem[1]);
    $(this.tr).append(this.right);
    
    $(this.tbody).append(this.tr);
  }
  
  this.agan = document.createElement('button');
  $(this.agan).attr('id', 'trainAgan').html('Train agan');
  $(this.resHeader).append(this.agan);
  
  this.back = document.createElement('button');
  $(this.back).attr('id', 'back').html('Back');
  $(this.resHeader).append(this.back);
  
  var children = $(div).children();
  $(children).remove();
  $(div).append(this.resHeader);
  $(this.resHeader).effect('slide', 500);
  
  var stepBack = new StepBack;
  stepBack.go('#back', -1);
  
  var reload = new Reload;
  reload.execute('#trainAgan');
}

/* The method listens the clicks and return either true or false. */
RepeatTheWords.prototype.getAnswer = function(divSelector, wordss){
  
  var self = this;
  this.ansversCont = document.body.querySelectorAll(divSelector);
  this.placeWords(wordss[0], '.word', '.answer', '.tip');
  this.showTime(5000, 'timeParent', 'timeChild');
  this.changeId(5250);
  this.setTip('.tip', 5000);
  self.disableBlock(0, 4800, '[name="disabled]');
  
  $(this.ansversCont).click(function(event){
    var cont =   event.target;
        
    clearTimeout(self.changeIdTimeout);
    clearTimeout(self.setTiptimeout);
    clearInterval(self.intervalId);
    clearInterval(self.disableBlockTimeout);
    
    if($(cont).attr('id') == '1'){
      var res = true;
    }
    if($(cont).attr('id') == '0'){
      var res = false;
    }
    
    self.paintAnswer(res, '.note');
    self.makeResArray(wordss[self.counter], res);
    self.counter++;
    self.placeWords(wordss[self.counter], '.word', '.answer', '.tip');    
    self.showTime(5000, 'timeParent', 'timeChild');
    self.changeId(5250);
    self.setTip('.tip', 5000);
    self.disableBlock(0, 4800, "[name='disabled']");
  });
}
/* The method gets answers from server and launch another methods. */
RepeatTheWords.prototype.loadWords = function(wordsAddress, errorPageAddress){
  var self = this;  
  this.wordsAddress = wordsAddress;
  this.errorPageAddress = errorPageAddress;
  
  $.ajaxSetup({
    type: 'POST',
    async: true,
    dataType: 'json',
    timeout: 10000,
    url: self.wordsAddress
  });  
  $.ajax({
    success:function(data){
      var wordss = JSON.parse(data);
      self.getAnswer('.answer', wordss);
      self.clickGeneration(37, 39, '.answerContainer');
    },
    error: function(){
    window.location = self.errorPageAddress;
  }
  });
}

/*
  The class IncreaseeElement increases an element of the page and make it's description. 
*/
function IncreaseElement(elemSelector){
  this.elemSelector = elemSelector;
  this.elementTarget;
  this.parentA;
  this.parentDiv;
  this.title;
  this.titleCont;
  this.appendix;
}
/* This method animates a picture after mouseove the picture.
The animation direction is changed depends on picture position. */
IncreaseElement.prototype.animate = function(){
  var self = this;
  $(window).mouseover(function(event){
    this.elementTarget = event.target;

    self.writeRefName();

    if($(this.elementTarget).attr('class') !== 'seleblity'){
      return false;
    }
    
    if(($(this.elementTarget).attr('name') == '11' || $(this.elementTarget).attr('name') == '12' ||
      $(this.elementTarget).attr('name') == '13' || $(this.elementTarget).attr('name') == '14')){
        
        self.writeName();
        self.animateName();
          
        $(this.elementTarget).css({'position':'relative', 'z-index':999});
        $(this.elementTarget).animate({
          'width':'230px', 
          'height':'230px',
          'border-radius':'7px',
          'margin-top':'-50px'        
        }, 500);
        $(this.elementTarget).animate({}, 500);
        
    }else if($(this.elementTarget).attr('name') == '15'){
      
      $(this.elementTarget).css({'position':'relative', 'z-index':999});
      
      self.writeName();
      self.animateName();
            
      $(this.elementTarget).animate({
        'width':'230px', 
        'height':'230px',
        'border-radius':'7px',
        'margin-top':'-50px',        
        'margin-left':'-50px'          
      }, 500);
      $(this.elementTarget).animate({}, 500);
      
    }else if(($(this.elementTarget).attr('name') == '5' ||  $(this.elementTarget).attr('name') == '10')){      
      
      $(this.elementTarget).css({'position':'relative', 'z-index':999});
      
      self.writeName();
      self.animateName();
      
      $(this.elementTarget).animate({
        'width':'230px', 
        'height':'230px',        
        'border-radius':'7px',
        'margin-left':'-50px'
      }, 500);
      $(this.elementTarget).animate({}, 500);
      
    }else{
      
      self.writeName();
      self.animateName();
      
      $(this.elementTarget).css({'position':'relative', 'z-index':999});
      $(this.elementTarget).animate({
        'width':'230px', 
        'height':'230px',         
        'border-radius':'7px'
      }, 500);        
    }    
  });

  self.decrease();
}
/* The method decreases an element after mouseout event. */
IncreaseElement.prototype.decrease = function(){
  var self = this;  
  $(window).mouseleave(function(event){
    
    this.elementTarget = event.target;
    if($(this.elementTarget).attr('class') == 'seleblity'){
      $(this.elementTarget).animate({
        'left':'0',
        'width':'180px', 
        'height':'180px',         
        'border-radius':'0',
        'margin':'0'
      }, 500);
      $(this.elementTarget).css('position', 'static');
      $(this.elementTarget).css('z-index', 0);
      
      self.dropName();      
    }
    self.dropRefName();
  }); 
}
/*  The method writeName extracts a text from 'value' attribute and write it under the picture. */
IncreaseElement.prototype.writeName = function(){
  self.title = $(self.elementTarget).attr('value');
  self.parentA = $(self.elementTarget).parent();
  self.parentDiv = $(self.parentA).parent();

  self.appendix = document.createElement('div');
  $(self.parentDiv).append(self.appendix);
  
  self.titleCont = document.createElement('p');
  $(self.titleCont).attr('class', 'titleCont');
  $(self.titleCont).css('position', 'relative');
  $(self.titleCont).html(self.title);
  $(self.parentDiv).append(self.titleCont);
}
/* The method increases an element smoothly. */
IncreaseElement.prototype.animateName = function(){
  
  if($(self.elementTarget).attr('name') == '5' ||  $(self.elementTarget).attr('name') == '10'
    ||  $(self.elementTarget).attr('name') == '15'){
      $(self.titleCont).animate({'width': '210px', 'margin-left': '-50px'}, 500);
  }else{
    $(self.titleCont).animate({'width': '210px'}, 500);
  }
}
/* The method removes the picture's description. */
IncreaseElement.prototype.dropName = function(){
  $(self.titleCont).remove();
  $(self.appendix).remove();
}
/* The method writes a name in the description. */
IncreaseElement.prototype.writeRefName = function(){
  if( $(self.elementTarget).attr('class') == 'refresh' ){
    this.writeName();
  }
}
/* The method removes a picture description if the picture is refresh reference. */
IncreaseElement.prototype.dropRefName = function(){
  if( $(self.elementTarget).attr('class') == 'refresh' ){
    this.dropName();
  }
}

/*
  The class FillTheArticle receives an array by AJAX method and fill the article.
*/
function FillTheArticle(selector){
  this.article = document.body.querySelector(selector);
  this.address;
  this.data;
  this.div;
  this.ref;
  this.dat;
  this.errorPageAddress;
}
/* The method performs AJAX inquiry to the server and execute 'fill' method. */
FillTheArticle.prototype.load = function(address, errorPageAddress){
  var self = this;
  this.address = address;
  this.errorPageAddress = errorPageAddress;

  $.ajaxSetup({
    type: 'POST',
    async: true,
    url: self.address,
    timeout: 10000,
    dataType: 'json'
  });
  
  $.ajax({
    success: function(data){
      fillIn.fill(data);
    },
    error: function(){
      window.location = self.errorPageAddress;
    }
  });
}
FillTheArticle.prototype.fill = function(data){
  var self = this;
  this.data = JSON.parse(data);
  
  this.article.setAttribute('class', 'load');
  this.imgCont = document.createElement('div');

    
  for( var i = 0; i <= this.data.length - 1; i++ ){
    this.arrElem = this.data[i];
    
    this.img = document.createElement('img');
    this.img.setAttribute('src', this.arrElem[2]);
    this.img.setAttribute('class', this.arrElem[3]);
    this.img.setAttribute('alt', this.arrElem[4]);
    this.img.setAttribute('value', this.arrElem[5]);
    this.img.setAttribute('name', (i + 1));
    
    this.ref = document.createElement('a');
    this.ref.setAttribute('href', this.arrElem[1]);
    this.ref.appendChild(this.img);
    
    this.div = document.createElement('div');
    this.div.setAttribute('class', 'small');
    this.div.appendChild(this.ref);    
    
    this.imgCont.appendChild(this.div);
  }
   $(document).ajaxComplete(function(){
     self.article.appendChild(self.imgCont);
     self.article.removeAttribute('class');
   });
}

FillTheArticle.prototype.refresh = function(buttName, contName, address, errorPageAddress){
  var self = this;
  this.cont = document.body.querySelector(contName);
  this.buttName = buttName;  
  this.address = address;
  this.errorPageAddress = errorPageAddress;
  this.elementTarget;
  
  $(window).click(function(event){
    self.elementTarget = event.target;
    
    if($(self.elementTarget).attr('class') == self.buttName){
      self.children = $(self.cont).children();
      $(self.children).remove();
      
      $.ajaxSetup({
        type: 'POST',
        async: true,
        url: self.address,
        dataType: 'json',
        timeout: 10000
      });
      $.ajax({
        success: function(data){
          fillIn.fill(data);
        },
        error: function(){
          window.location = self.errorPageAddress;
        }
      }); 
      event.preventDefault();      
    }    
  });
}

/* 
  The class LoadNewCelebrities execute new AJAX query to the server after refresh button is pressed.
*/
function LoadNewCelebrities(buttName, contName, address, errorPageAddress){
  this.cont = document.body.querySelector(contName);
  this.buttName = buttName;  
  this.address = address;
  this.errorPageAddress = errorPageAddress;
  this.elementTarget;
}
LoadNewCelebrities.prototype.load = function(){
  var self = this;

  $(window).click(function(event){
    self.elementTarget = event.target;
    
    if($(self.elementTarget).attr('class') == self.buttName){
      self.children = $(self.cont).children();
      $(self.children).remove();
      
      $.ajaxSetup({
        type: 'POST',
        async: true,
        url: self.address,
        dataType: 'json',
        timeout: 10000
      });
      $.ajax({
        success: function(data){
          fillIn.fill(data);
        },
        error: function(){
          window.location = self.errorPageAddress;
        }
      }); 
      event.preventDefault();
    }    
  });
}

/*
  Class RedioReplacer replaces radio-buttons by pretty images.
*/
function RedioReplacer(buttonsName, divIdentifier){
  this.buttonsCollection = document.body.querySelectorAll(buttonsName);
  this.replacersCollection = $(divIdentifier).children();
  this.hoverElemNumber;
  this.clickedElemNumber;
}
RedioReplacer.prototype.replase = function(){
  var self = this;
  
  $(this.replacersCollection).mouseover(function(event){
    self.hoverElemNumber = $(event.target).index();

    for( var i = 0; i <= self.hoverElemNumber; i++ ){
      $(self.replacersCollection[i]).attr('class', 'radio-replacer-checked');
  }
  for( var n = self.hoverElemNumber + 1; n <= self.replacersCollection.length; n++ ){
      $(self.replacersCollection[n]).attr('class', 'radio-replacer');
  }
  });
}
RedioReplacer.prototype.check = function(){
  var self = this;
  
  $(this.replacersCollection).click(function(event){
    self.clickedElemNumber = $(event.target).index();

    for( var i = 0; i <= self.replacersCollection.length; i++ ){
      if( $(self.buttonsCollection[i]).attr('checked') ){
      $(self.buttonsCollection[i]).removeAttr('checked');
    }                
    }
    $(self.buttonsCollection[self.clickedElemNumber]).attr('checked', true);
  });
}

/*
  The class DripdownLnks make a link children visible after the link is mouseover.
  The class adopts the link identifier and its child attribute 'class'.
*/
function DripdownLnks(linkIdentifier, childClass){
  this.linksCollection = document.body.querySelectorAll(linkIdentifier);
  this.childIdentifier = childClass;
  this.targetedLink;
  this.children;
  this.displayed;
  this.boundingSize;
}
/* This method searching for the element for displaying among its children and display this element if it is present. */
DripdownLnks.prototype.depict = function(){
  var self = this;
 
  $(this.linksCollection).mouseenter(function(event){
    self.targetedLink = this;
    self.children = self.targetedLink.children;

    for( var i = 0; i <= self.children.length; i++){
      if( $(self.children[i]).attr('class') == self.childIdentifier ){
        self.displayed = self.children[i];
      }      
    }
    
    self.makePlace();
    $(self.displayed).fadeIn(500);
  });
   
  $(this.linksCollection).mouseleave(function(){
    if( self.displayed ){
    $(self.displayed).css('display', '');
  }
    self.targetedLink = self.children = self.displayed = self.boundingSize = null;
  });
}
/* This method places the displayed element at right from main element. */
DripdownLnks.prototype.makePlace = function(){
  var self = this;
  self.boundingSize = $(self.targetedLink).offset();

  $(self.displayed).css({
    'top':self.boundingSize.top - $(self.targetedLink).height() + 'px',
    'left':$(self.targetedLink).width() + 'px'
  });
}
/*
  The class ListCharacters fills a container with characters links by AJAX method.
*/
function ListCharacters(contSelector, dataAddress, errorPageAddress, characterClass, textContClass){
  this.container = document.body.querySelector('article.starWarsCharackters');
  this.dataAddress = dataAddress;
  this.errorPageAddress = errorPageAddress;
  this.dataArray;
  this.charachter;
  this.characterClass = characterClass;
  this.link_;
  this.img;
  this.textCont;
  this.textContClass = textContClass;
  this.paragraph;
  this.div;
}
/* The method firstDownload downloads first 15 charachters and execute the fill method during the page is primary downloaded. */
ListCharacters.prototype.firstDownload = function(){
  var self = this;

  $.ajaxSetup({
    type: 'POST',
    async: true,
    url: self.dataAddress,
    timeout: 10000,
    dataType: 'json'
  });
  
  $.ajax({
    success: function(data){
      self.fill(data);
    },
    error: function(){
      window.location = self.errorPageAddress;
    }
  }); 
}
/* The method fill adopts the received data, parse thim to array and depicts them. */
ListCharacters.prototype.fill = function(data){
  var self = this;
  this.dataArray = JSON.parse(data)
  
  for( var i = 0; i < this.dataArray.length; i++ ){
    
    self.charachter = document.createElement('div');
    $(self.charachter).attr('class', self.characterClass);
    
    self.link_ = document.createElement('a');
    $(self.link_).attr('href', self.dataArray[i][0]);
    $(self.charachter).append(self.link_);
    
    self.img =document.createElement('img');
    $(self.img).attr('src', self.dataArray[i][1]);
    $(self.img).attr('alt', self.dataArray[i][2]);
    $(self.link_).append(self.img);
    
    self.textCont = document.createElement('div');
    $(self.textCont).attr('class', self.textContClass);
    $(self.charachter).append(self.textCont);
    
    self.paragraph = document.createElement('p');
    $(self.paragraph).html(self.dataArray[i][2]);
    $(self.textCont).append(self.paragraph);
    
    self.div = document.createElement('div');
    $(self.textCont).append(self.div);
    
    $(self.container).append(self.charachter);
  }
}

/*
  The class ChangeHeader changes header depends on scrolling position.
*/
function ChangeHeader(blockIdentifier){
  this.block = document.body.querySelector(blockIdentifier);
  this.shrinkedElement;
  this.elementsCollection = [];
  this.parentElement = this.block.parentElement;
}
/* The method transparencyChange changes transparency level depends on scrolling position. */
ChangeHeader.prototype.transparencyChange = function(){
  var self = this; 

  $(document).scroll(function(){
    if(window.pageYOffset < 200){
      $(self.block).css('opacity', ( (0.09 * 295) / window.pageYOffset ) );
    }
    if(!window.pageYOffset){
      $(self.block).css('opacity', 1);
    }
  });
}
/* The method shrinkElement shrinks an element depends on scrolling position. */
ChangeHeader.prototype.shrinkElement = function(elementIdentifier, chidrenIdentArray){
  var self = this;
  this.shrinkedElement = document.body.querySelector(elementIdentifier);
  for( var i = 0; i < chidrenIdentArray.length; i++ ){
    this.elementsCollection[i] = document.body.querySelector(chidrenIdentArray[i]);    
  }

  $(document).scroll(function(){
    if(window.pageYOffset <= 120){
      
      $('header.starWarsCharackters').css({'height': 361 - window.pageYOffset});
      
      for( var i = 0; i < self.elementsCollection.length; i++ ){
        $(self.elementsCollection[i]).css({'height': 295 - window.pageYOffset});  
      }
     
      $(self.shrinkedElement).css({
        'height': (150 - window.pageYOffset), 
        'width': (350 - (window.pageYOffset * 2)),
        'margin-top': (window.pageYOffset / 2)
      });
      
      $('div.swHeaderDeputy').css('display', '');    
    }
    
    if(window.pageYOffset > 93.5){
      $('div.swHeaderDeputy').css('display', 'block');
    }
  });
}
  































