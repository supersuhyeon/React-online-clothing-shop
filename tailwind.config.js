/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx}'],
  theme: {
    extend: {
     colors : {
      brand : '#F96162'
     },
     backgroundImage:{
      banner: `url('../public/images/banner.jpg')`
     },
     keyframes:{
      minibanner :{
        '0%' : {opacity:'1'},
        '100%' : {opacity:'0'}
      }
     },
     animation:{
      minibanner: 'minibanner 8s ease-in-out'
     }
    },
  },
  plugins: [],
}
