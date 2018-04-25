import iFlyChatChatSdk from 'modules/iflychat-chat-sdk'
let Translations = {
  translate: function(lang,cb){

	var url = '//cdn.iflychat.com/translations/' + lang + '.json';
		iFlyChatChatSdk.getRequest(url,function(json){
			return cb(json);
		});
  },
  getLang: function(lang) {
    lang = lang.toLowerCase();
    if(lang === 'fil') return 'tl';
    var len = lang.length;
    if(len >= 2){
      if(lang.match(/en-gb/) || lang.match(/zh-hk/)) return lang;
      var check = lang.substring(0,2);
      if(check.match(/ca|zh|cs|da|nl|en|et|tl|fi|fr|de|el|hu|id|it|ja|ko|no|pl|pt|ro|ru|sk|sl|es|sv|th|tr|uk|vi/)){
        return check;
      } else if(len === 2) return 'en';
      check = lang.substring(0,3);
      if(check.match(/ces|est|tgl|ind|pol|slk|tur/)){
        return check.charAt(0) + check.charAt(2);
      }
      else if(check === 'jpn') return 'ja';
      else if(check === 'por') return 'pt';
      else if(check === 'spa') return 'es';
      else if(check === 'swe') return 'sv';
      else return 'en';
    }
    else return 'en';
  }
};

export default Translations;
