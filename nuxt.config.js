export default {
  router: {
    linkActiveClass: 'active',
    extendRoutes(routes, resolve) {},
  },
  plugins: ['~/plugins/axios.js', '~/plugins/dayjs.js'],
  components: true,
  head: {
    title: 'RealWorld',
    link: [
      {
        rel: 'stylesheet',
        href: '//code.ionicframework.com/ionicons/2.0.1/css/ionicons.min.css',
        type: 'text/css',
      },
      {
        rel: 'stylesheet',
        href: '//fonts.googleapis.com/css?family=Titillium+Web:700|Source+Serif+Pro:400,700|Merriweather+Sans:400,700|Source+Sans+Pro:400,300,600,700,300italic,400italic,600italic,700italic',
        type: 'text/css',
      },
      { rel: 'stylesheet', href: '/main.css' },
    ],
  },
  server: {
    host: '0.0.0.0', // default: localhost,
    port: 3000, // default: 3000
  },
}
