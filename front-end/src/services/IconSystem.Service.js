export default class IconSystem {
  static render(path, baseUrl) {
    let id = 'svg-icon-system';
    let xhr = new XMLHttpRequest;
    let body = document.body;
    let div = document.createElement('div');
    let base = baseUrl || window.location.protocol + '//' + window.location.hostname + (window.location.port ? ':' + window.location.port : '');
    let url = base + path;

    if (div.id = id, body.insertBefore(div, body.childNodes[0]), 'withCredentials' in xhr) {
      xhr.withCredentials;
      xhr.open('GET', url, true);
    }
    else {
      if (typeof XDomainRequest == 'undefined') {
        return void(body.className += ' no-svg');
      }

      xhr = new XDomainRequest;
      xhr.open('GET', url);
    }

    xhr.onload = function() {
      div.className = 'u-visually-hidden';
      div.innerHTML = xhr.responseText;
    };

    xhr.onerror = function() {
      body.className += ' no-svg';
    };

    setTimeout(function() {
      xhr.send();
    }, 0);
  }
}
