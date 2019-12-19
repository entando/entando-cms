export const VIEWPAGES_PAYLOAD = [{
  code: 'homepage',
  status: 'published',
  displayedInMenu: true,
  pageModel: 'complex_model',
  charset: 'utf-8',
  contentType: 'text/xml',
  parentCode: null,
  seo: false,
  position: 1,
  titles: {
    it: 'Pagina iniziale',
    en: 'Home page',
  },
  fullTitles: {
    en: 'Home Page',
    it: 'Pagina iniziale',
  },
  ownerGroup: 'administrators',
  joinGroups: [
    'administrators',
  ],
  children: [
    'dashboard',
    'service',
    'contacts',
  ],
}];

export const SEARCH_PAGES = [
  {
    code: 'page',
    status: 'draft',
    displayedInMenu: true,
    pageModel: 'pageModel',
    parentCode: 'service',
    position: 1,
    titles: {
      it: 'Mio Titolo',
      en: 'My title',
    },
    fullTitles: {
      en: 'Home / Services / My Title new 22',
      it: 'Home / Pagine di Servizio / Mio Titolo nuovo 22',
    },
    children: [
      'pageCode1',
      'pageCode2',
    ],
    numWidget: 0,
    lastModified: '01/01/2018 h12:12',
  },
];
