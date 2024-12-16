var Shareon = function(s) {
  'use strict';
  const n = {
    facebook: t => `https://www.facebook.com/sharer/sharer.php?u=${t.url}${t.hashtags ? `&hashtag=%23${t.hashtags.split('%2C')[0]}` : ''}`,
    email: t => `mailto:?subject=${t.title}&body=${t.url}`,
    linkedin: t => `https://www.linkedin.com/sharing/share-offsite/?url=${t.url}`,
    mastodon: t => `https://toot.kytta.dev/?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ''}${t.via ? `%0D%0A%0D%0A${t.via}` : ''}`,
    messenger: t => `https://www.facebook.com/dialog/send?app_id=${t.fbAppId}&link=${t.url}&redirect_uri=${t.url}`,
    odnoklassniki: t => `https://connect.ok.ru/offer?url=${t.url}&title=${t.title}${t.media ? `&imageUrl=${t.media}` : ''}`,
    pinterest: t => `https://pinterest.com/pin/create/button/?url=${t.url}&description=${t.title}${t.media ? `&media=${t.media}` : ''}`,
    pocket: t => `https://getpocket.com/edit.php?url=${t.url}`,
    reddit: t => `https://www.reddit.com/submit?title=${t.title}&url=${t.url}`,
    teams: t => `https://teams.microsoft.com/share?href=${t.url}${t.text ? `&msgText=${t.text}` : ''}`,
    telegram: t => `https://telegram.me/share/url?url=${t.url}${t.text ? `&text=${t.text}` : ''}`,
    tumblr: t => `https://www.tumblr.com/widgets/share/tool?posttype=link${t.hashtags ? `&tags=${t.hashtags}` : ''}&title=${t.title}&content=${t.url}&canonicalUrl=${t.url}${t.text ? `&caption=${t.text}` : ''}${t.via ? `&show-via=${t.via}` : ''}`,
    twitter: t => `https://twitter.com/intent/tweet?url=${t.url}&text=${t.title}${t.via ? `&via=${t.via}` : ''}${t.hashtags ? `&hashtags=${t.hashtags}` : ''}`,
    viber: t => `viber://forward?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ''}`,
    vkontakte: t => `https://vk.com/share.php?url=${t.url}&title=${t.title}${t.media ? `&image=${t.media}` : ''}`,
    whatsapp: t => `https://wa.me/?text=${t.title}%0D%0A${t.url}${t.text ? `%0D%0A%0D%0A${t.text}` : ''}`
  }, u = t => () => {
    window.open(t, '_blank', 'noopener,noreferrer');
  }, l = () => {
    const t = document.querySelectorAll('.shareon');
    for (const a of t) for (const e of a.children) if (e) {
      const p = e.classList.length;
      for (let o = 0; o < p; o += 1) {
        const r = e.classList.item(o);
        if (r === 'copy-url' && e.addEventListener('click', () => {
          const i = e.dataset.url || a.dataset.url || window.location.href;
          navigator.clipboard.writeText(i), e.classList.add('done'), setTimeout(() => {
            e.classList.remove('done');
          }, 1e3);
        }), r === 'print' && e.addEventListener('click', () => {
          window.print();
        }), r === 'web-share') {
          const i = {
            title: e.dataset.title || a.dataset.title || document.title,
            text: e.dataset.text || a.dataset.text || '',
            url: e.dataset.url || a.dataset.url || window.location.href
          };
          navigator.canShare && navigator.canShare(i) ? e.addEventListener('click', () => {
            navigator.share(i);
          }) : e.style.display = 'none';
        }
        if (Object.prototype.hasOwnProperty.call(n, r)) {
          const i = {
            url: encodeURIComponent(e.dataset.url || a.dataset.url || window.location.href),
            title: encodeURIComponent(e.dataset.title || a.dataset.title || document.title),
            media: encodeURIComponent(e.dataset.media || a.dataset.media || ''),
            text: encodeURIComponent(e.dataset.text || a.dataset.text || ''),
            via: encodeURIComponent(e.dataset.via || a.dataset.via || ''),
            hashtags: encodeURIComponent(e.dataset.hashtags || a.dataset.hashtags || ''),
            fbAppId: encodeURIComponent(e.dataset.fbAppId || a.dataset.fbAppId || '')
          }, h = n[r](i);
          e.tagName.toLowerCase() === 'a' ? (e.setAttribute('href', h), e.setAttribute('rel', 'noopener noreferrer'), e.setAttribute('target', '_blank')) : e.addEventListener('click', u(h));
          break;
        }
      }
    }
  }, c = document.currentScript;
  return c && c.hasAttribute('init') && l(), s.init = l, Object.defineProperty(s, Symbol.toStringTag, { value: 'Module' }), s;
}({});
